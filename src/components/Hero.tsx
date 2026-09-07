import heroImg from "../assets/images/hero_perfume_marble_1785456140904.jpg";
import maleModelGeneric from "../assets/images/male_model_generic_hero_1786409144275.jpg";
import femaleModelGeneric from "../assets/images/female_model_generic_hero_1786409156662.jpg";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Award, Gift, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { FragranceProduct } from '../types';

interface HeroProps {
  onChoosePerfume: () => void;
  onOpenWhatsApp: () => void;
  onOpenTrioBuilder?: () => void;
  products?: FragranceProduct[];
  onQuickView?: (product: FragranceProduct) => void;
}

interface HeroSlide {
  id: string;
  type: 'main_hero' | 'product' | 'trio' | 'promo';
  badge: string;
  badgeIcon: 'award' | 'sparkles' | 'zap' | 'gift' | 'shield';
  title: string;
  highlightText?: string;
  subtitle: string;
  tagline?: string;
  priceText?: string;
  imageUrl?: string;
  ctaText: string;
  ctaType: 'scroll' | 'whatsapp' | 'trio' | 'product';
  productId?: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  onChoosePerfume, 
  onOpenWhatsApp, 
  onOpenTrioBuilder,
  products = [],
  onQuickView
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const baccarat = products.find(p => p.id === 'swiss-03-baccarat' || p.name.includes('BACCARAT'));
  const salvage = products.find(p => p.id === 'swiss-04-sauvage' || p.name.includes('SALVAGE'));
  const aliem = products.find(p => p.id === 'swiss-13-aliem' || p.name.includes('ALIEM'));

  const slides: HeroSlide[] = [
    {
      id: 'main_hero',
      type: 'main_hero',
      badge: 'ATELIÊ DE ALTA PERFUMARIA • SWISS ESSENCES',
      badgeIcon: 'award',
      title: 'A ESSÊNCIA DA ALTA PERFUMARIA,',
      highlightText: 'REINTERPRETADA.',
      subtitle: 'Essências importadas inspiradas nas fragrâncias mais desejadas do mundo.',
      tagline: '36% de concentração • 15ml, 55ml e 100ml',
      ctaText: 'EXPLORAR FRAGRÂNCIAS',
      ctaType: 'scroll',
    },
    {
      id: 'trio',
      type: 'trio',
      badge: 'OFERTA EXCLUSIVA • CONJUNTO DE BOLSO',
      badgeIcon: 'gift',
      title: '3 PERFUMES DE BOLSO POR',
      highlightText: 'R$ 89,90',
      subtitle: 'Escolha 3 frascos de 15ml com 36% de concentração e leve sua assinatura para onde quiser.',
      tagline: 'Apenas R$ 29,96 por unidade',
      priceText: 'De R$ 135,00 por R$ 89,90 (3x 15ml)',
      imageUrl: 'https://i.postimg.cc/prj0ymzT/Trio-de-Bolso.jpg',
      ctaText: 'MONTAR MEU TRIO DE BOLSO',
      ctaType: 'trio',
    },
    {
      id: 'baccarat',
      type: 'product',
      badge: 'MAIS DESEJADO • SÉRIE OURO',
      badgeIcon: 'award',
      title: 'BACCARAT ROUGE',
      highlightText: '540',
      subtitle: 'Uma obra-prima mineral e ambarada com açafrão dourado e âmbar cinzento radiante.',
      tagline: '36% de Essência Pura • Extrait de Parfum',
      priceText: 'R$ 130,00',
      imageUrl: 'https://i.postimg.cc/BvnZXBCw/Banner-Baccarat.jpg',
      ctaText: 'VER BACCARAT EM DETALHES',
      ctaType: 'product',
      productId: baccarat?.id || 'swiss-03-baccarat',
    },
    {
      id: 'salvage',
      type: 'product',
      badge: 'CAMPEÃO DE ELOGIOS • MASCULINO',
      badgeIcon: 'sparkles',
      title: 'SALVAGE SWISS',
      highlightText: 'EXTRAIT',
      subtitle: 'O frescor selvagem da pimenta de Sichuan e bergamota com a potência do ambroxan.',
      tagline: 'Fixação estimada de 8h a 12h+ na pele',
      priceText: 'R$ 130,00',
      imageUrl: 'https://i.postimg.cc/rpb3mX3Q/banner-salvage.jpg',
      ctaText: 'COMPRAR SALVAGE',
      ctaType: 'product',
      productId: salvage?.id || 'swiss-04-sauvage',
    },
    {
      id: 'aliem',
      type: 'product',
      badge: 'SUCESSO FEMININO • MÍSTICA & SENSUAL',
      badgeIcon: 'zap',
      title: 'ALIEM LUXURY',
      highlightText: 'PARFUM',
      subtitle: 'Jasmin Sambac da Índia radiante enriquecido por madeira de cashmeran e âmbar branco.',
      tagline: 'Fragrância marcante e inesquecível',
      priceText: 'R$ 130,00',
      imageUrl: 'https://i.postimg.cc/Gpm3Hxj5/Banner-Aliem.jpg',
      ctaText: 'COMPRAR ALIEM',
      ctaType: 'product',
      productId: aliem?.id || 'swiss-13-aliem',
    },
    {
      id: 'pix',
      type: 'promo',
      badge: 'PAGAMENTO SEGURO • CHECKOUT DIRETO',
      badgeIcon: 'shield',
      title: '5% OFF EM TODO O SITE',
      highlightText: 'NO PIX',
      subtitle: 'Compre no checkout transparente com desconto automático e aprovação imediata.',
      tagline: 'Parcelamento em até 12x no cartão de crédito',
      priceText: '5% OFF',
      ctaText: 'EXPLORAR CATÁLOGO COMPLETO',
      ctaType: 'scroll',
    }
  ];

