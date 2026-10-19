import React from 'react';
import { Sparkles, ShieldCheck, Zap, Gift } from 'lucide-react';

interface MarqueeTickerProps {
  onOpenTrioBuilder?: () => void;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ onOpenTrioBuilder }) => {
  const items = [
    {
      id: 'trio',
      icon: Gift,
      text: 'PROMOÇÃO TRIO DE BOLSO: 3x 15ml por apenas R$ 89,90',
      action: onOpenTrioBuilder,
      actionLabel: 'MONTAR TRIO',
      badge: 'OFERTA'
    },
    {
      id: 'pix',
      icon: Zap,
      text: '5% OFF NO PIX EM TODO O SITE',
      badge: 'ECONOMIA'
    },
    {
      id: 'fixacao',
      icon: ShieldCheck,
      text: 'PERFUMES COM ESSÊNCIAS IMPORTADAS COM FIXAÇÃO DE 8 A 12 HORAS',
      badge: 'ALTA FIXAÇÃO'
    },
    {
      id: 'trio-2',
      icon: Gift,
      text: 'PROMOÇÃO TRIO DE BOLSO: 3x 15ml por apenas R$ 89,90',
      action: onOpenTrioBuilder,
      actionLabel: 'MONTAR TRIO',
      badge: 'OFERTA'
    },
    {
      id: 'pix-2',
      icon: Zap,
      text: '5% OFF NO PIX EM TODO O SITE',
      badge: 'ECONOMIA'
    },
    {
      id: 'fixacao-2',
      icon: ShieldCheck,
      text: 'PERFUMES COM ESSÊNCIAS IMPORTADAS COM FIXAÇÃO DE 8 A 12 HORAS',
      badge: 'ALTA FIXAÇÃO'
    }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950/95 border-y border-[#C5A059]/35 py-2.5 sm:py-3 select-none backdrop-blur-sm z-20">
      {/* Subtle gold gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#C5A059]/5 via-[#C5A059]/10 to-[#C5A059]/5 pointer-events-none" />

      {/* Marquee Track */}
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {/* First repetition */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`a-${idx}`}
              onClick={item.action}
              className={`inline-flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-200 ${
                item.action ? 'cursor-pointer hover:text-[#E6CA65]' : ''
              }`}
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C5A059]/15 text-[#C5A059]">
                <Icon className="w-3 h-3" />
              </span>
              <span className="text-zinc-200 font-medium tracking-wide">
                {item.text}
              </span>
              {item.actionLabel && (
                <span className="ml-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-[#C5A059]/25 text-[#E6CA65] border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-black transition-colors">
                  {item.actionLabel}
                </span>
              )}
              <span className="mx-4 text-[#C5A059]/60 font-bold">✦</span>
            </div>
          );
        })}

        {/* Second repetition for seamless infinite loop */}
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`b-${idx}`}
              onClick={item.action}
              className={`inline-flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-200 ${
                item.action ? 'cursor-pointer hover:text-[#E6CA65]' : ''
              }`}
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C5A059]/15 text-[#C5A059]">
                <Icon className="w-3 h-3" />
              </span>
              <span className="text-zinc-200 font-medium tracking-wide">
                {item.text}
              </span>
              {item.actionLabel && (
                <span className="ml-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-[#C5A059]/25 text-[#E6CA65] border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-black transition-colors">
                  {item.actionLabel}
                </span>
              )}
              <span className="mx-4 text-[#C5A059]/60 font-bold">✦</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
