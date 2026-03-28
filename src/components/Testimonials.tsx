import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { Quote } from 'lucide-react';
import { cn } from '../lib/utils';

const TESTIMONIALS = [
  {
    content: "An exceptional talent who understands both the technical and business sides of a product. A rare find in today's market.",
    author: "Sarah Jenkins",
    role: "CEO at TechFlow",
    avatar: "https://picsum.photos/seed/person1/100/100"
  },
  {
    content: "The marketing strategies implemented were game-changing for our growth. Highly professional and results-oriented.",
    author: "Marcus Thorne",
    role: "Marketing Director at Innovate",
    avatar: "https://picsum.photos/seed/person2/100/100"
  },
  {
    content: "Incredible attention to detail and a deep understanding of modern web architecture. Truly a pleasure to work with.",
    author: "Elena Rodriguez",
    role: "Product Manager at Nexus",
    avatar: "https://picsum.photos/seed/person3/100/100"
  }
];

const MagneticCard = ({ t, index }: { t: typeof TESTIMONIALS[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Scroll-driven animations
  // Center is around 0.5. We want it fully active between 0.4 and 0.6.
  const scale = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0.9, 1.05, 1.05, 0.9]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0.3, 1, 1, 0.3]);
  const blurValue = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [8, 0, 0, 8]);
  const blur = useTransform(blurValue, v => `blur(${v}px)`);
  
  // Spotlight glow intensity
  const spotlightOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 0.5, 0.5, 0]);

  // Mouse interaction (Magnetic Parallax)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseYSpring, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-200, 200], [-10, 10]);
  
  const contentX = useTransform(mouseXSpring, [-200, 200], [-15, 15]);
  const contentY = useTransform(mouseYSpring, [-200, 200], [-15, 15]);

  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        scale: isMobile ? 1 : scale,
        opacity: isMobile ? 1 : opacity,
        filter: isMobile ? "none" : blur,
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformPerspective: 1200,
      }}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseEnter={isMobile ? undefined : handleMouseEnter}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      className="relative w-full max-w-4xl mx-auto my-32 md:my-48 cursor-pointer group"
      data-cursor-text="Read"
    >
      <div 
        className="relative p-8 md:p-16 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl overflow-hidden"
        style={{
          boxShadow: isHovered ? `0 20px 40px -20px rgba(255,255,255,0.05)` : '0 10px 30px -10px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.5s ease'
        }}
      >
        {/* Scroll-driven Spotlight Glow */}
        <motion.div
          style={{ opacity: isMobile ? 0 : spotlightOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div 
            className="absolute inset-0 opacity-20 blur-[100px]"
            style={{ background: `radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 70%)` }}
          />
        </motion.div>

        {/* Hover Spotlight Glow */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <div 
            className="absolute inset-0 opacity-30 blur-[80px]"
            style={{ background: `radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 60%)` }}
          />
          <div 
            className="absolute -inset-px rounded-[2.5rem] border opacity-30 transition-colors duration-500"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          />
        </div>

        {/* Content */}
        <motion.div 
          style={{ x: isMobile ? 0 : contentX, y: isMobile ? 0 : contentY }}
          className="relative z-10"
        >
          <Quote 
            className="absolute -top-4 -left-4 md:-top-8 md:-left-8 opacity-5 rotate-180 text-white" 
            size={80} 
          />
          
          <p className="text-2xl md:text-4xl lg:text-5xl font-serif font-light italic text-white/80 leading-tight mb-12 md:mb-16 relative z-10 tracking-tight">
            "{t.content}"
          </p>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <img 
                src={t.avatar} 
                alt={t.author} 
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 object-cover grayscale opacity-80 group-hover:opacity-100 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h4 className="font-sans font-medium text-lg md:text-xl tracking-wide text-white/90">{t.author}</h4>
              <p className="font-mono text-xs md:text-sm uppercase tracking-widest mt-1 text-white/40">
                {t.role}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export function Testimonials() {
  return (
    <section className="py-32 md:py-48 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-32 md:mb-48">
          <motion.h2 
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-serif italic mb-6"
          >
            Kind Words
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/40 font-mono text-sm uppercase tracking-[0.3em]"
          >
            From partners and clients
          </motion.p>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          {TESTIMONIALS.map((t, index) => (
            <MagneticCard key={t.author} t={t} index={index} />
          ))}
        </div>
      </div>
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
