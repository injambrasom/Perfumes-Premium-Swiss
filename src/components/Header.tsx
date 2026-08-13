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
  cartCount: number;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenQuiz,
  onOpenCart,
  onOpenTrioBuilder,
  cartCount,
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
    { label: '🎁 Trio de Bolso', value: 'Trio' },
    { label: 'Masculinos', value: 'Masculino' },
    { label: 'Femininos', value: 'Feminino' },
    { label: 'Árabes', value: 'Árabe' },
    { label: 'Nicho', value: 'Nicho' },
    { label: 'Mais Vendidos', value: 'Mais Vendidos' },
    { label: 'Contato', value: 'Contato' }
  ];

  const handleNavClick = (val: string) => {
    setIsMobileMenuOpen(false);
    if (val === 'Trio') {
      if (onOpenTrioBuilder) onOpenTrioBuilder();
      const el = document.getElementById('trio-bolso-builder');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (val === 'Contato') {
      const el = document.getElementById('footer');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    onSelectCategory(val);
    const catalogEl = document.getElementById('signature-collection');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
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
          isScrolled ? 'py-2' : 'py-3'
        } flex items-center justify-between gap-4`}
      >
        {/* Mobile / Tablet Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="xl:hidden text-white p-1.5 focus:outline-none shrink-0 cursor-pointer hover:text-[#C5A059] transition-colors"
          aria-label="Abrir Menu"
        >
          <Menu className="w-6 h-6 text-[#C5A059]" />
        </button>

        {/* Logo */}
        <div className="shrink-0 min-w-0">
          <a href="#" className="inline-flex items-center gap-3 sm:gap-4 group text-left">
            <div className="w-14 h-14 sm:w-18 sm:h-18 xl:w-20 xl:h-20 rounded-full border-2 border-[#C5A059] overflow-hidden shrink-0 shadow-[0_0_20px_rgba(197,160,89,0.35)] p-0.5 bg-black transition-transform duration-300 group-hover:scale-105">
              <img 
                src={LOGO_IMAGE_URL} 
                alt="Logo Perfumes Premium Swiss" 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0">
              <span className="block font-serif text-base sm:text-xl lg:text-2xl xl:text-3xl tracking-[0.08em] font-bold text-white uppercase leading-tight whitespace-nowrap drop-shadow-md">
                PERFUMES PREMIUM SWISS
              </span>
              <span className="block text-[10px] sm:text-xs lg:text-sm font-sans tracking-[0.28em] font-medium text-[#C5A059] uppercase mt-0.5 whitespace-nowrap">
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

        {/* Mobile Quick Cart Trigger */}
        <div className="xl:hidden shrink-0">
          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 bg-[#1A140B] text-[#E0C078] py-1.5 px-3 border border-[#C5A059] rounded-full text-xs font-bold"
            title="Abrir Sacola"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
            <span>({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Row 2: Secondary Action Bar (Three main action buttons on a dedicated second line) */}
      <div className="w-full bg-[#08080B]/90 border-t border-[#C5A059]/25 py-2 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto flex items-center justify-center xl:justify-end gap-2.5 sm:gap-4 flex-wrap">
          {/* Reference Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-200 hover:text-white py-1.5 px-3.5 border border-[#C5A059]/60 hover:border-[#C5A059] transition-all rounded-full bg-black/60 backdrop-blur-xs cursor-pointer shadow-sm hover:scale-105"
            title="Buscar por Perfume de Referência"
          >
            <Search className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
            <span className="font-medium text-xs whitespace-nowrap">Perfume de Referência</span>
          </button>

          {/* Perfume Quiz Trigger */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-black bg-[#C5A059] hover:bg-white transition-all py-1.5 px-3.5 border border-[#C5A059] rounded-full font-bold shadow-md cursor-pointer hover:scale-105"
            title="Fazer Quiz Olfativo"
          >
            <Sparkles className="w-3.5 h-3.5 text-black shrink-0" />
            <span className="whitespace-nowrap text-xs font-bold">Quiz Olfativo</span>
          </button>

          {/* Sacola Button */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-gradient-to-r from-[#1A140B] via-[#2A2012] to-[#1A140B] hover:from-[#C5A059] hover:to-[#E0C078] text-[#E0C078] hover:text-black py-1.5 px-4 border-2 border-[#C5A059] rounded-full shadow-[0_0_15px_rgba(197,160,89,0.4)] transition-all duration-300 cursor-pointer font-bold group hover:scale-105"
            aria-label="Abrir Sacola de Compras"
            title="Sua Sacola de Compras"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#C5A059] group-hover:text-black transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-black text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-mono text-xs font-extrabold uppercase tracking-wider whitespace-nowrap">
              Sacola {cartCount > 0 && `(${cartCount})`}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 xl:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl xl:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full border border-[#C5A059] overflow-hidden shrink-0 p-0.5 bg-black shadow-md">
                      <img 
                        src={LOGO_IMAGE_URL} 
                        alt="Logo Perfumes Premium Swiss" 
                        className="w-full h-full object-cover rounded-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="block font-serif text-base sm:text-lg font-bold tracking-[0.1em] text-neutral-950 uppercase leading-snug">
                        PERFUMES PREMIUM SWISS
                      </span>
                      <span className="block text-[10px] font-sans tracking-[0.25em] font-medium text-[#C5A059] uppercase mt-0.5">
                        SWISS ATELIER
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-neutral-500 hover:text-neutral-950"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mt-6 space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.value)}
                      className="w-full text-left py-3 px-2 text-sm font-light tracking-[0.2em] uppercase text-neutral-800 hover:bg-neutral-50 hover:pl-4 transition-all flex items-center justify-between border-b border-neutral-50"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-neutral-300" />
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenSearch();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-neutral-100 text-neutral-900 rounded-lg text-xs font-medium uppercase tracking-wider"
                  >
                    <Search className="w-4 h-4 text-[#C5A059]" />
                    <span>Buscar Perfume Equivalente</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenQuiz();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-neutral-950 text-white rounded-lg text-xs font-medium uppercase tracking-wider"
                  >
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Descubra Seu Perfume Ideal (Quiz)</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-100 text-center">
                <p className="text-[11px] text-neutral-500 tracking-wider">
                  Consultoria via WhatsApp disponível 24h
                </p>
                <a
                  href="https://wa.me/5554999893370?text=Ol%C3%A1,%20gostaria%20de%20ajuda%20para%20escolher%20meu%20perfume%20na%20Perfumes%20Premium%20Swiss."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 hover:underline tracking-wider uppercase"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Falar com Perfumista</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
