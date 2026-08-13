import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, REFERENCE_PERFUMES_LIST } from '../data/products';
import { FragranceProduct } from '../types';
import { handleImageError } from '../utils/imageHelper';

interface ReferenceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: FragranceProduct) => void;
}

export const ReferenceSearchModal: React.FC<ReferenceSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Filter products matching search term against product name, referenceName, or referenceBrand
  const results = PRODUCTS.filter((p) => {
    if (!searchTerm.trim()) return false;
    const term = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      p.referenceName.toLowerCase().includes(term) ||
      p.referenceBrand.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.olfactoryFamily.toLowerCase().includes(term)
    );
  });

  const popularSearches = [
    'Bleu de Chanel',
    'Aventus',
    'Baccarat Rouge 540',
    'Sauvage',
    'Delina',
    'Khamrah',
    'Good Girl',
    'Santal 33'
  ];

  return (
    <AnimatePresence>
      <div 
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full max-w-3xl rounded-none border border-neutral-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 bg-[#0B0B0B] text-white flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#C5A059]">
                  FERRAMENTA DE BUSCA
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl mt-1 tracking-wide">
                Encontre o Seu Perfume de Referência
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Input */}
          <div className="p-6 border-b border-neutral-100 bg-neutral-50/50">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Digite o nome da sua fragrância favorita (ex: Bleu de Chanel, Sauvage, Baccarat)..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-300 focus:border-neutral-900 focus:outline-none text-sm font-light text-neutral-900 placeholder:text-neutral-400 transition-all"
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-black uppercase tracking-wider"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Popular Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium mr-1">
                Sugestões Rápidas:
              </span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchTerm(term)}
                  className="px-3 py-1 bg-white border border-neutral-200 hover:border-neutral-900 text-xs text-neutral-700 hover:text-black transition-all rounded-full font-light"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Results Area */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {!searchTerm.trim() ? (
              <div className="text-center py-10 text-neutral-500 font-light">
                <p className="text-sm">Digite o nome do seu perfume importado favorito acima.</p>
                <p className="text-xs text-neutral-400 mt-2">
                  Nosso sistema identificará automaticamente o equivalente exato da Perfumes Premium Swiss.
                </p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-10 text-neutral-600">
                <p className="font-serif text-lg text-neutral-800">
                  Nenhuma correspondência exata para &quot;{searchTerm}&quot;
                </p>
                <p className="text-xs text-neutral-500 mt-2 max-w-md mx-auto">
                  Que tal conversar diretamente com nossos perfumistas via WhatsApp? Podemos formular ou indicar a fragrância perfeita para você.
                </p>
                <a
                  href={`https://wa.me/5554999893370?text=Ol%C3%A1,%20procuro%20um%20equivalente%20para%20o%20perfume%20${encodeURIComponent(searchTerm)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[#0B0B0B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A059] transition-all"
                >
                  Consultar via WhatsApp
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-500 pb-2 border-b border-neutral-100">
                  <span>Fragrança Encontrada ({results.length})</span>
                  <span>Extrait de Parfum Swiss</span>
                </div>
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border border-neutral-200 hover:border-neutral-900 bg-white transition-all flex flex-col sm:flex-row items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-contain p-1 bg-neutral-50 border border-neutral-100 shrink-0"
                        onError={(e) => handleImageError(e, product.image)}
                      />
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-neutral-100 text-[10px] font-semibold text-neutral-800 uppercase tracking-wider mb-1">
                          {product.referenceName}
                        </span>
                        <h3 className="font-serif text-base font-semibold text-neutral-900">
                          {product.name}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1 font-light">
                          {product.olfactoryFamily} • {product.fixationHours}
                        </p>
                        <p className="text-xs text-[#C5A059] mt-1 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Essência Importada (36% Concentração)</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-neutral-100">
                      <div className="text-right">
                        <span className="text-xs text-neutral-400 line-through block">
                          R$ {product.originalPrice?.toFixed(2)}
                        </span>
                        <span className="font-serif text-lg font-bold text-neutral-950">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectProduct(product);
                        }}
                        className="mt-2 px-5 py-2.5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#C5A059] transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>Ver Detalhes</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
