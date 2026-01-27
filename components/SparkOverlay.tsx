import React from 'react';
import { motion } from 'framer-motion';

const SparkOverlay = () => {
  const sparks = Array.from({ length: 40 });
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {sparks.map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-10px] w-1 h-1 bg-orange-500 rounded-full"
          initial={{ x: `${Math.random() * 100}%`, y: "110vh" }}
          animate={{
            y: "-10vh",
            x: [`${Math.random() * 100}%`, `${Math.random() * 100 + (Math.random() - 5)}%`],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear"
          }}
          style={{ boxShadow: "0 0 10px #ff4500" }}
        />
      ))}
    </div>
  );
};

export default SparkOverlay;