import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'text'>('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring configuration for inertia
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updateCursorState = (target: HTMLElement) => {
      const isInteractive = target.closest('button, a, .cursor-hover');
      const textReveal = target.closest('[data-cursor-text]');

      if (textReveal) {
        setCursorType('text');
        setCursorText(textReveal.getAttribute('data-cursor-text') || '');
      } else if (isInteractive) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      
      // Update cursor state on move to catch dynamic attribute changes
      updateCursorState(e.target as HTMLElement);
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateCursorState(e.target as HTMLElement);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorType === 'hover' ? 80 : cursorType === 'text' ? 100 : 12,
          height: cursorType === 'hover' ? 80 : cursorType === 'text' ? 100 : 12,
          backgroundColor: cursorType === 'text' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 1)',
          mixBlendMode: cursorType === 'text' ? 'normal' : 'difference',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }}
        className="rounded-full flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence>
          {cursorType === 'text' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[10px] font-bold text-black uppercase tracking-tighter text-center px-2"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Outer subtle glow/ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorType === 'hover' ? 100 : 40,
          height: cursorType === 'hover' ? 100 : 40,
          opacity: isVisible ? 0.3 : 0,
        }}
        className="border border-white/20 rounded-full blur-[2px]"
      />
    </div>
  );
}