  // Auto-play timer (5s)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleCtaClick = (slide: HeroSlide) => {
    if (slide.ctaType === 'trio' && onOpenTrioBuilder) {
      onOpenTrioBuilder();
      return;
    }
    if (slide.ctaType === 'scroll') {
      onChoosePerfume();
      return;
    }
    if (slide.ctaType === 'whatsapp') {
      onOpenWhatsApp();
      return;
    }
    if (slide.ctaType === 'product' && slide.productId && onQuickView) {
      const found = products.find(p => p.id === slide.productId);
      if (found) {
        onQuickView(found);
        return;
      }
    }
    onChoosePerfume();
  };

  const currentSlide = slides[currentIndex];

  const renderBadgeIcon = (type: string) => {
    switch (type) {
      case 'award': return <Award className="w-3.5 h-3.5 text-[#C5A059]" />;
      case 'sparkles': return <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />;
      case 'zap': return <Zap className="w-3.5 h-3.5 text-[#C5A059]" />;
      case 'gift': return <Gift className="w-3.5 h-3.5 text-[#C5A059]" />;
      case 'shield': return <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />;
      default: return <Award className="w-3.5 h-3.5 text-[#C5A059]" />;
    }
  };

  return (
    <section 
      className="relative min-h-[80vh] lg:min-h-[88vh] flex items-center justify-center bg-[#0B0B0B] text-white overflow-hidden pt-16 sm:pt-20 pb-4 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Central Background Video Overlay (Only shown on non-image slides) */}
      {!currentSlide.imageUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={heroImg}
            className="w-full h-full object-cover object-center opacity-35 scale-105 transform transition-transform duration-[10000ms]"
          >
            <source
              src="https://assets.mixkit.co/videos/3141/3141-720.mp4"
              type="video/mp4"
            />
            <img 
              src={heroImg}
              alt="Perfumes Premium Swiss"
              className="w-full h-full object-cover object-center"
            />
          </video>
          {/* Soft dark vignettes across center stage */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-[#0B0B0B]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/20 to-[#0B0B0B]" />
        </div>
      )}

      {/* LEFT & RIGHT SIDE MODELS - Only on Main Hero & 5% OFF Pix Slides */}
      {!currentSlide.imageUrl && (
        <>
          {/* LEFT SIDE MODEL */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute left-0 top-0 bottom-0 w-1/2 lg:w-[30%] z-1 pointer-events-none select-none overflow-hidden"
          >
            <div className="relative w-full h-full opacity-35 lg:opacity-100">
              <img 
                src={maleModelGeneric} 
                alt="Modelo Masculino High Fashion Swiss Atelier" 
                className="w-full h-full object-cover object-top opacity-90 lg:hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0B0B0B]/30 lg:via-[#0B0B0B]/20 to-[#0B0B0B]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/70" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-transparent to-[#0B0B0B]" />
            </div>
          </motion.div>

          {/* RIGHT SIDE MODEL */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-[30%] z-1 pointer-events-none select-none overflow-hidden"
          >
            <div className="relative w-full h-full opacity-35 lg:opacity-100">
              <img 
                src={femaleModelGeneric} 
                alt="Modelo Feminino High Fashion Swiss Atelier" 
                className="w-full h-full object-cover object-top opacity-90 lg:hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0B0B0B]/30 lg:via-[#0B0B0B]/20 to-[#0B0B0B]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/70" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-transparent to-[#0B0B0B]" />
            </div>
          </motion.div>
        </>
      )}

      {/* CAROUSEL CONTAINER */}
      <div className="relative z-10 w-full min-h-[80vh] lg:min-h-[88vh] flex flex-col justify-between">

        {/* Slide Content Area */}
        <div className="w-full flex-1 flex items-center justify-center relative">
          
          {/* Side Floating Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Banner anterior"
            className="absolute left-1.5 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-black/80 hover:bg-[#C5A059] text-white hover:text-black border border-[#C5A059]/40 transition-all flex items-center justify-center cursor-pointer shadow-2xl backdrop-blur-md group"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 transform group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Próximo banner"
            className="absolute right-1.5 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-black/80 hover:bg-[#C5A059] text-white hover:text-black border border-[#C5A059]/40 transition-all flex items-center justify-center cursor-pointer shadow-2xl backdrop-blur-md group"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 transform group-hover:translate-x-0.5 transition-transform" />
          </button>

          <AnimatePresence mode="wait">
            {currentSlide.imageUrl ? (
              /* FULL EDGE-TO-EDGE UNCROPPED WEBSITE BANNER */
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleCtaClick(currentSlide)}
                className="w-full max-w-[1500px] mx-auto relative overflow-hidden cursor-pointer group bg-[#0B0B0B]"
              >
                {/* Full Width Banner Graphic Image - 100% Uncropped */}
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  className="w-full h-auto min-h-[220px] sm:min-h-0 max-h-[82vh] object-cover sm:object-contain object-center transition-transform duration-700 group-hover:scale-[1.005] block"
                />

                {/* SPECIAL HIGH-IMPACT TYPOGRAPHY OVERLAY FOR TRIO DE BOLSO BANNER */}
                {currentSlide.id === 'trio' ? (
                  <div className="absolute inset-0 z-20 flex flex-col justify-between p-2.5 sm:p-8 md:pl-28 md:py-12 pointer-events-none bg-gradient-to-r from-black/90 via-black/50 to-transparent sm:from-black/80 sm:via-black/30 sm:to-transparent pl-8 sm:pl-20 md:pl-28">
                    {/* Top Row Badges */}
                    <div className="flex items-center justify-between w-full pointer-events-auto">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-3.5 sm:py-1.5 rounded-full bg-black/80 border border-[#C5A059] text-[#C5A059] font-bold text-[8px] sm:text-xs backdrop-blur-md shadow-lg">
                        <Gift className="w-2.5 h-2.5 sm:w-4 sm:h-4 text-[#C5A059]" />
                        <span className="uppercase tracking-wider text-white">
                          OFERTA IMPERDÍVEL
                        </span>
                      </div>

                      <div className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#C5A059] text-black font-extrabold text-[8px] sm:text-xs uppercase shadow-lg">
                        ECONOMIZE R$ 45,10
                      </div>
                    </div>

                    {/* Middle Main Content */}
                    <div className="my-auto pointer-events-auto space-y-0.5 sm:space-y-3 max-w-[80%] sm:max-w-lg text-left">
                      <span className="text-[8px] sm:text-xs font-sans tracking-[0.15em] sm:tracking-[0.25em] uppercase text-[#C5A059] font-bold block drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                        MONTE SEU CONJUNTO PERSONALIZADO
                      </span>

                      <h2 className="font-serif text-base sm:text-4xl md:text-5xl font-normal text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
                        3 PERFUMES DE BOLSO <br className="hidden sm:inline" />
                        <span className="text-[#C5A059] italic font-serif text-lg sm:text-5xl md:text-6xl font-normal drop-shadow-[0_4px_25px_rgba(0,0,0,1)]">
                          POR R$ 89,90
                        </span>
                      </h2>

                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 pt-0.5">
                        <span className="text-[#C5A059] font-extrabold text-[9px] sm:text-sm tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                          DE R$ 135,00 POR R$ 89,90
                        </span>
                        <span className="text-emerald-400 font-bold text-[8px] sm:text-xs drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                          • R$ 29,96/UN
                        </span>
                      </div>

                      <p className="text-[11px] sm:text-sm text-neutral-100 leading-snug font-sans font-normal hidden sm:block max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
                        Escolha 3 frascos de 15ml com <strong className="text-white font-semibold">36% de Concentração Pura</strong> e leve sua assinatura olfativa onde for.
                      </p>

                      <div className="pt-0.5 sm:pt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCtaClick(currentSlide);
                          }}
                          className="px-3 py-1.5 sm:px-8 sm:py-3 bg-[#C5A059] hover:bg-white text-black transition-all duration-300 text-[9px] sm:text-sm font-extrabold tracking-wider sm:tracking-[0.2em] uppercase flex items-center gap-1.5 shadow-2xl cursor-pointer group rounded-none"
                        >
                          <span>MONTAR MEU TRIO DE BOLSO</span>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Features Strip */}
                    <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-neutral-200 pointer-events-auto drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                      <span>✓ 15ml cada frasco</span>
                      <span>✓ Fixação 8h-12h+</span>
                      <span>✓ Envio Imediato</span>
                    </div>
                  </div>
                ) : (
                  /* DEFAULT OVERLAY FOR PRODUCT BANNERS (BACCARAT, SALVAGE, ALIEM) */
                  <>
                    {/* Top Promo Badge Overlay */}
                    <div className="absolute top-3 left-8 sm:top-5 sm:left-20 md:left-28 z-20 pointer-events-auto flex flex-col items-start gap-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/90 border border-[#C5A059]/70 text-[#C5A059] font-bold text-[9px] sm:text-xs shadow-2xl backdrop-blur-md">
                        {renderBadgeIcon(currentSlide.badgeIcon)}
                        <span className="uppercase tracking-wider text-white">
                          {currentSlide.badge}
                        </span>
                      </div>
                    </div>

                    {/* Floating Interactive CTA Button */}
                    <div className="absolute bottom-3 left-8 right-3 sm:left-20 md:left-28 sm:right-auto sm:bottom-6 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCtaClick(currentSlide);
                        }}
                        className="px-3.5 py-1.5 sm:px-7 sm:py-3 bg-white text-black hover:bg-[#C5A059] transition-all duration-300 text-[10px] sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase flex items-center gap-1.5 shadow-2xl cursor-pointer group"
                      >
                        <span>{currentSlide.ctaText}</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>

                      {currentSlide.priceText && (
                        <span className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-none bg-black/85 border border-[#C5A059]/60 text-[#C5A059] font-bold text-[10px] sm:text-xs shadow-xl backdrop-blur-md">
                          {currentSlide.priceText}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              /* BRAND EDITORIAL HERO (MAIN HERO & 5% OFF PIX) */
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-5 max-w-4xl mx-auto px-4 text-center py-12 sm:py-16"
              >
                {/* Subtle Luxury Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A059]/40 bg-black/70 backdrop-blur-md">
                  {renderBadgeIcon(currentSlide.badgeIcon)}
                  <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] uppercase text-neutral-200 font-light">
                    {currentSlide.badge}
                  </span>
                </div>

                {/* Main Slide Title */}
                <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white leading-[1.12] max-w-4xl mx-auto drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  {currentSlide.title}{' '}
                  {currentSlide.highlightText && (
                    <span className="text-[#C5A059] italic font-serif underline decoration-[#C5A059]/40 decoration-2 underline-offset-4">
                      {currentSlide.highlightText}
                    </span>
                  )}
                </h1>

                {/* Subtitle & Tagline */}
                <div className="space-y-3 max-w-2xl mx-auto">
                  <p className="text-xs sm:text-base md:text-lg font-sans font-light tracking-wide text-neutral-200 leading-relaxed">
                    {currentSlide.subtitle}
                  </p>
                  {currentSlide.tagline && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-medium tracking-wider text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                      <span>{currentSlide.tagline}</span>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <button
                    onClick={() => handleCtaClick(currentSlide)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white text-black hover:bg-[#C5A059] transition-all duration-300 rounded-none text-xs sm:text-sm font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2.5 shadow-2xl cursor-pointer group"
                  >
                    <span>{currentSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={onOpenWhatsApp}
                    className="text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-light tracking-wider py-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Falar no WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Carousel Controls (Indicators) */}
        <div className="relative z-20 pt-5 pb-2 flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            aria-label="Anterior"
            className="w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#C5A059] hover:text-black transition-all flex items-center justify-center cursor-pointer shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className="group relative py-2 cursor-pointer"
              >
                <div className={`h-2 rounded-full transition-all duration-500 ${
                  idx === currentIndex
                    ? 'w-9 bg-[#C5A059] shadow-[0_0_12px_rgba(197,160,89,0.9)]'
                    : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`} />
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            aria-label="Próximo"
            className="w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white hover:bg-[#C5A059] hover:text-black transition-all flex items-center justify-center cursor-pointer shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Indicators Bar */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-left border-t border-white/10 pt-4 max-w-3xl mx-auto opacity-90">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white">36% Concentração</p>
              <p className="text-[10px] text-neutral-400 font-light">Extrait de Parfum</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white">Fixação Estimada</p>
              <p className="text-[10px] text-neutral-400 font-light">8h a 12h na pele</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Award className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white">Essências Importadas</p>
              <p className="text-[10px] text-neutral-400 font-light">Perfumaria Internacional</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white">Atendimento Humano</p>
              <p className="text-[10px] text-neutral-400 font-light">Consultoria no WhatsApp</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


