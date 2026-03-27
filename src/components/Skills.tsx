import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence, useTransform, type MotionValue } from 'motion/react';
import { Code2, Megaphone, TrendingUp, type LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  description: string;
  items: string[];
}

const SKILLS: Skill[] = [
  {
    id: 'dev',
    title: 'Development',
    icon: Code2,
    color: 'var(--color-accent-dev)',
    description: 'Architecting high-performance digital solutions with modern stacks and scalable systems.',
    items: ['React / Next.js', 'TypeScript', 'Node.js', 'Cloud Infrastructure']
  },
  {
    id: 'marketing',
    title: 'Marketing',
    icon: Megaphone,
    color: 'var(--color-accent-marketing)',
    description: 'Data-driven growth strategies that amplify brand presence and maximize conversion.',
    items: ['Growth Strategy', 'SEO / SEM', 'Content Marketing', 'Analytics']
  },
  {
    id: 'business',
    title: 'Business',
    icon: TrendingUp,
    color: 'var(--color-accent-business)',
    description: 'Strategic planning and operational excellence to drive sustainable growth and profitability.',
    items: ['Product Strategy', 'Operations', 'Market Analysis', 'Financial Modeling']
  }
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useGSAP(() => {
    if (isMobile) return;

    // The pinning timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", 
        end: "+=2000px", 
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Lock interaction when shards are mostly assembled (progress > 0.4)
          setIsLocked(self.progress >= 0.4 && self.progress <= 0.95);
        }
      }
    });

    // Shard 0 (Dev) - From extreme Top-Left
    tl.fromTo(shardsRef.current[0], 
      { 
        x: -2000, 
        y: -1000, 
        rotateX: 90, 
        rotateY: -90, 
        scale: 0.2, 
        opacity: 0 
      },
      { 
        x: 0, 
        y: 0, 
        rotateX: 0, 
        rotateY: 0, 
        scale: 1, 
        opacity: 1, 
        ease: "power2.inOut" 
      }, 
      0
    );

    // Shard 1 (Marketing) - From extreme Top-Right
    tl.fromTo(shardsRef.current[1], 
      { 
        x: 2000, 
        y: -500, 
        rotateX: -90, 
        rotateY: 90, 
        scale: 0.2, 
        opacity: 0 
      },
      { 
        x: 0, 
        y: 0, 
        rotateX: 0, 
        rotateY: 0, 
        scale: 1, 
        opacity: 1, 
        ease: "power2.inOut" 
      }, 
      0
    );

    // Shard 2 (Business) - From extreme Bottom
    tl.fromTo(shardsRef.current[2], 
      { 
        x: 0, 
        y: 2000, 
        rotateX: 120, 
        rotateY: 0, 
        scale: 0.2, 
        opacity: 0 
      },
      { 
        x: 0, 
        y: 0, 
        rotateX: 0, 
        rotateY: 0, 
        scale: 1, 
        opacity: 1, 
        ease: "power2.inOut" 
      }, 
      0
    );

    // Fracture lines fade in late
    tl.fromTo(".fracture-line", 
      { opacity: 0 },
      { opacity: 0.4, duration: 0.2 },
      0.35
    );

  }, { scope: containerRef, dependencies: [isMobile] });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-bg overflow-hidden"
    >
      <div ref={stickyRef} className="h-screen w-full flex items-center justify-center perspective-[2000px]">
        <div className="relative w-full h-full max-w-[1600px] max-h-[900px] px-6 lg:px-12">
          
          {/* Shards Container */}
          <div className="relative w-full h-full grid grid-cols-1 lg:block">
            {SKILLS.map((skill, index) => (
              <Shard 
                key={skill.id}
                ref={(el) => (shardsRef.current[index] = el)}
                skill={skill}
                index={index}
                mouseX={smoothMouseX}
                mouseY={smoothMouseY}
                isHovered={hoveredId === skill.id}
                isAnyHovered={hoveredId !== null}
                onHover={() => isLocked && setHoveredId(skill.id)}
                onLeave={() => setHoveredId(null)}
                isMobile={isMobile}
                isLocked={isLocked}
              />
            ))}
          </div>

          {/* Glowing Fracture Lines (Desktop only) */}
          {!isMobile && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Vertical-ish fracture */}
              <div className="fracture-line absolute top-0 left-[60%] w-[1px] h-full bg-gradient-to-b from-white/0 via-white/40 to-white/0 blur-[1px] -rotate-[11.3deg] origin-top" />
              {/* Horizontal-ish fracture */}
              <div className="fracture-line absolute top-[50%] left-[50%] w-[50%] h-[1px] bg-gradient-to-r from-white/40 to-white/0 blur-[1px]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface ShardProps {
  skill: Skill;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isMobile: boolean;
  isLocked: boolean;
}

