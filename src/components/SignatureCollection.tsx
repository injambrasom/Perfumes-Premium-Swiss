import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, MessageCircle, Eye, Star, Sparkles, Filter, ArrowRight, ArrowLeft, Gift } from 'lucide-react';
import { FragranceProduct, PerfumeOccasion } from '../types';
import { handleImageError } from '../utils/imageHelper';
import blackGoldMarbleBg from '../assets/images/black_gold_marble_bg_1786232675565.jpg';

interface SignatureCollectionProps {
  products: FragranceProduct[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onAddToCart: (product: FragranceProduct) => void;
  onQuickView: (product: FragranceProduct) => void;
  onOpenTrioBuilder?: () => void;
}

export const SignatureCollection: React.FC<SignatureCollectionProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onQuickView,
  onOpenTrioBuilder
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('Todas');
  const [arabeGenderFilter, setArabeGenderFilter] = useState<'Todos' | 'Masculino' | 'Feminino'>('Todos');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Default to Ateliê Noir dark luxury mode

  const categories = ['Todos', 'Mais Vendidos', 'Masculino', 'Feminino', 'Árabe', 'Nicho'];
  const occasions = ['Todas', 'Assinatura', 'Trabalho', 'Encontro', 'Festa', 'Verão', 'Inverno'];

  // Dynamic Swiss Obsidian Gallery Atmosphere per category
  const getAtmosphere = (category: string, isDark: boolean) => {
    if (!isDark) {
      return {
        sectionBg: 'bg-[#FAF8F5] text-neutral-900',
        radialOverlay: 'bg-[radial-gradient(circle_at_50%_0%,_rgba(197,160,89,0.08)_0%,_transparent_70%)]',
        cardStyle: 'bg-white/95 border-neutral-200/80 hover:border-neutral-950 shadow-md hover:shadow-xl',
        imageContainerBg: 'bg-gradient-to-b from-[#FAF8F5] via-[#EFECE6] to-[#E5DFC1]/30',
        spotlightColor: 'from-[#C5A059]/20',
        tagBg: 'bg-white/90 border-neutral-200 text-neutral-700'
      };
    }

    switch (category) {
      case 'Masculino':
        return {
          sectionBg: 'bg-black/20 text-white',
          radialOverlay: 'bg-[radial-gradient(ellipse_at_50%_0%,_rgba(30,41,59,0.22)_0%,_transparent_70%)]',
          cardStyle: 'bg-[#0B0D11]/80 border-slate-800/40 hover:border-[#C5A059]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_35px_rgba(30,41,59,0.22)]',
          imageContainerBg: 'bg-gradient-to-b from-[#10141D]/80 via-[#0B0E14] to-[#07090D]/90',
          spotlightColor: 'from-slate-400/15',
          tagBg: 'bg-[#0E121A]/80 border-slate-800/60 text-slate-300'
        };

      case 'Feminino':
        return {
          sectionBg: 'bg-black/20 text-white',
          radialOverlay: 'bg-[radial-gradient(ellipse_at_50%_0%,_rgba(197,160,89,0.14)_0%,_transparent_70%)]',
          cardStyle: 'bg-[#100C0F]/80 border-amber-900/20 hover:border-[#C5A059]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_35px_rgba(197,160,89,0.12)]',
          imageContainerBg: 'bg-gradient-to-b from-[#181216]/80 via-[#110D10] to-[#0A080A]/90',
          spotlightColor: 'from-[#C5A059]/20',
          tagBg: 'bg-[#161014]/80 border-amber-900/40 text-amber-100/80'
        };

      case 'Nicho':
        return {
          sectionBg: 'bg-black/20 text-white',
          radialOverlay: 'bg-[radial-gradient(ellipse_at_50%_0%,_rgba(180,110,40,0.14)_0%,_transparent_70%)]',
          cardStyle: 'bg-[#0E0C09]/80 border-amber-900/25 hover:border-[#C5A059]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_35px_rgba(180,110,40,0.15)]',
          imageContainerBg: 'bg-gradient-to-b from-[#17130F]/80 via-[#0F0C09] to-[#090705]/90',
          spotlightColor: 'from-amber-600/20',
          tagBg: 'bg-[#15110D]/80 border-amber-900/40 text-amber-200/80'
        };

      case 'Árabe':
        return {
          sectionBg: 'bg-black/20 text-white',
          radialOverlay: 'bg-[radial-gradient(ellipse_at_50%_0%,_rgba(200,140,50,0.18)_0%,_transparent_70%)]',
          cardStyle: 'bg-[#100B07]/80 border-amber-800/30 hover:border-[#C5A059]/70 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_35px_rgba(200,140,50,0.18)]',
          imageContainerBg: 'bg-gradient-to-b from-[#1B110A]/80 via-[#110A05] to-[#080503]/90',
          spotlightColor: 'from-amber-500/25',
          tagBg: 'bg-[#181009]/80 border-amber-800/50 text-amber-200/90'
        };

      default:
        return {
          sectionBg: 'bg-black/20 text-white',
          radialOverlay: 'bg-[radial-gradient(ellipse_at_50%_0%,_rgba(197,160,89,0.12)_0%,_transparent_70%)]',
          cardStyle: 'bg-[#0D0D10]/70 border-white/[0.06] hover:border-[#C5A059]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_15px_35px_rgba(197,160,89,0.1)]',
          imageContainerBg: 'bg-gradient-to-b from-[#141418]/80 via-[#0E0E12] to-[#08080A]/90',
          spotlightColor: 'from-[#C5A059]/20',
          tagBg: 'bg-[#121216]/80 border-white/10 text-neutral-300'
        };
    }
  };

