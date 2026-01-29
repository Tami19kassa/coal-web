import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Crosshair, Zap } from 'lucide-react';
import { CipherReveal } from './CipherReveal';
import { fadeInUp, staggerContainer } from '../../lib/animations';

export const Hero = () => {
  // 1. Mouse Physics (Kept for the 3D Grid movement, removed from Background)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
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

  const rotateX = useTransform(mouseY, [-500, 500], [5, -5]);
  const rotateY = useTransform(mouseX, [-500, 500], [-5, 5]);

  return (
    <section className="min-h-screen w-full relative flex items-center justify-center py-20 md:py-0 overflow-hidden" style={{ perspective: 1000 }}>
      
      {/* 2. TRANSPARENCY FIX: No solid background colors here. */}
      {/* The Global Video from RootLayout will show through this section. */}

      {/* 3. 3D GRID LAYER (Moves with Mouse) */}
      <motion.div 
        style={{ rotateX, rotateY, x: mouseX, y: mouseY }}
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d412_1px,transparent_1px),linear-gradient(to_bottom,#06b6d412_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>

      {/* 4. CINEMATIC VIGNETTE (Instead of the Black Mask) */}
      {/* This darkens the edges slightly but keeps the center transparent for the video */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

      {/* 5. MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start"
        >
          {/* Top Status Tagline */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-6 md:mb-8 border-l-2 border-cyan-500 pl-4 md:pl-6">
            <Zap className="text-cyan-500 w-4 h-4 md:w-5 md:h-5 animate-pulse shrink-0" />
            <div className="text-[10px] md:text-xs font-bold text-cyan-500 tracking-[0.2em] break-all">
              <CipherReveal text="SYSTEM STATUS: ONLINE // SECURE UPLINK" delay={0.2} />
            </div>
          </motion.div>

          {/* Main Massive Headline */}
          <div className="relative w-full">
            <Crosshair className="absolute -top-4 -left-4 md:-top-8 md:-left-8 text-cyan-500/30 w-6 h-6 md:w-8 md:h-8" />
            <Crosshair className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 text-cyan-500/30 w-6 h-6 md:w-8 md:h-8" />
            
            <h1 className="font-black leading-[0.85] tracking-tighter text-white uppercase mix-blend-difference w-full break-words">
              <div className="overflow-hidden text-[13vw] md:text-[10rem]">
                <CipherReveal text="ENGINEERING" className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400" delay={0.5} />
              </div>
              
              <div className="overflow-hidden flex flex-wrap items-baseline gap-2 md:gap-8 text-[13vw] md:text-[10rem]">
                <span className="text-cyan-500 text-[0.5em] md:text-[0.4em] self-center cyan-glow-text">THE</span>
                <CipherReveal text="UNBREAKABLE" className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400" delay={1.2} />
              </div>
            </h1>
          </div>

          {/* Bottom Row: Subtext & CTA */}
          <div className="mt-8 md:mt-12 w-full border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 bg-black/20 backdrop-blur-sm p-4 rounded-sm">
            <motion.p variants={fadeInUp} className="max-w-xl text-slate-300 font-medium text-sm md:text-lg leading-relaxed shadow-black drop-shadow-md">
              We architect high-velocity digital infrastructure. <span className="text-white font-bold">Zero latency. Zero compromise.</span>
            </motion.p>
            
            <motion.div variants={fadeInUp} className="w-full lg:w-auto">
              <a 
                href="#projects" 
                className="group relative w-full lg:w-auto inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-6 border border-white/20 hover:border-cyan-500 transition-all bg-black/40 backdrop-blur-md"
              >
                <div className="absolute inset-0 w-0 bg-cyan-600 transition-all duration-300 group-hover:w-full opacity-20"></div>
                <span className="relative text-white font-black uppercase tracking-[0.2em] flex items-center group-hover:text-cyan-400 transition-colors text-xs md:text-base">
                  Initiate Protocol <ArrowRight className="ml-3 md:ml-4 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 6. BOTTOM FADE (Seamless transition to next section) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
};