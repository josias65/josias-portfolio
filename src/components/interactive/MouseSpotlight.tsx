'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * MouseSpotlight
 * A subtle viewport-wide illumination effect following the mouse cursor.
 * Optimized with requestAnimationFrame and CSS custom properties.
 */
export function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'paper' | 'studio'>('paper');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Check pointer: fine and prefers-reduced-motion
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const checkCapabilities = () => {
      const isFine = finePointerQuery.matches;
      const isReduced = reducedMotionQuery.matches;
      setEnabled(isFine && !isReduced);
    };

    checkCapabilities();

    finePointerQuery.addEventListener('change', checkCapabilities);
    reducedMotionQuery.addEventListener('change', checkCapabilities);

    // Initial theme detection
    const getTheme = (): 'paper' | 'studio' => {
      const current = document.documentElement.getAttribute('data-theme');
      return current === 'studio' ? 'studio' : 'paper';
    };
    setTheme(getTheme());

    // Observe data-theme changes on documentElement
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          setTheme(getTheme());
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;

    const updatePosition = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--mouse-x', `${targetX}px`);
        spotlightRef.current.style.setProperty('--mouse-y', `${targetY}px`);
      }
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      finePointerQuery.removeEventListener('change', checkCapabilities);
      reducedMotionQuery.removeEventListener('change', checkCapabilities);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  if (!enabled) return null;

  const bgStudio =
    'radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(226,97,64,0.06), transparent 60%)';
  const bgPaper =
    'radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(180,69,42,0.03), transparent 60%)';

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{
        backgroundImage: theme === 'studio' ? bgStudio : bgPaper,
        transition: 'background-image 0.3s ease',
      }}
      aria-hidden="true"
    />
  );
}
