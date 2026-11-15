'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Kinetic 3D headline: each word rises out of depth (z-axis), rotating on X
 * and clearing a light blur. Each word animates on its own clock (delay per
 * index) so the reveal does not depend on variant propagation.
 * Falls back to a plain fade under prefers-reduced-motion.
 */
export function KineticWords({
  text,
  delay = 0,
  stagger = 0.06,
  className = '',
}: {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  return (
    <span
      aria-hidden
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      style={{ perspective: 900 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block will-change-transform"
          style={{ transformOrigin: '50% 100%' }}
          // Same keys in initial and animate on every render (SSR and client),
          // so hydration never leaves a word stuck in its start pose.
          initial={{ opacity: 0, rotateX: -78, z: -260, y: '0.25em', filter: 'blur(10px)' }}
          animate={{ opacity: 1, rotateX: 0, z: 0, y: '0em', filter: 'blur(0px)' }}
          transition={{
            duration: reduced ? 0.01 : 1.0,
            ease: EASE,
            delay: reduced ? 0 : delay + i * stagger,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
