import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, Plus, X, ShoppingBag, MessageCircle, Package, RefreshCw, Star, ShieldCheck, Gift } from 'lucide-react';
import { FragranceProduct, BottleSize } from '../types';
import { handleImageError } from '../utils/imageHelper';
import blackGoldMarbleBg from '../assets/images/black_gold_marble_bg_1786232675565.jpg';

interface TrioBundleBuilderProps {
  products: FragranceProduct[];
  onAddToCart: (product: FragranceProduct, quantity?: number, selectedSize?: BottleSize, selectedPrice?: number) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const TrioBundleBuilder: React.FC<TrioBundleBuilderProps> = ({
  products,
  onAddToCart,
  isModal = false,
  onClose
}) => {
  // Slots array holding up to 3 selected products (null if empty)
  const [selectedSlots, setSelectedSlots] = useState<(FragranceProduct | null)[]>([
    products.find(p => p.id === 'swiss-04-sauvage') || products[0] || null, // Default recommendation 1
    products.find(p => p.id === 'swiss-13-aliem') || products[1] || null,   // Default recommendation 2
    products.find(p => p.id === 'swiss-03-baccarat') || products[2] || null // Default recommendation 3
  ]);

  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedCount = selectedSlots.filter(Boolean).length;
  const isComplete = selectedCount === 3;

  const categories = ['Todos', 'Masculino', 'Feminino', 'Árabe', 'Nicho'];

  const filteredProducts = products.filter(product => {
    const matchCategory = filterCategory === 'Todos' || product.category === filterCategory || (filterCategory === 'Árabe' && product.badges?.some(b => b.toLowerCase().includes('árabe') || b.toLowerCase().includes('arabe')));
    const matchSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.referenceName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleSelectProduct = (product: FragranceProduct) => {
    let targetIndex = activeSlotIndex;

    // If no slot explicitly selected, find first empty slot or default to slot 0
    if (targetIndex === null) {
      const emptyIdx = selectedSlots.findIndex(s => s === null);
      targetIndex = emptyIdx !== -1 ? emptyIdx : 0;
    }

    const updated = [...selectedSlots];
    updated[targetIndex] = product;
    setSelectedSlots(updated);

    // Automatically advance active slot to next empty slot if available
    const nextEmpty = updated.findIndex((s, idx) => s === null && idx !== targetIndex);
    if (nextEmpty !== -1) {
      setActiveSlotIndex(nextEmpty);
    } else {
      setActiveSlotIndex(null);
    }
  };

  const handleRemoveSlot = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = [...selectedSlots];
    updated[index] = null;
    setSelectedSlots(updated);
    setActiveSlotIndex(index);
  };

  const handleAddTrioToCart = () => {
    if (!isComplete) return;

    const [p1, p2, p3] = selectedSlots as [FragranceProduct, FragranceProduct, FragranceProduct];
    
    // Create a special bundle representation
    const trioBundleProduct: FragranceProduct = {
      id: `trio-bundle-${Date.now()}`,
      name: 'Trio de Bolso Ateliê (3x 15ml)',
      referenceName: `1. ${p1.name} + 2. ${p2.name} + 3. ${p3.name}`,
      category: 'Nicho',
      price: 89.90,
      originalPrice: 105.00,
      volume: '3x 15ml (45ml total) Extrait de Parfum',
      image: p1.image,
      description: `Trio exclusivo de bolso Ateliê: ${p1.name} (${p1.referenceName}), ${p2.name} (${p2.referenceName}), ${p3.name} (${p3.referenceName}).`,
      rating: 5.0,
      reviewsCount: 248,
      badges: ['Oferta Exclusiva', '3x 15ml Extrait']
    };

    onAddToCart(trioBundleProduct, 1, '15ml', 89.90);
    if (onClose) onClose();
  };

  const getWhatsAppMessage = () => {
    if (!isComplete) return '';
    const [p1, p2, p3] = selectedSlots as [FragranceProduct, FragranceProduct, FragranceProduct];
    const text = `PERFUMES PREMIUM SWISS ATELIER\nAtendimento Direct - TRIO DE BOLSO (R$ 89,90)\n\nOlá! Gostaria de encomendar o meu Trio de Bolso (3x 15ml):\n\n1º Perfume: ${p1.name} (${p1.referenceName})\n2º Perfume: ${p2.name} (${p2.referenceName})\n3º Perfume: ${p3.name} (${p3.referenceName})\n\nValor Promocional: R$ 89,90 (3x R$ 29,96)\nAguardando finalização do pedido!`;
    return encodeURIComponent(text);
  };

  const contentJSX = (
    <div className={`relative z-10 w-full ${isModal ? 'max-w-5xl mx-auto my-auto bg-[#0A0A0E] border border-[#C5A059] p-4 sm:p-8 rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] max-h-[92vh] overflow-y-auto' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
      
      {/* Modal Sticky Close Header */}
      {isModal && (
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#C5A059]/30 sticky top-0 bg-[#0A0A0E]/95 backdrop-blur-md z-30 pt-1">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#C5A059]" />
            <span className="font-serif text-base sm:text-lg font-bold text-white uppercase tracking-wider">
              MONTE SEU TRIO DE BOLSO (3x 15ml)
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A059] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-all rounded cursor-pointer shadow-md"
          >
            <X className="w-4 h-4" />
            <span>FECHAR</span>
          </button>
        </div>
      )}

      {/* Main Builder Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#C5A059]/40 text-[#E0C078] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>EXPERIMENTE MAIS DE UMA FRAGRÂNCIA</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-normal tracking-tight text-white">
          3 fragrâncias de 15ml por R$ 89,90
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
          Monte sua seleção com 3 essências de 15ml (36% de concentração) para explorar novas notas e variar sua assinatura olfativa no dia a dia.
        </p>
      </div>

        {/* 3 SLOTS DISPLAY BOXES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-10">
          {[0, 1, 2].map((slotIdx) => {
            const product = selectedSlots[slotIdx];
            const isActive = activeSlotIndex === slotIdx;

            return (
              <div
                key={slotIdx}
                onClick={() => setActiveSlotIndex(slotIdx)}
                className={`relative p-4 sm:p-5 rounded-md transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] sm:min-h-[240px] border ${
                  product
                    ? 'bg-[#120F0B]/90 border-[#C5A059]/60 shadow-[0_10px_25px_rgba(197,160,89,0.12)]'
                    : isActive
                      ? 'bg-[#18140D] border-[#C5A059] ring-2 ring-[#C5A059]/40 shadow-lg'
                      : 'bg-black/50 border-dashed border-neutral-700 hover:border-[#C5A059]/50'
                }`}
              >
                {/* Slot Number Label */}
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#C5A059] mb-2">
                  <span className="font-bold flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#C5A059] text-black font-sans font-bold flex items-center justify-center text-[10px]">
                      {slotIdx + 1}
                    </span>
                    <span>{slotIdx === 0 ? '1º FRASCO DE BOLSO' : slotIdx === 1 ? '2º FRASCO DE BOLSO' : '3º FRASCO DE BOLSO'}</span>
                  </span>
                  {product && (
                    <button
                      onClick={(e) => handleRemoveSlot(slotIdx, e)}
                      className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-rose-400 rounded transition-colors"
                      title="Remover frasco"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Slot Content */}
                {product ? (
                  <div className="flex items-center gap-3 sm:gap-4 my-auto">
                    <div className="w-24 h-32 sm:w-28 sm:h-36 bg-black/90 p-1.5 rounded-md shrink-0 border-2 border-[#C5A059]/60 flex items-center justify-center relative overflow-hidden shadow-inner">
                      <img
                        src={blackGoldMarbleBg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
                      />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain relative z-1 drop-shadow-md scale-105"
                        onError={(e) => handleImageError(e, product.image)}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-mono text-emerald-400 font-medium block uppercase tracking-wider">
                        ✓ 15ml Extrait (36%)
                      </span>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-white truncate">
                        {product.name}
                      </h4>
                      <p className="text-[10px] text-[#E0C078] font-medium truncate mt-0.5">
                        {product.referenceName}
                      </p>
                      <span className="inline-block mt-2 text-[9px] text-neutral-400 bg-neutral-900/90 px-2 py-0.5 rounded border border-white/10">
                        {product.category}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="my-auto text-center py-6">
                    <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center mx-auto mb-2 border border-[#C5A059]/40">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-neutral-300 block uppercase tracking-wider">
                      Clique para escolher
                    </span>
                    <span className="text-[10px] text-neutral-400 font-light block mt-1">
                      Escolha qualquer perfume de 15ml
                    </span>
                  </div>
                )}

                {/* Footer slot indicator */}
                <div className="pt-2 border-t border-white/10 text-right">
                  <span className="text-[10px] text-neutral-400 font-mono">
                    {product ? 'Selecionado' : isActive ? '👉 Selecionando...' : 'Aguardando'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUMMARY & ORDER ACTION BAR */}
        <div className="bg-gradient-to-r from-[#14100B] via-[#1B150E] to-[#14100B] border border-[#C5A059]/50 p-6 sm:p-8 rounded-md max-w-5xl mx-auto shadow-2xl mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left: Progress & Price Details */}
            <div className="space-y-2 text-center lg:text-left w-full lg:w-auto">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C5A059] font-semibold">
                  Status do Seu Trio:
                </span>
                <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full ${
                  isComplete ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {isComplete ? '🎉 Trio Completo (3/3)' : `${selectedCount}/3 Selecionados`}
                </span>
              </div>

              <div className="flex items-baseline justify-center lg:justify-start gap-3 pt-1">
                <span className="text-xs text-neutral-400 line-through">
                  De R$ 105,00
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Por R$ 89,90
                </span>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                  Economia de R$ 15,10
                </span>
              </div>

              <p className="text-[11px] text-neutral-300 font-light">
                💳 em até 3x de R$ 29,96 sem juros • 3 Fragrâncias de Bolso (15ml)
              </p>
            </div>

            {/* Right: CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={handleAddTrioToCart}
                disabled={!isComplete}
                className={`w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg rounded-xs ${
                  isComplete
                    ? 'bg-[#C5A059] hover:bg-white text-black font-bold scale-102 shadow-[#C5A059]/20'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isComplete ? 'Adicionar Trio ao Carrinho (R$ 89,90)' : 'Selecione os 3 Perfumes'}</span>
              </button>

              {isComplete && (
                <a
                  href={`https://wa.me/5554999893370?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 border border-emerald-500/80 text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all rounded-xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Pedir no WhatsApp</span>
                </a>
              )}
            </div>

          </div>
        </div>

        {/* PERFUME CATALOG SELECTOR GRID */}
        <div className="bg-black/80 border border-neutral-800 p-4 sm:p-6 rounded-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-800">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Catálogo para Escolha do Trio</span>
              </h3>
              <p className="text-xs text-neutral-400 font-light">
                Clique no perfume para incluir no Slot {activeSlotIndex !== null ? activeSlotIndex + 1 : 'livre'}.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer rounded-xs ${
                    filterCategory === cat
                      ? 'bg-[#C5A059] text-black font-bold'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Digite o nome do perfume ou inspiração (ex: Bleu, Sauvage, Baccarat, Good Girl)..."
              className="w-full px-4 py-2.5 bg-neutral-900/90 border border-neutral-700 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#C5A059] transition-colors rounded-xs"
            />
          </div>

          {/* Compact Product Cards Grid (2 cols on mobile) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4 max-h-[480px] overflow-y-auto pr-1">
            {filteredProducts.map((product) => {
              const isSelectedInSomeSlot = selectedSlots.some(s => s?.id === product.id);

              return (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className={`group relative p-3 rounded border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelectedInSomeSlot
                      ? 'bg-[#18130B] border-[#C5A059] ring-1 ring-[#C5A059]'
                      : 'bg-neutral-900/60 border-neutral-800 hover:border-[#C5A059]/60 hover:bg-neutral-900'
                  }`}
                >
                  <div>
                    {/* Image */}
                    <div className="aspect-[4/5] bg-black p-1.5 rounded mb-2 flex items-center justify-center relative overflow-hidden border border-neutral-800 group-hover:border-[#C5A059]/50">
                      <img
                        src={blackGoldMarbleBg}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
                      />
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transform group-hover:scale-105 transition-transform relative z-1"
                        onError={(e) => handleImageError(e, product.image)}
                      />
                      {isSelectedInSomeSlot && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                          <span className="px-2 py-1 bg-[#C5A059] text-black text-[9px] font-bold uppercase tracking-wider rounded">
                            ✓ No Trio
                          </span>
                        </div>
                      )}
                    </div>

                    <span className="text-[8px] font-mono text-neutral-400 block uppercase truncate">
                      {product.category}
                    </span>
                    <h5 className="font-serif text-xs font-bold text-white truncate group-hover:text-[#C5A059] transition-colors">
                      {product.name}
                    </h5>
                    <p className="text-[9px] text-[#E0C078] truncate mt-0.5">
                      {product.referenceName}
                    </p>
                  </div>

                  <button
                    className={`mt-2 w-full py-1.5 text-[9px] font-bold uppercase tracking-wider transition-all rounded-xs ${
                      isSelectedInSomeSlot
                        ? 'bg-[#C5A059] text-black'
                        : 'bg-neutral-800 hover:bg-[#C5A059] hover:text-black text-white'
                    }`}
                  >
                    {isSelectedInSomeSlot ? '✓ Selecionado' : '+ Escolher'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );

  if (isModal) {
    return (
      <AnimatePresence>
        <div 
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl my-auto"
          >
            {contentJSX}
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <section id="trio-bolso-builder" className="py-20 bg-black/20 text-white relative overflow-hidden border-t border-b border-[#C5A059]/30">
      {/* Background Decorative Auras */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none z-0 opacity-40">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-700/10 rounded-full blur-[120px]" />
      </div>
      {contentJSX}
    </section>
  );
};
