'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Coffee, Flame } from 'lucide-react';
import { sound } from '@/lib/sound';

interface ReactionItem {
  id: string;
  emoji: string;
  label: string;
  count: number;
}

export function GuestReactions() {
  const [reactions, setReactions] = useState<ReactionItem[]>([
    { id: 'heart', emoji: '✨', label: 'Coup de cœur', count: 42 },
    { id: 'clever', emoji: '💡', label: 'Malin & Réel', count: 29 },
    { id: 'clean', emoji: '🎯', label: 'Belle finition', count: 35 },
    { id: 'coffee', emoji: '☕', label: 'Café de Lomé', count: 18 },
  ]);

  const [clickedMap, setClickedMap] = useState<Record<string, boolean>>({});
  const [particles, setParticles] = useState<{ id: number; emoji: string; x: number }[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-reactions');
      if (saved) {
        setClickedMap(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleClick = (id: string, emoji: string, e: React.MouseEvent) => {
    sound.playPop(620);

    // Update counts
    setReactions((prev) =>
      prev.map((r) => (r.id === id ? { ...r, count: r.count + 1 } : r))
    );

    const nextMap = { ...clickedMap, [id]: true };
    setClickedMap(nextMap);
    localStorage.setItem('portfolio-reactions', JSON.stringify(nextMap));

    // Spawn floating particle
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticle = {
      id: Date.now() + Math.random(),
      emoji,
      x: rect.left + rect.width / 2,
    };
    setParticles((p) => [...p, newParticle]);

    setTimeout(() => {
      setParticles((p) => p.filter((item) => item.id !== newParticle.id));
    }, 1200);
  };

  return (
    <div className="relative rounded-2xl border border-[var(--line)] bg-[var(--surface-card)] p-5 sm:p-6 text-center">
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, y: '80vh', x: p.x, scale: 0.8 }}
              animate={{ opacity: 0, y: '30vh', scale: 1.5, rotate: (Math.random() - 0.5) * 40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed text-2xl select-none"
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--clay)]">
        Échange & Humeur
      </span>
      <h4 className="font-display text-lg font-medium text-[var(--ink)] mt-1">
        Une impression sur ce portfolio ?
      </h4>
      <p className="text-xs text-[var(--muted)] mt-1 max-w-md mx-auto">
        Cliquez sur une réaction pour laisser votre empreinte sans formulaire :
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-4">
        {reactions.map((r) => {
          const hasClicked = !!clickedMap[r.id];
          return (
            <motion.button
              key={r.id}
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleClick(r.id, r.emoji, e)}
              className="flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-mono border transition-all"
              style={{
                background: hasClicked ? 'var(--clay-tint)' : 'var(--surface-subtle)',
                borderColor: hasClicked ? 'var(--clay)' : 'var(--line)',
                color: hasClicked ? 'var(--clay)' : 'var(--ink)',
              }}
            >
              <span>{r.emoji}</span>
              <span className="font-sans text-[11px] font-medium">{r.label}</span>
              <span className="text-[10px] opacity-75 font-mono">({r.count})</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
