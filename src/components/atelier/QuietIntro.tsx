'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function QuietIntro({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('portfolio-booted') === '1') {
      onDone();
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduced ? 0 : 2200;
    const t = window.setTimeout(() => {
      setGone(true);
      sessionStorage.setItem('portfolio-booted', '1');
      window.setTimeout(onDone, reduced ? 0 : 480);
    }, delay);

    const skip = () => {
      window.clearTimeout(t);
      setGone(true);
      sessionStorage.setItem('portfolio-booted', '1');
      onDone();
    };
    window.addEventListener('keydown', skip);
    window.addEventListener('click', skip);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('click', skip);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center"
          style={{ background: '#f2ece1', color: '#1b1713' }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] tracking-[0.28em] uppercase mb-6"
            style={{ color: '#6a6358' }}
          >
            Lomé · Togo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display italic text-5xl sm:text-7xl font-medium tracking-tight"
          >
            Josias Tchaou
          </motion.h1>
          <motion.div
            className="mt-8 h-px origin-left"
            style={{ background: '#b4452a', width: 88 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