const Shard = React.forwardRef<HTMLDivElement, ShardProps>(({ 
  skill, index, mouseX, mouseY, isHovered, isAnyHovered, onHover, onLeave, isMobile, isLocked 
}, ref) => {
  // Parallax animations (Mouse-linked) - only active when locked
  const parallaxRotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const parallaxRotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  // Clip paths for the seamless shattered look (Desktop)
  const clipPaths = [
    "polygon(0 0, 60% 0, 40% 100%, 0 100%)", // Dev
    "polygon(60% 0, 100% 0, 100% 50%, 50% 50%)", // Marketing
    "polygon(50% 50%, 100% 50%, 100% 100%, 40% 100%)" // Business
  ];

  if (isMobile) {
    return (
      <div className="mb-8 last:mb-0">
        <div className="glass p-8 rounded-3xl border-l-4" style={{ borderColor: skill.color }}>
          <div className="flex items-center gap-4 mb-4">
            <skill.icon size={32} style={{ color: skill.color }} />
            <h3 className="text-3xl font-bold tracking-tighter">{skill.title}</h3>
          </div>
          <p className="text-white/60 mb-6 leading-relaxed">{skill.description}</p>
          <ul className="grid grid-cols-2 gap-3">
            {skill.items.map(item => (
              <li key={item} className="text-sm text-white/40 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: skill.color }} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={ref} 
      className="absolute inset-0 w-full h-full opacity-0"
      style={{ zIndex: isHovered ? 30 : (index === 2 ? 10 : (index === 1 ? 11 : 12)) }}
    >
      <motion.div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        style={{
          rotateX: isLocked ? (isAnyHovered ? 0 : parallaxRotateX) : 0,
          rotateY: isLocked ? (isAnyHovered ? 0 : parallaxRotateY) : 0,
          clipPath: clipPaths[index],
        }}
        animate={isLocked ? {
          scale: isHovered ? 1.02 : 1,
          opacity: isAnyHovered && !isHovered ? 0.3 : 1,
          filter: isAnyHovered && !isHovered ? "blur(12px)" : "blur(0px)",
        } : undefined}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full cursor-pointer bg-white/[0.03] backdrop-blur-sm border border-white/5 group overflow-hidden"
      >
        {/* Background Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
        style={{ background: `radial-gradient(circle at center, ${skill.color}, transparent)` }}
      />

      {/* Content Positioning */}
      <div className={cn(
        "absolute flex flex-col p-12",
        index === 0 ? "top-0 left-0 w-1/2 h-full justify-center" : 
        index === 1 ? "top-0 right-0 w-1/2 h-1/2 justify-end items-end text-right" :
        "bottom-0 right-0 w-1/2 h-1/2 justify-start items-end text-right"
      )}>
        <motion.div
          animate={{ 
            y: isHovered ? -10 : 0,
            color: isHovered ? skill.color : "rgba(255,255,255,0.5)"
          }}
          className="mb-6"
        >
          <skill.icon size={isHovered ? 64 : 48} className="transition-all duration-500" />
        </motion.div>

        <h3 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-4 leading-none">
          {skill.title}
        </h3>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="max-w-md"
            >
              <p className="text-lg text-white/60 font-light mb-8 leading-relaxed">
                {skill.description}
              </p>
              <div className={cn("flex flex-wrap gap-3", index !== 0 && "justify-end")}>
                {skill.items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-widest text-white/40"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating 3D Icon Accent */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 360, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-5 pointer-events-none"
      >
        <skill.icon size={128} />
      </motion.div>
      </motion.div>
    </div>
  );
});

Shard.displayName = 'Shard';
