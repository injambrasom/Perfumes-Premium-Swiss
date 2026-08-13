import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsapp: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.a
        href={`https://wa.me/5554999893370?text=${encodeURIComponent(
          'PERFUMES PREMIUM SWISS ATELIER\nOlá! Gostaria de atendimento exclusivo com um consultor olfativo.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative group flex items-center gap-3 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl transition-all duration-300"
        aria-label="Atendimento via WhatsApp"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        <MessageCircle className="w-6 h-6 shrink-0 relative z-10" />

        <span className="hidden md:inline font-sans text-xs font-semibold uppercase tracking-wider pr-1 relative z-10">
          Atendimento Exclusivo
        </span>
      </motion.a>
    </div>
  );
};
