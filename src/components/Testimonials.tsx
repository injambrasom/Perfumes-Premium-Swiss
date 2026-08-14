import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle2, ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, MessageCircle, Maximize2 } from 'lucide-react';
import { REAL_FEEDBACK_PRINTS, RealFeedbackPrint } from '../data/content';

export const Testimonials: React.FC = () => {
  const [satisfiedClientsCount] = useState('5.240');
  const [selectedImage, setSelectedImage] = useState<RealFeedbackPrint | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (item: RealFeedbackPrint, index: number) => {
    setSelectedImage(item);
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setIsZoomed(false);
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIdx = (selectedIndex + 1) % REAL_FEEDBACK_PRINTS.length;
    setSelectedIndex(nextIdx);
    setSelectedImage(REAL_FEEDBACK_PRINTS[nextIdx]);
    setIsZoomed(false);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIdx = (selectedIndex - 1 + REAL_FEEDBACK_PRINTS.length) % REAL_FEEDBACK_PRINTS.length;
    setSelectedIndex(prevIdx);
    setSelectedImage(REAL_FEEDBACK_PRINTS[prevIdx]);
    setIsZoomed(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex]);

  return (
    <section id="feedbacks" className="py-24 bg-black/40 text-white border-b border-[#C5A059]/20 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/60 border border-[#C5A059]/40 shadow-md mb-4 backdrop-blur-md">
            <div className="flex text-[#C5A059]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#E0C078] font-mono">4.9 / 5.0 • WHATSAPP REAL</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            Mais de <span className="underline decoration-[#C5A059]">{satisfiedClientsCount}</span> Clientes Satisfeitos
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
            Confira abaixo as avaliações e prints autênticos de conversas no WhatsApp em alta definição. 
            Clique em qualquer print para visualizar em tela cheia e ampliar os detalhes.
          </p>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* Real Feedback Screenshots Grid / Empty State */}
        {REAL_FEEDBACK_PRINTS.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {REAL_FEEDBACK_PRINTS.slice(0, visibleCount).map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.02, 0.2) }}
                  onClick={() => openLightbox(item, idx)}
                  className="group cursor-pointer bg-neutral-900/90 border border-neutral-800 hover:border-[#C5A059] shadow-xl hover:shadow-[0_0_25px_rgba(197,160,89,0.3)] transition-all duration-300 overflow-hidden flex flex-col justify-between rounded-lg backdrop-blur-md"
                >
                  {/* Image Container with Zoom overlay */}
                  <div className="relative aspect-[3/4] bg-neutral-950 overflow-hidden flex items-center justify-center p-1.5">
                    
                    {/* Shimmer Skeleton Placeholder */}
                    {!loadedImages[item.id] && (
                      <div className="absolute inset-0 bg-neutral-900 animate-pulse flex flex-col items-center justify-center p-4">
                        <div className="w-7 h-7 rounded-full border-2 border-[#C5A059]/40 border-t-[#C5A059] animate-spin mb-2" />
                        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Carregando HD...</span>
                      </div>
                    )}

                    <img 
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      onLoad={() => handleImageLoad(item.id)}
                      style={{ 
                        filter: 'contrast(1.18) brightness(1.08)',
                        WebkitFilter: 'contrast(1.18) brightness(1.08)'
                      }}
                      className={`w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500 rounded-sm ${
                        loadedImages[item.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (item.fallbackUrl && target.src !== item.fallbackUrl) {
                          target.src = item.fallbackUrl;
                        }
                        handleImageLoad(item.id);
                      }}
                    />

                    {/* Hover overlay with Zoom Icon */}
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 text-white p-4 text-center">
                      <div className="p-3.5 bg-[#C5A059] text-black rounded-full shadow-2xl transform group-hover:scale-110 transition-transform">
                        <Maximize2 className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider bg-black/90 px-3 py-1.5 border border-[#C5A059]/60 text-[#E0C078] rounded-xs">
                        Ampliar e Ler Print
                      </span>
                    </div>

                    {/* Tag Badge */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-emerald-950/95 text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1 border border-emerald-700/80 shadow-md rounded-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item.tag}</span>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-3.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-serif text-xs font-bold text-neutral-100 group-hover:text-[#C5A059] transition-colors truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1 mt-0.5">
                        <MessageCircle className="w-3 h-3 text-emerald-500 shrink-0" /> WhatsApp Verificado
                      </span>
                    </div>
                    <div className="text-neutral-400 group-hover:text-[#C5A059] transition-colors shrink-0 p-1">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Show More Button if remaining prints exist */}
            {visibleCount < REAL_FEEDBACK_PRINTS.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisibleCount(REAL_FEEDBACK_PRINTS.length)}
                  className="px-8 py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-[#C5A059]/60 hover:border-[#C5A059] text-[#E0C078] font-mono text-xs uppercase tracking-wider font-bold rounded-lg shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Carregar Todos os Prints do WhatsApp ({REAL_FEEDBACK_PRINTS.length - visibleCount} restantes)</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="p-12 text-center bg-neutral-900/60 border border-dashed border-[#C5A059]/40 rounded-xl max-w-2xl mx-auto backdrop-blur-md">
            <MessageCircle className="w-12 h-12 text-[#C5A059] mx-auto mb-4 opacity-80" />
            <h3 className="font-serif text-xl font-medium text-white mb-2">
              Galeria de Depoimentos em Atualização
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              Os prints de feedbacks antigos foram removidos. Aguardando o envio dos novos prints dos clientes para atualização.
            </p>
          </div>
        )}

        {/* Callout box under feedbacks */}
        <div className="mt-16 bg-neutral-950 text-white p-8 sm:p-10 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059]">
              ATENDIMENTO EXCLUSIVO
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white">
              Quer tirar dúvidas ou pedir sua amostra no WhatsApp?
            </h3>
            <p className="text-xs text-neutral-400 font-light max-w-xl">
              Fale diretamente com nosso atendimento consultivo. Te ajudamos a escolher as fragrâncias perfeitas.
            </p>
          </div>
          <a
            href={`https://wa.me/5554999893370?text=${encodeURIComponent(
              'Olá! Vi os feedbacks no site e gostaria de uma recomendação olfativa personalizada.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#C5A059] hover:bg-[#b08d47] text-black font-semibold text-xs tracking-widest uppercase transition-all shadow-lg flex items-center gap-2 shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current text-black" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>

      </div>

      {/* Fullscreen High-Definition Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-2 sm:p-4 select-none overflow-hidden"
            onClick={closeLightbox}
          >
            {/* Modal Container */}
            <div
              className="relative w-full max-w-6xl h-[95vh] flex flex-col bg-neutral-950 border border-[#C5A059]/70 shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-3 sm:p-4 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 text-white min-w-0">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                  <span className="font-serif text-sm sm:text-base font-bold text-neutral-100 truncate">
                    {selectedImage.title}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 border border-emerald-800 shrink-0 rounded-xs">
                    {selectedImage.tag}
                  </span>
                </div>

                {/* Right Header Action Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-white text-black font-bold transition-all text-xs font-mono flex items-center gap-1.5 rounded-xs cursor-pointer shadow-md"
                    title={isZoomed ? "Tamanho Normal" : "Ampliar Print"}
                  >
                    {isZoomed ? (
                      <>
                        <ZoomOut className="w-4 h-4" />
                        <span className="hidden sm:inline font-bold uppercase">Ajustar</span>
                      </>
                    ) : (
                      <>
                        <ZoomIn className="w-4 h-4" />
                        <span className="hidden sm:inline font-bold uppercase">Ampliar</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={closeLightbox}
                    className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors border border-neutral-700 rounded-xs cursor-pointer"
                    aria-label="Fechar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Image Viewport Area - Crisp HD, Optimized Width Sizing for WhatsApp Text Legibility */}
              <div className="relative flex-1 bg-black flex flex-col items-center justify-start p-3 sm:p-6 overflow-y-auto overflow-x-auto w-full">
                <div 
                  className="w-full flex flex-col items-center justify-center my-auto py-3 min-h-full"
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <img 
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    style={{ 
                      filter: 'contrast(1.22) brightness(1.1) saturate(1.08)',
                      WebkitFilter: 'contrast(1.22) brightness(1.1) saturate(1.08)'
                    }}
                    className={`transition-all duration-300 rounded-md border-2 border-[#C5A059]/70 shadow-[0_0_50px_rgba(197,160,89,0.35)] ${
                      isZoomed 
                        ? 'w-[680px] sm:w-[880px] md:w-[1050px] lg:w-[1200px] max-w-none h-auto my-6 cursor-zoom-out' 
                        : 'w-[360px] sm:w-[480px] md:w-[540px] lg:w-[580px] max-w-full h-auto cursor-zoom-in'
                    }`}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (selectedImage.fallbackUrl && target.src !== selectedImage.fallbackUrl) {
                        target.src = selectedImage.fallbackUrl;
                      }
                    }}
                  />
                </div>

                {/* Floating Navigation Controls */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 bg-neutral-900/90 hover:bg-[#C5A059] text-white hover:text-black transition-all border border-[#C5A059]/50 shadow-2xl z-10 rounded-full cursor-pointer"
                  aria-label="Anterior"
                  title="Anterior (Seta Esquerda)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 bg-neutral-900/90 hover:bg-[#C5A059] text-white hover:text-black transition-all border border-[#C5A059]/50 shadow-2xl z-10 rounded-full cursor-pointer"
                  aria-label="Próximo"
                  title="Próximo (Seta Direita)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Footer */}
              <div className="p-3 sm:p-4 bg-neutral-900/90 border-t border-neutral-800 flex items-center justify-between gap-4 text-xs font-mono text-neutral-300 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-neutral-300 text-xs sm:text-sm">
                    Print <strong className="text-[#E0C078] font-bold">{selectedIndex + 1}</strong> de {REAL_FEEDBACK_PRINTS.length}
                  </span>
                  <span className="hidden sm:inline-block text-xs text-neutral-400">
                    (Clique no print para alternar o zoom)
                  </span>
                </div>

                <a
                  href={`https://wa.me/5554999893370?text=${encodeURIComponent(
                    `Olá! Estava olhando o feedback print "${selectedImage.title}" e gostaria de fazer um pedido.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 transition-colors shadow-md text-xs font-sans uppercase tracking-wider rounded-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-white" />
                  <span>Atendimento WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
