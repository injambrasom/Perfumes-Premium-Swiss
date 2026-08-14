import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, MessageCircle, Sparkles, Plus, Minus, Compass } from 'lucide-react';
import { FragranceProduct, BottleSize, BOTTLE_OPTIONS } from '../types';
import { handleImageError } from '../utils/imageHelper';
import blackSilkTexture from '../assets/images/black_silk_texture_1786224830203.jpg';
import blackGoldMarbleBg from '../assets/images/black_gold_marble_bg_1786232675565.jpg';

interface ProductDetailModalProps {
  product: FragranceProduct | null;
  onClose: () => void;
  onAddToCart: (product: FragranceProduct, quantity: number, size: BottleSize, price: number) => void;
  onOpenTrioBuilder?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenTrioBuilder
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<BottleSize>('100ml');

  useEffect(() => {
    if (product) {
      const stock = product.stockPerSize;
      if (stock) {
        if ((stock['100ml'] ?? 0) > 0) {
          setSelectedSize('100ml');
        } else if ((stock['55ml'] ?? 0) > 0) {
          setSelectedSize('55ml');
        } else if ((stock['15ml'] ?? 0) > 0) {
          setSelectedSize('15ml');
        }
      }
    }
  }, [product]);

  if (!product) return null;

  const currentOption = BOTTLE_OPTIONS.find((b) => b.size === selectedSize) || BOTTLE_OPTIONS[2];
  const unitPrice = currentOption.price;
  const totalPrice = unitPrice * quantity;

  const selectedSizeStock = product.stockPerSize ? (product.stockPerSize[selectedSize] ?? 99) : 99;
  const isSelectedSizeOutOfStock = selectedSizeStock <= 0;

  const handleAdd = () => {
    if (isSelectedSizeOutOfStock) return;
    onAddToCart(product, quantity, selectedSize, unitPrice);
    onClose();
  };

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl border border-[#C5A059]/40 overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.95)] relative my-auto max-h-[92vh] flex flex-col rounded-xl bg-black text-white"
        >
          {/* Real Black Silk Texture Background - Covering Entire Modal Window */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <img 
              src={blackSilkTexture} 
              alt="Texture Seda Preta" 
              className="w-full h-full object-cover object-center opacity-75 scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(197,160,89,0.22)_0%,_transparent_70%)]" />
          </div>

          {/* Always Pinned Top Sticky Bar with Close Button */}
          <div className="sticky top-0 z-40 bg-[#07070A]/90 backdrop-blur-md text-white px-5 py-3.5 flex items-center justify-between border-b border-[#C5A059]/30 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E0C078] font-bold truncate max-w-[260px] sm:max-w-none">
                {product.referenceName.startsWith('Inspirado em') ? product.referenceName : `Inspirado em ${product.referenceName}`}{product.referenceBrand ? ` (${product.referenceBrand})` : ''} • 36% ESSÊNCIA
              </span>
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#D4B06A] text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all rounded-sm cursor-pointer shadow-md shrink-0"
              title="Fechar (ESC)"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
              <span>FECHAR</span>
            </button>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 overflow-hidden flex-1 min-h-0 relative z-10">

            {/* Left Image Section - Fixed in viewport while text scrolls, filling entire frame */}
            <div className="relative flex items-center justify-center h-[300px] sm:h-[400px] md:h-full overflow-hidden shrink-0 md:shrink border-b md:border-b-0 md:border-r border-[#C5A059]/30 bg-black">
              {/* Black Gold Marble Background Texture */}
              <img 
                src={blackGoldMarbleBg} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover object-center opacity-70 pointer-events-none" 
              />
              {/* Bottle Spotlight Halo */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A059]/20 via-transparent to-transparent opacity-70 pointer-events-none z-10" />

              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain object-center mx-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] z-0 transition-transform duration-700 hover:scale-[1.03] relative"
                onError={(e) => handleImageError(e, product.image)}
              />

              {/* Subtle bottom gradient overlay for badge contrast */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10" />

              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center pointer-events-none z-20">
                <span className="px-3 py-1 bg-black/85 text-[#E0C078] text-[10px] font-mono font-bold tracking-widest uppercase border border-[#C5A059]/40 rounded-sm backdrop-blur-md shadow-md">
                  FOTO REAL DO PRODUTO
                </span>
                <span className="px-3 py-1 bg-black/85 text-white text-[10px] font-mono tracking-widest uppercase border border-white/20 rounded-sm backdrop-blur-md shadow-md">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Right Details Section - Only text scrolls */}
            <div className="p-5 sm:p-7 md:p-8 flex flex-col justify-between space-y-6 z-10 text-white overflow-y-auto max-h-full flex-1">
              <div>
                {/* Category & Ratings */}
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="uppercase tracking-widest text-[#E0C078] font-bold">
                    {product.category} • {product.olfactoryFamily}
                  </span>
                  <div className="flex items-center gap-1.5 text-[#F0D590] bg-black/50 px-2.5 py-1 rounded-full border border-[#C5A059]/30">
                    <Star className="w-3.5 h-3.5 fill-current text-[#C5A059]" />
                    <span className="font-bold text-white">{product.rating}</span>
                    <span className="text-neutral-400 text-[11px]">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Name */}
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {product.name}
                </h2>

