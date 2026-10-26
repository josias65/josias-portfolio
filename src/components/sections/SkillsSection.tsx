'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories } from '@/data/skills';
import { Reveal, StaggerReveal } from '@/lib/animations';
import { sound } from '@/lib/sound';

function levelBadge(level: number) {
  if (level >= 88) return { label: 'Maîtrisé', color: 'var(--forest)' };
  if (level >= 80) return { label: 'En pratique quotidienne', color: 'var(--clay)' };
  return { label: 'En consolidation active', color: 'var(--ochre)' };
}

export function SkillsSection() {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [hovered, setHovered] = useState<string | null>(null);

  const filteredSkills = activeCat === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCat);

  return (
    <section id="competences" className="py-24 px-5 sm:px-8 max-w-6xl mx-auto scroll-mt-20">

      {/* Header — clip-left reveal */}
      <Reveal variant="clipLeft">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[var(--clay)] mb-3">
              <span>04</span><span>·</span><span>Savoir-Faire &amp; Stack</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
              Une boîte à outils sans faux-semblants.
            </h2>
          </div>
          <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed">
            Pas de pourcentages arbitraires à 97%. Juste l'honnêteté de ce que je manipule quotidiennement à l'IAI et sur mes projets personnels.
          </p>
        </div>
      </Reveal>

      {/* Category filter pills */}
      <Reveal variant="fadeUp" delay={0.1}>
        <div className="flex flex-wrap gap-2 pt-8 pb-8">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { sound.playClick(500); setActiveCat('all'); }}
            className="rounded-full px-4 py-2 text-xs font-mono border transition-all duration-300"
            style={{
              background: activeCat === 'all' ? 'var(--clay)' : 'var(--surface-subtle)',
              borderColor: activeCat === 'all' ? 'var(--clay)' : 'var(--line)',
              color: activeCat === 'all' ? 'var(--paper)' : 'var(--ink)',
            }}
          >
            Tous les domaines ({skills.length})
          </motion.button>

          {skillCategories.map((cat) => {
            const isActive = activeCat === cat;
            return (
              <motion.button
                key={cat}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { sound.playClick(550); setActiveCat(cat); }}
                className="rounded-full px-4 py-2 text-xs font-mono border transition-all duration-300"
                style={{
                  background: isActive ? 'var(--clay)' : 'var(--surface-subtle)',
                  borderColor: isActive ? 'var(--clay)' : 'var(--line)',
                  color: isActive ? 'var(--paper)' : 'var(--ink)',
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>
      </Reveal>

      {/* Skills Grid — staggered with hover tilt effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCat}
          initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredSkills.map((skill, i) => {
            const badge = levelBadge(skill.level);
            const isHov = hovered === skill.name;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => { setHovered(skill.name); sound.playClick(400 + i * 20); }}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-5 rounded-2xl border bg-[var(--surface-card)] transition-colors duration-300 flex flex-col justify-between cursor-default"
                style={{
                  borderColor: isHov ? 'var(--clay)' : 'var(--line)',
                  boxShadow: isHov ? '0 8px 24px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-display text-lg font-medium text-[var(--ink)]">
                      {skill.name}
                    </span>
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full font-medium shrink-0"
                      style={{
                        background: `${badge.color}18`,
                        color: badge.color,
                        border: `1px solid ${badge.color}40`,
                      }}
                    >
                      {badge.label}
                    </span>
                  </div>
                  {skill.note && (
                    <p className="text-xs text-[var(--muted)] leading-relaxed">{skill.note}</p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
                  <span>{skill.category}</span>
                  <motion.span
                    animate={{ color: isHov ? 'var(--clay)' : 'var(--line)' }}
                    className="font-bold"
                  >
                    ●
                  </motion.span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
