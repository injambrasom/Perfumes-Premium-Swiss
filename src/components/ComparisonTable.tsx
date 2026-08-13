import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles, Award } from 'lucide-react';
import { COMPARISON_DATA } from '../data/content';

export const ComparisonTable: React.FC = () => {
  return (
    <section className="py-24 bg-black/40 text-white border-t border-b border-[#C5A059]/20 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-sans tracking-[0.35em] uppercase text-[#C5A059] font-semibold block mb-2">
            COMPARATIVO TRANSPARENTE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            Premium Swiss vs Importados Tradicionais
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-light">
            A mesma alta perfumaria europeia sem os impostos de grife e margens exorbitantes.
          </p>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* Elegant Table Container */}
        <div className="overflow-x-auto shadow-2xl border border-[#C5A059]/40 bg-black/70 backdrop-blur-md">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-black/90 text-white border-b border-[#C5A059]/40">
                <th className="p-5 font-serif text-base font-semibold tracking-wider text-neutral-200 w-1/3">
                  Critério de Avaliação
                </th>
                <th className="p-5 font-serif text-lg font-bold text-[#E0C078] w-1/3 bg-[#120F09]/90 border-x border-[#C5A059]/40 relative">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Perfumes Premium Swiss</span>
                  </div>
                  <span className="block text-[10px] font-mono font-light text-[#C5A059] mt-1 uppercase tracking-widest">
                    (Inspirados nos Ícones)
                  </span>
                </th>
                <th className="p-5 font-serif text-base font-semibold text-neutral-400 w-1/3">
                  Perfumes Importados de Grife
                  <span className="block text-[10px] font-mono font-light text-neutral-500 mt-1 uppercase tracking-widest">
                    (Grife de Loja)
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
              {COMPARISON_DATA.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-black/40' : 'bg-black/60'}>
                  {/* Criteria */}
                  <td className="p-5 font-medium text-white border-r border-white/10">
                    {row.criteria}
                  </td>

                  {/* Perfumes Premium Swiss Column */}
                  <td className="p-5 font-semibold text-[#E0C078] bg-[#120F09]/60 border-x border-[#C5A059]/30 relative">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 bg-[#C5A059]/20 text-[#C5A059] rounded-full shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-white">{row.swiss}</span>
                    </div>
                  </td>

                  {/* Imported Brand Column */}
                  <td className="p-5 font-light text-neutral-400">
                    <div className="flex items-start gap-2.5">
                      <span className="text-neutral-500 font-mono text-xs">•</span>
                      <span>{row.imported}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary note */}
        <div className="mt-8 text-center text-xs text-neutral-400 font-light max-w-xl mx-auto">
          <p>
            *Você investe na riqueza da fórmula e na alta concentração da essência europeia, e não no marketing global de marcas de moda.
          </p>
        </div>

      </div>
    </section>
  );
};
