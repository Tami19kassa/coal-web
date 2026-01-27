import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Terminal, Activity, Power, Cpu, Wifi } from 'lucide-react';

// --- SUB-COMPONENT: ROTATING RADAR (Updated to Cyan to match your logo) ---
const Radar = () => (
  <div className="relative w-16 h-16 border border-cyan-500/30 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-hidden">
    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(6,182,212,0.5)_360deg)] animate-spin-slow opacity-50" />
    <div className="absolute inset-[2px] bg-black rounded-full z-10" />
    <div className="absolute w-full h-[1px] bg-cyan-500/30 z-20" />
    <div className="absolute h-full w-[1px] bg-cyan-500/30 z-20" />
    <div className="relative z-30 w-1 h-1 bg-cyan-500 rounded-full animate-ping" />
  </div>
);

// --- SUB-COMPONENT: SCROLLING HEX DATA ---
const HexStream = () => {
  const [stream, setStream] = useState<string[]>([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setStream(prev => [
        `0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}`,
        ...prev.slice(0, 15)
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] text-cyan-900/40 opacity-50 overflow-hidden h-32 flex flex-col-reverse select-none pointer-events-none">
      {stream.map((hex, i) => (
        <div key={i} className="whitespace-nowrap">
          <span className="mr-4">DATA_PKT_{100 + i}:</span>
          {hex}
        </div>
      ))}
    </div>
  );
};

// --- MAIN FOOTER ---
const Footer: React.FC = () => {
  return (
    <footer className="relative z-20 pt-24 pb-8 overflow-hidden border-t border-white/5">
      
      {/* ATMOSPHERIC GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none -z-10" />
      
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4">
        
        {/* TOP ROW: BRAND & RADAR */}
        <div className="grid md:grid-cols-12 gap-12 mb-20 border-b border-white/5 pb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-6 mb-8">
                <Radar />
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    {/* LOGO IMAGE */}
                    <img 
                      src="/logo.png" 
                      alt="Coal Web Development" 
                      className="h-10 w-auto object-contain" 
                    />
                    <span className="font-black text-2xl tracking-tighter uppercase text-white">
                      Coal<span className="text-cyan-500">Dev</span>
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    System Status: <span className="text-green-500 animate-pulse">OPTIMAL</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed text-sm font-medium border-l-2 border-cyan-500/20 pl-4">
                Architecting the digital backbone of heavy industry. 
                We deploy high-availability systems for mission-critical environments.
              </p>
            </div>
          </div>

          {/* Data Visualization Column */}
          <div className="md:col-span-3 hidden md:block border-l border-white/5 pl-8">
            <div className="flex items-center space-x-2 mb-4 text-xs font-black uppercase text-slate-600 tracking-widest">
              <Cpu className="w-4 h-4" />
              <span>Live Data Stream</span>
            </div>
            <HexStream />
          </div>

          {/* Links Column */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            {[
              { title: "Modules", links: ["Front Page", "Deployments", "Admin Uplink"] },
              { title: "Protocols", links: ["SLA Terms", "Encryption", "Data Privacy"] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-black uppercase tracking-[0.2em] text-[10px] mb-6 text-white flex items-center">
                  <Terminal className="w-3 h-3 mr-2 text-cyan-500" /> {col.title}
                </h4>
                <ul className="space-y-4 text-slate-500 text-xs font-mono font-bold">
                  {col.links.map((link) => (
                    <motion.li 
                      key={link}
                      whileHover={{ x: 5, color: "#06b6d4" }} // Cyan hover
                      className="cursor-pointer flex items-center"
                    >
                      <span className="w-1 h-1 bg-slate-700 mr-3 rounded-full group-hover:bg-cyan-500" />
                      {link}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: STATUS BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-slate-600 bg-white/5 p-4 border border-white/5 rounded-sm backdrop-blur-md">
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Wifi className="w-3 h-3 text-green-500" />
              <span>Uplink: Connected</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Activity className="w-3 h-3" />
              <span>Latency: 12ms</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>

          <div className="flex items-center space-x-2">
            <Power className="w-3 h-3 text-cyan-500" />
            <span>© 2026 CoalDev PLC</span>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </footer>
  );
};

export default Footer;