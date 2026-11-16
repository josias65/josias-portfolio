'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const FRAMES = ['/stage/aura.jpg', '/stage/halftone.jpg'];

/**
 * Evolving stage background: images cross-fade in 3D (rotateY + depth +
 * slow zoom) on a loop. Static single frame under prefers-reduced-motion.
 */
export function StageBackground({ interval = 6000 }: { interval?: number }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % FRAMES.length), interval);
    return () => window.clearInterval(id);
  }, [reduced, interval]);

  const src = FRAMES[index];

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ perspective: 1200 }}>
      <AnimatePresence initial={false}>
        <motion.div
          key={src}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${src})`, transformStyle: 'preserve-3d' }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, rotateY: -14, z: -120, scale: 1.12 }}
          animate={
            reduced
              ? { opacity: 1 }
              : { opacity: 1, rotateY: 0, z: 0, scale: [1.0, 1.06], transition: { duration: interval / 1000 + 1 } }
          }
          exit={reduced ? { opacity: 0 } : { opacity: 0, rotateY: 14, z: -120, scale: 0.96 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
    </div>
  );
}
