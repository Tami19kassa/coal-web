import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SparkOverlay from './SparkOverlay';

const BackgroundLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* 1. CONTINUOUS FIRE SPARKS */}
      <SparkOverlay />
      
      {/* 2. GLOBAL BACKGROUND IMAGE */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          style={{ y: bgY, backgroundImage: "url('/bg-industrial.jpg')" }} 
          className="absolute inset-0 bg-cover bg-center grayscale-[0.5] brightness-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        <div className="absolute inset-0 scanline-effect opacity-[0.05]" />
      </div>

      {/* 3. PAGE CONTENT */}
      <div className="relative z-10">{children}</div>

      <style dangerouslySetInnerHTML={{ __html: `
        .preserve-3d { transform-style: preserve-3d; }
        .rotate-y-90 { transform: rotateY(90deg); }
        .rotate-x-90 { transform: rotateX(90deg); }
        .amber-glow-text { text-shadow: 0 0 40px rgba(234, 88, 12, 0.8); }
        .scanline-effect {
          background: linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.05) 50%);
          background-size: 100% 4px;
        }
      `}} />
    </div>
  );
};

export default BackgroundLayout;