import { SmoothScroll } from './components/SmoothScroll';
import { Hero } from './components/Hero';
import { LogoCloud } from './components/LogoCloud';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Manifesto } from './components/Manifesto';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { motion } from 'motion/react';

export default function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <main className="min-h-screen bg-bg selection:bg-white selection:text-black">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-between items-center mix-blend-difference">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white font-serif italic text-2xl tracking-tighter cursor-pointer"
            data-cursor-text="Home"
          >
            CP.
          </motion.div>
          
          <div className="flex gap-12">
            {['Work', 'Skills', 'About', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="text-white/60 hover:text-white text-xs uppercase tracking-[0.2em] font-mono transition-colors"
                data-cursor-text={item}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </nav>

        {/* Sections */}
        <Hero />
        
        <LogoCloud />
        
        <Skills />
        
        <Manifesto />
        
        <div id="work">
          <Projects />
        </div>
        
        <div id="about">
          <Testimonials />
        </div>
        
        <div id="contact">
          <ContactForm />
        </div>
        
        <Footer />
      </main>
    </SmoothScroll>
  );
}
