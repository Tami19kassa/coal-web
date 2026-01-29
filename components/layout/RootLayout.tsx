// src/components/layout/RootLayout.tsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Spark = ({ i }: { i: number }) => (
  <motion.div
    initial={{ y: "110vh", x: `${Math.random() * 100}%`, opacity: 0 }}
    animate={{ 
      y: "-10vh", 
      x: [`${Math.random() * 100}%`, `${Math.random() * 100 + (Math.random() - 0.5) * 10}%`],
      opacity: [0, 1, 0] 
    }}
    transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
    // CHANGED: Orange to Cyan
    className="absolute w-[1px] h-[1px] bg-cyan-500 shadow-[0_0_10px_#06b6d4] z-50"
  />
);

export const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']); // Slight parallax on video container

  return (
    // CHANGED: Selection color to Cyan
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-600 overflow-x-hidden">
      
      {/* 1. GLOBAL PARTICLES (DATA BITS) */}
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => <Spark key={i} i={i} />)}
      </div>

      {/* 2. GLOBAL BACKGROUND VIDEO */}
      <div className="fixed inset-0 z-0">
        <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover grayscale-[0.6] brightness-[0.4] scale-105"
          >
            <source src="/bg-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
        
        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        <div className="absolute inset-0 scanline-effect opacity-[0.05] pointer-events-none" />
      </div>

      {/* 3. CONTENT WRAPPER */}
      <div className="relative z-10">
        {children}
      </div>

      {/* CHANGED: Glow effect to Cyan */}
      <style dangerouslySetInnerHTML={{ __html: `
        .scanline-effect { background: linear-gradient(to bottom, transparent 50%, rgba(6, 182, 212, 0.05) 50%); background-size: 100% 4px; }
        .cyan-glow-text { text-shadow: 0 0 50px rgba(6, 182, 212, 0.8); }
      `}} />
    </div>
  );
};