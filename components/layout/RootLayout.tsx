import React from 'react';

export const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-cyan-600 selection:text-white overflow-x-hidden font-sans">
      
      {/* 1. BACKGROUND VIDEO ENGINE */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            // REMOVED 'scale-105' (No more zoom)
            // KEEP 'object-cover' if you want it to fill the screen.
            // CHANGE 'object-cover' to 'object-fill' if you want to STRETCH it to fit (distorts video).
            className="w-full h-full object-cover grayscale-[0.4] brightness-[0.5]"
          >
            <source src="/bg-video.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Layer A: Vertical Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
        
        {/* Layer B: Texture */}
        <div className="absolute inset-0 scanline-effect opacity-[0.03] pointer-events-none" />
      </div>

      {/* 2. CONTENT WRAPPER */}
      <div className="relative z-10">
        {children}
      </div>

      {/* GLOBAL STYLES */}
      <style dangerouslySetInnerHTML={{ __html: `
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #fff; }

        .scanline-effect { 
          background: linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.05) 50%); 
          background-size: 100% 4px; 
          animation: scanline 10s linear infinite; 
        }
        @keyframes scanline { 
          0% { background-position: 0 0; } 
          100% { background-position: 0 100%; } 
        }
        
        .cyan-glow-text { 
          text-shadow: 0 0 20px rgba(6, 182, 212, 0.6), 0 0 40px rgba(6, 182, 212, 0.3); 
        }

        html { scroll-behavior: smooth; }
      `}} />
    </div>
  );
};