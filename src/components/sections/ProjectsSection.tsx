'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Pin, Sparkles } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { projects } from '@/data/projects';
import { FinflowSimulator } from '@/components/interactive/FinflowSimulator';
import { SecurehubSimulator } from '@/components/interactive/SecurehubSimulator';
import { Reveal, StaggerReveal } from '@/lib/animations';
import { sound } from '@/lib/sound';

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<string>(projects[0].id);

  const handleTabChange = (id: string) => {
    sound.playClick(540);
    setActiveTab(id);
  };

  return (
    <section id="projets" className="py-24 px-5 sm:px-8 max-w-6xl mx-auto scroll-mt-20">

      {/* Section Header — slides from left */}
      <Reveal variant="fadeLeft">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--line)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[var(--clay)] mb-3">
              <span>01</span><span>·</span><span>Études de Cas &amp; Travaux</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
              Trois projets conçus pour résoudre de vrais problèmes.
            </h2>
          </div>
          <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed">
            Chaque projet répond à un besoin observé directement sur le terrain. Pas de maquettes vides : des flux testés, des prototypes interactifs et du code en production.
          </p>
        </div>
      </Reveal>

      {/* Project Selector Tabs — stagger in */}
      <Reveal variant="fadeUp" delay={0.1}>
        <div className="flex flex-wrap gap-2 pt-8 pb-10">
          {projects.map((p, idx) => {
            const isActive = activeTab === p.id;
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => handleTabChange(p.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-mono border transition-all duration-300"
                style={{
                  background: isActive ? 'var(--clay)' : 'var(--surface-subtle)',
                  borderColor: isActive ? 'var(--clay)' : 'var(--line)',
                  color: isActive ? 'var(--paper)' : 'var(--ink)',
                  boxShadow: isActive ? '0 2px 16px rgba(180,69,42,0.25)' : 'none',
                }}
              >
                <span className="opacity-75 font-bold">0{idx + 1}</span>
                <span className="font-sans font-medium text-sm">{p.title}</span>
                <span className="text-[11px] opacity-80 hidden sm:inline">({p.category})</span>
              </motion.button>
            );
          })}
        </div>
      </Reveal>

      {/* Case Study Details */}
      <div className="space-y-16">
        {projects
          .filter((p) => p.id === activeTab)
          .map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              {/* Project Headline & Metrics */}
              <div className="grid gap-6 lg:grid-cols-12 items-start">
                <div className="lg:col-span-8 space-y-3">
                  <span className="text-xs font-mono text-[var(--clay)] uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-medium text-[var(--ink)]">
                    {project.title} — <span className="italic font-normal">{project.tagline}</span>
                  </h3>
                  <p className="text-base text-[var(--muted)] leading-relaxed pt-1">
                    {project.description}
                  </p>
                </div>

                {/* Metrics */}
                <motion.div
                  className="lg:col-span-4 grid grid-cols-3 gap-2 p-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)]"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  {project.metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      className="text-center p-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <p className="font-display text-lg sm:text-xl font-bold text-[var(--clay)]">
                        {m.value}
                      </p>
                      <p className="text-[10px] font-mono text-[var(--muted)] mt-0.5 uppercase tracking-tight">
                        {m.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* UX Challenge vs Solution */}
              <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                  className="rounded-2xl border border-[var(--line)] bg-[var(--surface-card)] p-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--clay)] block mb-2">
                    Le Défi UX (La Friction)
                  </span>
                  <p className="text-sm text-[var(--ink)] leading-relaxed">{project.uxChallenge}</p>
                </motion.div>

                <motion.div
                  className="rounded-2xl border border-[var(--line)] bg-[var(--surface-card)] p-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--forest)] block mb-2">
                    La Réponse Design
                  </span>
                  <p className="text-sm text-[var(--ink)] leading-relaxed">{project.uxSolution}</p>
                </motion.div>
              </div>

              {/* Interactive Prototype */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[var(--muted)]">
                  <Sparkles size={13} className="text-[var(--clay)]" />
                  <span>Prototype interactif manipulable en direct :</span>
                </div>
                {project.id === 'finflow' && <FinflowSimulator />}
                {project.id === 'securehub' && <SecurehubSimulator />}
                {project.id === 'alpha-quarante' && (
                  <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-card)] p-6 sm:p-8">
                    <div className="max-w-2xl mx-auto space-y-4">
                      <div className="flex items-center justify-between pb-4 border-b border-[var(--line)] text-xs font-mono">
                        <span className="text-[var(--clay)] font-bold">Alpha Quarante · Salon Communautaire</span>
                        <span className="text-[var(--forest)]">● 24 membres actifs à Lomé</span>
                      </div>
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--ink-c)]">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-semibold">Atelier Wireframing &amp; Code</span>
                            <span className="text-[10px] opacity-75">Samedi 10h · IAI</span>
                          </div>
                          <p className="text-xs text-[var(--muted-c)]">
                            Session ouverte pour prototyper ensemble des interfaces adaptées au réseau togolais.
                          </p>
                        </div>
                        <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] text-[var(--ink-c)]">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-semibold">Partage de ressources Docker</span>
                            <span className="text-[10px] opacity-75">Hier</span>
                          </div>
                          <p className="text-xs text-[var(--muted-c)]">
                            Templates de conteneurs légers pour déployer sans configuration complexe.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Field Note & Tech */}
              <div className="grid gap-6 lg:grid-cols-12 items-center pt-2">
                <div className="lg:col-span-7 relative p-5 rounded-2xl border border-amber-300 bg-amber-50/90 text-amber-950 shadow-sm">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-amber-800 mb-1.5">
                    <Pin size={12} className="rotate-45" />
                    <span>Note de recherche sur le terrain</span>
                  </div>
                  <p className="font-display italic text-sm sm:text-base leading-snug">
                    {project.uxFieldNote}
                  </p>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] block">
                    Technologies mises en œuvre :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <motion.span
                        key={t}
                        whileHover={{ scale: 1.08, borderColor: 'var(--clay)' }}
                        className="rounded-full px-2.5 py-1 text-[11px] font-mono border border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--ink)] transition-colors cursor-default"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                  {project.github && (
                    <div className="pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono text-[var(--clay)] hover:underline group"
                      >
                        <GithubIcon size={14} />
                        <span>Explorer le code source sur GitHub</span>
                        <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </section>
  );
}
