'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LINES = [
  'liaison Lomé… ok',
  'café trop sucré : chargé',
  'souvenirs IAI L3…',
  'SecureHub / FinFlow / Alpha Quarante en mémoire',
  'pas un template. un gars qui code.',
  'spawn.',
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('portfolio-booted') === '1';
    }
    return false;
  });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      onDone();
      return;
    }
    const t = window.setInterval(() => {
      setN((v) => {
        if (v >= LINES.length) {
          window.clearInterval(t);
          window.setTimeout(() => {
            setGone(true);
            sessionStorage.setItem('portfolio-booted', '1');
            onDone();
          }, 420);
          return v;
        }
        return v + 1;
      });
    }, 380);
    return () => window.clearInterval(t);
  }, [onDone]);

  useEffect(() => {
    const skip = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setGone(true);
        sessionStorage.setItem('portfolio-booted', '1');
        onDone();
      }
    };
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[80] bg-[#07090c] text-[#efe6d4] font-mono flex flex-col justify-center px-8 md:px-20"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            setGone(true);
            sessionStorage.setItem('portfolio-booted', '1');
            onDone();
          }}
        >
          <div className="boot-scan pointer-events-none absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-amber/20 to-transparent" />
          <p className="text-amber text-xs tracking-[0.35em] uppercase mb-8">Josias // boot</p>
          <ul className="space-y-2 text-sm md:text-base max-w-xl">
            {LINES.slice(0, n).map((line) => (
              <li key={line} className="text-ink/90">
                <span className="text-teal mr-2">{'>'}</span>
                {line}
              </li>
            ))}
            {n < LINES.length && (
              <li>
                <span className="caret" />
              </li>
            )}
          </ul>
          <p className="absolute bottom-8 left-8 text-[10px] tracking-widest text-muted uppercase">
            Échap ou clic — passer l’intro
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
