import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, MessageCircle, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { handleImageError } from '../utils/imageHelper';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
}) => {
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + (item.selectedPrice || item.product.price) * item.quantity,
    0
  );
  const freeShippingThreshold = 250.0;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const formattedItems = items
    .map((item, index) => {
      const itemTotal = (item.selectedPrice || item.product.price) * item.quantity;
      return `${index + 1}. ${item.product.name}\n  • Quantidade: ${item.quantity}x\n  • Volumetria: ${item.selectedSize || '100ml'} (Extrait de Parfum - 36% Essência)\n  • Referência Olfativa: ${item.product.referenceName}\n  • Valor Unitário: R$ ${(item.selectedPrice || item.product.price).toFixed(2).replace('.', ',')}\n  • Subtotal: R$ ${itemTotal.toFixed(2).replace('.', ',')}`;
    })
    .join('\n\n');

  const isFreeShipping = subtotal >= freeShippingThreshold;

  const rawWhatsappText = `PERFUMES PREMIUM SWISS ATELIER
Atendimento Executivo & Finalização de Pedido

Olá! Gostaria de finalizar o meu pedido de alta perfumaria:

RESUMO DO PEDIDO:
----------------------------------------
${formattedItems}

----------------------------------------
VALOR TOTAL DOS PRODUTOS: R$ ${subtotal.toFixed(2).replace('.', ',')}
FRETE: ${isFreeShipping ? 'GRÁTIS para todo o Brasil' : 'A calcular no atendimento'}

DADOS PARA ENVIO:
• Nome Completo:
• CPF:
• Endereço com Número:
• Bairro / Complemento:
• CEP / Cidade / UF:
• Forma de Pagamento (Pix / Cartão):

Aguardando confirmação do consultor executivo para envio imediato!`;

  const fullWhatsappUrl = `https://wa.me/5554999893370?text=${encodeURIComponent(rawWhatsappText)}`;

  const handleSimulatedCheckout = () => {
    onClose();
    onOpenCheckout();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex w-full sm:w-auto">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="w-full sm:w-[460px] max-w-full bg-white text-neutral-900 shadow-2xl flex flex-col justify-between h-[100dvh]"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-[#0B0B0B] text-white flex items-center justify-between border-b border-neutral-800 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <ShoppingBag className="w-5 h-5 text-[#C5A059] shrink-0" />
                <h2 className="font-serif text-sm sm:text-base tracking-wider uppercase font-semibold text-white">
                  Sua Sacola ({items.reduce((a, b) => a + b.quantity, 0)})
                </h2>
              </div>
              <button 
                onClick={onClose} 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A059] hover:bg-[#D4B06A] text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-md shrink-0"
                title="Fechar Sacola"
                aria-label="Fechar Sacola"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
                <span>FECHAR</span>
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="bg-neutral-50 p-4 border-b border-neutral-200/70 text-xs shrink-0">
              {amountNeededForFreeShipping > 0 ? (
                <p className="text-neutral-700 font-light">
                  Faltam <strong className="font-semibold text-neutral-950">R$ {amountNeededForFreeShipping.toFixed(2)}</strong> para ganhar <strong className="text-emerald-700 font-semibold">FRETE GRÁTIS</strong>
                </p>
              ) : (
                <p className="text-emerald-800 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Parabéns! Você ganhou FRETE GRÁTIS para todo o Brasil.</span>
                </p>
              )}
              <div className="w-full bg-neutral-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#C5A059] h-full transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3.5">
              {isCheckoutSuccess ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-neutral-900">
                    Pedido Enviado com Sucesso!
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                    Nosso consultor executivo entrará em contato em instantes para confirmar o envio com frete grátis e o código de rastreamento.
                  </p>
                  <button
                    onClick={() => {
                      setIsCheckoutSuccess(false);
                      onClose();
                    }}
                    className="mt-4 px-6 py-3 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider"
                  >
                    Voltar ao Site
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="py-20 text-center space-y-4 text-neutral-500 font-light">
                  <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto stroke-1" />
                  <p className="text-sm">Sua sacola está vazia no momento.</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-[#0B0B0B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A059] transition-all"
                  >
                    Escolher Perfumes
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const unitPrice = item.selectedPrice || item.product.price;
                  const itemKey = `${item.product.id}-${item.selectedSize || '100ml'}`;
                  return (
                    <div
                      key={itemKey}
                      className="p-3.5 sm:p-4 border border-neutral-200 bg-white rounded-lg flex items-center gap-3.5 sm:gap-4 shadow-xs"
                    >
                      <div className="w-20 h-24 sm:w-22 sm:h-26 bg-neutral-900 rounded-md overflow-hidden p-1 shrink-0 flex items-center justify-center border border-[#C5A059]/30">
                        <img 
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain drop-shadow-md"
                          onError={(e) => handleImageError(e, item.product.image)}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider truncate">
                            {item.product.referenceName}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-neutral-100 text-neutral-800 font-bold rounded-xs shrink-0">
                            {item.selectedSize || '100ml'}
                          </span>
                        </div>
                        <h4 className="font-serif text-base font-bold text-neutral-950 leading-tight mt-1 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-neutral-600 font-medium mt-0.5">
                          R$ {unitPrice.toFixed(2)} un. <span className="text-neutral-400 font-normal">• 36% Essência</span>
                        </p>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100">
                          {/* Quantity controller */}
                          <div className="flex items-center border border-neutral-300 rounded-sm overflow-hidden bg-neutral-50">
                            <button
                              onClick={() => onUpdateQuantity(itemKey, item.quantity - 1)}
                              className="p-1.5 text-neutral-700 hover:bg-neutral-200 cursor-pointer transition-colors"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-bold text-neutral-900">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(itemKey, item.quantity + 1)}
                              className="p-1.5 text-neutral-700 hover:bg-neutral-200 cursor-pointer transition-colors"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-serif font-bold text-neutral-950">
                              R$ {(unitPrice * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => onRemoveItem(itemKey)}
                              className="text-neutral-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-sm cursor-pointer"
                              title="Remover Item"
                              aria-label="Remover item da sacola"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && !isCheckoutSuccess && (
              <div className="p-6 bg-neutral-50 border-t border-neutral-200 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-neutral-600 font-light">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600 font-light">
                    <span>Frete</span>
                    <span className={subtotal >= freeShippingThreshold ? 'text-emerald-700 font-semibold' : ''}>
                      {subtotal >= freeShippingThreshold ? 'GRÁTIS' : 'Calculado no checkout'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-serif font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                    <span>Total Estimado</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={fullWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setIsCheckoutSuccess(true);
                      onClearCart();
                    }}
                    className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white transition-all text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm rounded-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Finalizar Pedido via WhatsApp</span>
                  </a>

                  <button
                    onClick={handleSimulatedCheckout}
                    className="w-full py-3.5 bg-neutral-950 hover:bg-[#C5A059] text-white transition-all text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer rounded-xs"
                  >
                    <span>Finalizar Compra Direta (Pix / Cartão)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full py-2.5 bg-neutral-200/80 hover:bg-neutral-300 text-neutral-800 transition-all text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer rounded-xs border border-neutral-300"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Continuar Comprando</span>
                  </button>
                </div>

                <p className="text-[10px] text-center text-neutral-400 uppercase tracking-widest flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Garantia de Satisfação e Envio Seguro</span>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
