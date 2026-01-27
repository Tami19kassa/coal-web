import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const SparkSystem = () => {
  const sparks = useMemo(() => Array.from({ length: 60 }), []);
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {sparks.map((_, i) => {
        const duration = Math.random() * 2 + 1.5;
        const delay = Math.random() * 5;
        return (
          <motion.div
            key={i}
            initial={{ y: "110vh", x: `${Math.random() * 100}%`, opacity: 0, scale: 0 }}
            animate={{
              y: "-10vh",
              x: [`${Math.random() * 100}%`, `${Math.random() * 100 + (Math.random() - 0.5) * 15}%`],
              opacity: [0, 1, 0.8, 0],
              scale: [0, Math.random() * 2 + 1, 0],
            }}
            transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
            className="absolute bottom-0 w-[2px] h-[2px] rounded-full"
            style={{
              background: 'rgba(255, 120, 0, 1)',
              boxShadow: '0 0 8px 2px rgba(255, 80, 0, 0.6), 0 0 15px rgba(255, 160, 0, 0.4)',
            }}
          />
        );
      })}
    </div>
  );
};