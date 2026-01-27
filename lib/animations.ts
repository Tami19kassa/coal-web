// src/lib/animations.ts
import { Variants } from "framer-motion";

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Pencil Physics (kept if you want to reuse later, but not in new Hero)
export const pencilWriting: Variants = {
  writing: {
    rotate: [-5, 5, -5],
    transition: { duration: 0.2, repeat: Infinity }
  },
  idle: { rotate: 0 }
};

export const harmonicFloat = {
  animate: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      delay: i * 0.1,
      ease: "easeInOut"
    }
  })
};