  const atmosphere = getAtmosphere(activeCategory, isDarkMode);

  // Categorized product collections for 4-part layout
  const masculinosList = products.filter(p => p.category === 'Masculino' || (p.category === 'Árabe' && p.badges?.some(b => b.includes('Masculino'))));
  const femininosList = products.filter(p => p.category === 'Feminino' || (p.category === 'Árabe' && p.badges?.some(b => b.includes('Feminino'))));
  const arabesList = products.filter(p => p.category === 'Árabe' || p.badges?.some(b => b.toLowerCase().includes('árabe') || b.toLowerCase().includes('arabe')));
  const nichoList = products.filter(p => p.category === 'Nicho');

  // Filtered list when a specific single category is active
  const filteredProducts = products.filter((product) => {
    let categoryMatch = true;
    if (activeCategory === 'Mais Vendidos') {
      categoryMatch = product.badges?.includes('Mais Vendido') || product.featuredInSignature === true;
    } else if (activeCategory === 'Árabe') {
      const isArabe = product.category === 'Árabe' || product.badges?.some(b => b.toLowerCase().includes('árabe') || b.toLowerCase().includes('arabe'));
      if (!isArabe) {
        categoryMatch = false;
      } else if (arabeGenderFilter === 'Masculino') {
        categoryMatch = product.badges?.some(b => b.includes('Masculino')) || false;
      } else if (arabeGenderFilter === 'Feminino') {
        categoryMatch = product.badges?.some(b => b.includes('Feminino')) || false;
      } else {
        categoryMatch = true;
      }
    } else if (activeCategory === 'Masculino') {
      categoryMatch = product.category === 'Masculino' || (product.category === 'Árabe' && product.badges?.some(b => b.includes('Masculino')));
    } else if (activeCategory === 'Feminino') {
      categoryMatch = product.category === 'Feminino' || (product.category === 'Árabe' && product.badges?.some(b => b.includes('Feminino')));
    } else if (activeCategory !== 'Todos') {
      categoryMatch = product.category === activeCategory;
    }

    let occasionMatch = true;
    if (selectedOccasion !== 'Todas') {
      occasionMatch = Boolean(product.occasions?.includes(selectedOccasion as PerfumeOccasion));
    }

    return categoryMatch && occasionMatch;
  });

