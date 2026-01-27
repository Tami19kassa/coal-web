// src/components/home/CipherReveal.tsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

interface CipherProps {
  text: string;
  className?: string;
  delay?: number;
}

export const CipherReveal: React.FC<CipherProps> = ({ text, className, delay = 0 }) => {
  const [display, setDisplay] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
        let iteration = 0;
        const interval = setInterval(() => {
          setDisplay(
            text
              .split("")
              .map((letter, index) => {
                if (index < iteration) return letter;
                return CHARS[Math.floor(Math.random() * CHARS.length)];
              })
              .join("")
          );

          if (iteration >= text.length) {
            clearInterval(interval);
          }

          iteration += 1 / 2; 
        }, 30);
        return () => clearInterval(interval);
      }, delay * 1000);
      return () => clearTimeout(startTimeout);
    }
  }, [isInView, text, delay, started]);

  return (
    <motion.span
      ref={ref}
      className={`font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {display || (started ? "" : text.replace(/./g, "0"))} 
    </motion.span>
  );
};