'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { DesignerBadge } from '@/components/interactive/DesignerBadge';
import { LomeTimeWidget } from '@/components/interactive/LomeTimeWidget';
import { ShimmerButton, MagneticButton } from '@/components/interactive/MagneticButton';
import { TextSplit } from '@/lib/animations';
import { sound } from '@/lib/sound';

const pillars = [
  { icon: '✦', label: 'Design Centré Utilisateur', color: 'var(--clay)' },
  { icon: '◈', label: 'Code Fullstack Robuste', color: 'var(--forest)' },
  { icon: '◉', label: 'Ancré en Afrique de l\'Ouest', color: 'var(--ochre)' },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax for different depth layers
  const badgeY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -80]), {
    stiffness: 60, damping: 20,
  });
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -40]), {
    stiffness: 60, damping: 20,
  });
  const pillarsY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -20]), {
    stiffness: 60, damping: 20,
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleScrollTo = (id: string, freq: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    sound.playClick(freq);
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-12 px-5 sm:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* ── Top context bar ── */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 pt-4"
        style={{ opacity: bgOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-[var(--forest)]"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--muted)]">
            Product Designer &amp; Creative Developer
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <LomeTimeWidget />
        </motion.div>
      </motion.div>

      {/* ── Main grid ── */}
      <div className="grid gap-12 lg:grid-cols-12 items-center my-auto py-10">

        {/* LEFT — Typography */}
        <motion.div style={{ y: textY }} className="lg:col-span-7 space-y-7">

          {/* Cinematic headline — word-by-word reveal */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[var(--ink)] leading-[1.06]">
            <TextSplit
              text="Concevoir pour le"
              delay={0.15}
              stagger={0.05}
            />
            {' '}
            <span className="italic text-[var(--clay)] font-normal inline-block">
              <TextSplit
                text="monde réel,"
                delay={0.45}
                stagger={0.06}
              />
            </span>
            <br />
            <TextSplit
              text="pas pour les slides."
              delay={0.75}
              stagger={0.04}
            />
          </h1>

          {/* Subtext clip reveal */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-xl"
            >
              Moi c'est{' '}
              <strong className="text-[var(--ink)] font-semibold">Josias Tchaou</strong>.
              Étudiant en L3 à l'IAI Lomé (Togo). Je combine la rigueur du code fullstack,
              la sécurité des accès et la délicatesse du design d'interface pour créer des outils
              numériques limpides, humains et immédiatement utiles.
            </motion.p>
          </div>

          {/* CTA Buttons — magnetic + shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <ShimmerButton
              href="#projets"
              onClick={handleScrollTo('projets', 500)}
              className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium shadow-lg"
              style={{
                background: 'var(--clay)',
                color: 'var(--paper)',
              }}
              data-cursor-label="Voir"
            >
              <span>Découvrir les travaux</span>
              <span className="font-display italic text-base">→</span>
            </ShimmerButton>

            <MagneticButton
              href="#contact"
              onClick={handleScrollTo('contact', 600)}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium border border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--ink)] hover:border-[var(--clay)] transition-colors"
              data-cursor-label="Hello"
            >
              <span>Me contacter</span>
            </MagneticButton>
          </motion.div>

          {/* Pillars — staggered reveal */}
          <motion.div style={{ y: pillarsY }}>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[var(--line)] text-xs text-[var(--muted)]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1, delayChildren: 1.4 } },
              }}
            >
              {pillars.map((p) => (
                <motion.div
                  key={p.label}
                  className="flex items-center gap-2"
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <motion.span
                    style={{ color: p.color }}
                    animate={{ rotate: [0, 15, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 2, ease: 'easeInOut' }}
                  >
                    {p.icon}
                  </motion.span>
                  <span>{p.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT — 3D Badge with deeper parallax */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <motion.div
            style={{ y: badgeY }}
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center"
          >
            <DesignerBadge />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="text-[11px] font-mono text-[var(--muted)] mt-2 text-center"
            >
              ✦ Survolez ou touchez le badge pour l'inspecter sous tous les angles
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom scroll hint ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="flex items-center justify-between pt-6 border-t border-[var(--line)] text-xs font-mono text-[var(--muted)]"
        style={{ opacity: bgOpacity }}
      >
        <span>Lomé, Togo · GMT+0</span>
        <a
          href="#projets"
          onClick={handleScrollTo('projets', 500)}
          className="flex items-center gap-2 text-[var(--clay)] hover:underline group"
        >
          <span>Découvrir les cas d'étude</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={13} />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
