import heroImg from "../assets/images/hero_perfume_marble_1785456140904.jpg";
import maleModelGeneric from "../assets/images/male_model_generic_hero_1786409144275.jpg";
import femaleModelGeneric from "../assets/images/female_model_generic_hero_1786409156662.jpg";
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, ShieldCheck, Sparkles, Award, Gift } from 'lucide-react';
import { SwissFlagIcon, FranceFlagIcon } from './CountryFlags';

interface HeroProps {
  onChoosePerfume: () => void;
  onOpenWhatsApp: () => void;
  onOpenTrioBuilder?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onChoosePerfume, onOpenWhatsApp, onOpenTrioBuilder }) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[95vh] flex items-center justify-center bg-[#0B0B0B] text-white overflow-hidden py-12 lg:py-20">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/30 to-[#0B0B0B]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/20 to-[#0B0B0B]" />
      </div>

      {/* LEFT SIDE MODEL - Seamlessly Integrated into the Background (No Box / No Frame) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute left-0 top-0 bottom-0 w-1/2 lg:w-[30%] z-1 pointer-events-none select-none overflow-hidden"
      >
        <div className="relative w-full h-full opacity-40 lg:opacity-100">
          <img 
            src={maleModelGeneric} 
            alt="Modelo Masculino High Fashion Swiss Atelier" 
            className="w-full h-full object-cover object-top opacity-90 lg:hover:opacity-100 transition-opacity duration-700"
          />
          {/* Edge blend overlays to merge seamlessly into dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0B0B0B]/30 lg:via-[#0B0B0B]/20 to-[#0B0B0B]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-transparent to-[#0B0B0B]" />
        </div>
      </motion.div>

      {/* RIGHT SIDE MODEL - Seamlessly Integrated into the Background (No Box / No Frame) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-[30%] z-1 pointer-events-none select-none overflow-hidden"
      >
        <div className="relative w-full h-full opacity-40 lg:opacity-100">
          <img 
            src={femaleModelGeneric} 
            alt="Modelo Feminino High Fashion Swiss Atelier" 
            className="w-full h-full object-cover object-top opacity-90 lg:hover:opacity-100 transition-opacity duration-700"
          />
          {/* Edge blend overlays to merge seamlessly into dark background */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0B0B0B]/30 lg:via-[#0B0B0B]/20 to-[#0B0B0B]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/80 via-transparent to-[#0B0B0B]" />
        </div>
      </motion.div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 lg:pt-0">

        {/* Subtle Luxury Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A059]/40 bg-black/60 backdrop-blur-md mb-6"
        >
          <Award className="w-3.5 h-3.5 text-[#C5A059]" />
          <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-neutral-200 font-light">
            ATELIÊ DE ALTA PERFUMARIA • SWISS ESSENCES
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-normal tracking-wide text-white leading-[1.12] max-w-3xl mx-auto drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
        >
          A ESSÊNCIA DA ALTA PERFUMARIA, REINTERPRETADA.
        </motion.h1>

        {/* Hero Subtitle & Concentration Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 space-y-3 max-w-2xl mx-auto"
        >
          <p className="text-sm sm:text-base md:text-lg font-sans font-light tracking-wide text-neutral-200 leading-relaxed">
            Essências importadas inspiradas nas fragrâncias mais desejadas do mundo.
          </p>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-medium tracking-wider text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span>36% de concentração • 15ml, 55ml e 100ml</span>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 flex flex-col items-center justify-center gap-4"
        >
          <button
            onClick={onChoosePerfume}
            className="w-full sm:w-auto px-10 py-4 bg-white text-black hover:bg-[#C5A059] transition-all duration-300 rounded-none text-xs sm:text-sm font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-2xl cursor-pointer group"
          >
            <span>EXPLORAR FRAGRÂNCIAS</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenWhatsApp}
            className="text-xs text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-light tracking-wider"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Falar com um consultor via WhatsApp</span>
          </button>
        </motion.div>

        {/* Trust Indicators Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-white/10 pt-6 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">36% Concentração</p>
              <p className="text-[11px] text-neutral-400 font-light">Extrait de Parfum</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">Fixação Estimada</p>
              <p className="text-[11px] text-neutral-400 font-light">8h a 12h na pele</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-4 h-4 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">Essências Importadas</p>
              <p className="text-[11px] text-neutral-400 font-light">Perfumaria Internacional</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MessageCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white">Atendimento Humano</p>
              <p className="text-[11px] text-neutral-400 font-light">Consultoria no WhatsApp</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

