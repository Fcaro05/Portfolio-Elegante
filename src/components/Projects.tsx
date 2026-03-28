import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../lib/utils';

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
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // The track will translate horizontally by its own width minus the viewport width.
  // This ensures the last item stops exactly at the right edge (plus padding).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "calc(-100% + 100vw)"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-bg">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="absolute top-32 left-8 md:left-32 z-10 mix-blend-difference pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif italic text-white"
          >
            Selected Work
          </motion.h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-[10vw] md:px-[20vw] items-center h-full w-max">
          {PROJECTS.map((project, index) => {
            return (
              <ProjectCard 
                project={project} 
                index={index} 
                key={project.id} 
                scrollYProgress={scrollYProgress} 
                total={PROJECTS.length}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

const ProjectCard = ({ project, index, scrollYProgress, total }: { project: any, index: number, scrollYProgress: any, total: number }) => {
  // Intense internal parallax: as the track moves left, the image moves right.
  const imageX = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div 
      className="w-[80vw] md:w-[50vw] h-[60vh] md:h-[70vh] relative flex flex-col justify-center shrink-0 group" 
      data-cursor-text="View"
    >
      <div className="w-full h-full relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-2xl">
        <motion.div 
          style={{ x: imageX }}
          className="absolute inset-0 w-[140%] h-full -left-[20%]"
        >
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-80" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
        </motion.div>

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
