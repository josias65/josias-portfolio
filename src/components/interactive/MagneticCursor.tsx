'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'click' | 'text';

export function MagneticCursor() {
  const [state, setState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState('');

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const dotX = useSpring(mx, { stiffness: 900, damping: 30, mass: 0.3 });
  const dotY = useSpring(my, { stiffness: 900, damping: 30, mass: 0.3 });

  const ringX = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.8 });
  const ringY = useSpring(my, { stiffness: 140, damping: 18, mass: 0.8 });

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setIsVisible(true);
    };

    const leave = () => setIsVisible(false);
    const enter = () => setIsVisible(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [data-cursor], input, textarea, select'
      ) as HTMLElement | null;

      if (!el) {
        setState('default');
        setLabel('');
        return;
      }

      const tag = el.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') {
        setState('text');
        setLabel('');
        return;
      }

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const strength = 0.35;

      const onMove = (ev: MouseEvent) => {
        const dx = ev.clientX - cx;
        const dy = ev.clientY - cy;
        mx.set(cx + dx * strength);
        my.set(cy + dy * strength);
      };

      const onOut = () => {
        setState('default');
        setLabel('');
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onOut);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onOut);

      setState('hover');
      setLabel(el.getAttribute('data-cursor-label') || '');
    };

    window.addEventListener('mouseover', onOver);

    const onDown = () => setState('click');
    const onUp = () => setState('default');
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ringSize = state === 'hover' ? 48 : state === 'click' ? 18 : state === 'text' ? 4 : 28;
  const dotSize = state === 'text' ? 18 : state === 'click' ? 5 : 6;
  const ringColor = state === 'hover' ? 'var(--clay)' : 'var(--ink)';

  return (
    <>
      <style>{`
        @media (pointer: fine) { * { cursor: none !important; } }
      `}</style>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isVisible ? 0.7 : 0,
          borderRadius: state === 'text' ? '2px' : '9999px',
          translateX: '-50%',
          translateY: '-50%',
          border: `1.5px solid ${ringColor}`,
          mixBlendMode: 'difference' as const,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      >
        {label && (
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono uppercase tracking-wider font-bold text-[var(--paper)]">
            {label}
          </span>
        )}
      </motion.div>

      {/* Fast dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{ x: dotX, y: dotY }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: isVisible ? 1 : 0,
          translateX: '-50%',
          translateY: '-50%',
          background: state === 'hover' ? 'var(--clay)' : 'var(--ink)',
          scale: state === 'click' ? 0.5 : 1,
          mixBlendMode: 'difference' as const,
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 28 }}
      />
    </>
  );
}
