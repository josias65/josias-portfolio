'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setOk(true);
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      }
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 14}px, ${ry - 14}px)`;
      }
      requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    const id = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  if (!ok) return null;

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[90] h-7 w-7 rounded-full mix-blend-difference"
        style={{ border: '1px solid #efe6d4' }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[91] h-1.5 w-1.5 rounded-full mix-blend-difference"
        style={{ background: '#efe6d4' }}
      />
    </>
  );
}
