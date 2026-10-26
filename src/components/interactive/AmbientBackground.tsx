'use client';

import { useEffect, useRef, useState } from 'react';

/** Animated gradient orb that slowly drifts in background */
function GradientOrb({
  color,
  size,
  x,
  y,
  dur,
  delay = 0,
}: {
  color: string;
  size: number;
  x: number;
  y: number;
  dur: number;
  delay?: number;
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.18,
        filter: 'blur(60px)',
        animation: `breathe ${dur}s ease-in-out ${delay}s infinite alternate`,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

/** Floating micro-particle */
function Particle({
  x,
  y,
  size,
  delay,
  dur,
}: {
  x: number;
  y: number;
  size: number;
  delay: number;
  dur: number;
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none opacity-30"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: 'var(--clay)',
        animation: `floatParticle ${dur}s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  );
}

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <style>{`
        @keyframes breathe {
          from { opacity: 0.12; transform: translate(-50%, -50%) scale(1); }
          to   { opacity: 0.22; transform: translate(-50%, -50%) scale(1.18); }
        }
        @keyframes floatParticle {
          from { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
          to   { transform: translateY(-28px) rotate(180deg); opacity: 0.45; }
        }
      `}</style>

      {/* Warm gradient orbs */}
      <GradientOrb color="var(--clay)"   size={600} x={80}  y={10}  dur={8}  delay={0} />
      <GradientOrb color="var(--forest)" size={500} x={10}  y={75}  dur={11} delay={2} />
      <GradientOrb color="var(--ochre)"  size={400} x={55}  y={55}  dur={14} delay={4} />

      {/* Micro-particles */}
      {[
        { x: 12, y: 20, size: 3, dur: 5, delay: 0 },
        { x: 30, y: 65, size: 2, dur: 7, delay: 1 },
        { x: 60, y: 30, size: 4, dur: 6, delay: 2 },
        { x: 75, y: 80, size: 2, dur: 9, delay: 0.5 },
        { x: 88, y: 45, size: 3, dur: 8, delay: 3 },
        { x: 45, y: 15, size: 2, dur: 6, delay: 1.5 },
        { x: 20, y: 88, size: 3, dur: 10, delay: 2.5 },
        { x: 95, y: 70, size: 2, dur: 7, delay: 4 },
      ].map((p, i) => (
        <Particle key={i} {...p} />
      ))}

      {/* Fine grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          opacity: 0.4,
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />
    </div>
  );
}
