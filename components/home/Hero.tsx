// src/components/home/Hero.tsx
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Crosshair, Zap } from 'lucide-react';
import { CipherReveal } from './CipherReveal';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export const Hero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Physics for the spotlight movement
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function handleMouseMove({ clientX, clientY }: MouseEvent) {
    x.set(clientX);
    y.set(clientY);
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Transform Logic
  const rotateX = useTransform(mouseY, [-500, 500], [5, -5]);
  const rotateY = useTransform(mouseX, [-500, 500], [-5, 5]);

  const maskImageValue = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, transparent 0%, #000000 100%)`;

  return (
    <section className="min-h-screen w-full relative flex items-center justify-center py-20 md:py-0 overflow-hidden" style={{ perspective: 1000 }}>
      
      {/* 1. GRID LAYER */}
      <motion.div 
        style={{ rotateX, rotateY, x: mouseX, y: mouseY }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>

      {/* 2. SPOTLIGHT MASK */}
      <motion.div 
        className="absolute inset-0 z-0 bg-black"
        style={{
          maskImage: maskImageValue,
          WebkitMaskImage: maskImageValue
        }}
      >
        <div className="absolute inset-0 opacity-40 bg-[url('/bg-industrial.jpg')] bg-cover bg-center grayscale" />
      </motion.div>

      {/* 3. CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* TOP TAGLINE */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-6 md:mb-8 border-l-2 border-orange-500 pl-4 md:pl-6">
            <Zap className="text-orange-500 w-4 h-4 md:w-5 md:h-5 animate-pulse shrink-0" />
            <div className="text-[10px] md:text-xs font-bold text-orange-500 tracking-[0.2em] break-all">
              <CipherReveal text="SYSTEM STATUS: ONLINE // SECURE UPLINK" delay={0.2} />
            </div>
          </motion.div>

          {/* MAIN HEADLINE - RESPONSIVE FIX HERE */}
          <div className="relative w-full">
            <Crosshair className="absolute -top-4 -left-4 md:-top-8 md:-left-8 text-white/10 w-6 h-6 md:w-8 md:h-8" />
            
            {/* 
               Using 'text-[13vw]' makes the font size relative to screen width.
               It will never overflow.
            */}
            <h1 className="font-black leading-[0.85] tracking-tighter text-white uppercase mix-blend-difference w-full break-words">
              
              {/* LINE 1: ENGINEERING */}
              <div className="overflow-hidden text-[13vw] md:text-[10rem]">
                <CipherReveal text="ENGINEERING" className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500" delay={0.5} />
              </div>
              
              {/* LINE 2: THE UNBREAKABLE */}
              <div className="overflow-hidden flex flex-wrap items-baseline gap-2 md:gap-8 text-[13vw] md:text-[10rem]">
                <span className="text-orange-600 text-[0.5em] md:text-[0.4em] self-center">THE</span>
                <CipherReveal text="UNBREAKABLE" className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500" delay={1.2} />
              </div>
            </h1>
          </div>

          {/* SUBTEXT & CTA */}
          <div className="mt-8 md:mt-12 w-full border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <motion.p variants={fadeInUp} className="max-w-xl text-slate-400 font-medium text-sm md:text-lg leading-relaxed">
              We architect high-velocity digital infrastructure. <span className="text-white font-bold">Zero latency. Zero compromise.</span>
            </motion.p>
            
            <motion.div variants={fadeInUp} className="w-full lg:w-auto">
              <a 
                href="#projects" 
                className="group relative w-full lg:w-auto inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-6 border border-white/20 hover:border-orange-500 transition-all"
              >
                <div className="absolute inset-0 w-0 bg-orange-600 transition-all duration-300 group-hover:w-full opacity-10"></div>
                <span className="relative text-white font-black uppercase tracking-[0.2em] flex items-center group-hover:text-orange-500 transition-colors text-xs md:text-base">
                  Initiate Protocol <ArrowRight className="ml-3 md:ml-4 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Smooth Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
};