import luxuryImg from "../assets/images/luxury_lifestyle_scent_1785456165867.jpg";
import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Quote } from 'lucide-react';

export const OlfactoryExperience: React.FC = () => {
  return (
    <section className="relative py-28 bg-black/20 text-white overflow-hidden">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img 
          src={luxuryImg}
          alt="Experiência Olfativa de Luxo"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
          
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-neutral-950" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="w-12 h-12 border border-[#C5A059]/50 rounded-full flex items-center justify-center mx-auto bg-black/50 backdrop-blur-md">
            <Quote className="w-5 h-5 text-[#C5A059]" />
          </div>

          <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#C5A059] block">
            EXPERIÊNCIA OLFATIVA
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal leading-tight tracking-wide text-white">
            Mais do que perfume.
            <span className="block mt-2 font-serif italic text-[#C5A059]">
              Uma presença que marca.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed pt-2">
            O aroma certo precede sua chegada e permanece suavemente após sua partida.
            É a expressão invisível do seu caráter, da sua confiança e do seu estilo.
          </p>

          <div className="pt-6 inline-flex items-center gap-4 text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 border-t border-white/10">
            <span>SWISS ATELIER</span>
            <span>•</span>
            <span>PARIS</span>
            <span>•</span>
            <span>RIO GRANDE DO SUL</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
