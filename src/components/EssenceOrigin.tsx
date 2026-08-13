import perfumerImg from "../assets/images/perfumer_lab_art_1785456152814.jpg";
import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Award, Shield } from 'lucide-react';
import { SwissFlagIcon, FranceFlagIcon } from './CountryFlags';

interface EssenceOriginProps {
  onExploreCollection: () => void;
}

export const EssenceOrigin: React.FC<EssenceOriginProps> = ({ onExploreCollection }) => {
  return (
    <section className="py-24 bg-black/20 text-white relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: High-End Laboratory Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 border border-neutral-800 p-2 bg-neutral-900/60 backdrop-blur-xs">
              <img 
                src={perfumerImg}
                alt="Ateliê de Perfumaria e Laboratório de Essências Suíças e Francesas"
                className="w-full h-[450px] sm:h-[550px] object-cover filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                
              />
            </div>
            {/* Decorative Gold Accent Border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#C5A059]/30 z-0 hidden sm:block" />
            
            <div className="absolute bottom-8 left-8 z-20 bg-black/80 backdrop-blur-md p-4 border-l-2 border-[#C5A059] max-w-xs">
              <p className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059]">
                CONCENTRAÇÃO PREMIUM 36%
              </p>
              <p className="text-xs font-light text-neutral-300 mt-1">
                Disponível nos tamanhos 15ml, 55ml e 100ml com alta fixação e projeção marcante.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Origin Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#C5A059]/30 bg-neutral-900/80">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A059]">
                SEÇÃO EXCLUSIVA • A ORIGEM
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-white">
              A excelência começa na origem da fragrância.
            </h2>

            <div className="space-y-4 text-neutral-300 font-light text-sm sm:text-base leading-relaxed">
              <p>
                Na <strong className="text-white font-medium">Perfumes Premium Swiss</strong>, utilizamos essências provenientes de duas das casas de fragrâncias mais respeitadas e históricas do mundo:
              </p>
              <ul className="space-y-2 pl-4 border-l-2 border-[#C5A059]/60 text-neutral-200">
                <li className="font-medium text-white flex items-center gap-2.5 text-sm sm:text-base">
                  <SwissFlagIcon className="w-5 h-5 shadow-md" />
                  <span><strong>Firmenich</strong>, da Suíça.</span>
                </li>
                <li className="font-medium text-white flex items-center gap-2.5 text-sm sm:text-base">
                  <FranceFlagIcon className="w-5 h-5 shadow-md" />
                  <span><strong>Robertet</strong>, da França.</span>
                </li>
              </ul>
              <p>
                Essas empresas são reconhecidas internacionalmente pela criação de fragrâncias utilizadas por algumas das maiores e mais prestigiadas marcas da perfumaria mundial.
              </p>
              <p>
                Nosso compromisso inegociável é oferecer perfumes inspirados em grandes clássicos, utilizando matérias-primas de altíssima qualidade para proporcionar excelente desempenho olfativo, projeção nobre e fixação estendida.
              </p>
            </div>

            {/* Two Elegant Cards with Flag Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 border border-neutral-800 bg-neutral-900/60 hover:border-[#C5A059]/60 transition-all group shadow-lg">
                <div className="flex items-center gap-2.5 text-white font-serif text-lg font-semibold">
                  <SwissFlagIcon className="w-6 h-6 shadow-md" />
                  <span>Firmenich (Suíça)</span>
                </div>
                <p className="text-xs text-neutral-300 font-light mt-2 leading-relaxed">
                  Uma das maiores e mais tradicionais casas de fragrâncias e pesquisa olfativa do mundo (Suíça).
                </p>
              </div>

              <div className="p-5 border border-neutral-800 bg-neutral-900/60 hover:border-[#C5A059]/60 transition-all group shadow-lg">
                <div className="flex items-center gap-2.5 text-white font-serif text-lg font-semibold">
                  <FranceFlagIcon className="w-6 h-6 shadow-md" />
                  <span>Robertet (França)</span>
                </div>
                <p className="text-xs text-neutral-300 font-light mt-2 leading-relaxed">
                  Referência mundial máxima em ingredientes naturais nobres e perfumaria de alta gastronomia (França).
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onExploreCollection}
                className="px-8 py-4 bg-[#C5A059] text-black hover:bg-white transition-all duration-300 font-semibold text-xs tracking-[0.25em] uppercase flex items-center gap-3 cursor-pointer group"
              >
                <span>CONHEÇA NOSSA COLEÇÃO</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
