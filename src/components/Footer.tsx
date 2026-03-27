import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-bg px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-serif italic mb-2">Creative Portfolio</h3>
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest">
            © 2026 All Rights Reserved
          </p>
        </div>

        <div className="flex gap-8">
          {['LinkedIn', 'Twitter', 'GitHub', 'Dribbble'].map((link) => (
            <motion.a
              key={link}
              href="#"
              whileHover={{ y: -2 }}
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              {link}
            </motion.a>
          ))}
        </div>

        <div className="text-center md:text-right">
          <p className="text-white/30 text-[10px] uppercase tracking-widest font-mono">
            Designed & Developed <br />
            with Passion
          </p>
        </div>
      </div>
    </footer>
  );
}
