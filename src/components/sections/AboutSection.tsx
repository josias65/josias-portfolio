'use client';

import { motion } from 'framer-motion';
import { GraduationCap, MapPin, BookOpen, Terminal } from 'lucide-react';
import { journeyItems } from '@/data/journey';

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
});

const stats = [
  { value: '3+',  label: 'Années de code',   color: '#ff7a18' },
  { value: '3',   label: 'Projets livrés',    color: '#3b82f6' },
  { value: 'L3',  label: 'Niveau académique', color: '#10b981' },
  { value: '∞',   label: 'Curiosité',         color: '#a855f7' },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{ '--zone-color': '#a855f7' } as React.CSSProperties}
    >
      {/* Bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 0% 50%, rgba(168,85,247,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Zone header */}
        <motion.div
          variants={fade(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-14 zone-marker pl-5"
        >
          <p className="font-mono text-[11px] tracking-[0.4em] uppercase mb-2" style={{ color: '#a855f7' }}>
            ▶ ZONE // JOURNAL
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-ink">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Bio — 3 cols */}
          <motion.div
            variants={fade(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-5"
          >
            <p className="text-lg text-ink leading-relaxed">
              Je suis <span className="text-ink font-semibold">Josias Tchaou</span>, développeur
              logiciel en dernière année à{' '}
              <span className="font-medium" style={{ color: '#a855f7' }}>
                l'Institut Africain d'Informatique (IAI)
              </span>{' '}
              à Lomé, Togo.
            </p>
            <p className="text-muted leading-relaxed">
              Mon parcours couvre le développement web full-stack, les réseaux informatiques et la
              cybersécurité. J'aime créer des systèmes robustes, des interfaces soignées et des
              architectures qui tiennent dans le temps.
            </p>
            <p className="text-muted leading-relaxed">
              Je m'intéresse aux solutions numériques à impact réel — applications de finance, outils
              de sécurité, plateformes communautaires. Chaque projet est une occasion d'apprendre
              quelque chose de nouveau.
            </p>

            {/* Info pills */}
            <div className="space-y-2 pt-2">
              {[
                { icon: GraduationCap, label: 'École', value: "IAI — Institut Africain d'Informatique" },
                { icon: BookOpen,      label: 'Filière', value: 'Programmation · Logiciels · Réseaux · BD' },
                { icon: MapPin,        label: 'Localisation', value: 'Lomé, Togo 🇹🇬' },
                { icon: Terminal,      label: 'Niveau', value: 'Licence 3' },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass flex items-center gap-3 px-4 py-3 rounded-xl"
                >
                  <Icon size={14} style={{ color: '#a855f7' }} className="shrink-0" />
                  <div className="min-w-0">
                    <span className="text-dim font-mono text-[10px] tracking-widest uppercase">{label} · </span>
                    <span className="text-ink text-sm">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats — 2 cols */}
          <motion.div
            variants={fade(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-2 grid grid-cols-2 gap-3 content-start"
          >
            {stats.map(({ value, label, color }) => (
              <div
                key={label}
                className="glass rounded-2xl p-5 text-center"
                style={{ borderColor: `${color}20` }}
              >
                <p className="text-3xl font-bold mb-1" style={{ color }}>{value}</p>
                <p className="text-dim text-xs font-mono leading-tight">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent)' }} />

        {/* Journey preview */}
        <motion.div
          variants={fade(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-muted mb-8">
            ◆ Parcours récent
          </p>
          <div className="space-y-4">
            {journeyItems.slice(0, 3).map((item, i) => (
              <motion.div
                key={i}
                variants={fade(0.1 * i)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="glass rounded-xl px-5 py-4 flex items-start gap-4"
              >
                <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-mono text-[10px]" style={{ color: '#a855f7' }}>{item.year}</span>
                    <span className="text-ink font-semibold text-sm">{item.title}</span>
                  </div>
                  <p className="text-dim text-xs">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <a href="#journey" className="font-mono text-[11px] tracking-widest uppercase text-muted hover:text-amber transition-colors">
              Voir tout le parcours →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
