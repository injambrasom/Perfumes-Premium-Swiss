import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { handleImageError } from '../utils/imageHelper';

interface CategoryShowcaseProps {
  onSelectCategory: (cat: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const categoryCards = [
    {
      title: 'Masculinos',
      subtitle: 'Presença, força e elegância silenciosa',
      value: 'Masculino',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=85&w=800'
    },
    {
      title: 'Femininos',
      subtitle: 'Sensualidade radiante, flores raras e sofisticação',
      value: 'Feminino',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=85&w=800'
    },
    {
      title: 'Árabes',
      subtitle: 'Opulência oriental, canela, fava tonka e oud nobre',
      value: 'Árabe',
      image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=85&w=800'
    },
    {
      title: 'Nicho',
      subtitle: 'Criações exclusivas para apreciadores exigentes',
      value: 'Nicho',
      image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=85&w=800'
    }
  ];

  return (
    <section className="py-24 bg-black/20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] font-sans tracking-[0.35em] uppercase text-[#C5A059] font-semibold block mb-2">
            EXPLORE NOSSOS UNIVERSOS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-wide text-white">
            Categorias de Luxo
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4" />
        </div>

        {/* Big Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categoryCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              onClick={() => {
                onSelectCategory(card.value);
                const el = document.getElementById('signature-collection');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative h-[380px] sm:h-[450px] overflow-hidden border border-neutral-800 cursor-pointer"
            >
              {/* Image */}
              <img 
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-80"
                onError={(e) => handleImageError(e, card.image)}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end z-10">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A059] mb-2 block">
                  COLEÇÃO SWISS
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white group-hover:text-[#C5A059] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-2 max-w-md">
                  {card.subtitle}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white group-hover:text-[#C5A059] transition-colors">
                  <span>Explorar Fragrâncias</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
