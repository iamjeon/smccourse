"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.21, 0.5, 0.3, 1] as const;

/** Scroll-triggered reveal (fade + rise). Animates once when it enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container: direct <Reveal> usage with incremental delay is simpler, but
 *  this wraps a list of children and staggers them automatically. */
export function RevealStagger({
  children,
  className,
  step = 0.08,
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
