'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Sparkles, MapPin, Code2, Palette, ArrowUpRight } from 'lucide-react';
import { sound } from '@/lib/sound';

export function DesignerBadge() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  // Mouse tilt physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 220, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 220, damping: 20 });
  const foilX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 220, damping: 20 });
  const foilY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 220, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleFlip = () => {
    sound.playPop(520);
    setFlipped(!flipped);
  };

  return (
    <div className="relative perspective-1000 py-6 select-none flex justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={toggleFlip}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full max-w-[340px] h-[210px] sm:h-[220px] rounded-3xl p-6 cursor-pointer shadow-xl transition-shadow duration-300 border overflow-hidden"
        title="Cliquer pour retourner le badge"
      >
        {/* Holographic foil sheen */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${foilX}% ${foilY}%, rgba(255,255,255,0.9) 0%, rgba(255,215,0,0.3) 25%, rgba(180,69,42,0.2) 60%, transparent 80%)`,
          }}
        />

        {/* Card background */}
        <div
          className="absolute inset-0 -z-10 rounded-3xl"
          style={{
            background: 'var(--badge-bg, var(--surface-card))',
            borderColor: 'var(--line)',
          }}
        />

        {/* Top lanyard hole punch simulation */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-2 rounded-full border border-[var(--line)] bg-[var(--paper)] opacity-80" />

        {!flipped ? (
          /* FRONT OF BADGE */
          <div className="relative z-10 flex flex-col justify-between h-full pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-[var(--muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--forest)]" />
                Badge Créatif · 2025/2026
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[var(--line)] text-[var(--clay)] bg-[var(--clay-tint)]">
                IAI LOMÉ
              </span>
            </div>

            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--clay)]">
                Artisan Numérique
              </p>
              <h3 className="font-display text-2xl font-medium tracking-tight text-[var(--ink)]">
                Josias Tchaou
              </h3>
              <p className="text-xs text-[var(--muted)] mt-0.5">
                Product Designer & Creative Developer
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] text-[11px] font-mono text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <Palette size={12} className="text-[var(--clay)]" />
                <span>UX / UI</span>
                <span>·</span>
                <Code2 size={12} className="text-[var(--forest)]" />
                <span>Code Réel</span>
              </div>
              <span className="text-[10px] underline underline-offset-4 decoration-[var(--clay)] text-[var(--clay)]">
                Tourner ↺
              </span>
            </div>
          </div>
        ) : (
          /* BACK OF BADGE */
          <div className="relative z-10 flex flex-col justify-between h-full pt-2 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[var(--clay)] uppercase tracking-wider">
                Coordonnées & Base
              </span>
              <span className="text-[10px] font-mono text-[var(--muted)]">GMT+0</span>
            </div>

            <div className="space-y-1.5 text-xs text-[var(--ink)]">
              <p className="flex items-center gap-2">
                <MapPin size={13} className="text-[var(--clay)] shrink-0" />
                <span>Lomé, Région Maritime, Togo</span>
              </p>
              <p className="font-mono text-[11px] text-[var(--muted)]">
                IAI-Togo · Informatique & Systèmes
              </p>
              <p className="text-[11px] text-[var(--forest)] font-medium">
                ✓ Disponible pour stage & collaborations
              </p>
            </div>

            <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[var(--clay)]">josiastchaou1@gmail.com</span>
              <span className="text-[10px] text-[var(--muted)]">Tourner ↺</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
