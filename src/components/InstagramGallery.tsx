import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Volume2, VolumeX, ExternalLink } from 'lucide-react';

interface ReelItem {
  id: string;
  videoUrl: string;
  posterUrl: string;
}

const INSTAGRAM_REELS: ReelItem[] = [
  {
    id: 'reel-1',
    videoUrl: '/videos/reels/reel-1.mp4',
    posterUrl: '/videos/reels/reel-1-poster.webp'
  },
  {
    id: 'reel-2',
    videoUrl: '/videos/reels/reel-2.mp4',
    posterUrl: '/videos/reels/reel-2-poster.webp'
  },
  {
    id: 'reel-3',
    videoUrl: '/videos/reels/reel-3.mp4',
    posterUrl: '/videos/reels/reel-3-poster.webp'
  }
];

const ReelCard: React.FC<{ reel: ReelItem; index: number }> = ({ reel, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleCardClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onClick={handleCardClick}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-950 border border-[#C5A059]/25 hover:border-[#C5A059] shadow-2xl hover:shadow-[0_0_35px_rgba(197,160,89,0.3)] transition-all duration-500 flex flex-col justify-between cursor-pointer"
    >
      {/* Video Element - Clean and unobstructed */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.posterUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
      />

      {/* Subtle Cinematic Vignette on borders */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

      {/* Audio Toggle Button - Minimalist top right */}
      <div className="relative z-10 p-3.5 flex items-center justify-end w-full">
        <button
          type="button"
          onClick={toggleMute}
          title={isMuted ? 'Ativar som' : 'Desativar som'}
          className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#C5A059] text-white hover:text-black border border-white/20 hover:border-[#C5A059] flex items-center justify-center backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#E6CA65] hover:text-black animate-pulse" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-black/60 text-white border-b border-[#C5A059]/20 backdrop-blur-xs relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,160,89,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <a
            href="https://instagram.com/tiago_perfumespremiumswiss"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] hover:text-[#E6CA65] transition-colors mb-3 group"
          >
            <span className="w-7 h-7 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Instagram className="w-3.5 h-3.5 text-[#C5A059]" />
            </span>
            <span>@TIAGO_PERFUMESPREMIUMSWISS</span>
            <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
          </a>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            Siga Nosso Ateliê no Instagram
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-neutral-300 font-light max-w-xl mx-auto">
            Acompanhe nossos Reels diários: frascos reais, alta concentração, bastidores e depoimentos em tempo real.
          </p>

          <div className="mt-6">
            <a
              href="https://instagram.com/tiago_perfumespremiumswiss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#C5A059] to-[#E6CA65] text-black font-bold text-xs tracking-wider uppercase hover:opacity-95 shadow-xl shadow-[#C5A059]/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>Seguir no Instagram</span>
            </a>
          </div>
        </div>

        {/* 3 Clean Vertical Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {INSTAGRAM_REELS.map((reel, idx) => (
            <ReelCard key={reel.id} reel={reel} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