  const handleSelectAndScroll = (categoryName: string) => {
    onSelectCategory(categoryName);
    const element = document.getElementById('signature-collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reusable Product Card Component with Mobile 2-column optimization
  const renderProductCard = (product: FragranceProduct) => (
    <motion.div
      key={product.id}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={`group relative transition-all duration-500 flex flex-col justify-between overflow-hidden rounded-md border backdrop-blur-xs ${atmosphere.cardStyle}`}
    >
      <div>
        {/* Image Display Podium */}
        <div className="relative aspect-[3/4] overflow-hidden flex items-center justify-center p-3 sm:p-6 transition-all duration-500 bg-black">
          {/* Black Gold Marble Texture Background with Gold Veins */}
          <img 
            src={blackGoldMarbleBg} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-75 group-hover:scale-110 transition-transform duration-700 pointer-events-none"
          />
          {/* Subtle Dark Gradient & Glowing Spotlight Aura */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none" />
          <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${atmosphere.spotlightColor} via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

          <img 
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain object-center drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)] transform transition-transform duration-500 group-hover:scale-105 z-1 relative"
            onError={(e) => handleImageError(e, product.image)}
          />

          {/* Badges Overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 max-w-[80%] pointer-events-none">
            {!product.inStock && (
              <span className="px-1.5 py-0.5 bg-red-950/90 text-red-200 text-[7px] sm:text-[9px] font-bold tracking-widest uppercase backdrop-blur-md border border-red-500/50 shadow-sm truncate">
                ESGOTADO
              </span>
            )}
            <span className="px-1.5 py-0.5 bg-black/80 text-neutral-200 text-[7px] sm:text-[9px] font-medium tracking-wider uppercase backdrop-blur-md border border-white/10 shadow-sm truncate">
              PRODUTO REAL
            </span>
          </div>

          {/* Desktop Hover Quick Action */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-2 p-3 z-20 backdrop-blur-[2px]">
            <button
              onClick={() => onQuickView(product)}
              className="px-3 py-2 bg-white text-neutral-950 hover:bg-[#C5A059] hover:text-white transition-all text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Detalhes</span>
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="px-3 py-2 bg-[#C5A059] text-black hover:bg-white transition-all text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-black" />
              <span>Escolher</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-2.5 sm:p-5">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs font-light mb-1">
            <span className={`uppercase tracking-widest text-[8px] sm:text-[10px] font-mono font-medium truncate ${isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {product.category}
            </span>
            <div className="flex items-center gap-0.5 text-[#C5A059] shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span className={`font-semibold text-[10px] sm:text-xs ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{product.rating}</span>
            </div>
          </div>

          {/* Perfume Name */}
          <h3 className={`font-serif text-xs sm:text-lg font-bold tracking-wide transition-colors group-hover:text-[#C5A059] line-clamp-1 ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
            {product.name}
          </h3>

          {/* Inspired Highlight */}
          <div className={`mt-1 flex items-center gap-1 text-[8px] sm:text-[11px] font-medium px-1.5 py-0.5 rounded-xs w-full truncate border ${
            isDarkMode
              ? 'text-neutral-300 bg-white/5 border-white/10'
              : 'text-neutral-700 bg-neutral-100 border-neutral-200'
          }`}>
            <Sparkles className="w-2.5 h-2.5 text-[#C5A059] shrink-0" />
            <span className="truncate">
              {product.referenceName.startsWith('Inspirado em')
                ? product.referenceName
                : `Inspirado em ${product.referenceName}`}
            </span>
          </div>

          {/* Notes summary & Fixation note */}
          <div className={`mt-2 pt-2 border-t space-y-0.5 text-[10px] sm:text-xs font-light hidden sm:block ${
            isDarkMode ? 'border-white/10 text-neutral-300' : 'border-neutral-100 text-neutral-600'
          }`}>
            <p className="truncate">
              <span className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'}>Notas:</span>{' '}
              {product.pyramid?.topNotes?.slice(0, 2).join(', ') || 'Cítrico & Âmbar'}
            </p>
            <p className="text-[10px] font-mono text-neutral-300 font-medium">
              Fixação estimada: {product.fixationHours || '8h a 12h'}
            </p>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Direct Actions */}
      <div className={`p-2.5 sm:p-4 pt-2 mt-auto border-t flex flex-col gap-2 ${
        isDarkMode ? 'border-white/10' : 'border-neutral-100'
      }`}>
        <div className="flex flex-col gap-1.5 sm:gap-2 w-full">
          <div className="min-w-0">
            <span className="text-[7.5px] sm:text-[9px] text-neutral-400 block font-light uppercase tracking-wider truncate">
              36% Concentração • A partir de
            </span>
            <span className={`font-serif text-xs sm:text-base font-bold whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
              R$ 35,00 <span className="text-[8px] sm:text-xs font-sans font-normal text-neutral-400">(15ml)</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 w-full">
            <button
              onClick={() => onQuickView(product)}
              className="flex-1 py-1.5 sm:py-2 px-2 sm:px-4 bg-white text-black hover:bg-[#C5A059] transition-all text-[9px] sm:text-xs font-bold tracking-wider uppercase cursor-pointer text-center truncate"
            >
              Escolher Fragrância
            </button>
            <a
              href={`https://wa.me/5554999893370?text=${encodeURIComponent(
                `PERFUMES PREMIUM SWISS ATELIER\nAtendimento Direct\n\nOlá! Gostaria de consultar o perfume:\n\nPRODUTO: ${product.name}\n• Referência Olfativa: ${product.referenceName}\n• Concentração: Extrait de Parfum (36% Essência)\n• A partir de R$ 35,00 (15ml)`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 border border-white/20 text-neutral-300 hover:text-white hover:border-white transition-all shrink-0 flex items-center justify-center"
              title="Pedir no WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section 
      id="signature-collection" 
      className={`relative py-16 sm:py-24 transition-all duration-700 ease-in-out overflow-hidden ${atmosphere.sectionBg}`}
    >
      {/* Background Noise & Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ease-in-out z-0 ${atmosphere.radialOverlay}`} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Mode Switcher */}
        <div className="text-center max-w-3xl mx-auto relative">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-1 p-1 rounded-full border border-[#C5A059]/40 bg-black/60 backdrop-blur-md">
              <button
                onClick={() => setIsDarkMode(true)}
                className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#C5A059] text-black font-bold shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                ✨ Ateliê Noir
              </button>
              <button
                onClick={() => setIsDarkMode(false)}
                className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  !isDarkMode
                    ? 'bg-[#C5A059] text-black font-bold shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                🏛️ Ateliê Blanc
              </button>
            </div>
          </div>

          <span className="text-xs sm:text-sm md:text-base font-sans tracking-[0.35em] uppercase text-[#E0C078] font-bold block mb-3">
            GALERIA EXCLUSIVA • SWISS ATELIER
          </span>
          <h2 className={`font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-neutral-950'}`}>
            Fragrâncias Desejadas
          </h2>
          <p className={`mt-3 sm:mt-5 text-sm sm:text-base md:text-lg lg:text-xl font-normal max-w-3xl mx-auto leading-relaxed ${isDarkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>
            Extrait de Parfum com 36% de essência pura. Frascos de 15ml (R$ 35,00), 55ml (R$ 80,00) e 100ml (R$ 130,00).
          </p>
          <div className="w-20 h-[2px] bg-[#C5A059] mx-auto mt-6 shadow-[0_0_10px_#C5A059]" />
        </div>

        {/* Standout Promo Card: Trio de Bolso */}
        <div className="mt-8 bg-gradient-to-r from-[#17120B] via-[#2A1F10] to-[#17120B] border border-[#C5A059] p-4 sm:p-5 rounded-lg shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center shrink-0 shadow-inner">
              <Gift className="w-6 h-6 text-[#E0C078]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#E0C078] uppercase tracking-widest block font-bold">
                PROMOÇÃO DE BOLSO (3X 15ML)
              </span>
              <h4 className="font-serif text-base sm:text-lg font-bold text-white">
                Monte seu Trio de Bolso (3x 15ml) por apenas R$ 89,90
              </h4>
              <p className="text-xs text-neutral-300 font-light mt-0.5">
                Escolha quaisquer 3 fragrâncias de bolso por apenas 3x de R$ 29,96 sem juros.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (onOpenTrioBuilder) onOpenTrioBuilder();
              const el = document.getElementById('trio-bolso-builder');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-3 bg-[#C5A059] hover:bg-white text-black font-bold text-xs uppercase tracking-wider rounded transition-all shadow-lg cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <Sparkles className="w-4 h-4" />
            <span>MONTAR TRIO AGORA</span>
          </button>
        </div>

        {/* Filter Navigation Bar */}
        <div className="mt-8 sm:mt-12 space-y-4">
          <div className={`flex items-center justify-center flex-wrap gap-2 sm:gap-4 border-b pb-4 ${isDarkMode ? 'border-white/10' : 'border-neutral-200'}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer rounded-xs ${
                  activeCategory === cat
                    ? 'bg-[#C5A059] text-black shadow-xl scale-105 border border-[#E0C078]'
                    : isDarkMode
                      ? 'bg-black/50 text-neutral-200 border border-white/15 hover:border-[#C5A059] hover:text-white backdrop-blur-xs'
                      : 'bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-100 hover:text-black shadow-xs'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Arabic Sub-Filter Bar */}
          {activeCategory === 'Árabe' && (
            <div className="flex items-center justify-center flex-wrap gap-2 text-xs pt-1 pb-2">
              <span className="text-[#C5A059] font-mono text-[10px] uppercase tracking-wider font-semibold">
                Coleção Árabe:
              </span>
              {[
                { label: 'Todos os Árabes (13)', val: 'Todos' },
                { label: 'Árabes Masculinos (7)', val: 'Masculino' },
                { label: 'Árabes Femininos (6)', val: 'Feminino' },
              ].map((sub) => (
                <button
                  key={sub.val}
                  onClick={() => setArabeGenderFilter(sub.val as 'Todos' | 'Masculino' | 'Feminino')}
                  className={`px-3 py-1 border transition-all cursor-pointer text-[10px] sm:text-xs font-mono uppercase tracking-wider ${
                    arabeGenderFilter === sub.val
                      ? 'bg-[#C5A059] text-black border-[#C5A059] font-semibold'
                      : isDarkMode
                        ? 'bg-black/40 text-neutral-300 border-white/10 hover:border-[#C5A059]'
                        : 'bg-white text-neutral-700 border-neutral-300 hover:border-[#C5A059]'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}

          {/* Occasion Filter (shown when viewing a specific category) */}
          {activeCategory !== 'Todos' && (
            <div className="flex items-center justify-center flex-wrap gap-1.5 text-xs pt-1">
              <span className="text-neutral-400 font-mono text-[10px] uppercase tracking-wider mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#C5A059]" /> Ocasião:
              </span>
              {occasions.map((occ) => (
                <button
                  key={occ}
                  onClick={() => setSelectedOccasion(occ)}
                  className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-light transition-all cursor-pointer ${
                    selectedOccasion === occ
                      ? 'bg-[#C5A059] text-black font-semibold'
                      : isDarkMode
                        ? 'bg-black/40 text-neutral-400 border border-white/5 hover:border-white/20 hover:text-white'
                        : 'bg-neutral-200/80 text-neutral-600 hover:bg-neutral-300'
                  }`}
                >
                  {occ}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- VIEW MODE 1: ALL CATEGORIES SEPARATED IN 4 DISTINCT SECTIONS (When activeCategory === 'Todos') --- */}
        {activeCategory === 'Todos' ? (
          <div className="mt-12 space-y-16">
            
            {/* 1. SEÇÃO MASCULINOS */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#C5A059]/30 pb-3">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#C5A059] uppercase block font-semibold">
                    COLEÇÃO MASCULINA
                  </span>
                  <h3 className={`font-serif text-xl sm:text-2xl font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    Perfumes Masculinos
                  </h3>
                </div>
                <button
                  onClick={() => handleSelectAndScroll('Masculino')}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C5A059] hover:text-white transition-colors cursor-pointer group self-start sm:self-auto"
                >
                  <span>Ver todos os Masculinos ({masculinosList.length})</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* 2 items per row on mobile (grid-cols-2), 4 on desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
                {masculinosList.slice(0, 4).map((product) => renderProductCard(product))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => handleSelectAndScroll('Masculino')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#C5A059]/50 hover:border-[#C5A059] bg-black/40 text-xs uppercase tracking-widest text-[#C5A059] hover:text-white hover:bg-[#C5A059]/20 transition-all cursor-pointer font-medium rounded-xs"
                >
                  <span>Ver Coleção Masculina Completa ({masculinosList.length} perfumes)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. SEÇÃO FEMININOS */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#C5A059]/30 pb-3">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#C5A059] uppercase block font-semibold">
                    COLEÇÃO FEMININA
                  </span>
                  <h3 className={`font-serif text-xl sm:text-2xl font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    Perfumes Femininos
                  </h3>
                </div>
                <button
                  onClick={() => handleSelectAndScroll('Feminino')}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C5A059] hover:text-white transition-colors cursor-pointer group self-start sm:self-auto"
                >
                  <span>Ver todos os Femininos ({femininosList.length})</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
                {femininosList.slice(0, 4).map((product) => renderProductCard(product))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => handleSelectAndScroll('Feminino')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#C5A059]/50 hover:border-[#C5A059] bg-black/40 text-xs uppercase tracking-widest text-[#C5A059] hover:text-white hover:bg-[#C5A059]/20 transition-all cursor-pointer font-medium rounded-xs"
                >
                  <span>Ver Coleção Feminina Completa ({femininosList.length} perfumes)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3. SEÇÃO ÁRABES */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#C5A059]/30 pb-3">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#C5A059] uppercase block font-semibold">
                    ALTA ORIENTAL • OPULÊNCIA
                  </span>
                  <h3 className={`font-serif text-xl sm:text-2xl font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    Perfumes Árabes Exclusivos
                  </h3>
                </div>
                <button
                  onClick={() => handleSelectAndScroll('Árabe')}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C5A059] hover:text-white transition-colors cursor-pointer group self-start sm:self-auto"
                >
                  <span>Ver todos os Árabes ({arabesList.length})</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
                {arabesList.slice(0, 4).map((product) => renderProductCard(product))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => handleSelectAndScroll('Árabe')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#C5A059]/50 hover:border-[#C5A059] bg-black/40 text-xs uppercase tracking-widest text-[#C5A059] hover:text-white hover:bg-[#C5A059]/20 transition-all cursor-pointer font-medium rounded-xs"
                >
                  <span>Ver Coleção Árabe Completa ({arabesList.length} perfumes)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 4. SEÇÃO NICHO */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#C5A059]/30 pb-3">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#C5A059] uppercase block font-semibold">
                    EXCLUSIVIDADE • ATELIÊ NICHO
                  </span>
                  <h3 className={`font-serif text-xl sm:text-2xl font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    Perfumes de Nicho
                  </h3>
                </div>
                <button
                  onClick={() => handleSelectAndScroll('Nicho')}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#C5A059] hover:text-white transition-colors cursor-pointer group self-start sm:self-auto"
                >
                  <span>Ver todos de Nicho ({nichoList.length})</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
                {nichoList.slice(0, 4).map((product) => renderProductCard(product))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => handleSelectAndScroll('Nicho')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#C5A059]/50 hover:border-[#C5A059] bg-black/40 text-xs uppercase tracking-widest text-[#C5A059] hover:text-white hover:bg-[#C5A059]/20 transition-all cursor-pointer font-medium rounded-xs"
                >
                  <span>Ver Coleção de Nicho Completa ({nichoList.length} perfumes)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* --- VIEW MODE 2: SINGLE CATEGORY EXPANDED GRID --- */
          <div className="mt-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-black/40 p-4 border border-[#C5A059]/30 rounded-xs">
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest block font-semibold">
                  CATEGORIA SELECIONADA
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase">
                  {activeCategory} <span className="text-sm font-sans font-normal text-neutral-400">({filteredProducts.length} itens)</span>
                </h3>
              </div>
              <button
                onClick={() => handleSelectAndScroll('Todos')}
                className="flex items-center gap-2 px-4 py-2 bg-[#C5A059] text-black hover:bg-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md self-start sm:self-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Ver Todas as Categorias</span>
              </button>
            </div>

            {/* Grid of Products for active Category - 2 COLUMNS ON MOBILE */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => renderProductCard(product))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-black/30 border border-white/10 p-8">
                <p className="text-neutral-400 text-sm font-light">Nenhum perfume encontrado com os filtros selecionados.</p>
                <button
                  onClick={() => { setSelectedOccasion('Todas'); setArabeGenderFilter('Todos'); }}
                  className="mt-4 px-4 py-2 bg-[#C5A059] text-black text-xs font-bold uppercase tracking-wider"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
