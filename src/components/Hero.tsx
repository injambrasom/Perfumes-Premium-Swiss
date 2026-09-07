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
      priceText: '3x 15ml',
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
      imageUrl: 'https://i.postimg.cc/pd74Tb46/Banner-Baccarat.png',
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
      imageUrl: 'https://i.postimg.cc/0N3FQRFH/Banner-Aliem.png',
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
      className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center bg-[#0B0B0B] text-white overflow-hidden py-12 lg:py-16 pt-20 lg:pt-24 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Central Background Video Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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

      {/* LEFT SIDE MODEL - Seamlessly Integrated into the Background */}
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

      {/* RIGHT SIDE MODEL - Seamlessly Integrated into the Background */}
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

      {/* CENTER CONTENT CAROUSEL STAGE */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 text-center pt-6 lg:pt-2 w-full min-h-[460px] sm:min-h-[520px] flex flex-col justify-between">

        {/* Carousel Slide Wrapper */}
        <div className="my-auto w-full relative">
          {/* Side Floating Navigation Arrows (Desktop & Tablet) */}
          <button
            onClick={handlePrev}
            aria-label="Banner anterior"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-[#C5A059] text-white hover:text-black border border-[#C5A059]/40 transition-all flex items-center justify-center cursor-pointer shadow-2xl backdrop-blur-md group"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Próximo banner"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-[#C5A059] text-white hover:text-black border border-[#C5A059]/40 transition-all flex items-center justify-center cursor-pointer shadow-2xl backdrop-blur-md group"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-0.5 transition-transform" />
          </button>

          <AnimatePresence mode="wait">
            {currentSlide.imageUrl ? (
              /* FULL SIZE E-COMMERCE WEBSITE BANNER */
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                onClick={() => handleCtaClick(currentSlide)}
                className="relative w-full h-[300px] xs:h-[350px] sm:h-[420px] md:h-[480px] lg:h-[520px] rounded-2xl overflow-hidden border border-[#C5A059]/50 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.95)] cursor-pointer group"
              >
                {/* Full-width Banner Image */}
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                />

                {/* Luxury Gradient Overlay to ensure text readability on any banner */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-black/90 sm:via-black/50 sm:to-transparent flex flex-col justify-end sm:justify-center p-4 sm:p-8 md:p-12 text-left pointer-events-none">
                  <div className="max-w-xl pointer-events-auto space-y-2 sm:space-y-3">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/60 bg-black/80 backdrop-blur-md shadow-lg">
                      {renderBadgeIcon(currentSlide.badgeIcon)}
                      <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase text-neutral-200 font-medium">
                        {currentSlide.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
                      {currentSlide.title}{' '}
                      {currentSlide.highlightText && (
                        <span className="text-[#C5A059] italic font-serif">
                          {currentSlide.highlightText}
                        </span>
                      )}
                    </h2>

                    {/* Subtitle & Tagline */}
                    <p className="text-xs sm:text-sm md:text-base text-neutral-200 font-light leading-relaxed drop-shadow-md max-w-lg line-clamp-2 sm:line-clamp-none">
                      {currentSlide.subtitle}
                    </p>

                    {currentSlide.tagline && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] sm:text-xs font-medium tracking-wide text-neutral-200 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                        <span>{currentSlide.tagline}</span>
                      </div>
                    )}

                    {/* Buttons & Price Tag */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCtaClick(currentSlide);
                        }}
                        className="px-6 sm:px-8 py-3 bg-white text-black hover:bg-[#C5A059] transition-all duration-300 rounded-none text-xs sm:text-sm font-bold tracking-[0.2em] uppercase flex items-center gap-2.5 shadow-2xl cursor-pointer group"
                      >
                        <span>{currentSlide.ctaText}</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>

                      {currentSlide.priceText && (
                        <span className="px-4 py-2 rounded-full bg-black/80 border border-[#C5A059]/60 text-[#C5A059] font-bold text-xs sm:text-sm shadow-xl backdrop-blur-md">
                          {currentSlide.priceText}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* BRAND EDITORIAL HERO (SLIDE 1 / PROMO) */
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-5 max-w-4xl mx-auto py-4 sm:py-8"
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


