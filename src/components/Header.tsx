import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Menu, X, Sparkles, ChevronRight, MessageCircle } from 'lucide-react';
import { ANNOUNCEMENT_MESSAGES } from '../data/content';
import { SwissFlagIcon, FranceFlagIcon } from './CountryFlags';
const LOGO_IMAGE_URL = 'https://i.postimg.cc/FKSJcM7t/Chat-GPT-Image-8-de-ago-de-2026-21-14-16.png';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenQuiz: () => void;
  onOpenCart: () => void;
  onOpenTrioBuilder?: () => void;
  onOpenPolicy?: () => void;
  onOpenWhatsApp?: () => void;
  cartCount: number;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenQuiz,
  onOpenCart,
  onOpenTrioBuilder,
  onOpenPolicy,
  onOpenWhatsApp,
  cartCount,
  activeCategory,
  onSelectCategory
}) => {
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Início', value: 'Todos' },
    { label: 'Masculinos', value: 'Masculino' },
    { label: 'Femininos', value: 'Feminino' },
    { label: 'Árabes', value: 'Árabe' },
    { label: 'Nicho', value: 'Nicho' },
    { label: 'Mais Vendidos', value: 'Mais Vendidos' }
  ];

  const handleWhatsAppContact = () => {
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      const text = encodeURIComponent(
        'PERFUMES PREMIUM SWISS ATELIER\nOlá! Gostaria de falar com um perfumista e tirar dúvidas.'
      );
      window.open(`https://wa.me/5554999893370?text=${text}`, '_blank');
    }
  };

  const handleNavClick = (val: string) => {
    setIsMobileMenuOpen(false);
    
    if (val === 'Todos' || val === 'Início') {
      onSelectCategory('Todos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (val === 'Trio') {
      if (onOpenTrioBuilder) onOpenTrioBuilder();
      const el = document.getElementById('trio-bolso-builder');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 1200, behavior: 'smooth' });
      }
      return;
    }

    if (val === 'Contato') {
      const el = document.getElementById('footer');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
      return;
    }

    onSelectCategory(val);
    const catalogEl = document.getElementById('signature-collection');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-black/80 backdrop-blur-md text-white border-b border-[#C5A059]/30 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#050507] text-[#E0C078] py-2 px-4 text-xs tracking-widest uppercase font-light text-center relative overflow-hidden border-b border-[#C5A059]/20">
        <AnimatePresence mode="wait">
          <motion.div
            key={announcementIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2"
          >
            {announcementIdx === 1 ? (
              <span className="flex items-center gap-2 justify-center">
                <SwissFlagIcon className="w-4 h-4 shadow" />
                <FranceFlagIcon className="w-4 h-4 shadow" />
                <span>Formuladas com extratos das renomadas casas Firmenich (Suíça) e Robertet (França)</span>
              </span>
            ) : (
              <span>{ANNOUNCEMENT_MESSAGES[announcementIdx]}</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Navbar Row 1: Logo & Navigation */}
      <div
        className={`w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-2.5 sm:py-3'
        } flex items-center justify-between gap-3 sm:gap-4`}
      >
        {/* Mobile / Tablet Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="xl:hidden text-white p-1 -ml-1 focus:outline-none shrink-0 cursor-pointer hover:text-[#C5A059] transition-colors"
          aria-label="Abrir Menu"
        >
          <Menu className="w-6 h-6 text-[#C5A059]" />
        </button>

        {/* Logo */}
        <div className="min-w-0 flex-1">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('Todos');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 sm:gap-4 group text-left cursor-pointer max-w-full"
          >
            <div className="w-11 h-11 sm:w-16 sm:h-16 xl:w-20 xl:h-20 rounded-full border-2 border-[#C5A059] overflow-hidden shrink-0 shadow-[0_0_20px_rgba(197,160,89,0.35)] p-0.5 bg-black transition-transform duration-300 group-hover:scale-105">
              <img 
                src={LOGO_IMAGE_URL} 
                alt="Logo Perfumes Premium Swiss" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <span className="block font-serif text-[12.5px] min-[360px]:text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-[0.03em] sm:tracking-[0.08em] font-bold text-white uppercase leading-tight drop-shadow-md">
                PERFUMES PREMIUM SWISS
              </span>
              <span className="block text-[9px] sm:text-xs lg:text-sm font-sans tracking-[0.2em] sm:tracking-[0.28em] font-medium text-[#C5A059] uppercase mt-0.5">
                SWISS ATELIER
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-2 2xl:space-x-4 text-xs font-medium tracking-wider uppercase text-neutral-200 shrink-0">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.value)}
              className="hover:text-[#E0C078] transition-colors py-1 relative group cursor-pointer whitespace-nowrap"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C5A059] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>
      </div>

      {/* Row 2: Secondary Action Bar (Main action buttons in 2x2 grid on mobile, row on desktop) */}
      <div className="w-full bg-[#08080B]/95 border-t border-[#C5A059]/25 py-2 px-2.5 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-center xl:justify-end sm:gap-3">
          {/* 1. Reference Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase tracking-wider text-neutral-200 hover:text-white py-2 sm:py-1.5 px-2 sm:px-3.5 border border-[#C5A059]/60 hover:border-[#C5A059] transition-all rounded-full bg-black/60 backdrop-blur-xs cursor-pointer shadow-sm hover:scale-105"
            title="Buscar por Perfume de Referência"
          >
            <Search className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span className="font-medium truncate">Perfume Referência</span>
          </button>

          {/* 2. Perfume Quiz Trigger */}
          <button
            onClick={onOpenQuiz}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase tracking-wider text-black bg-[#C5A059] hover:bg-white transition-all py-2 sm:py-1.5 px-2.5 sm:px-3.5 border border-[#C5A059] rounded-full font-bold shadow-md cursor-pointer hover:scale-105"
            title="Fazer Quiz Olfativo"
          >
            <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />
            <span className="font-bold truncate">Quiz Olfativo</span>
          </button>

          {/* 3. Direct WhatsApp Contact Button */}
          <button
            onClick={handleWhatsAppContact}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase tracking-wider text-neutral-100 hover:text-white py-2 sm:py-1.5 px-2 sm:px-3.5 border border-[#C5A059]/60 hover:border-[#C5A059] bg-[#0E0E12] transition-all rounded-full font-medium shadow-md cursor-pointer hover:scale-105"
            title="Falar no WhatsApp com Consultor Olfativo"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-semibold truncate">Fale com Consultor</span>
          </button>

          {/* 4. Sacola Button */}
          <button
            onClick={onOpenCart}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#1A140B] via-[#2A2012] to-[#1A140B] hover:from-[#C5A059] hover:to-[#E0C078] text-[#E0C078] hover:text-black py-2 sm:py-1.5 px-3 sm:px-4 border-2 border-[#C5A059] rounded-full shadow-[0_0_15px_rgba(197,160,89,0.4)] transition-all duration-300 cursor-pointer font-bold group hover:scale-105"
            aria-label="Abrir Sacola de Compras"
            title="Sua Sacola de Compras"
          >
            <div className="relative">
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059] group-hover:text-black transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-mono text-[11px] sm:text-xs font-extrabold uppercase tracking-wider truncate">
              Sacola {cartCount > 0 && `(${cartCount})`}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer from Left */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 xl:hidden cursor-pointer"
            />

            {/* Slide Drawer from Left */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 left-0 bottom-0 w-[88%] max-w-sm sm:max-w-md h-[100dvh] bg-[#0A0A0E] text-white z-50 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto border-r border-[#C5A059]/30 shadow-[10px_0_35px_rgba(0,0,0,0.85)] xl:hidden"
            >
              {/* Drawer Content */}
              <div className="flex-1 flex flex-col justify-start">
                <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/30">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-full border-2 border-[#C5A059] overflow-hidden shrink-0 p-0.5 bg-black shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                      <img 
                        src={LOGO_IMAGE_URL} 
                        alt="Logo Perfumes Premium Swiss" 
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-serif text-base font-bold tracking-[0.06em] text-white uppercase leading-tight">
                        PERFUMES PREMIUM SWISS
                      </span>
                      <span className="block text-[10px] font-sans tracking-[0.25em] font-medium text-[#C5A059] uppercase mt-0.5">
                        SWISS ATELIER
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-neutral-300 hover:text-white bg-white/5 hover:bg-[#C5A059]/20 border border-[#C5A059]/40 rounded-full transition-colors cursor-pointer shrink-0"
                    aria-label="Fechar Menu"
                  >
                    <X className="w-5 h-5 text-[#C5A059]" />
                  </button>
                </div>

                {/* Categorias uma em baixo da outra (apenas o nome sem estar dentro da caixa) */}
                <div className="mt-4 divide-y divide-white/10">
                  {menuItems.map((item) => {
                    const isActive = activeCategory === item.value;
                    return (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item.value)}
                        className={`w-full text-left py-3 px-1 text-sm tracking-[0.15em] uppercase transition-all flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? 'text-[#C5A059] font-bold pl-2'
                            : 'text-neutral-200 hover:text-white font-medium hover:pl-2'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-[#C5A059]' : 'text-neutral-500'}`} />
                      </button>
                    );
                  })}

                  {/* Monte seu Kit de Bolso */}
                  {onOpenTrioBuilder && (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenTrioBuilder();
                      }}
                      className="w-full text-left py-3 px-1 text-sm tracking-[0.15em] uppercase text-[#E0C078] hover:text-white font-bold transition-all flex items-center justify-between group cursor-pointer hover:pl-2"
                    >
                      <span className="truncate">🎁 Monte seu Kit de Bolso (3x 15ml)</span>
                      <ChevronRight className="w-4 h-4 text-[#C5A059] transition-transform group-hover:translate-x-1" />
                    </button>
                  )}

                  {/* Política de Compras */}
                  {onOpenPolicy && (
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenPolicy();
                      }}
                      className="w-full text-left py-3 px-1 text-sm tracking-[0.15em] uppercase text-neutral-300 hover:text-white font-medium transition-all flex items-center justify-between group cursor-pointer hover:pl-2"
                    >
                      <span className="truncate">📜 Política de Compras SWISS ATELIER</span>
                      <ChevronRight className="w-4 h-4 text-neutral-500 transition-transform group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </div>

              {/* Rodapé discreto */}
              <div className="pt-4 border-t border-white/10 mt-4 text-center">
                <p className="text-[10px] text-[#C5A059] tracking-[0.2em] uppercase font-mono">
                  Essências Importadas 36% Concentração
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
