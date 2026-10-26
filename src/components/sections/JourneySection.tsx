'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { journeyItems } from '@/data/journey';
import { Reveal } from '@/lib/animations';

export function JourneySection() {
  return (
    <section id="parcours" className="py-24 px-5 sm:px-8 max-w-6xl mx-auto scroll-mt-20">

      {/* Header — scaleIn */}
      <Reveal variant="scaleIn">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[var(--clay)] mb-3">
              <span>05</span><span>·</span><span>Parcours &amp; Évolution</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
              Comment un futur diplômé de l'IAI se forge.
            </h2>
          </div>
          <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed">
            Chaque étape a transformé ma vision : passer du code recopié sans comprendre à la conception d'expériences numériques complètes et réfléchies.
          </p>
        </div>
      </Reveal>

      {/* Timeline — alternating left/right */}
      <div className="mt-12 relative">

        {/* Center line */}
        <motion.div
          className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-[var(--line)] hidden sm:block"
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="space-y-6">
          {journeyItems.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Center dot */}
                <motion.div
                  className="hidden sm:block absolute left-1/2 top-8 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[var(--clay)] bg-[var(--paper)] z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 + 0.3, type: 'spring', stiffness: 400 }}
                />

                <motion.div
                  whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="rounded-3xl border border-[var(--line)] bg-[var(--surface-card)] p-6 sm:p-8 hover:border-[var(--clay)] transition-colors duration-300 sm:w-[47%]"
                  style={{ marginLeft: isEven ? 0 : 'auto' }}
                >
                  <div className="grid gap-4 sm:grid-cols-12 items-baseline">
                    <div className="sm:col-span-4">
                      <span className="font-display text-2xl sm:text-3xl font-medium italic text-[var(--clay)]">
                        {item.year}
                      </span>
                      <p className="text-[11px] font-mono text-[var(--muted)] mt-1 uppercase tracking-wider">
                        Étape 0{idx + 1}
                      </p>
                    </div>

                    <div className="sm:col-span-8 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-xl sm:text-2xl font-medium text-[var(--ink)]">
                          {item.title}
                        </h3>
                        {item.highlight && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 + 0.4 }}
                            className="text-[11px] font-mono px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--clay)]"
                          >
                            {item.highlight}
                          </motion.span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-[var(--muted)]">{item.subtitle}</p>
                      <p className="text-sm text-[var(--muted)] leading-relaxed pt-2">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
