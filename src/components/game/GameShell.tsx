'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { BootScreen } from './BootScreen';
import { QuietIntro } from '@/components/atelier/QuietIntro';
import { CustomCursor } from './CustomCursor';
import { HUD } from './HUD';
import { ModeToggle } from './ModeToggle';

const WorldCanvas = dynamic(
  () => import('@/components/3d/WorldCanvas').then((m) => m.WorldCanvas),
  { ssr: false },
);

const ClassicPortfolio = dynamic(
  () => import('@/components/sections/ClassicPortfolio').then((m) => m.ClassicPortfolio),
  { ssr: false },
);

export type PortfolioMode = 'immersive' | 'classic';

interface GameShellProps {
  children: React.ReactNode; // immersive sections
}

export function GameShell({ children }: GameShellProps) {
  const [booted, setBooted] = useState(false);
  const [mode, setMode]     = useState<PortfolioMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-mode');
      if (saved === 'classic' || saved === 'immersive') return saved;
    }
    return 'classic';
  });
  const done                = useCallback(() => setBooted(true), []);
  const toggleMode          = useCallback(() =>
    setMode((m) => {
      const next = m === 'immersive' ? 'classic' : 'immersive';
      localStorage.setItem('portfolio-mode', next);
      return next;
    }), []);

  // Sync mode to body for CSS cursor rules
  useEffect(() => {
    document.body.dataset.mode = mode;
    return () => { delete document.body.dataset.mode; };
  }, [mode]);

  return (
    <>
      {/* Custom cursor — only on desktop */}
      <CustomCursor />

      {/* ── IMMERSIVE background ── */}
      {mode === 'immersive' && (
        <>
          <WorldCanvas />
          <div className="scanlines" aria-hidden />
          <div className="vignette"  aria-hidden />
        </>
      )}

      {/* ── CLASSIC background ── */}
      {mode === 'classic' && (
        <>
          <div className="fixed inset-0 z-0" style={{ background: '#f2ece1' }} />
          <div className="paper-grain" aria-hidden />
        </>
      )}

      {/* HUD — visible in immersive only */}
      <HUD mode={mode} />

      {/* Mode toggle — always visible after boot */}
      {booted && <ModeToggle mode={mode} onToggle={toggleMode} />}

      {!booted && mode === 'immersive' && <BootScreen onDone={done} />}
      {!booted && mode === 'classic' && <QuietIntro onDone={done} />}

      {/* Content */}
      <div
        className={`relative z-10 transition-opacity duration-500 ${
          booted ? 'opacity-100' : 'opacity-0 overflow-hidden h-screen'
        }`}
        data-mode={mode}
      >
        {mode === 'immersive' ? children : <ClassicPortfolio />}
      </div>
    </>
  );
}
