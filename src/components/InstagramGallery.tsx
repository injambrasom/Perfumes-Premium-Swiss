import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Instagram, Play, Volume2, VolumeX, ExternalLink, Sparkles } from 'lucide-react';

interface ReelItem {
  id: string;
  videoUrl: string;
  posterUrl: string;
  instagramUrl: string;
  title: string;
  badge: string;
}

const INSTAGRAM_REELS: ReelItem[] = [
  {
    id: 'reel-1',
    videoUrl: '/videos/reels/reel-1.mp4',
    posterUrl: '/videos/reels/reel-1-poster.webp',
    instagramUrl: 'https://www.instagram.com/reel/Dadw76HB76G/',
    title: 'Acabamento & Frascos de Luxo Swiss Atelier',
    badge: 'FRASCO REAL'
  },
  {
    id: 'reel-2',
    videoUrl: '/videos/reels/reel-2.mp4',
    posterUrl: '/videos/reels/reel-2-poster.webp',
    instagramUrl: 'https://www.instagram.com/reel/DaIRdIIxFYq/',
    title: 'Alta Concentração & Névoa de Alta Fixação',
    badge: '36% ESSÊNCIA'
  },
  {
    id: 'reel-3',
    videoUrl: '/videos/reels/reel-3.mp4',
    posterUrl: '/videos/reels/reel-3-poster.webp',
    instagramUrl: 'https://www.instagram.com/reel/Del1rThRtlb/',
    title: 'Exclusividade & Embalagens Importadas',
    badge: 'PREMIUM'
  },
  {
    id: 'reel-4',
    videoUrl: '/videos/reels/reel-4.mp4',
    posterUrl: '/videos/reels/reel-4-poster.webp',
    instagramUrl: 'https://www.instagram.com/reel/DeS1n2NhSMm/',
    title: 'Depoimentos & Experiência Olfativa Completa',
    badge: 'BASTIDORES'
  }
];

const ReelCard: React.FC<{ reel: ReelItem; index: number }> = ({ reel, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!videoRef.current) return;
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleOpenInstagram = () => {
    window.open(reel.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={handleOpenInstagram}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-neutral-950 border border-[#C5A059]/25 hover:border-[#C5A059] shadow-xl hover:shadow-[0_0_35px_rgba(197,160,89,0.3)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
    >
      {/* Video Element */}
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

      {/* Cinematic Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />

      {/* Top Header inside Card */}
      <div className="relative z-10 p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A059]/40 text-[#E6CA65] text-[10px] font-semibold tracking-wider uppercase">
          <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
          <span>{reel.badge}</span>
        </div>

        {/* Audio Toggle Button */}
        <button
          type="button"
          onClick={toggleMute}
          title={isMuted ? 'Ativar som' : 'Desativar som'}
          className="w-8 h-8 rounded-full bg-black/60 hover:bg-[#C5A059] text-white hover:text-black border border-white/20 hover:border-[#C5A059] flex items-center justify-center backdrop-blur-md transition-all duration-200"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#E6CA65] hover:text-black animate-pulse" />
          )}
        </button>
      </div>

      {/* Center Reel Play Icon Overlay on Hover */}
      <div className="relative z-10 flex items-center justify-center my-auto pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
        <div className="w-14 h-14 rounded-full bg-[#C5A059]/90 text-black flex items-center justify-center shadow-2xl backdrop-blur-xs">
          <Play className="w-6 h-6 fill-current ml-0.5" />
        </div>
      </div>

      {/* Bottom Information & Instagram Action */}
      <div className="relative z-10 p-4 pt-3">
        <p className="text-xs font-medium text-white line-clamp-2 leading-relaxed mb-3 drop-shadow">
          {reel.title}
        </p>

        {/* Direct Link Button */}
        <div className="w-full py-2 px-3 rounded-lg bg-[#C5A059]/20 group-hover:bg-[#C5A059] border border-[#C5A059]/40 group-hover:border-[#C5A059] text-[#E6CA65] group-hover:text-black flex items-center justify-center gap-2 text-[11px] font-semibold tracking-wider uppercase transition-all duration-300">
          <Instagram className="w-3.5 h-3.5" />
          <span>Ver no Instagram</span>
          <ExternalLink className="w-3 h-3 ml-auto opacity-70 group-hover:opacity-100" />
        </div>
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

          <div className="mt-5">
            <a
              href="https://instagram.com/tiago_perfumespremiumswiss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#C5A059] to-[#E6CA65] text-black font-semibold text-xs tracking-wider uppercase hover:opacity-95 shadow-lg shadow-[#C5A059]/20 transition-all transform hover:scale-105 active:scale-95"
            >
              <Instagram className="w-4 h-4" />
              <span>Seguir no Instagram</span>
            </a>
          </div>
        </div>

        {/* 4 Vertical Reels Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {INSTAGRAM_REELS.map((reel, idx) => (
            <ReelCard key={reel.id} reel={reel} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
