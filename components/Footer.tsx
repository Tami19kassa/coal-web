// src/components/Footer.tsx
import React from 'react';
import { Hammer, Github, Twitter, Linkedin, Terminal, Activity, Power } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-8 relative z-20 overflow-hidden">
      
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-orange-600 rounded-none">
                <Hammer className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-3xl tracking-tighter uppercase text-white">
                Coal<span className="text-orange-600">Dev</span>
              </span>
            </div>
            <p className="text-slate-500 max-w-sm mb-10 leading-relaxed text-sm font-medium">
              We are a boutique engineering firm forging heavy-duty web solutions for the high-stakes economy. Built to perform. Engineered to last.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-3 border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all text-slate-400">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation Columns */}
          {[
            { title: "Navigation", links: ["Front Page", "Deployments", "Pricing Engine", "Logistics"] },
            { title: "Security", links: ["Admin Terminal", "Data Protocol", "Service SLA", "Encryption"] }
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-black uppercase tracking-[0.2em] text-xs mb-8 text-white flex items-center">
                <Terminal className="w-3 h-3 mr-2 text-orange-500" /> {col.title}
              </h4>
              <ul className="space-y-4 text-slate-500 text-sm font-mono">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-orange-500 hover:pl-2 transition-all block">
                      {`> ${link}`}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Massive Watermark */}
        <div className="w-full border-y border-white/5 py-8 mb-8 overflow-hidden">
          <h1 className="text-[12rem] leading-none font-black text-white/5 whitespace-nowrap animate-marquee select-none">
            INDUSTRIAL GRADE ENGINEERING // COAL DEV //
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-slate-600">
          <div className="flex items-center space-x-2">
            <Power className="w-3 h-3 text-green-500" />
            <span>All Systems Nominal</span>
          </div>
          <p>© {new Date().getFullYear()} Coal Web Development PLC.</p>
          <div className="flex items-center space-x-2">
            <Activity className="w-3 h-3" />
            <span>ISO-9001 Compliant</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-20%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}} />
    </footer>
  );
};

export default Footer;