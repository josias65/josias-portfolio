'use client';

import { useEffect, useState } from 'react';
import type { PortfolioMode } from './GameShell';

const ZONES = [
  { id: 'hero',     label: 'SPAWN',      color: '#ff7a18' },
  { id: 'about',    label: 'JOURNAL',    color: '#a855f7' },
  { id: 'projects', label: 'QUÊTES',     color: '#3b82f6' },
  { id: 'skills',   label: 'INVENTAIRE', color: '#4dd9c0' },
  { id: 'journey',  label: 'ARCHIVES',   color: '#10b981' },
  { id: 'contact',  label: 'RADIO',      color: '#f59e0b' },
];

interface HUDProps {
  mode: PortfolioMode;
}

export function HUD({ mode }: HUDProps) {
  const [clock, setClock]   = useState('--:--');
  const [zone, setZone]     = useState(ZONES[0]!);
  const [scroll, setScroll] = useState(0);
  const [fps, setFps]       = useState(60);

  // Clock
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);

  // Zone tracker
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(h > 0 ? Math.round((y / h) * 100) : 0);
      let current = ZONES[0]!;
      for (const z of ZONES) {
        const el = document.getElementById(z.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) current = z;
      }
      setZone(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // FPS counter (immersive mode only)
  useEffect(() => {
    if (mode !== 'immersive') return;
    let last = performance.now();
    let frames = 0;
    let id: number;
    const tick = () => {
      frames++;
      const now = performance.now();
      if (now - last >= 1000) {
        setFps(frames);
        frames = 0;
        last = now;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [mode]);

  if (mode === 'classic') return null; // HUD hidden in classic mode

  return (
    <>
      {/* Top-left: zone + clock */}
      <div className="pointer-events-none fixed top-20 left-4 z-[50] font-mono text-[10px] tracking-widest hidden sm:block">
        <p style={{ color: zone.color }} className="font-bold">
          ▶ ZONE // {zone.label}
        </p>
        <p className="text-muted mt-1">{clock} · LOC</p>
        <p className="text-dim mt-0.5">FPS {fps}</p>
      </div>

      {/* Top-right: map progress */}
      <div className="pointer-events-none fixed top-20 right-4 z-[50] font-mono text-[10px] tracking-widest text-right hidden sm:block">
        <p className="text-amber">CARTE {scroll}%</p>
        <div className="mt-1.5 w-20 h-0.5 bg-white/10 rounded-full ml-auto overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${scroll}%`, background: zone.color }}
          />
        </div>
        {/* Minimap dots */}
        <div className="mt-3 flex flex-col gap-1.5 items-end">
          {ZONES.map((z) => (
            <a
              key={z.id}
              href={`#${z.id}`}
              className="pointer-events-auto flex items-center gap-1.5 group"
              aria-label={z.label}
            >
              <span className="text-dim group-hover:text-ink transition-colors text-[9px]">{z.label}</span>
              <span
                className="block w-1.5 h-1.5 rounded-full transition-all duration-200"
                style={{
                  background: zone.id === z.id ? z.color : 'rgba(255,255,255,0.15)',
                  boxShadow: zone.id === z.id ? `0 0 6px ${z.color}` : 'none',
                }}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom-left: quest log */}
      <div className="pointer-events-none fixed bottom-6 left-4 z-[50] font-mono text-[10px] text-muted hidden md:block max-w-[200px] leading-relaxed">
        <span className="text-amber">◆ QUÊTE ACTIVE</span>
        <br />
        Finir la L3 sans tout casser.
        <br />
        <span className="text-dim">Secondaire : trouver une équipe.</span>
      </div>

      {/* Bottom-right: controls hint */}
      <div className="pointer-events-none fixed bottom-6 right-4 z-[50] font-mono text-[10px] tracking-widest text-dim hidden md:block text-right">
        SOURIS — regarder
        <br />
        MOLETTE — avancer
        <br />
        CLIC — interagir
      </div>
    </>
  );
}
