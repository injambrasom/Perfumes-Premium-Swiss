import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, CheckCircle2, ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight, MessageCircle, Maximize2, PlusCircle, AlertCircle, CheckCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import { REAL_FEEDBACK_PRINTS, RealFeedbackPrint } from '../data/content';

interface RealReview {
  id: string;
  orderId: string;
  rating: number;
  comment: string;
  customerName: string;
  customerCity?: string;
  customerState?: string;
  photoUrl?: string;
  createdAt: string;
}

export const Testimonials: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<RealFeedbackPrint | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Real Reviews State from Firestore / API
  const [reviews, setReviews] = useState<RealReview[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const satisfiedClientsCount = '5.240';
  const totalReviewsCount = reviews.length > 0 
    ? (5240 + reviews.length).toLocaleString('pt-BR') 
    : satisfiedClientsCount;
  const [orderIdInput, setOrderIdInput] = useState('');
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [photoInput, setPhotoInput] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [reviewSuccess, setReviewSuccess] = useState<string | null>(null);

  // Load real reviews from backend
  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      }
    } catch (err) {
      console.error('Error fetching real reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim() || !commentInput.trim()) {
      setReviewError('Por favor, preencha o código do pedido e o seu depoimento.');
      return;
    }

    setIsSubmittingReview(true);
    setReviewError(null);
    setReviewSuccess(null);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderIdInput.trim(),
          rating: ratingInput,
          comment: commentInput.trim(),
          customerName: nameInput.trim(),
          photoUrl: photoInput.trim()
        })
      });

      const data = await res.json();
      if (data.success) {
        setReviewSuccess(data.message || 'Sua avaliação foi enviada com sucesso!');
        setOrderIdInput('');
        setCommentInput('');
        setNameInput('');
        setPhotoInput('');
        fetchReviews();
        setTimeout(() => {
          setShowReviewModal(false);
          setReviewSuccess(null);
        }, 2000);
      } else {
        setReviewError(data.message || 'Não foi possível validar o pedido.');
      }
    } catch (err: any) {
      console.error('Error submitting review:', err);
      setReviewError('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setIsSubmittingReview(false);
    }
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
            <span className="text-xs font-semibold text-[#E0C078] font-mono">4.9 / 5.0 • AVALIAÇÕES VERIFICADAS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
            Mais de <span className="underline decoration-[#C5A059]">{totalReviewsCount}</span> Clientes Satisfeitos
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-light max-w-xl mx-auto leading-relaxed">
            Confira abaixo os depoimentos reais enviados por clientes que adquiriram seus perfumes Swiss e os prints de atendimento no WhatsApp.
          </p>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-6 py-3 bg-[#C5A059] hover:bg-[#D4B06A] text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-all shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Avaliar meu Pedido</span>
            </button>
          </div>

          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-6" />
        </div>

        {/* Real Customer Reviews Section (Firestore) */}
        {reviews.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="font-serif text-xl text-white font-bold tracking-wide">
                Avaliações Recentes de Compradores
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((rev) => (
                <div 
                  key={rev.id}
                  className="bg-neutral-900/90 border border-neutral-800 hover:border-[#C5A059]/50 p-5 rounded-lg shadow-xl backdrop-blur-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex text-[#C5A059]">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded uppercase">
                        Compra Verificada
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-200 font-light italic leading-relaxed mb-4">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div>
                    {rev.photoUrl && (
                      <div className="mb-3 rounded overflow-hidden aspect-video bg-neutral-950 border border-neutral-800">
                        <img src={rev.photoUrl} alt="Foto do Cliente" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                      <span className="font-bold text-white">{rev.customerName}</span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        Pedido #{rev.orderId}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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

      {/* Leave Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewModal(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-[#0F0F11] border border-[#C5A059]/50 w-full max-w-lg rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] p-6 text-white z-10 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#C5A059] fill-current" />
                  <h3 className="font-serif text-lg font-bold text-white">
                    Avaliar meu Pedido Swiss
                  </h3>
                </div>
                <button 
                  onClick={() => setShowReviewModal(false)}
                  className="p-1 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Número do Pedido (código enviado no WhatsApp ou E-mail) *
                  </label>
                  <input
                    type="text"
                    value={orderIdInput}
                    onChange={(e) => {
                      setOrderIdInput(e.target.value);
                      setReviewError(null);
                    }}
                    placeholder="Ex: SWISS-1001"
                    className="w-full bg-black/70 border border-neutral-700 focus:border-[#C5A059] rounded px-3.5 py-2.5 text-sm text-white outline-none font-mono uppercase"
                    required
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">
                    Apenas pedidos com pagamento confirmado podem enviar avaliações.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Sua Nota para as Fragrâncias *
                  </label>
                  <div className="flex items-center gap-2 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingInput(star)}
                        className="p-1 transition-transform hover:scale-110 cursor-pointer"
                      >
                        <Star 
                          className={`w-7 h-7 ${star <= ratingInput ? 'text-[#C5A059] fill-current' : 'text-neutral-600'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Seu Nome (opcional)
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Ex: Maria S."
                    className="w-full bg-black/70 border border-neutral-700 focus:border-[#C5A059] rounded px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Seu Depoimento sobre os Perfumes e Atendimento *
                  </label>
                  <textarea
                    rows={3}
                    value={commentInput}
                    onChange={(e) => {
                      setCommentInput(e.target.value);
                      setReviewError(null);
                    }}
                    placeholder="Conte como foi sua experiência com a fixação e similaridade das fragrâncias..."
                    className="w-full bg-black/70 border border-neutral-700 focus:border-[#C5A059] rounded px-3.5 py-2.5 text-sm text-white outline-none resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Link de Foto do Perfume/Caixa (opcional)
                  </label>
                  <input
                    type="url"
                    value={photoInput}
                    onChange={(e) => setPhotoInput(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-black/70 border border-neutral-700 focus:border-[#C5A059] rounded px-3.5 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                {reviewError && (
                  <div className="p-3 bg-red-950/80 border border-red-800 rounded text-xs text-red-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{reviewError}</span>
                  </div>
                )}

                {reviewSuccess && (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded text-xs text-emerald-300 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{reviewSuccess}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2.5 text-neutral-400 hover:text-white text-xs font-semibold rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="px-6 py-2.5 bg-[#C5A059] hover:bg-[#D4B06A] text-neutral-950 font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    {isSubmittingReview ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Validando...</span>
                      </>
                    ) : (
                      <span>Enviar Avaliação</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
