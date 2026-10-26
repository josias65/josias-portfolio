'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, Feather, Cpu, Heart, Check, Sparkles, Coffee } from 'lucide-react';
import { sound } from '@/lib/sound';

const PILLARS = [
  {
    icon: Compass,
    title: 'L’utilité avant l’artifice',
    desc: 'Le meilleur design n’est pas celui qui crie le plus fort, mais celui qui s’efface avec élégance pour laisser l’utilisateur agir sans frustration.',
    quote: 'Si une interaction demande un mode d’emploi, c’est que le design a échoué.',
  },
  {
    icon: Feather,
    title: 'Ancré dans la réalité du terrain',
    desc: 'Concevoir d’abord pour les connexions 3G capricieuses, les forfaits data comptés et les usages réels d’Afrique de l’Ouest avant de viser les vitrines occidentales.',
    quote: 'Un écran léger de 50 Ko qui charge en 0.5s bat n’importe quelle animation lourde.',
  },
  {
    icon: Cpu,
    title: 'L’honnêteté du code',
    desc: 'Un composant visuel ne vaut que par la solidité de la mécanique sous le capot : validation stricte des données, sessions protégées en httpOnly et zéro triche.',
    quote: 'La sécurité et l’accessibilité ne sont pas des options, ce sont des fondations.',
  },
  {
    icon: Heart,
    title: 'Le soin du détail tactile',
    desc: 'La sensation physique d’un bouton qui répond, la clarté d’un ratio de contraste WCAG, la fluidité d’une transition naturelle qui respecte l’attention.',
    quote: 'Ce sont les micro-détails qui transforment un outil froid en expérience agréable.',
  },
];

const DESK_TOOLS = [
  { name: 'Figma & Auto-Layout', role: 'Architecture d’information & Design Tokens', tag: 'Conception' },
  { name: 'Carnet & Feutre 0.3mm', role: 'Wireframing basse fidélité avant tout code', tag: 'Réflexion' },
  { name: 'Next.js & TypeScript', role: 'Intégration fidèle au pixel & typage strict', tag: 'Ingénierie' },
  { name: 'Linux & Wireshark', role: 'Compréhension des flux réseau à l’IAI Lomé', tag: 'Systèmes' },
  { name: 'Café Robusta & Alizés', role: 'L’énergie créative sur la côte maritime', tag: 'Cadre' },
];

export function UxPhilosophySection() {
  const [activeTool, setActiveTool] = useState(0);

  return (
    <section id="demarche" className="py-24 px-5 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[var(--clay)] mb-3">
            <span>02</span>
            <span>·</span>
            <span>Démarche & Méthode</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
            Comment je pense un produit numérique.
          </h2>
        </div>
        <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed">
          Quatre principes cardinaux qui guident chaque esquisse sur papier, chaque choix de typographie et chaque ligne de code que j’écris.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid gap-6 sm:grid-cols-2 pt-12">
        {PILLARS.map((p, idx) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.title}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="rounded-3xl border border-[var(--line)] bg-[var(--surface-card)] p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--clay-tint)] text-[var(--clay)]">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-xs text-[var(--muted)]">0{idx + 1}</span>
                </div>

                <h3 className="font-display text-xl font-medium text-[var(--ink)] mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--line)]">
                <p className="font-display italic text-xs text-[var(--clay)]">
                  “{p.quote}”
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Desk & Tools Shelf */}
      <div className="mt-16 rounded-3xl border border-[var(--line)] bg-[var(--surface-subtle)] p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
          <div>
            <span className="text-xs font-mono text-[var(--clay)] uppercase tracking-wider block mb-1">
              Mon Atelier Quotidien
            </span>
            <h4 className="font-display text-2xl font-medium text-[var(--ink)]">
              La boîte à outils d’un artisan du web
            </h4>
          </div>
          <span className="text-xs font-mono text-[var(--muted)]">
            De la feuille de papier au déploiement
          </span>
        </div>

        <div className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESK_TOOLS.map((tool, idx) => (
            <div
              key={tool.name}
              className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-card)] hover:border-[var(--clay)] transition-all cursor-default"
            >
              <div className="flex items-center justify-between text-[10px] font-mono mb-2">
                <span className="text-[var(--clay)] font-semibold">{tool.tag}</span>
                <span className="text-[var(--muted)]">0{idx + 1}</span>
              </div>
              <h5 className="font-medium text-sm text-[var(--ink)]">{tool.name}</h5>
              <p className="text-xs text-[var(--muted)] mt-1">{tool.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
