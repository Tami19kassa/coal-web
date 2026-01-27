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
    className="absolute w-[1px] h-[1px] bg-orange-500 shadow-[0_0_10px_#ea580c] z-50"
  />
);

export const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-orange-600 overflow-x-hidden">
      {/* 1. GLOBAL SPARKS */}
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => <Spark key={i} i={i} />)}
      </div>

      {/* 2. GLOBAL BACKGROUND IMAGE (Fixed) */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          style={{ y: bgY, backgroundImage: "url('/bg-industrial.jpg')" }} 
          className="absolute inset-0 bg-cover bg-center grayscale-[0.4] brightness-[0.3] scale-110"
        />
        {/* Lighter gradient so image shows through more */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        <div className="absolute inset-0 scanline-effect opacity-[0.03] pointer-events-none" />
      </div>

      {/* 3. CONTENT WRAPPER */}
      <div className="relative z-10">
        {children}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scanline-effect { background: linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.05) 50%); background-size: 100% 4px; }
        .amber-glow-text { text-shadow: 0 0 50px rgba(234, 88, 12, 0.8); }
      `}} />
    </div>
  );
};