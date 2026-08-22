import React from 'react';
import { Instagram, MessageCircle, ArrowUp, ShieldCheck, Award } from 'lucide-react';
const LOGO_IMAGE_URL = 'https://i.postimg.cc/FKSJcM7t/Chat-GPT-Image-8-de-ago-de-2026-21-14-16.png';

interface FooterProps {
  onOpenSearch: () => void;
  onOpenQuiz: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenPolicy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSearch, onOpenQuiz, onSelectCategory, onOpenPolicy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-black/40 backdrop-blur-xs text-white border-t border-neutral-800 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-neutral-800">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#C5A059]/80 overflow-hidden shrink-0 p-0.5 bg-black shadow-[0_0_20px_rgba(197,160,89,0.25)]">
                <img 
                  src={LOGO_IMAGE_URL} 
                  alt="Logo Perfumes Premium Swiss" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-xl tracking-[0.12em] font-bold text-white uppercase leading-tight">
                  PERFUMES PREMIUM SWISS
                </span>
                <span className="block text-[10px] sm:text-xs font-sans tracking-[0.3em] font-medium text-[#C5A059] uppercase mt-0.5">
                  SWISS ATELIER
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed pt-2">
              Ateliê de alta perfumaria com essências importadas das mais respeitadas casas da Suíça e da França.
            </p>
          </div>

          {/* Col 2: Coleções */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#C5A059]">
              Coleções
            </h4>
            <ul className="space-y-2 text-xs font-light text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('Masculino')} className="hover:text-white transition-colors">
                  Perfumes Masculinos
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Feminino')} className="hover:text-white transition-colors">
                  Perfumes Femininos
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Árabe')} className="hover:text-white transition-colors">
                  Coleção Árabe Opulenta
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Nicho')} className="hover:text-white transition-colors">
                  Perfumaria de Nicho
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ferramentas & Atendimento */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#C5A059]">
              Consultoria & Institucional
            </h4>
            <ul className="space-y-2 text-xs font-light text-neutral-400">
              <li>
                <button onClick={onOpenSearch} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                  <span>Busca por Referência</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
                  <span>Quiz Olfativo Personalizado</span>
                </button>
              </li>
              {onOpenPolicy && (
                <li>
                  <button onClick={onOpenPolicy} className="hover:text-[#C5A059] transition-colors flex items-center gap-1 font-medium text-neutral-300 cursor-pointer">
                    <span>📜 Política de Compras</span>
                  </button>
                </li>
              )}
              <li>
                <a
                  href={`https://wa.me/5554999893370?text=${encodeURIComponent(
                    'PERFUMES PREMIUM SWISS ATELIER\nOlá! Gostaria de uma consultoria olfativa personalizada.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-emerald-400"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Executivo (7h às 21h)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Redes Sociais */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-semibold uppercase tracking-widest text-[#C5A059]">
              Conecte-se
            </h4>
            <div className="flex items-center space-x-3">
              <a
                href="https://instagram.com/tiago_perfumespremiumswiss"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-neutral-800 hover:border-[#C5A059] text-neutral-300 hover:text-white transition-all flex items-center gap-2"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
                <span className="text-xs font-mono">@tiago_perfumespremiumswiss</span>
              </a>
              <a
                href="https://wa.me/5554999893370"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-neutral-800 hover:border-emerald-500 text-neutral-300 hover:text-emerald-400 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-neutral-500 font-light">
              Atendimento executivo de segunda a sábado.
            </p>
          </div>

        </div>

        {/* Discrete Required Legal Provenance Disclaimer */}
        <div className="py-8 text-center border-b border-neutral-800">
          <p className="text-xs text-neutral-400 font-light tracking-wider italic max-w-2xl mx-auto leading-relaxed">
            &ldquo;Essências provenientes de casas internacionais reconhecidas pela excelência em perfumaria.&rdquo;
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <p>© {new Date().getFullYear()} PERFUMES PREMIUM SWISS ATELIER.</p>
            {onOpenPolicy && (
              <>
                <span className="hidden sm:inline text-neutral-700">•</span>
                <button
                  onClick={onOpenPolicy}
                  className="hover:text-[#C5A059] transition-colors underline decoration-neutral-700 underline-offset-4 cursor-pointer"
                >
                  Política de Compras
                </button>
              </>
            )}
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors uppercase tracking-widest cursor-pointer"
          >
            <span>Voltar ao Topo</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
