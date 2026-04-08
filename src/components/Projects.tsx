import React, { useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "Ethereal",
    category: "Digital Experience",
    image: "https://picsum.photos/seed/project1/1920/1080",
    year: "2026"
  },
  {
    id: 2,
    title: "Nexus",
    category: "Web Application",
    image: "https://picsum.photos/seed/project2/1920/1080",
    year: "2025"
  },
  {
    id: 3,
    title: "Aura",
    category: "Brand Identity",
    image: "https://picsum.photos/seed/project3/1920/1080",
    year: "2025"
  },
  {
    id: 4,
    title: "Nova",
    category: "E-Commerce",
    image: "https://picsum.photos/seed/project4/1920/1080",
    year: "2024"
  }
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current || !glowRef.current) return;

    const track = trackRef.current;
    const glow = glowRef.current;
    const cards = gsap.utils.toArray('.project-image-inner');

    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    // The Horizontal Tween
    tl.to(track, {
      x: () => -getScrollAmount(),
      ease: "none",
      duration: 1
    }, 0);

    // The Inner Image Parallax
    cards.forEach((card: any) => {
      tl.to(card, {
        xPercent: 20,
        ease: "none",
        duration: 1
      }, 0);
    });

    // Glow Fade In/Out
    gsap.set(glow, { opacity: 0 });
    tl.to(glow, { opacity: 1, duration: 0.1, ease: "none" }, 0);
    tl.to(glow, { opacity: 0, duration: 0.1, ease: "none" }, 0.9);

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-bg overflow-hidden">
      <div className="h-screen flex items-center">
        {/* Background ambient glow */}
        <div 
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[60vh] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        />
        
        <div ref={trackRef} className="flex items-center h-full w-max">
          {/* Title Slide */}
          <div className="w-screen lg:w-[40vw] pl-8 md:pl-32 pr-8 shrink-0 flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-white"
            >
              Selected Work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/50 mt-6 text-lg md:text-xl font-light max-w-md"
            >
              A curated collection of our most recent and impactful digital experiences.
            </motion.p>
          </div>

          {/* Cards Container */}
          <div className="flex gap-8 md:gap-16 pr-8 md:pr-32 items-center h-full w-max">
            {PROJECTS.map((project, index) => {
              return (
                <ProjectCard 
                  project={project} 
                  index={index} 
                  key={project.id} 
                  total={PROJECTS.length}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ project, index, total }: { project: any, index: number, total: number }) => {
  return (
    <div 
      className="w-[80vw] lg:w-[50vw] h-[60vh] md:h-[70vh] relative flex flex-col justify-center shrink-0 group" 
      data-cursor-text="View"
    >
      <div className="w-full h-full relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl">
        <div 
          className="absolute inset-0 w-[140%] h-full -left-[20%] project-image-inner"
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-80" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start overflow-hidden">
            <div className="overflow-hidden">
              <motion.div 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-xs md:text-sm text-white/50 tracking-widest uppercase"
              >
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="font-mono text-xs md:text-sm text-white/50 tracking-widest"
              >
                {project.year}
              </motion.div>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="overflow-hidden mb-2 md:mb-4">
              <motion.h3 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight text-white"
              >
                {project.title}
              </motion.h3>
            </div>
            <div className="overflow-hidden">
              <motion.p 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="text-sm md:text-lg text-white/60 font-light tracking-wide uppercase"
              >
                {project.category}
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
