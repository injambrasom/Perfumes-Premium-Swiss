import React from 'react';
import { motion } from 'motion/react';
import { Check, Globe, ShieldCheck, HeartHandshake, Gem, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_PILLARS } from '../data/content';

export const WhySwiss: React.FC = () => {
  const checkDifferentials = [
    'Essências provenientes das renomadas casas Firmenich (Suíça) e Robertet (França)',
    'Alta concentração de essência (Extrait de Parfum 30%+)',
    'Excelente projeção marcante sem agressão inicial',
    'Longa duração (8h a 12h+ garantidas na pele)',
    'Frascos premium com vidro pesado e tampa magnética',
    'Acabamento sofisticado e caixa estilo joalheria',
    'Atendimento humanizado com consultoria especializada'
  ];

  return (
    <section className="py-24 bg-black/40 text-white border-t border-b border-[#C5A059]/20 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Por Que Escolher a Premium Swiss (4 Pillars) */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-sans tracking-[0.35em] uppercase text-[#C5A059] font-semibold block mb-2">
            EXCLUSIVIDADE &amp; COMPROMISSO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-white">
            Por que escolher a Premium Swiss?
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {WHY_CHOOSE_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 bg-black/60 border border-white/10 hover:border-[#C5A059]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="block font-serif text-3xl text-[#C5A059] font-light mb-4">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-[#C5A059] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {pillar.text}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>Padrão Suíço</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 2: Lista de Diferenciais Mínimos */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="bg-black/70 border border-[#C5A059]/30 text-white p-8 sm:p-12 relative overflow-hidden backdrop-blur-md">
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A059] block mb-1">
                  GARANTIA DE QUALIDADE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white">
                  O Padrão de Excelência da Nossa Marca
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {checkDifferentials.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-black/50 border border-white/10 rounded-none text-neutral-200 backdrop-blur-xs"
                  >
                    <div className="p-1 bg-[#C5A059]/20 text-[#C5A059] rounded-full shrink-0 mt-0.5">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-light text-neutral-200 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
