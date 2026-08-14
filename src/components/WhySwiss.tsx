import React from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { WHY_CHOOSE_PILLARS } from '../data/content';

export const WhySwiss: React.FC = () => {
  const checkDifferentials = [
    '36% de concentração de essência (Extrait de Parfum) em todas as volumetrias',
    'Matérias-primas importadas provenientes de fornecedores de perfumaria internacional',
    'Desenvolvimento olfativo marcante na pele com fixação estimada de 8h a 12h',
    'Fotografias e apresentações fiéis ao produto real entregue',
    'Consultoria olfativa individualizada via WhatsApp'
  ];

  return (
    <section className="py-24 bg-black/40 text-white border-t border-b border-white/10 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Por Que Perfumes Premium Swiss? */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-sans tracking-[0.35em] uppercase text-[#C5A059] font-semibold block mb-2">
            NOSSO COMPROMISSO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-white">
            Por que Perfumes Premium Swiss?
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base font-serif italic text-neutral-300 tracking-wider">
            &ldquo;Você escolhe a fragrância. Nós cuidamos da experiência.&rdquo;
          </p>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WHY_CHOOSE_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 sm:p-8 bg-black/60 border border-white/10 hover:border-[#C5A059]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="block font-serif text-3xl text-[#C5A059] font-light mb-3">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-lg font-semibold text-white mb-2 group-hover:text-[#C5A059] transition-colors uppercase tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {pillar.text}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>Swiss Atelier</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section 2: Diferenciais de Qualidade */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="bg-black/70 border border-white/10 text-white p-6 sm:p-10 relative overflow-hidden backdrop-blur-md max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A059] block mb-1">
                GARANTIA DE TRANSPARÊNCIA
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white">
                O Padrão de Excelência da Nossa Marca
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {checkDifferentials.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-black/50 border border-white/10 rounded-none text-neutral-200 backdrop-blur-xs"
                >
                  <div className="p-1 bg-white/10 text-[#C5A059] rounded-full shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
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
    </section>
  );
};