                {/* Highlighted Reference Inspiration Box */}
                <div className="mt-4 p-4 bg-[#18140C]/90 border border-[#C5A059]/60 rounded-lg flex items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] font-bold block">
                      REFERÊNCIA OLFATIVA (INSPIRAÇÃO):
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-[#F5E6C4] flex items-center gap-2 mt-1 drop-shadow-xs">
                      <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0 animate-pulse" />
                      <span>
                        {product.referenceName.startsWith('Inspirado em')
                          ? product.referenceName
                          : `Inspirado em ${product.referenceName}`}
                        {product.referenceBrand ? ` (${product.referenceBrand})` : ''}
                      </span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#C5A059] text-neutral-950 px-3 py-1.5 rounded uppercase shrink-0 ml-3 shadow-md tracking-wider">
                    ALTA FIDELIDADE
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-4 leading-relaxed">
                  {product.description}
                </p>

                {/* Size Selection */}
                <div className="mt-5">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#E0C078] mb-2.5">
                    ESCOLHA O TAMANHO DO FRASCO (36% ESSÊNCIA):
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {BOTTLE_OPTIONS.map((opt) => {
                      const stockCount = product.stockPerSize ? (product.stockPerSize[opt.size] ?? 99) : 99;
                      const isOutOfStock = stockCount <= 0;
                      const isSelected = selectedSize === opt.size;
                      return (
                        <button
                          key={opt.size}
                          type="button"
                          disabled={isOutOfStock}
                          onClick={() => !isOutOfStock && setSelectedSize(opt.size)}
                          className={`p-3 text-center border transition-all rounded-md relative ${
                            isOutOfStock
                              ? 'border-red-900/30 bg-neutral-900/40 text-neutral-600 cursor-not-allowed opacity-60'
                              : isSelected
                              ? 'border-[#C5A059] bg-[#1F190E] text-[#F5E6C4] shadow-[0_0_15px_rgba(197,160,89,0.3)] cursor-pointer'
                              : 'border-white/10 bg-black/40 hover:border-[#C5A059]/50 text-neutral-300 cursor-pointer'
                          }`}
                        >
                          <span className="block text-xs font-bold font-mono tracking-wider">{opt.size}</span>
                          <span
                            className={`block text-xs font-semibold mt-0.5 ${
                              isOutOfStock
                                ? 'text-red-400/70 line-through'
                                : isSelected
                                ? 'text-[#E0C078]'
                                : 'text-neutral-400'
                            }`}
                          >
                            {isOutOfStock ? 'ESGOTADO' : `R$ ${opt.price.toFixed(2)}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Technical Performance Specs */}
                <div className="mt-5 p-4 bg-[#111116]/90 border border-white/10 space-y-2.5 text-xs rounded-lg backdrop-blur-md">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-neutral-400 font-light">Concentração:</span>
                    <span className="font-semibold text-white">36% de concentração • Alta concentração</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-neutral-400 font-light">Fixação Estimada:</span>
                    <span className="font-semibold text-white">{product.fixationHours || '8h a 12h na pele'}</span>
                  </div>
                  <div className="flex justify-between items-center pb-1">
                    <span className="text-neutral-400 font-light">Projeção:</span>
                    <span className="font-semibold text-white">{product.projectionMeter || 'Envolvente'}</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 italic pt-1 border-t border-white/5 font-light">
                    * O desempenho pode variar conforme pele, clima, aplicação e fragrância.
                  </p>
                </div>

                {/* Ideal Occasions Section */}
                <div className="mt-5 p-4 bg-[#16120B]/90 border border-[#C5A059]/40 rounded-lg space-y-2.5 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E0C078] flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#C5A059]" />
                      <span>OCASIÃO IDEAL DE USO</span>
                    </h4>
                    {product.intensity && (
                      <span className="text-[10px] font-mono text-[#F0D590] font-bold bg-[#2A2012] border border-[#C5A059]/40 px-2.5 py-0.5 rounded">
                        {product.intensity}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-300 font-light">
                    Recomendado para melhor destaque olfativo:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(product.occasions && product.occasions.length > 0
                      ? product.occasions
                      : ['Festa', 'Encontro', 'Trabalho', 'Assinatura']
                    ).map((occ) => (
                      <span
                        key={occ}
                        className="px-3 py-1 text-xs font-medium bg-[#241C10] text-[#F3E2B8] border border-[#C5A059]/40 rounded-full shadow-xs flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                        {occ}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Olfactory Pyramid Accordion */}
                <div className="mt-5 space-y-2.5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E0C078] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>PIRÂMIDE OLFATIVA COMPLETA</span>
                  </h4>

                  <div className="grid grid-cols-1 gap-2.5 text-xs font-light">
                    <div className="p-3 bg-[#121217]/90 border border-white/10 rounded-lg">
                      <span className="font-bold uppercase tracking-widest text-[10px] block text-[#E0C078]">
                        NOTAS DE SAÍDA / TOPO:
                      </span>
                      <p className="text-neutral-100 font-medium mt-1">{product.pyramid?.topNotes?.join(', ') || product.notes?.top?.join(', ') || 'Cítrico & Fresco'}</p>
                    </div>

                    <div className="p-3 bg-[#121217]/90 border border-white/10 rounded-lg">
                      <span className="font-bold uppercase tracking-widest text-[10px] block text-[#E0C078]">
                        NOTAS DE CORAÇÃO:
                      </span>
                      <p className="text-neutral-100 font-medium mt-1">{product.pyramid?.heartNotes?.join(', ') || product.notes?.middle?.join(', ') || 'Floral & Especiado'}</p>
                    </div>

                    <div className="p-3 bg-[#121217]/90 border border-white/10 rounded-lg">
                      <span className="font-bold uppercase tracking-widest text-[10px] block text-[#E0C078]">
                        NOTAS DE FUNDO / BASE:
                      </span>
                      <p className="text-neutral-100 font-medium mt-1">{product.pyramid?.baseNotes?.join(', ') || product.notes?.base?.join(', ') || 'Amadeirado & Âmbar'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="pt-5 border-t border-white/10">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block tracking-wider">
                      TAMANHO: {selectedSize} • 36% ESSÊNCIA
                    </span>
                    <span className="font-serif text-3xl font-bold text-[#F0D590] drop-shadow-xs">
                      R$ {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center border border-white/20 rounded-md overflow-hidden bg-black/40">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2.5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2.5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAdd}
                    disabled={isSelectedSizeOutOfStock}
                    className={`w-full py-4 transition-all text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 rounded-md shadow-lg ${
                      isSelectedSizeOutOfStock
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-white/10'
                        : 'bg-gradient-to-r from-[#C5A059] to-[#DFBA72] hover:from-[#d1ab63] hover:to-[#eac47a] text-neutral-950 cursor-pointer shadow-[#C5A059]/20'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isSelectedSizeOutOfStock ? 'TAMANHO ESGOTADO' : 'ADICIONAR À SACOLA'}</span>
                  </button>

                  <a
                    href={`https://wa.me/5554999893370?text=${encodeURIComponent(
                      `PERFUMES PREMIUM SWISS ATELIER\nAtendimento Direct\n\nOlá! Gostaria de comprar o seguinte perfume:\n\nPRODUTO: ${product.name}\n• Tamanho: ${selectedSize} (Extrait de Parfum - 36% Essência)\n• Referência Olfativa: ${product.referenceName}\n• Quantidade: ${quantity}x\n• Valor Unitário: R$ ${unitPrice.toFixed(2).replace('.', ',')}\n• Valor Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}\n\nAguardando atendimento executivo para finalizar meu pedido!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="w-full py-4 border border-emerald-500/80 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-600 hover:text-white transition-all text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 rounded-md shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>PEDIR NO WHATSAPP</span>
                  </a>
                </div>

                {/* Trio Promo CTA inside Product Detail Modal */}
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenTrioBuilder) onOpenTrioBuilder();
                    const el = document.getElementById('trio-bolso-builder');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-3 w-full py-3 bg-gradient-to-r from-[#1A140B] via-[#2A1E0D] to-[#1A140B] border border-[#C5A059] hover:bg-[#C5A059] hover:text-black text-neutral-100 transition-all text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 rounded-md shadow-md cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A059] group-hover:text-black shrink-0" />
                  <span>🎁 MONTE UM TRIO DE BOLSO (3x 15ml por R$ 89,90)</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
