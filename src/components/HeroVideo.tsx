import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, ChevronDown, Sparkles } from 'lucide-react';

interface HeroVideoProps {
  onScrollToBanners?: () => void;
  videoSrc?: string;
  posterSrc?: string;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  onScrollToBanners,
  videoSrc = '/videos/hero-perfume.mp4?v=2',
  posterSrc = '/videos/hero-poster.webp?v=2'
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-black select-none z-10">
      {/* Video Container - Full Width Cinema Aspect Ratio (16:9 on desktop, auto on mobile) */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/9] md:aspect-[21/9] min-h-[300px] sm:min-h-[460px] max-h-[85vh] lg:max-h-[90vh] bg-black flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Vídeo de Apresentação Swiss Perfumes"
          onClick={handleVideoClick}
          className="w-full h-full object-cover object-center cursor-pointer transition-opacity duration-700"
        />

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />

        {/* Floating Top Brand Micro-Badge */}
        <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A059]/40 text-[#E6CA65] text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold pointer-events-none shadow-lg">
          <Sparkles className="w-3 h-3 text-[#C5A059]" />
          <span>Haute Parfumerie • 36% Concentração</span>
        </div>

        {/* Bottom Right Floating Audio Toggle Button (Matches Attracione Style) */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
          title={isMuted ? 'Ativar som' : 'Desativar som'}
          className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/75 hover:bg-[#C5A059] text-white hover:text-black border border-[#C5A059]/60 hover:border-[#C5A059] flex items-center justify-center backdrop-blur-md shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white/90 group-hover:text-black transition-colors" />
          ) : (
            <Volume2 className="w-5 h-5 text-[#E6CA65] group-hover:text-black transition-colors animate-pulse" />
          )}
        </button>

        {/* Bottom Center Scroll to Banners Button */}
        {onScrollToBanners && (
          <button
            type="button"
            onClick={onScrollToBanners}
            aria-label="Ver banners e promoções"
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[11px] font-medium tracking-widest text-[#E6CA65]/80 hover:text-[#E6CA65] transition-colors group cursor-pointer"
          >
            <span className="hidden sm:inline uppercase text-[9px] tracking-[0.25em] text-white/70 group-hover:text-white">
              Banners & Ofertas
            </span>
            <ChevronDown className="w-4 h-4 text-[#C5A059] group-hover:translate-y-0.5 transition-transform animate-bounce" />
          </button>
        )}
      </div>
    </section>
  );
};
