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

  // 1. THE SEARCHLIGHT EFFECT
  // Instead of a mask image, we use a simple background gradient.
  // Center = Transparent (shows Global BG), Edges = Black (hides it)
  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, transparent 0%, #000000 100%)`;

  return (
    <section className="h-screen w-full relative flex items-center justify-center">
      
      {/* 2. THE DARKNESS LAYER */}
      {/* This sits ON TOP of the Global Background but UNDER the text. */}
      {/* It follows the mouse to reveal the RootLayout image underneath. */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ background }}
      />

      {/* Grid Overlay (Optional, adds texture) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* 3. CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col items-start">
          <motion.div variants={fadeInUp} className="flex items-center space-x-4 mb-8 border-l-2 border-orange-500 pl-6">
            <Zap className="text-orange-500 w-5 h-5 animate-pulse" />
            <CipherReveal text="SYSTEM STATUS: ONLINE // SECURE UPLINK" className="text-xs font-bold text-orange-500 tracking-[0.2em]" delay={0.2} />
          </motion.div>

          <div className="relative">
            <Crosshair className="absolute -top-8 -left-8 text-white/10 w-8 h-8" />
            <h1 className="text-7xl md:text-[10rem] font-black leading-[0.85] tracking-tighter text-white uppercase mix-blend-difference">
              <div className="overflow-hidden">
                <CipherReveal text="ENGINEERING" className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500" delay={0.5} />
              </div>
              <div className="overflow-hidden flex items-center gap-4 md:gap-8">
                <span className="text-orange-600">THE</span>
                <CipherReveal text="UNBREAKABLE" className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500" delay={1.2} />
              </div>
            </h1>
          </div>

          <div className="mt-12 w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-end">
            <motion.p variants={fadeInUp} className="max-w-xl text-slate-400 font-medium text-lg leading-relaxed">
              We architect high-velocity digital infrastructure. <span className="text-white font-bold">Zero latency. Zero compromise.</span>
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 md:mt-0">
              <a href="#projects" className="group relative inline-flex items-center justify-center px-12 py-6 border border-white/20 hover:border-orange-500 transition-all">
                <div className="absolute inset-0 w-0 bg-orange-600 transition-all duration-300 group-hover:w-full opacity-10"></div>
                <span className="relative text-white font-black uppercase tracking-[0.2em] flex items-center group-hover:text-orange-500 transition-colors">
                  Initiate Protocol <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Smooth Fade to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
};