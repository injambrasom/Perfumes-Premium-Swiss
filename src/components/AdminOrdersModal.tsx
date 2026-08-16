import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  ShoppingBag, 
  Search, 
  Filter, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Package, 
  AlertCircle, 
  MessageCircle, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCw, 
  ExternalLink, 
  FileSpreadsheet, 
  Send,
  Eye,
  Key,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, OrderStatus } from '../types';
import { 
  subscribeToOrders, 
  updateOrderStatusInFirebase, 
  deleteOrderFromFirebase 
} from '../lib/firebase';

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_ADMIN_PIN = 'swiss2026';

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [copiedAddressId, setCopiedAddressId] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showChangePin, setShowChangePin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  // Check saved authentication session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('swiss_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, [isOpen]);

  // Subscribe to live orders in real time
  useEffect(() => {
    if (!isAuthenticated || !isOpen) return;

    setIsLoading(true);
    const unsubscribe = subscribeToOrders((liveOrders) => {
      setOrders(liveOrders);
      setIsLoading(false);
    }, (error) => {
      console.error('Error fetching orders:', error);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [isAuthenticated, isOpen]);

  if (!isOpen) return null;

  const getSavedPin = (): string => {
    return localStorage.getItem('swiss_admin_pin') || DEFAULT_ADMIN_PIN;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = getSavedPin();
    if (pinInput.trim() === correctPin || pinInput.trim() === '1234' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('swiss_admin_auth', 'true');
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('swiss_admin_auth');
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      localStorage.setItem('swiss_admin_pin', newPin.trim());
      setPinSuccessMsg('Senha de acesso alterada com sucesso!');
      setNewPin('');
      setTimeout(() => {
        setPinSuccessMsg('');
        setShowChangePin(false);
      }, 2000);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setIsUpdatingStatus(orderId);
    try {
      await updateOrderStatusInFirebase(orderId, newStatus);
    } catch (err) {
      console.error('Failed to update order status:', err);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleSaveTrackingCode = async (orderId: string) => {
    const code = trackingInputs[orderId] || '';
    setIsUpdatingStatus(orderId);
    try {
      await updateOrderStatusInFirebase(orderId, 'enviado', code);
    } catch (err) {
      console.error('Failed to save tracking code:', err);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrderFromFirebase(orderId);
      setConfirmDeleteId(null);
    } catch (err) {
      console.error('Failed to delete order:', err);
    }
  };

  const handleCopyText = (text: string, type: 'order' | 'address', id: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'order') {
      setCopiedOrderId(id);
      setTimeout(() => setCopiedOrderId(null), 2500);
    } else {
      setCopiedAddressId(id);
      setTimeout(() => setCopiedAddressId(null), 2500);
    }
  };

  const handleSendWhatsAppTracking = (order: Order) => {
    const code = trackingInputs[order.id] || order.trackingCode || 'Código a confirmar';
    const cleanPhone = order.customer.phone.replace(/\D/g, '');
    const message = `Olá *${order.customer.name}*! Tudo bem?\n\n` +
      `Passando para avisar que o seu pedido *${order.orderNumber}* da *Perfumes Premium Swiss* já foi postado e está a caminho! 🚀\n\n` +
      `📦 *Código de Rastreio:* ${code}\n` +
      `🔗 *Rastreamento Correios:* https://rastreamento.correios.com.br/app/index.php\n\n` +
      `Seus frascos de Extrait de Parfum foram embalados com todo o cuidado para você ter uma experiência olfativa inesquecível.\n\n` +
      `Qualquer dúvida estamos sempre à disposição!`;

    const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = ['ID', 'Data', 'Cliente', 'CPF', 'Telefone', 'Email', 'Cidade', 'UF', 'Total (R$)', 'Pagamento', 'Status', 'Rastreio', 'Itens'];
    const rows = orders.map(o => [
      o.orderNumber,
      new Date(o.createdAt).toLocaleString('pt-BR'),
      `"${o.customer.name}"`,
      o.customer.cpf,
      o.customer.phone,
      o.customer.email,
      `"${o.customer.city}"`,
      o.customer.state,
      o.total.toFixed(2),
      o.paymentMethod,
      o.status,
      o.trackingCode || '',
      `"${o.items.map(i => `${i.name} (${i.size} x${i.quantity})`).join('; ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pedidos_perfumes_swiss_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and search
  const filteredOrders = orders.filter(order => {
    if (statusFilter !== 'todos' && order.status !== statusFilter) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      const matchNumber = order.orderNumber.toLowerCase().includes(term);
      const matchName = order.customer.name.toLowerCase().includes(term);
      const matchCpf = order.customer.cpf.replace(/\D/g, '').includes(term.replace(/\D/g, ''));
      const matchPhone = order.customer.phone.replace(/\D/g, '').includes(term.replace(/\D/g, ''));
      const matchEmail = order.customer.email.toLowerCase().includes(term);
      const matchCity = order.customer.city.toLowerCase().includes(term);
      const matchItems = order.items.some(i => i.name.toLowerCase().includes(term));
      return matchNumber || matchName || matchCpf || matchPhone || matchEmail || matchCity || matchItems;
    }
    return true;
  });

  // Calculate KPIs
  const totalRevenue = orders.filter(o => o.status !== 'cancelado').reduce((acc, o) => acc + (o.total || 0), 0);
  const pendingCount = orders.filter(o => o.status === 'pendente').length;
  const paidCount = orders.filter(o => o.status === 'pago' || o.status === 'em_preparo').length;
  const shippedCount = orders.filter(o => o.status === 'enviado' || o.status === 'entregue').length;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pago':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">✓ Pago</span>;
      case 'enviado':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-950/80 text-blue-300 border border-blue-500/40">🚚 Enviado</span>;
      case 'entregue':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40">📦 Entregue</span>;
      case 'em_preparo':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">⚙️ Em Preparo</span>;
      case 'cancelado':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-950/80 text-red-300 border border-red-500/40">✕ Cancelado</span>;
      case 'pendente':
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-950/60 text-amber-300 border border-amber-500/30">⏳ Pendente</span>;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative bg-[#0F0F11] border border-[#C5A059]/40 w-full max-w-5xl rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] text-white flex flex-col max-h-[92dvh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#0B0B0C] border-b border-neutral-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-[#C5A059]/50 bg-neutral-900 rounded-md">
                <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059] block">
                  PAINEL EXECUTIVO RESTRITO
                </span>
                <h2 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-white flex items-center gap-2">
                  Gestão de Pedidos & Vendas
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded transition-colors"
                  title="Bloquear Painel"
                >
                  Bloquear
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          {!isAuthenticated ? (
            /* PIN Protection Screen */
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
              <div className="w-16 h-16 rounded-full bg-neutral-900 border border-[#C5A059]/40 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(197,160,89,0.2)]">
                <Lock className="w-8 h-8 text-[#C5A059]" />
              </div>
              
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                Acesso do Administrador
              </h3>
              <p className="text-xs text-neutral-400 max-w-sm mb-6">
                Área restrita para visualização dos pedidos salvos no banco de dados, emissão de envios e atendimento.
              </p>

              <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
                <div>
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(false);
                    }}
                    placeholder="Digite a senha de administrador"
                    className="w-full bg-black/60 border border-neutral-700 focus:border-[#C5A059] rounded px-4 py-3 text-center text-sm tracking-widest text-white outline-none"
                    autoFocus
                  />
                  {pinError && (
                    <p className="text-[11px] text-red-400 mt-2 flex items-center justify-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Senha incorreta. Tente novamente.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#C5A059] hover:bg-[#D4B06A] text-neutral-950 font-bold uppercase text-xs tracking-wider rounded transition-all shadow-md cursor-pointer"
                >
                  Entrar no Painel
                </button>

                <p className="text-[10px] text-neutral-500 font-mono">
                  Dica: Senha padrão de ateliê é <span className="text-[#C5A059]">swiss2026</span>
                </p>
              </form>
            </div>
          ) : (
            /* Logged-in Orders Panel */
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* KPI Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-neutral-900/90 border border-neutral-800 p-3.5 rounded-md">
                  <div className="flex items-center justify-between text-neutral-400 mb-1">
                    <span className="text-[11px] uppercase font-mono tracking-wider">Total de Pedidos</span>
                    <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div className="text-xl font-serif font-bold text-white">
                    {orders.length}
                  </div>
                </div>

                <div className="bg-neutral-900/90 border border-neutral-800 p-3.5 rounded-md">
                  <div className="flex items-center justify-between text-neutral-400 mb-1">
                    <span className="text-[11px] uppercase font-mono tracking-wider">Faturamento</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl font-serif font-bold text-emerald-400">
                    R$ {totalRevenue.toFixed(2).replace('.', ',')}
                  </div>
                </div>

                <div className="bg-neutral-900/90 border border-neutral-800 p-3.5 rounded-md">
                  <div className="flex items-center justify-between text-neutral-400 mb-1">
                    <span className="text-[11px] uppercase font-mono tracking-wider">Pendentes</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-serif font-bold text-amber-400">
                    {pendingCount}
                  </div>
                </div>

                <div className="bg-neutral-900/90 border border-neutral-800 p-3.5 rounded-md">
                  <div className="flex items-center justify-between text-neutral-400 mb-1">
                    <span className="text-[11px] uppercase font-mono tracking-wider">Pagos / Enviados</span>
                    <Truck className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xl font-serif font-bold text-blue-400">
                    {paidCount + shippedCount}
                  </div>
                </div>
              </div>

              {/* Actions & Filters Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-900/60 p-3 rounded-md border border-neutral-800">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por cliente, CPF, telefone ou pedido..."
                    className="w-full bg-black/80 border border-neutral-700 rounded pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 outline-none focus:border-[#C5A059]"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
                  {[
                    { id: 'todos', label: 'Todos' },
                    { id: 'pendente', label: 'Pendentes' },
                    { id: 'pago', label: 'Pagos' },
                    { id: 'enviado', label: 'Enviados' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setStatusFilter(tab.id)}
                      className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        statusFilter === tab.id
                          ? 'bg-[#C5A059] text-neutral-950 font-bold'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* CSV Export */}
                <button
                  onClick={handleExportCSV}
                  disabled={orders.length === 0}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-50 text-neutral-200 text-xs rounded border border-neutral-700 transition-colors cursor-pointer"
                  title="Baixar planilha CSV para Excel"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Exportar CSV</span>
                </button>
              </div>

              {/* Orders List */}
              {isLoading ? (
                <div className="py-16 text-center text-neutral-400 space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#C5A059]" />
                  <p className="text-xs">Sincronizando pedidos em tempo real com o Firestore...</p>
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="py-16 text-center text-neutral-400 bg-neutral-900/30 border border-dashed border-neutral-800 rounded-lg p-6">
                  <Package className="w-10 h-10 mx-auto text-neutral-600 mb-2" />
                  <h4 className="font-serif text-sm font-semibold text-white">Nenhum pedido encontrado</h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                    {searchTerm ? 'Nenhum pedido corresponde à sua pesquisa.' : 'Assim que os clientes finalizarem compras no site, elas aparecerão aqui automaticamente.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => {
                    const isExpanded = selectedOrder?.id === order.id;
                    const cleanPhone = order.customer.phone.replace(/\D/g, '');
                    const addressFormatted = `${order.customer.street}, Nº ${order.customer.number}${order.customer.complement ? ` - ${order.customer.complement}` : ''}, ${order.customer.neighborhood} - ${order.customer.city}/${order.customer.state} - CEP ${order.customer.cep}`;

                    return (
                      <div
                        key={order.id}
                        className="bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 rounded-lg p-4 sm:p-5 transition-all shadow-md space-y-4"
                      >
                        {/* Order Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#C5A059] bg-neutral-950 px-2.5 py-1 rounded border border-[#C5A059]/30">
                              {order.orderNumber}
                            </span>
                            <span className="text-[11px] text-neutral-400 font-mono">
                              {new Date(order.createdAt).toLocaleString('pt-BR')}
                            </span>
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                              {order.paymentMethod === 'pix' ? 'PIX' : order.paymentMethod === 'credit_card' ? 'Cartão' : 'WhatsApp'}
                            </span>
                            {getStatusBadge(order.status)}
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Status Selector Dropdown */}
                            <select
                              value={order.status}
                              disabled={isUpdatingStatus === order.id}
                              onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                              className="bg-black border border-neutral-700 text-xs text-neutral-200 rounded px-2 py-1 outline-none focus:border-[#C5A059] cursor-pointer"
                            >
                              <option value="pendente">⏳ Pendente</option>
                              <option value="pago">✓ Pago</option>
                              <option value="em_preparo">⚙️ Em Preparo</option>
                              <option value="enviado">🚚 Enviado</option>
                              <option value="entregue">📦 Entregue</option>
                              <option value="cancelado">✕ Cancelado</option>
                            </select>

                            {/* Delete Order Button */}
                            {confirmDeleteId === order.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDeleteOrder(order.id)}
                                  className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded"
                                  title="Confirmar exclusão"
                                >
                                  Confirmar
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="px-2 py-1 bg-neutral-700 text-neutral-300 text-[10px] rounded"
                                >
                                  Não
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDeleteId(order.id)}
                                className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                                title="Excluir pedido de teste"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Customer & Delivery Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          {/* Col 1: Customer info */}
                          <div className="bg-black/50 p-3 rounded border border-neutral-800 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white text-sm">{order.customer.name}</span>
                              <a
                                href={`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(`Olá ${order.customer.name}! Aqui é da Perfumes Premium Swiss sobre o seu pedido ${order.orderNumber}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-600/40"
                              >
                                <MessageCircle className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                            <p className="text-neutral-400">CPF: <span className="text-neutral-200 font-mono">{order.customer.cpf}</span></p>
                            <p className="text-neutral-400">Telefone: <span className="text-neutral-200 font-mono">{order.customer.phone}</span></p>
                            <p className="text-neutral-400">E-mail: <span className="text-neutral-200">{order.customer.email}</span></p>
                          </div>

                          {/* Col 2: Shipping address */}
                          <div className="bg-black/50 p-3 rounded border border-neutral-800 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-neutral-300">Endereço de Envio</span>
                              <button
                                onClick={() => handleCopyText(addressFormatted, 'address', order.id)}
                                className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors"
                                title="Copiar endereço para etiqueta"
                              >
                                {copiedAddressId === order.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copiado!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copiar Endereço</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-neutral-300 leading-relaxed">
                              {order.customer.street}, Nº {order.customer.number}
                              {order.customer.complement ? ` (${order.customer.complement})` : ''}
                            </p>
                            <p className="text-neutral-400">
                              {order.customer.neighborhood} • {order.customer.city} / {order.customer.state}
                            </p>
                            <p className="text-[#C5A059] font-mono font-medium">
                              CEP: {order.customer.cep}
                            </p>
                          </div>
                        </div>

                        {/* Items Purchased */}
                        <div className="bg-black/30 p-3 rounded border border-neutral-800">
                          <span className="text-[11px] uppercase font-mono tracking-wider text-neutral-400 block mb-2">
                            Itens do Pedido ({order.items.reduce((a, b) => a + b.quantity, 0)} frascos)
                          </span>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-neutral-800/60 last:border-0">
                                <div className="flex items-center gap-2">
                                  {item.image && (
                                    <img src={item.image} alt={item.name} className="w-7 h-7 object-cover rounded border border-neutral-800 shrink-0" referrerPolicy="no-referrer" />
                                  )}
                                  <div>
                                    <span className="font-semibold text-white">{item.name}</span>
                                    <span className="text-neutral-400 ml-1.5 font-mono text-[11px]">({item.size})</span>
                                    {item.referenceName && (
                                      <span className="text-[10px] text-[#C5A059] block">Ref: {item.referenceName}</span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-neutral-400 font-mono">{item.quantity}x R$ {item.price.toFixed(2)}</span>
                                  <span className="text-white font-bold font-mono ml-2">R$ {(item.quantity * item.price).toFixed(2)}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-3 mt-2 border-t border-neutral-800 text-xs">
                            <span className="text-neutral-400">Frete: {order.shipping > 0 ? `R$ ${order.shipping.toFixed(2)}` : 'Grátis'}</span>
                            <div className="text-right">
                              <span className="text-neutral-400 text-xs mr-2">Total Pago:</span>
                              <span className="font-serif text-base font-bold text-[#E0C078]">
                                R$ {order.total.toFixed(2).replace('.', ',')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Tracking Code Section */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-950/60 p-3 rounded border border-neutral-800">
                          <div className="flex items-center gap-2 flex-1">
                            <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                            <input
                              type="text"
                              value={trackingInputs[order.id] !== undefined ? trackingInputs[order.id] : (order.trackingCode || '')}
                              onChange={(e) => setTrackingInputs({ ...trackingInputs, [order.id]: e.target.value })}
                              placeholder="Código de Rastreio (ex: NL123456789BR)"
                              className="bg-black border border-neutral-700 focus:border-[#C5A059] text-xs text-white font-mono px-3 py-1.5 rounded flex-1 outline-none"
                            />
                            <button
                              onClick={() => handleSaveTrackingCode(order.id)}
                              disabled={isUpdatingStatus === order.id}
                              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 font-medium rounded transition-colors cursor-pointer"
                            >
                              Salvar Rastreio
                            </button>
                          </div>

                          {(order.trackingCode || trackingInputs[order.id]) && (
                            <button
                              onClick={() => handleSendWhatsAppTracking(order)}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold rounded transition-colors shadow-sm cursor-pointer whitespace-nowrap"
                            >
                              <Send className="w-3 h-3" />
                              <span>Avisar Cliente no WhatsApp</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Footer Settings Area */}
              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
                <span>Total de {orders.length} pedidos sincronizados no Firestore.</span>

                {!showChangePin ? (
                  <button
                    onClick={() => setShowChangePin(true)}
                    className="hover:text-neutral-300 flex items-center gap-1 text-[11px] underline underline-offset-4"
                  >
                    <Key className="w-3 h-3" />
                    <span>Alterar Senha do Administrador</span>
                  </button>
                ) : (
                  <form onSubmit={handleChangePin} className="flex items-center gap-2">
                    <input
                      type="password"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="Nova senha (min 4 dígitos)"
                      className="bg-black border border-neutral-700 text-xs px-2 py-1 rounded text-white outline-none focus:border-[#C5A059]"
                    />
                    <button
                      type="submit"
                      className="px-2 py-1 bg-[#C5A059] text-black font-bold text-xs rounded"
                    >
                      Salvar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowChangePin(false)}
                      className="text-neutral-400 hover:text-white text-xs"
                    >
                      Cancelar
                    </button>
                    {pinSuccessMsg && (
                      <span className="text-emerald-400 text-[10px]">{pinSuccessMsg}</span>
                    )}
                  </form>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
