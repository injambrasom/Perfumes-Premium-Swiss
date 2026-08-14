import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsapp: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.a
        href={`https://wa.me/5554999893370?text=${encodeURIComponent(
          'PERFUMES PREMIUM SWISS ATELIER\nOlá! Gostaria de falar com um consultor olfativo.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center gap-3 py-3 px-5 bg-[#0D0D11]/95 hover:bg-black text-white border border-[#C5A059]/60 hover:border-[#C5A059] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300"
        aria-label="Atendimento via WhatsApp com Consultor"
      >
        <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 relative z-10" />

        <span className="hidden sm:inline font-sans text-xs font-semibold uppercase tracking-wider text-neutral-100 pr-1 relative z-10">
          Fale com um Consultor
        </span>
      </motion.a>
    </div>
  );
};
