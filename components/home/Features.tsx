import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, ShieldCheck, Zap, Activity, Cpu } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

// --- SUB-COMPONENT: HOLOGRAPHIC CARD ---
const SchematicCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  stats, 
  index 
}: { 
  icon: any, 
  title: string, 
  subtitle: string, 
  stats: string, 
  index: number 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full"
    >
      {/* Connector Line (The "Pipe" connecting to the grid) */}
      <div className="absolute -top-12 left-8 w-[1px] h-12 bg-gradient-to-b from-transparent to-white/20" />
      
      {/* Main Container */}
      <div className="relative h-full bg-[#080808] border border-white/10 p-1 overflow-hidden group transition-colors duration-500 hover:border-orange-500/50">
        
        {/* The Scanning Laser (Moves continuously) */}
        <motion.div 
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 1 }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent z-10 opacity-30"
        />

        {/* Inner Content Padding */}
        <div className="relative h-full bg-[#0a0a0a] p-8 flex flex-col justify-between z-20">
          
          {/* Header: Icon & Tech ID */}
          <div className="flex justify-between items-start mb-8">
            <div className={`p-4 border ${isHovered ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-white/5'} transition-all duration-300`}>
              <Icon className={`w-8 h-8 ${isHovered ? 'text-orange-500' : 'text-slate-400'} transition-colors duration-300`} />
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">SYS_ID</div>
              <div className="text-xs font-mono text-orange-500">0{index + 1} :: ACTIVE</div>
            </div>
          </div>

          {/* Visual Data Visualization (The "Creativity") */}
          <div className="mb-8 h-16 flex items-end space-x-1 opacity-50">
            {[...Array(10)].map((_, i) => (
              <motion.div 
                key={i}
                initial={{ height: "20%" }}
                animate={{ height: isHovered ? `${Math.random() * 80 + 20}%` : "20%" }}
                transition={{ duration: 0.4, repeat: isHovered ? Infinity : 0, repeatType: "reverse", delay: i * 0.05 }}
                className={`w-full ${isHovered ? 'bg-orange-500' : 'bg-white/20'}`}
              />
            ))}
          </div>

          {/* Text Content */}
          <div>
            <h3 className="text-2xl font-black uppercase text-white mb-2 tracking-tighter group-hover:text-orange-500 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Footer Stats */}
          <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center font-mono text-xs">
            <span className="text-slate-600">CAPACITY_LOAD</span>
            <motion.span 
              className="text-white"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {stats}
            </motion.span>
          </div>

        </div>

        {/* Corner Accents (The "HUD" look) */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />
      </div>
    </motion.div>
  );
};

export const Features = () => {
  const features = [
    {
      icon: Terminal,
      title: "Hyper-Scalar Arch",
      subtitle: "Low-latency infrastructure engineered for massive concurrency.",
      stats: "99.99% UPTIME"
    },
    {
      icon: Database,
      title: "Data Mesh Core",
      subtitle: "Real-time synchronization across distributed edge networks.",
      stats: "< 50MS LATENCY"
    },
    {
      icon: ShieldCheck,
      title: "Kinetic Defense",
      subtitle: "Active threat mitigation with automated security protocols.",
      stats: "AES-256 ENCRYPTED"
    }
  ];

  return (
    <section className="py-40 px-4 bg-[#050505] relative z-10 overflow-hidden">
      
      {/* Background Grid - The "Blueprints" */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-24 border-b border-white/10 pb-8 flex flex-col md:flex-row items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center space-x-2 text-orange-500 mb-4">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">System Capabilities</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter leading-none">
              Operational <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-600">Specs</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-slate-500 font-mono text-xs uppercase">
              // SCROLL_VELOCITY: TRACKING<br/>
              // RENDER_ENGINE: WEBGL
            </p>
          </div>
        </motion.div>

        {/* The Features Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-12"
        >
          {features.map((feature, i) => (
            <SchematicCard 
              key={i}
              index={i}
              {...feature}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};