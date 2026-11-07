"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

export function Reveal({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.58, ease: [0.21, 0.62, 0.33, 1] }}
    >
      {children}
    </motion.div>
  );
}
