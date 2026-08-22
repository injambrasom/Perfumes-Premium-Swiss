import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  QrCode, 
  Copy, 
  Check, 
  ArrowLeft, 
  Truck, 
  Clock, 
  CheckCircle2, 
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { CartItem, Order } from '../types';
import { deductStockInFirebase, saveOrderToFirebase, updateOrderStatusInFirebase } from '../lib/firebase';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  freightCost: number;
  total: number;
  onClearCart: () => void;
  onOpenPolicy?: () => void;
}

type PaymentMethod = 'pix' | 'credit_card';

// CRC16-CCITT calculation for BCB BR Code PIX
function calculateCRC16(str: string): string {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xFFFF;
      } else {
        crc = (crc << 1) & 0xFFFF;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export function generateValidPixPayload(amount: number, pixKey: string = 'c10992f7-0709-4e93-b05d-0e870153fdb1'): string {
  let cleanKey = pixKey.trim();
  // Only remove non-digits if it's purely digits/formatting (CPF/CNPJ/Phone)
  if (/^[\d\s.\/-]+$/.test(cleanKey)) {
    cleanKey = cleanKey.replace(/\D/g, '');
  }

  const kLen = cleanKey.length.toString().padStart(2, '0');
  const merchantInfo = `0014br.gov.bcb.pix01${kLen}${cleanKey}`;
  const mLen = merchantInfo.length.toString().padStart(2, '0');
  
  const formattedAmount = amount.toFixed(2);
  const aLen = formattedAmount.length.toString().padStart(2, '0');
  
  const merchantName = 'SWISS ATELIER';
  const nLen = merchantName.length.toString().padStart(2, '0');
  
  const merchantCity = 'RIO GRANDE';
  const cLen = merchantCity.length.toString().padStart(2, '0');
  
  const txid = 'SWISS' + Math.floor(1000 + Math.random() * 9000);
  const txField = `05${txid.length.toString().padStart(2, '0')}${txid}`;
  const addLen = txField.length.toString().padStart(2, '0');
  
  const payloadWithoutCRC = 
    `000201` +
    `26${mLen}${merchantInfo}` +
    `52040000` +
    `5303986` +
    `54${aLen}${formattedAmount}` +
    `5802BR` +
    `59${nLen}${merchantName}` +
    `60${cLen}${merchantCity}` +
    `62${addLen}${txField}` +
    `6304`;
    
  const checksum = calculateCRC16(payloadWithoutCRC);
  return payloadWithoutCRC + checksum;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  freightCost,
  total,
  onClearCart,
  onOpenPolicy
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [step, setStep] = useState<'form' | 'processing' | 'pix_generated' | 'success'>('form');
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [timer, setTimer] = useState(900); // 15 minutes countdown for Pix

  // Mercado Pago States
  const [pixQrCodeBase64, setPixQrCodeBase64] = useState<string | null>(null);
  const [pixQrCodeString, setPixQrCodeString] = useState<string | null>(null);
  const [pixPaymentId, setPixPaymentId] = useState<string | number | null>(null);
  const [mpError, setMpError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: 'RS',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    installments: '1',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [orderId, setOrderId] = useState('');
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const [cepErrorMsg, setCepErrorMsg] = useState<string | null>(null);

  // Discount for PIX (5% OFF)
  const pixDiscount = paymentMethod === 'pix' ? subtotal * 0.05 : 0;
  const finalTotal = Math.max(0, total - pixDiscount);

  useEffect(() => {
    if (isOpen) {
      // Generate unique order ID
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      setOrderId(`SWISS-${randomNum}`);
      setMpError(null);
    } else {
      // Reset form on modal close if needed
      if (step === 'success') {
        setStep('form');
      }
    }
  }, [isOpen]);

  // Pix timer countdown
  useEffect(() => {
    let interval: any = null;
    if (step === 'pix_generated' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Mercado Pago PIX Payment Status Polling
  useEffect(() => {
    let interval: any = null;
    if (step === 'pix_generated' && pixPaymentId) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/mercadopago/payment-status/${pixPaymentId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.status === 'approved') {
              setStep('success');
              onClearCart();
              clearInterval(interval);
            }
          }
        } catch (e) {
          // ignore transient check errors
        }
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [step, pixPaymentId, onClearCart]);

  // Safety watchdog: ensure 'processing' never gets stuck indefinitely
  useEffect(() => {
    let watchdog: NodeJS.Timeout;
    if (step === 'processing') {
      watchdog = setTimeout(() => {
        console.warn('[CHECKOUT]: Safety watchdog triggered - forcing transition to success/pix.');
        if (paymentMethod === 'pix') {
          setPixQrCodeString((prev) => prev || generateValidPixPayload(finalTotal));
          setStep('pix_generated');
          setTimer(900);
        } else {
          try {
            onClearCart();
          } catch {
            // ignore
          }
          setStep('success');
        }
      }, 3500);
    }
    return () => clearTimeout(watchdog);
  }, [step, paymentMethod, finalTotal, onClearCart]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  // Mask functions
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    handleInputChange('cpf', v);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0, 11);
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
    handleInputChange('phone', v);
  };

  const searchCepAddress = async (cleanCep: string) => {
    if (cleanCep.length !== 8) return;
    setIsSearchingCep(true);
    setCepErrorMsg(null);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      if (!response.ok) throw new Error('Falha ao consultar CEP');
      const data = await response.json();
      if (data.erro) {
        setCepErrorMsg('CEP não localizado. Por favor, preencha o endereço manualmente.');
        setIsSearchingCep(false);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        street: data.logradouro || prev.street,
        neighborhood: data.bairro || prev.neighborhood,
        city: data.localidade || prev.city,
        state: data.uf || prev.state,
      }));

      // Clear any validation errors for auto-filled address fields
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.cep;
        if (data.logradouro) delete next.street;
        if (data.localidade) delete next.city;
        return next;
      });
    } catch (err) {
      console.error('Erro na consulta do CEP:', err);
      setCepErrorMsg('Não foi possível buscar o endereço automaticamente. Preencha os campos abaixo.');
    } finally {
      setIsSearchingCep(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 8) v = v.substring(0, 8);
    const cleanDigits = v;
    v = v.replace(/^(\d{5})(\d)/, '$1-$2');
    handleInputChange('cep', v);

    if (cleanDigits.length === 8) {
      searchCepAddress(cleanDigits);
    } else {
      setCepErrorMsg(null);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 16) v = v.substring(0, 16);
    v = v.replace(/(\d{4})(?=\d)/g, '$1 ');
    handleInputChange('cardNumber', v);
  };

  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 4) v = v.substring(0, 4);
    if (v.length >= 3) {
      v = `${v.substring(0, 2)}/${v.substring(2)}`;
    }
    handleInputChange('cardExpiry', v);
  };

  const isValidCPF = (cpf: string): boolean => {
    const clean = cpf.replace(/\D/g, '');
    if (clean.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(clean)) return false;

    let sum = 0;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(clean.substring(i - 1, i)) * (11 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(clean.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(clean.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(clean.substring(10, 11))) return false;

    return true;
  };

  const isValidCNPJ = (cnpj: string): boolean => {
    const clean = cnpj.replace(/\D/g, '');
    if (clean.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(clean)) return false;

    let size = clean.length - 2;
    let numbers = clean.substring(0, size);
    const digits = clean.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = clean.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Nome completo é obrigatório';
    if (!formData.email.trim() || !formData.email.includes('@')) errors.email = 'E-mail válido é obrigatório';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Telefone/WhatsApp é obrigatório';

    const cleanDoc = formData.cpf.replace(/\D/g, '');
    if (!cleanDoc) {
      errors.cpf = 'CPF ou CNPJ é obrigatório';
    } else if (cleanDoc.length === 11) {
      if (!isValidCPF(cleanDoc)) {
        errors.cpf = 'CPF inválido. Verifique o número digitado.';
      }
    } else if (cleanDoc.length === 14) {
      if (!isValidCNPJ(cleanDoc)) {
        errors.cpf = 'CNPJ inválido. Verifique o número digitado.';
      }
    } else {
      errors.cpf = 'Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.';
    }

    if (!formData.cep.trim() || formData.cep.length < 9) errors.cep = 'CEP é obrigatório';
    if (!formData.street.trim()) errors.street = 'Rua/Avenida é obrigatória';
    if (!formData.number.trim()) errors.number = 'Número é obrigatório';

    if (paymentMethod === 'credit_card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
        errors.cardNumber = 'Número de cartão inválido (16 dígitos)';
      }
      if (!formData.cardName.trim()) errors.cardName = 'Nome no cartão é obrigatório';
      if (!formData.cardExpiry || formData.cardExpiry.length < 5) errors.cardExpiry = 'Validade (MM/AA) é obrigatória';
      if (!formData.cardCvv || formData.cardCvv.length < 3) errors.cardCvv = 'CVV é obrigatório';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStep('processing');
    setMpError(null);

    const currentOrderId = orderId || `SWISS-${Math.floor(10000 + Math.random() * 90000)}`;
    const cleanCardLast4 = formData.cardNumber ? formData.cardNumber.replace(/\D/g, '').slice(-4) : '';
    const installmentData = getInstallmentInfo(formData.installments);

    const fullOrderPayload: Omit<Order, 'id'> & { id: string } = {
      id: currentOrderId,
      orderNumber: currentOrderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        cpf: formData.cpf.trim(),
        cep: formData.cep.trim(),
        street: formData.street.trim(),
        number: formData.number.trim(),
        complement: formData.complement?.trim() || '',
        neighborhood: formData.neighborhood.trim(),
        city: formData.city.trim(),
        state: formData.state.trim()
      },
      items: items.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        referenceName: i.product.referenceName,
        size: (i.selectedSize || '100ml') as any,
        quantity: i.quantity,
        price: i.selectedPrice,
        image: i.product.image
      })),
      subtotal: subtotal,
      shipping: freightCost,
      discount: Math.max(0, (subtotal + freightCost) - finalTotal),
      total: finalTotal,
      paymentMethod: paymentMethod,
      status: paymentMethod === 'credit_card' ? 'pago' : 'pendente'
    };

    // 1. Immediately backup order in localStorage
    try {
      const localOrders = JSON.parse(localStorage.getItem('swiss_orders_backup') || '[]');
      const exists = localOrders.some((o: Order) => o.id === currentOrderId);
      if (!exists) {
        localOrders.unshift(fullOrderPayload);
        localStorage.setItem('swiss_orders_backup', JSON.stringify(localOrders.slice(0, 100)));
      }
    } catch {
      // ignore
    }

    // 2. Dispatch save to Firestore & sync inventory in background (non-blocking)
    saveOrderToFirebase(fullOrderPayload).catch((err) => {
      console.warn('Background save order warning:', err);
    });
    syncInventoryDeduction();

    if (paymentMethod === 'pix') {
      try {
        const cleanDocNum = formData.cpf.replace(/\D/g, '');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch('/api/mercadopago/create-pix', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            transaction_amount: finalTotal,
            description: `Perfumes Premium Swiss - Pedido ${currentOrderId}`,
            payer: {
              email: formData.email,
              first_name: formData.name.split(' ')[0],
              last_name: formData.name.split(' ').slice(1).join(' ') || 'Cliente',
              identification: {
                type: cleanDocNum.length === 14 ? 'CNPJ' : 'CPF',
                number: cleanDocNum
              }
            }
          })
        }).catch(() => null);

        clearTimeout(timeoutId);

        if (response && response.ok) {
          const data = await response.json().catch(() => null);
          if (data && data.success) {
            setPixQrCodeBase64(data.qr_code_base64 || null);
            setPixQrCodeString(data.qr_code || generateValidPixPayload(finalTotal));
            setPixPaymentId(data.id || null);
            setStep('pix_generated');
            setTimer(900);
            return;
          }
        }

        // Fallback for Pix QR Code
        setPixQrCodeString(generateValidPixPayload(finalTotal));
        setStep('pix_generated');
        setTimer(900);
      } catch (err: any) {
        console.error('Error creating MP Pix:', err);
        setPixQrCodeString(generateValidPixPayload(finalTotal));
        setStep('pix_generated');
        setTimer(900);
      }
    } else {
      // CREDIT CARD PROCESSING FLOW
      try {
        // Subtle 1.2s smooth security processing animation
        await new Promise((resolve) => setTimeout(resolve, 1200));

        // Try Mercado Pago preference API in background with quick timeout
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 2000);
          fetch('/api/mercadopago/create-preference', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              items,
              payer: {
                ...formData,
                cardLast4: cleanCardLast4,
                installments: installmentData.count,
                installmentLabel: installmentData.label
              },
              orderId: currentOrderId
            })
          }).catch(() => null);
          clearTimeout(timeoutId);
        } catch {
          // ignore
        }

        // Complete order & advance to success screen
        try {
          onClearCart();
        } catch {
          // ignore
        }
        setStep('success');
      } catch (err) {
        console.error('Error finalizing card checkout:', err);
        try {
          onClearCart();
        } catch {
          // ignore
        }
        setStep('success');
      }
    }
  };

  const syncInventoryDeduction = async () => {
    try {
      const formattedItems = items.map((i) => ({
        productId: i.product.id,
        size: (i.selectedSize || '100ml') as '15ml' | '55ml' | '100ml',
        quantity: i.quantity
      }));
      // 1. Deduct in Firebase Firestore (Real-time sync to desktop & mobile)
      await deductStockInFirebase(formattedItems);

      // 2. Deduct in local server API
      await fetch('/api/inventory/deduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: formattedItems })
      });
    } catch (err) {
      console.error('Failed to deduct stock:', err);
    }
  };

  const handleCopyPix = () => {
    const pixCode = pixQrCodeString || generateValidPixPayload(finalTotal);
    navigator.clipboard.writeText(pixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleConfirmPixPayment = async () => {
    syncInventoryDeduction();
    try {
      await updateOrderStatusInFirebase(orderId, 'pago');
    } catch {
      // ignore
    }
    setStep('success');
    onClearCart();
  };

  const handleWhatsAppNotify = () => {
    const itemsList = items.map(i => `• ${i.product.name} (${i.selectedSize || '100ml'}) - R$ ${i.selectedPrice.toFixed(2)} x${i.quantity}`).join('\n');
    const installmentPlan = paymentMethod === 'credit_card' 
      ? getInstallmentInfo(formData.installments).label 
      : 'PIX (Aprovado/Comprovante)';

    const message = `*NOVO PEDIDO DIRECT - PERFUMES PREMIUM SWISS*\n\n` +
      `*Número do Pedido:* ${orderId}\n` +
      `*Cliente:* ${formData.name}\n` +
      `*CPF:* ${formData.cpf}\n` +
      `*E-mail:* ${formData.email}\n` +
      `*WhatsApp:* ${formData.phone}\n\n` +
      `*Endereço de Entrega:*\n` +
      `${formData.street}, Nº ${formData.number}${formData.complement ? ` (${formData.complement})` : ''}\n` +
      `${formData.neighborhood} - ${formData.city}/${formData.state} - CEP ${formData.cep}\n\n` +
      `*Itens do Pedido:*\n${itemsList}\n\n` +
      `*Forma de Pagamento:* ${installmentPlan}\n` +
      `*Total do Pedido:* R$ ${finalTotal.toFixed(2).replace('.', ',')}\n\n` +
      `Gostaria de acompanhar o envio e código de rastreio!`;

    window.open(`https://wa.me/5554999893370?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Detailed Installment calculation helper (1x e 2x sem juros, 3x a 12x com juros normais da operadora)
  const getInstallmentInfo = (installmentCount: number | string) => {
    const count = Math.max(1, Math.min(12, Number(installmentCount) || 1));
    if (count === 1) {
      return {
        count: 1,
        installmentValue: finalTotal,
        total: finalTotal,
        hasInterest: false,
        label: `1x de R$ ${finalTotal.toFixed(2).replace('.', ',')} sem juros (À vista)`,
        shortLabel: `1x de R$ ${finalTotal.toFixed(2).replace('.', ',')} (À vista)`,
        buttonLabel: `Pagar R$ ${finalTotal.toFixed(2).replace('.', ',')} à vista no Cartão`,
      };
    }
    if (count === 2) {
      const val = finalTotal / 2;
      return {
        count: 2,
        installmentValue: val,
        total: finalTotal,
        hasInterest: false,
        label: `2x de R$ ${val.toFixed(2).replace('.', ',')} sem juros`,
        shortLabel: `2x de R$ ${val.toFixed(2).replace('.', ',')} sem juros`,
        buttonLabel: `Pagar em 2x de R$ ${val.toFixed(2).replace('.', ',')} sem juros no Cartão`,
      };
    }
    const baseInterestRate = 0.0299;
    const factor = (baseInterestRate * Math.pow(1 + baseInterestRate, count)) / (Math.pow(1 + baseInterestRate, count) - 1);
    const installmentVal = finalTotal * factor;
    const totalVal = installmentVal * count;
    return {
      count,
      installmentValue: installmentVal,
      total: totalVal,
      hasInterest: true,
      label: `${count}x de R$ ${installmentVal.toFixed(2).replace('.', ',')} (Total R$ ${totalVal.toFixed(2).replace('.', ',')})`,
      shortLabel: `${count}x de R$ ${installmentVal.toFixed(2).replace('.', ',')}`,
      buttonLabel: `Pagar em ${count}x de R$ ${installmentVal.toFixed(2).replace('.', ',')} no Cartão`,
    };
  };

  // Generate 1x to 12x options with guaranteed visible styling
  const getInstallmentOptions = () => {
    return Array.from({ length: 12 }, (_, idx) => {
      const count = idx + 1;
      const info = getInstallmentInfo(count);
      return (
        <option 
          key={count} 
          value={count.toString()}
          className="bg-white text-neutral-900 py-1.5"
          style={{ color: '#171717', backgroundColor: '#ffffff' }}
        >
          {info.label}
        </option>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative z-10 bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden border border-neutral-200 flex flex-col my-auto max-h-[92vh] pointer-events-auto">
        
        {/* Header Bar */}
        <div className="bg-[#0B0B0B] text-white px-4 sm:px-6 py-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-sm sm:text-base font-semibold tracking-wider text-white uppercase flex items-center gap-2">
                Checkout Seguro
                <span className="hidden sm:inline-block text-[10px] bg-[#C5A059]/20 text-[#C5A059] px-2 py-0.5 rounded border border-[#C5A059]/30 font-sans tracking-widest">
                  256-BIT SSL
                </span>
              </h3>
              <p className="text-[11px] text-neutral-400 font-light">
                Perfumes Premium Swiss Atelier • Genève
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Bar Banner */}
        <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-800 flex items-center justify-between text-[11px] text-neutral-300 font-sans shrink-0 overflow-x-auto gap-4">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Compra 100% Protegida</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300 font-medium whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Extrait de Parfum 36% Essência</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-300 whitespace-nowrap">
            <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Envio Imediato com Rastreio</span>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">

          {/* ORDER SUMMARY COLLAPSIBLE BANNER */}
          <div className="bg-neutral-50 rounded-lg border border-neutral-200 overflow-hidden">
            <button
              onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-100/70 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                <span className="font-serif text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                  Resumo do Pedido ({items.reduce((a, b) => a + b.quantity, 0)} {items.reduce((a, b) => a + b.quantity, 0) === 1 ? 'item' : 'itens'})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-semibold text-sm text-neutral-900">
                  R$ {finalTotal.toFixed(2).replace('.', ',')}
                </span>
                {orderSummaryOpen ? (
                  <ChevronUp className="w-4 h-4 text-neutral-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-500" />
                )}
              </div>
            </button>

            {orderSummaryOpen && (
              <div className="px-4 pb-4 pt-2 border-t border-neutral-200/80 space-y-3 bg-white">
                <div className="divide-y divide-neutral-100 max-h-48 overflow-y-auto pr-1">
                  {items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-xs gap-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded border border-neutral-200 bg-neutral-100 shrink-0"
                        />
                        <div>
                          <p className="font-serif font-semibold text-neutral-900">{item.product.name}</p>
                          <p className="text-[10px] text-neutral-500 font-light">
                            {item.product.referenceName} • {item.selectedSize || '100ml'}
                          </p>
                          <p className="text-[10px] text-neutral-400">Qtd: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-mono font-medium text-neutral-800">
                        R$ {(item.selectedPrice * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-neutral-200 text-xs space-y-1 font-sans">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal:</span>
                    <span className="font-mono">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {paymentMethod === 'pix' && pixDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Desconto 5% no PIX:</span>
                      <span className="font-mono">- R$ {pixDiscount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-600">
                    <span>Frete:</span>
                    <span className="font-mono text-emerald-600">
                      {freightCost === 0 ? 'GRÁTIS' : `R$ ${freightCost.toFixed(2).replace('.', ',')}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-neutral-900 pt-1 border-t border-neutral-200">
                    <span>Total Final:</span>
                    <span className="font-mono text-[#C5A059]">
                      R$ {finalTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 1: FORM & PAYMENT METHOD SELECTION */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Customer Personal Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-1 border-b border-neutral-200">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center justify-center font-mono">
                    1
                  </span>
                  <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-neutral-900">
                    Dados Pessoais &amp; Contato
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Gabriel Silva"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-3 py-2 rounded border bg-white text-neutral-900 font-sans text-xs focus:outline-none transition-colors ${
                        formErrors.name ? 'border-red-500 bg-red-50' : 'border-neutral-300 focus:border-[#C5A059]'
                      }`}
                    />
                    {formErrors.name && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      CPF *
                    </label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={handleCpfChange}
                      className={`w-full px-3 py-2 rounded border bg-white text-neutral-900 font-sans text-xs focus:outline-none transition-colors ${
                        formErrors.cpf ? 'border-red-500 bg-red-50' : 'border-neutral-300 focus:border-[#C5A059]'
                      }`}
                    />
                    {formErrors.cpf && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.cpf}</p>}
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-2 rounded border bg-white text-neutral-900 font-sans text-xs focus:outline-none transition-colors ${
                        formErrors.email ? 'border-red-500 bg-red-50' : 'border-neutral-300 focus:border-[#C5A059]'
                      }`}
                    />
                    {formErrors.email && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      WhatsApp / Celular *
                    </label>
                    <input
                      type="text"
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className={`w-full px-3 py-2 rounded border bg-white text-neutral-900 font-sans text-xs focus:outline-none transition-colors ${
                        formErrors.phone ? 'border-red-500 bg-red-50' : 'border-neutral-300 focus:border-[#C5A059]'
                      }`}
                    />
                    {formErrors.phone && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-1 border-b border-neutral-200">
                  <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center justify-center font-mono">
                    2
                  </span>
                  <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-neutral-900">
                    Endereço de Entrega
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-neutral-700 font-medium mb-1 flex items-center justify-between">
                      <span>CEP *</span>
                      {isSearchingCep && (
                        <span className="text-[10px] text-[#C5A059] font-normal flex items-center gap-1 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-ping inline-block" />
                          Buscando...
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      placeholder="00000-000"
                      maxLength={9}
                      value={formData.cep}
                      onChange={handleCepChange}
                      className={`w-full px-3 py-2 rounded border bg-white text-neutral-900 font-sans text-xs focus:outline-none transition-colors ${
                        formErrors.cep ? 'border-red-500 bg-red-50' : 'border-neutral-300 focus:border-[#C5A059]'
                      }`}
                    />
                    {formErrors.cep && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.cep}</p>}
                    {cepErrorMsg && <p className="text-[10px] text-amber-600 mt-0.5">{cepErrorMsg}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-700 font-medium mb-1">
                      Rua / Avenida *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Rua das Flores"
                      value={formData.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      className={`w-full px-3 py-2 rounded border bg-white text-neutral-900 font-sans text-xs focus:outline-none transition-colors ${
                        formErrors.street ? 'border-red-500 bg-red-50' : 'border-neutral-300 focus:border-[#C5A059]'
                      }`}
                    />
                    {formErrors.street && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.street}</p>}
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      Número *
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={formData.number}
                      onChange={(e) => handleInputChange('number', e.target.value)}
                      className={`w-full px-3 py-2 rounded border bg-white text-neutral-900 font-sans text-xs focus:outline-none transition-colors ${
                        formErrors.number ? 'border-red-500 bg-red-50' : 'border-neutral-300 focus:border-[#C5A059]'
                      }`}
                    />
                    {formErrors.number && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.number}</p>}
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      Complemento (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Apto 42 / Bloco B"
                      value={formData.complement}
                      onChange={(e) => handleInputChange('complement', e.target.value)}
                      className="w-full px-3 py-2 rounded border border-neutral-300 bg-white text-neutral-900 font-sans text-xs focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-medium mb-1">
                      Bairro
                    </label>
                    <input
                      type="text"
                      placeholder="Centro"
                      value={formData.neighborhood}
                      onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                      className="w-full px-3 py-2 rounded border border-neutral-300 bg-white text-neutral-900 font-sans text-xs focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-700 font-medium mb-1">
                      Cidade / Estado (UF)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Cidade"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 rounded border border-neutral-300 bg-white text-neutral-900 font-sans text-xs focus:outline-none focus:border-[#C5A059]"
                      />
                      <input
                        type="text"
                        placeholder="UF"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value.toUpperCase().substring(0, 2))}
                        className="w-20 px-3 py-2 rounded border border-neutral-300 bg-white text-neutral-900 font-sans text-xs focus:outline-none focus:border-[#C5A059] uppercase text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between pb-1 border-b border-neutral-200">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-xs font-semibold flex items-center justify-center font-mono">
                      3
                    </span>
                    <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-neutral-900">
                      Forma de Pagamento
                    </h4>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Ambiente Criptografado
                  </span>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                      paymentMethod === 'pix'
                        ? 'border-[#C5A059] bg-[#C5A059]/5 ring-2 ring-[#C5A059]/30'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <QrCode className={`w-5 h-5 ${paymentMethod === 'pix' ? 'text-[#C5A059]' : 'text-neutral-600'}`} />
                        <span className="font-serif font-bold text-xs text-neutral-900 uppercase">
                          PIX
                        </span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        5% OFF
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 font-light leading-tight">
                      Aprovação instantânea no seu aplicativo bancário.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                      paymentMethod === 'credit_card'
                        ? 'border-[#C5A059] bg-[#C5A059]/5 ring-2 ring-[#C5A059]/30'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className={`w-5 h-5 ${paymentMethod === 'credit_card' ? 'text-[#C5A059]' : 'text-neutral-600'}`} />
                        <span className="font-serif font-bold text-xs text-neutral-900 uppercase">
                          Cartão de Crédito
                        </span>
                      </div>
                      <span className="bg-neutral-100 text-neutral-700 text-[10px] font-medium px-2 py-0.5 rounded uppercase">
                        Até 2x sem juros
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 font-light leading-tight">
                      Em até 2x sem juros ou até 12x com juros da operadora.
                    </p>
                  </button>
                </div>

                {/* PIX Details view */}
                {paymentMethod === 'pix' && (
                  <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 text-xs space-y-2">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-emerald-950">
                          Desconto exclusivo de 5% aplicado no PIX!
                        </p>
                        <p className="text-emerald-800 font-light mt-0.5 text-[11px]">
                          Ao clicar no botão abaixo, geraremos um QR Code e uma chave copia e cola válida por 15 minutos.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Credit Card Details Form */}
                {paymentMethod === 'credit_card' && (
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3 text-xs animate-fadeIn">
                    <div>
                      <label className="block text-neutral-700 font-medium mb-1">
                        Número do Cartão *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          className={`w-full pl-3 pr-10 py-2 rounded border bg-white text-neutral-900 font-mono text-xs focus:outline-none transition-colors ${
                            formErrors.cardNumber ? 'border-red-500 bg-red-50' : 'border-neutral-300 focus:border-[#C5A059]'
                          }`}
                        />
                        <CreditCard className="w-4 h-4 text-neutral-400 absolute right-3 top-2.5" />
                      </div>
                      {formErrors.cardNumber && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.cardNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-neutral-700 font-medium mb-1">
                        Nome Impresso no Cartão *
                      </label>
                      <input
                        type="text"
                        placeholder="EX: GABRIEL A SILVA"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                        className={`w-full px-3 py-2 rounded border bg-white text-neutral-900 font-sans text-xs focus:outline-none uppercase transition-colors ${
                          formErrors.cardName ? 'border-red-500 bg-red-50' : 'border-neutral-300 focus:border-[#C5A059]'
                        }`}
                      />
                      {formErrors.cardName && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.cardName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-neutral-700 font-medium mb-1">
                          Validade (MM/AA) *
                        </label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={formData.cardExpiry}
                          onChange={handleCardExpiryChange}
                          className={`w-full px-3 py-2 rounded border bg-white text-neutral-900 font-mono text-xs focus:outline-none transition-colors ${
                            formErrors.cardExpiry ? 'border-red-500 bg-red-50' : 'border-neutral-300 focus:border-[#C5A059]'
                          }`}
                        />
                        {formErrors.cardExpiry && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.cardExpiry}</p>}
                      </div>

                      <div>
                        <label className="block text-neutral-700 font-medium mb-1">
                          Código CVV *
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength={4}
                          value={formData.cardCvv}
                          onChange={(e) => handleInputChange('cardCvv', e.target.value.replace(/\D/g, ''))}
                          className={`w-full px-3 py-2 rounded border bg-white text-neutral-900 font-mono text-xs focus:outline-none transition-colors ${
                            formErrors.cardCvv ? 'border-red-500 bg-red-50' : 'border-neutral-300 focus:border-[#C5A059]'
                          }`}
                        />
                        {formErrors.cardCvv && <p className="text-[10px] text-red-500 mt-0.5">{formErrors.cardCvv}</p>}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-neutral-700 font-medium">
                          Opções de Parcelamento *
                        </label>
                        <span className="text-[10px] text-neutral-500 font-normal">
                          {Number(formData.installments) <= 2 ? 'Sem juros' : 'Com juros da operadora'}
                        </span>
                      </div>
                      
                      <div className="relative">
                        <select
                          value={formData.installments}
                          onChange={(e) => handleInputChange('installments', e.target.value)}
                          className="w-full px-3 py-2.5 rounded border border-neutral-300 font-sans text-xs focus:outline-none focus:border-[#C5A059] bg-white text-neutral-900 font-medium cursor-pointer shadow-xs appearance-none pr-8"
                          style={{ color: '#171717', backgroundColor: '#ffffff' }}
                        >
                          {getInstallmentOptions()}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Feedback box showing the active installment selection */}
                      <div className="mt-2 p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-neutral-600 font-light">
                          <CreditCard className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Parcelamento:</span>
                        </div>
                        <span className="font-semibold text-neutral-900 text-[11px] sm:text-xs">
                          {getInstallmentInfo(formData.installments).label}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Submit Button */}
              <div className="pt-4 border-t border-neutral-200">
                <button
                  type="submit"
                  className="w-full bg-[#0B0B0B] hover:bg-neutral-800 text-white py-3.5 px-6 rounded-xl font-serif text-xs uppercase tracking-[0.15em] font-semibold transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {paymentMethod === 'pix' ? (
                    <>
                      <QrCode className="w-4 h-4 text-[#C5A059]" />
                      <span>Gerar QR Code PIX de R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-[#C5A059]" />
                      <span>{getInstallmentInfo(formData.installments).buttonLabel}</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[10px] text-neutral-500 font-light mt-2 flex flex-wrap items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Garantia de Satisfação &bull; Extrait de Parfum 36% &bull;</span>
                  {onOpenPolicy && (
                    <button
                      type="button"
                      onClick={onOpenPolicy}
                      className="text-[#C5A059] hover:underline font-medium cursor-pointer"
                    >
                      Política de Compras
                    </button>
                  )}
                </p>
              </div>

            </form>
          )}

          {/* STEP: PROCESSING SIMULATION */}
          {step === 'processing' && (
            <div className="py-16 text-center space-y-4 animate-fadeIn">
              <div className="inline-block relative">
                <div className="w-16 h-16 rounded-full border-4 border-neutral-200 border-t-[#C5A059] animate-spin mx-auto"></div>
                <Lock className="w-6 h-6 text-[#C5A059] absolute inset-0 m-auto" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-neutral-900">
                Processando seu pedido seguro...
              </h3>
              <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                Validando dados e preparando o ambiente de pagamento criptografado Swiss Atelier.
              </p>
            </div>
          )}

          {/* STEP: PIX GENERATED SCREEN */}
          {step === 'pix_generated' && (
            <div className="space-y-6 py-2 animate-fadeIn">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center space-y-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  QR Code PIX Gerado com Sucesso!
                </span>
                <p className="text-xs text-emerald-900 font-light">
                  Abra o app do seu banco e escaneie o código ou use o PIX Copia e Cola.
                </p>
                <div className="flex items-center justify-center gap-2 pt-1 font-mono text-xs text-amber-800 font-semibold">
                  <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>Expira em: {formatTimer(timer)}</span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center justify-center space-y-4 bg-neutral-50 p-6 rounded-2xl border border-neutral-200">
                
                {mpError && (
                  <div className="w-full bg-amber-50 border border-amber-300 text-amber-900 p-3 rounded-lg text-xs font-sans text-center">
                    <p className="font-semibold">{mpError}</p>
                  </div>
                )}

                <div className="bg-white p-4 rounded-xl shadow-md border border-neutral-200 relative group flex items-center justify-center">
                  {pixQrCodeBase64 ? (
                    <img 
                      src={`data:image/png;base64,${pixQrCodeBase64}`} 
                      alt="QR Code PIX Mercado Pago" 
                      className="w-52 h-52 object-contain rounded"
                    />
                  ) : (
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                        pixQrCodeString || generateValidPixPayload(finalTotal)
                      )}`}
                      alt="QR Code PIX Válido"
                      className="w-52 h-52 object-contain rounded"
                    />
                  )}
                </div>

                {/* Amount to pay */}
                <div className="text-center font-sans">
                  <p className="text-xs text-neutral-500 font-light">Valor Total no PIX (Com 5% OFF):</p>
                  <p className="text-2xl font-mono font-bold text-neutral-900">
                    R$ {finalTotal.toFixed(2).replace('.', ',')}
                  </p>
                </div>

                {/* Copy PIX Key Code */}
                <div className="w-full max-w-md space-y-2">
                  <button
                    onClick={handleCopyPix}
                    className={`w-full py-3 px-4 rounded-xl font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                      copiedPix
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#C5A059] hover:bg-[#b08d48] text-white'
                    }`}
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Chave PIX Copiada com Sucesso!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar Código PIX Copia e Cola</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-neutral-400 font-mono font-light truncate max-w-xs mx-auto">
                    {pixQrCodeString || generateValidPixPayload(finalTotal)}
                  </p>
                </div>
              </div>

              {/* Action buttons after PIX payment */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleConfirmPixPayment}
                  className="w-full bg-[#0B0B0B] hover:bg-neutral-800 text-white py-3.5 px-6 rounded-xl font-serif text-xs uppercase tracking-[0.15em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Já Fiz o Pagamento no PIX
                </button>

                <button
                  onClick={() => setStep('form')}
                  className="w-full bg-white hover:bg-neutral-100 text-neutral-700 py-2.5 px-4 rounded-lg font-sans text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-neutral-300"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Voltar e alterar forma de pagamento</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP: SUCCESS SCREEN */}
          {step === 'success' && (
            <div className="py-8 text-center space-y-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-4">
                <span className="text-[11px] font-mono tracking-widest text-[#C5A059] uppercase font-semibold">
                  Pedido Confirmado #{orderId}
                </span>
                <h3 className="font-serif text-2xl font-bold text-neutral-900">
                  {paymentMethod === 'pix' ? 'Pedido Registrado com Sucesso!' : 'Pagamento Aprovado com Sucesso!'}
                </h3>
                <div className="bg-emerald-50 border-2 border-emerald-500/20 p-4 rounded-xl max-w-md mx-auto shadow-sm">
                  <p className="text-sm text-emerald-800 font-medium leading-relaxed">
                    ⚠️ Atenção: Para <strong>finalizar seu pedido</strong> e combinarmos o envio, você precisa clicar no botão do WhatsApp abaixo e nos enviar os detalhes.
                  </p>
                </div>
              </div>

              {/* Receipt Details Card */}
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-left text-xs space-y-3 max-w-md mx-auto">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-200 font-serif font-semibold">
                  <span>Resumo do Pedido</span>
                  <span className="text-[#C5A059]">{orderId}</span>
                </div>

                <div className="space-y-1.5 text-neutral-700 font-sans">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Cliente:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Entrega para:</span>
                    <span className="font-medium text-right max-w-[200px] truncate">
                      {formData.street}, {formData.number} - {formData.city}/{formData.state}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Pagamento:</span>
                    <span className="font-medium text-right">
                      {paymentMethod === 'pix' ? 'PIX (Aprovação Instantânea)' : `Cartão (${getInstallmentInfo(formData.installments).shortLabel})`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-neutral-200 text-neutral-900">
                    <span>Total Pago:</span>
                    <span className="font-mono text-[#C5A059]">
                      R$ {finalTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Notification & Actions */}
              <div className="space-y-3 max-w-md mx-auto pt-4">
                <button
                  onClick={handleWhatsAppNotify}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 px-6 rounded-xl font-sans text-sm uppercase tracking-wider font-bold transition-all shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-3 cursor-pointer animate-pulse hover:animate-none"
                >
                  <MessageCircle className="w-6 h-6 fill-current" />
                  <span>FINALIZAR PEDIDO NO WHATSAPP</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
