import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/content';
import { handleImageError } from '../utils/imageHelper';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-24 bg-black/40 text-white border-b border-[#C5A059]/20 backdrop-blur-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <a
            href="https://instagram.com/tiago_perfumespremiumswiss"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059] hover:text-white transition-colors mb-2"
          >
            <Instagram className="w-4 h-4" />
            <span>@TIAGO_PERFUMESPREMIUMSWISS</span>
          </a>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            Siga Nosso Ateliê no Instagram
          </h2>
          <p className="mt-2 text-xs text-neutral-300 font-light">
            Bastidores, pirâmides olfativas e depoimentos em tempo real.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative aspect-square overflow-hidden bg-neutral-950 border border-neutral-800 cursor-pointer flex items-center justify-center p-3"
            >
              <img 
                src={post.image}
                alt={post.title}
                className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                onError={(e) => handleImageError(e, post.image)}
              />

              {/* Dark Hover Overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between text-xs font-mono text-[#C5A059]">
                  <Instagram className="w-4 h-4" />
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    {post.likes}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-light text-neutral-200 leading-snug">
                    {post.title}
                  </p>
                  <span className="inline-block mt-3 text-[10px] uppercase font-semibold tracking-widest text-[#C5A059]">
                    Ver no Instagram →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
