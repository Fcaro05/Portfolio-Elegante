import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Megaphone, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const PILLARS = [
  {
    id: 'dev',
    title: 'Development',
    subtitle: 'Engineering',
    icon: Code2,
    color: 'var(--color-accent-dev)',
    bgImage: 'https://picsum.photos/seed/code/1200/1800',
    description: 'Architecting high-performance digital solutions with modern stacks and scalable systems.',
    tags: ['React', 'TypeScript', 'Node.js', 'AWS']
  },
  {
    id: 'marketing',
    title: 'Marketing',
    subtitle: 'Strategy',
    icon: Megaphone,
    color: 'var(--color-accent-marketing)',
    bgImage: 'https://picsum.photos/seed/strategy/1200/1800',
    description: 'Data-driven growth strategies that amplify brand presence and maximize conversion.',
    tags: ['Growth', 'SEO', 'PPC', 'Analytics']
  },
  {
    id: 'business',
    title: 'Business',
    subtitle: 'Intelligence',
    icon: TrendingUp,
    color: 'var(--color-accent-business)',
    bgImage: 'https://picsum.photos/seed/business/1200/1800',
    description: 'Bridging the gap between technology and profitability through strategic insight.',
    tags: ['Product', 'Ops', 'Finance', 'Strategy']
  }
];

export function Hero() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-bg"
    >
      {PILLARS.map((pillar, index) => (
        <Pillar 
          key={pillar.id}
          pillar={pillar}
          index={index}
          isHovered={hoveredId === pillar.id}
          isAnyHovered={hoveredId !== null}
          onHover={() => setHoveredId(pillar.id)}
          onLeave={() => setHoveredId(null)}
        />
      ))}

      {/* Center Overlay Text (Optional, for a more unified look when nothing is hovered) */}
      <AnimatePresence>
        {!hoveredId && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-serif italic text-white/20 tracking-tighter">
                Triple Excellence
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

interface PillarProps {
  pillar: typeof PILLARS[0];
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const Pillar: React.FC<PillarProps> = ({ 
  pillar, 
  isHovered, 
  isAnyHovered, 
  onHover, 
  onLeave 
}) => {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-cursor-text={pillar.title}
      animate={{ 
        flex: isHovered ? 2 : (isAnyHovered ? 0.5 : 1),
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className={cn(
        "relative h-full flex flex-col justify-end p-8 md:p-12 cursor-pointer overflow-hidden border-r border-white/5 last:border-r-0",
        isAnyHovered && !isHovered && "opacity-40 grayscale"
      )}
    >
      {/* Background Image */}
      <motion.div 
        animate={{ 
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 0.4 : 0.15
        }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={pillar.bgImage} 
          alt={pillar.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      </motion.div>

      {/* Glowing Border/Accent */}
      <motion.div 
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scaleX: isHovered ? 1 : 0
        }}
        className="absolute top-0 left-0 w-full h-[2px] origin-left z-10"
        style={{ backgroundColor: pillar.color, boxShadow: `0 0 20px ${pillar.color}` }}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <motion.div 
          animate={{ 
            y: isHovered ? 0 : 20,
            color: isHovered ? pillar.color : 'rgba(255,255,255,0.5)'
          }}
          className="mb-4"
        >
          <pillar.icon size={isHovered ? 48 : 32} className="transition-all duration-500" />
        </motion.div>

        <div className="mb-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono block mb-1">
            {pillar.subtitle}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">
            {pillar.title}
          </h2>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-md"
            >
              <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
                {pillar.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {pillar.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-wider text-white/50">
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ x: 10 }}
                className="flex items-center gap-3 text-sm font-bold group"
              >
                <span>Explore {pillar.title}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Decorative Element (Mobile Hidden) */}
      <motion.div 
        animate={{ 
          y: isHovered ? [0, -10, 0] : 0,
          opacity: isHovered ? 0.3 : 0
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-24 h-24 rounded-full border border-white/20 glass hidden lg:block pointer-events-none"
        style={{ borderColor: `${pillar.color}40` }}
      />
    </motion.div>
  );
}
