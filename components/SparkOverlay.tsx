// src/components/SparkOverlay.tsx
import React, { useMemo } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

export const SparkOverlay = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Physics: Map scroll speed to particle intensity
  const rawVelocity = useTransform(scrollVelocity, [-2000, 2000], [1, 2.5]);
  const smoothVelocity = useSpring(rawVelocity, { stiffness: 50, damping: 20 });
  
  const sparks = useMemo(() => Array.from({ length: 50 }).map(() => ({
    left: Math.random() * 100, // Percentage
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 5,
    size: Math.random() * 4 + 1
  })), []);

  return (
    // FIX: Added w-screen h-screen to force full coverage
    <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[20] overflow-hidden">
      {sparks.map((spark, i) => (
        <Ember 
          key={i} 
          spark={spark} 
          velocity={smoothVelocity} 
        />
      ))}
    </div>
  );
};

const Ember = ({ spark, velocity }: { spark: any, velocity: any }) => {
  return (
    <motion.div
      initial={{ 
        y: "110vh", 
        x: 0, 
        opacity: 0 
      }}
      animate={{ 
        y: "-10vh", 
        x: [0, (Math.random() - 0.5) * 50], // Random drift
        opacity: [0, 1, 0.5, 0] 
      }}
      transition={{ 
        duration: spark.duration, 
        repeat: Infinity, 
        delay: spark.delay, 
        ease: "linear"
      }}
      style={{ 
        left: `${spark.left}%`, 
        width: spark.size,
        height: spark.size,
        scale: velocity
      }}
      // FLAME COLOR: Orange/Red/Yellow gradient
      className="absolute rounded-full bg-gradient-to-t from-orange-600 via-red-500 to-yellow-400 shadow-[0_0_15px_2px_rgba(234,88,12,0.8)]"
    />
  );
};

export default SparkOverlay;