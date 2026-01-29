import React from 'react';
import { SparkOverlay } from '../SparkOverlay';

export const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // NOTE: We removed the scroll transform on the video to ensure 
  // the "Full Video" is always visible and stable.

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-orange-600 selection:text-white overflow-x-hidden font-sans">
      
      {/* 1. GLOBAL FIRE SPARKS */}
      <SparkOverlay />

      {/* 2. BACKGROUND VIDEO ENGINE */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            // object-cover: Ensures it covers the whole screen without stretching
            // brightness/grayscale: Adjusted to be more visible (0.6 instead of 0.3)
            className="w-full h-full object-cover grayscale-[0.2] brightness-[0.5]"
          >
            {/* MAKE SURE THIS FILE EXISTS IN YOUR 'public' FOLDER */}
            <source src="/bg-video.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Layer A: Darken corners to focus attention on center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Layer B: Vertical gradient to ensure text readability at top/bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        
        {/* Layer C: Texture (Scanlines) */}
        <div className="absolute inset-0 scanline-effect opacity-[0.03] pointer-events-none" />
      </div>

      {/* 3. CONTENT */}
      <div className="relative z-10">
        {children}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Scanline Animation */
        .scanline-effect { 
          background: linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.05) 50%); 
          background-size: 100% 4px; 
          animation: scanline 10s linear infinite; 
        }
        @keyframes scanline { 
          0% { background-position: 0 0; } 
          100% { background-position: 0 100%; } 
        }
        
        /* Fire Glow Text Utility */
        .fire-glow-text { 
          text-shadow: 0 0 20px rgba(234, 88, 12, 0.6), 0 0 40px rgba(234, 88, 12, 0.3); 
        }
      `}} />
    </div>
  );
};