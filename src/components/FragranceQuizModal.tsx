import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { FragranceProduct, FragranceCategory, PerfumeOccasion, OlfactoryFamily } from '../types';

interface FragranceQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: FragranceProduct) => void;
}

export const FragranceQuizModal: React.FC<FragranceQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [step, setStep] = useState(1);
  const [selectedGender, setSelectedGender] = useState<FragranceCategory | 'Todos'>('Todos');
  const [selectedOccasion, setSelectedOccasion] = useState<PerfumeOccasion | 'Todas'>('Todas');
  const [selectedFamily, setSelectedFamily] = useState<OlfactoryFamily | 'Todas'>('Todas');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setSelectedGender('Todos');
    setSelectedOccasion('Todas');
    setSelectedFamily('Todas');
  };

  // Calculate matches with strict category enforcement and score ranking
  const getRecommendations = () => {
    // 1. Filtrar primeiro estritamente pela categoria escolhida
    const pool = PRODUCTS.filter((p) => {
      if (!p) return false;
      if (selectedGender === 'Masculino') {
        return p.category === 'Masculino';
      }
      if (selectedGender === 'Feminino') {
        return p.category === 'Feminino';
      }
      if (selectedGender === 'Árabe') {
        return p.category === 'Árabe';
      }
      if (selectedGender === 'Nicho') {
        return p.category === 'Nicho';
      }
      return true;
    });

    // 2. Pontuar cada produto dentro da categoria correta
    const scored = pool.map((p) => {
      let score = 0;
      // Combinação de família olfativa (peso maior)
      if (selectedFamily !== 'Todas' && p.olfactoryFamily === selectedFamily) {
        score += 3;
      }
      // Combinação de ocasião
      if (selectedOccasion !== 'Todas' && Array.isArray(p.occasions) && p.occasions.includes(selectedOccasion as PerfumeOccasion)) {
        score += 2;
      }
      // Preferência por itens em estoque e avaliações altas
      if (p.inStock) score += 1;
      if (p.rating >= 4.8) score += 1;

      return { product: p, score };
    });

    // Ordenar pelos mais compatíveis
    scored.sort((a, b) => b.score - a.score);

    // Retornar os 3 melhores
    const topScored = scored.map((s) => s.product).slice(0, 3);
    if (topScored.length > 0) return topScored;

    // Fallback: se nenhum pontuou alto, retorna os mais populares da mesma categoria
    return pool.slice(0, 3);
  };

  const finalResults = getRecommendations();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white w-full max-w-2xl border border-[#C5A059]/40 shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] rounded-lg"
        >
          {/* Always Sticky Header */}
          <div className="sticky top-0 z-40 p-4 sm:p-5 bg-[#0B0B0B] text-white flex items-center justify-between border-b border-neutral-800 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 border border-[#C5A059]/40 bg-neutral-900 rounded-full shrink-0">
                <Sparkles className="w-5 h-5 text-[#C5A059]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A059] block truncate">
                  CONSULTORIA OLFATIVA
                </span>
                <h2 className="font-serif text-base sm:text-xl tracking-wide truncate">
                  Descubra Seu Perfume Ideal
                </h2>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="flex items-center gap-1 px-3 py-1.5 bg-[#C5A059] hover:bg-[#D4B06A] text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-md shrink-0 ml-2"
              title="Fechar Quiz"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
              <span>FECHAR</span>
            </button>
          </div>

          {/* Steps Progress */}
          {step <= 3 && (
            <div className="w-full bg-neutral-100 h-1 flex shrink-0">
              <div
                className="bg-[#C5A059] h-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}

          <div className="p-4 sm:p-7 overflow-y-auto flex-1">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-xs font-mono uppercase text-[#C5A059] tracking-widest block mb-1">
                  Passo 1 de 3
                </span>
                <h3 className="font-serif text-2xl text-neutral-900 font-medium">
                  Para quem é a fragrância?
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1">
                  Selecione sua preferência de uso.
                </p>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Masculino', val: 'Masculino' },
                    { label: 'Feminino', val: 'Feminino' },
                    { label: 'Árabe / Exótico', val: 'Árabe' },
                    { label: 'Nicho / Unissex', val: 'Nicho' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setSelectedGender(item.val as FragranceCategory);
                        setStep(2);
                      }}
                      className={`p-4 border text-center transition-all cursor-pointer ${
                        selectedGender === item.val
                          ? 'border-neutral-950 bg-neutral-950 text-white'
                          : 'border-neutral-200 hover:border-neutral-900 bg-white text-neutral-800'
                      }`}
                    >
                      <span className="block text-xs font-semibold uppercase tracking-wider">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-xs font-mono uppercase text-[#C5A059] tracking-widest block mb-1">
                  Passo 2 de 3
                </span>
                <h3 className="font-serif text-2xl text-neutral-900 font-medium">
                  Qual a ocasião principal?
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1">
                  Onde você deseja marcar sua presença?
                </p>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Assinatura Diária', val: 'Assinatura' },
                    { label: 'Trabalho & Reuniões', val: 'Trabalho' },
                    { label: 'Encontros & Romance', val: 'Encontro' },
                    { label: 'Festas & Eventos', val: 'Festa' },
                    { label: 'Dias Quentes / Verão', val: 'Verão' },
                    { label: 'Clima Frio / Inverno', val: 'Inverno' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setSelectedOccasion(item.val as PerfumeOccasion);
                        setStep(3);
                      }}
                      className="p-4 border border-neutral-200 hover:border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-950 hover:text-white transition-all text-center cursor-pointer"
                    >
                      <span className="block text-xs font-semibold uppercase tracking-wider">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-xs font-mono uppercase text-[#C5A059] tracking-widest block mb-1">
                  Passo 3 de 3
                </span>
                <h3 className="font-serif text-2xl text-neutral-900 font-medium">
                  Qual seu estilo de nota favorito?
                </h3>
                <p className="text-xs text-neutral-500 font-light mt-1">
                  Escolha o caminho olfativo de sua preferência.
                </p>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Amadeirado Nobre', val: 'Amadeirado' },
                    { label: 'Oriental & Âmbar', val: 'Oriental / Âmbar' },
                    { label: 'Floral Elegante', val: 'Floral' },
                    { label: 'Cítrico & Fresco', val: 'Cítrico / Fresco' },
                    { label: 'Gourmand Doce', val: 'Gourmand' },
                    { label: 'Aromático / Pimenta', val: 'Aromático' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setSelectedFamily(item.val as OlfactoryFamily);
                        setStep(4);
                      }}
                      className="p-4 border border-neutral-200 hover:border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-950 hover:text-white transition-all text-center cursor-pointer"
                    >
                      <span className="block text-xs font-semibold uppercase tracking-wider">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-center pb-4 border-b border-neutral-100">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase tracking-widest rounded-full mb-2">
                    RECOMENDAÇÃO PERSONALIZADA
                  </span>
                  <h3 className="font-serif text-2xl text-neutral-950 font-medium">
                    Sua Assinatura Olfativa Ideal
                  </h3>
                  <p className="text-xs text-neutral-500 font-light mt-1">
                    Com base no seu perfil, nossas fórmulas com essências suíças Firmenich/Robertet são perfeitas para você:
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {finalResults.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 border border-neutral-200 bg-neutral-50/50 flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover border border-neutral-200 shrink-0"
                          
                        />
                        <div>
                          <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest block">
                            98% de Compatibilidade • {product.referenceName}
                          </span>
                          <h4 className="font-serif text-base font-bold text-neutral-900">
                            {product.name}
                          </h4>
                          <p className="text-xs text-neutral-500 font-light">
                            {product.fixationHours} • {product.volume}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-3 sm:pt-0 border-neutral-200">
                        <span className="font-serif text-lg font-bold text-neutral-950">
                          R$ {(product.price || 130).toFixed(2)}
                        </span>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectProduct(product);
                          }}
                          className="px-4 py-2 bg-[#0B0B0B] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#C5A059] transition-all cursor-pointer flex items-center gap-2"
                        >
                          <span>Experimentar</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 pt-5 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs text-neutral-600 hover:text-black uppercase tracking-wider font-semibold border border-neutral-300 rounded-sm hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Refazer Quiz</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-6 bg-[#0B0B0B] text-[#E0C078] hover:bg-[#C5A059] hover:text-black uppercase tracking-wider font-bold text-xs rounded-sm transition-all cursor-pointer shadow-md"
                  >
                    <X className="w-4 h-4" />
                    <span>Fechar & Voltar à Loja</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
