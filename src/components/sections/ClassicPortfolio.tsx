'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { projects } from '@/data/projects';
import { skills, categories } from '@/data/skills';
import { journeyItems } from '@/data/journey';
import { GithubIcon, LinkedinIcon, ExternalLinkIcon } from '@/components/icons/SocialIcons';
import { ClassicNavbar } from '@/components/navigation/ClassicNavbar';

const CAT_LABEL: Record<string, string> = {
  Écran: 'Interface',
  Moteur: 'Serveur',
  Blindage: 'Sécurité',
  Atelier: 'Atelier',
};

const PROJECT_TONE: Record<string, { wash: string; ink: string }> = {
  securehub: { wash: '#8f3a2c', ink: '#f2ece1' },
  finflow: { wash: '#355445', ink: '#f2ece1' },
  'alpha-quarante': { wash: '#b07a32', ink: '#1b1713' },
};

function ease() {
  return [0.22, 1, 0.36, 1] as const;
}

function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.22);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function LomeClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat('fr-FR', {
          timeZone: 'Africa/Lome',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <span>
      Il est {time} à Lomé. Je réponds souvent le soir, après les cours.
    </span>
  );
}

function Section({
  id,
  children,
  className = '',
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={`classic-${id}`} className={`relative px-5 py-24 sm:px-8 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-10 flex items-baseline gap-4">
      <span className="font-display text-sm italic" style={{ color: 'var(--clay)' }}>
        {index}
      </span>
      <span className="text-[11px] uppercase tracking-[0.26em]" style={{ color: 'var(--muted-c)' }}>
        {label}
      </span>
    </div>
  );
}

function ClassicHero() {
  const line = [...skills.map((s) => s.name), ...skills.map((s) => s.name)];

  return (
    <section id="classic-hero" className="relative min-h-[100svh] overflow-hidden px-5 pt-28 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100svh-7rem)] max-w-6xl flex-col justify-between pb-8">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: ease() }}
              className="mb-6 text-[12px] uppercase tracking-[0.22em]"
              style={{ color: 'var(--muted-c)' }}
            >
              Développeur logiciel · IAI Lomé
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: ease() }}
              className="font-display text-[clamp(3.4rem,12vw,9.5rem)] font-medium leading-[0.86] tracking-tight"
            >
              Josias
              <br />
              <span className="italic" style={{ color: 'var(--clay)' }}>
                Tchaou
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: ease() }}
            className="lg:col-span-4 lg:pb-4"
          >
            <p className="max-w-sm text-[1.05rem] leading-relaxed" style={{ color: 'var(--muted-c)' }}>
              Je construis des outils web qui tiennent — auth, bases, interfaces.
              Pas des démos vides. Des choses qu’on peut ouvrir le lundi matin.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#classic-projects"
                  className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm text-[var(--paper)]"
                  style={{ background: 'var(--ink-c)' }}
                >
                  Voir le travail
                  <span aria-hidden className="font-display italic">
                    →
                  </span>
                </a>
              </Magnetic>
              <a href="#classic-contact" className="atelier-link text-sm" style={{ color: 'var(--muted-c)' }}>
                Me laisser un mot
              </a>
            </div>
            <p className="mt-8 flex items-center gap-2 text-xs" style={{ color: 'var(--muted-c)' }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--forest)' }} />
              Ouvert à un stage, un job, une collab.
            </p>
          </motion.div>
        </div>

        <div className="relative -mx-5 mt-16 border-y border-[var(--line)] sm:-mx-8">
          <div className="overflow-hidden py-3">
            <div className="marquee-track gap-10 pr-10 text-[13px]" style={{ color: 'var(--muted-c)' }}>
              {line.map((name, i) => (
                <span key={`${name}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
                  {name}
                  <span className="font-display italic" style={{ color: 'var(--clay)' }}>
                    ·
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClassicAbout() {
  return (
    <Section id="about">
      <Eyebrow index="01" label="Un peu de moi" />
      <div className="grid gap-12 lg:grid-cols-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: ease() }}
          className="font-display text-3xl leading-snug sm:text-5xl lg:col-span-7"
        >
          Étudiant en L3 à l’IAI, je code comme j’apprends&nbsp;: en faisant,
          en cassant, en recollant.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: ease() }}
          className="space-y-5 text-[1.02rem] leading-relaxed lg:col-span-5"
          style={{ color: 'var(--muted-c)' }}
        >
          <p>
            Web, réseaux, un peu de sécu. J’aime quand une interface est calme et
            qu’un backend ne triche pas — cookies httpOnly, rôles, logs, le boulot
            un peu sale qu’on découvre trop tard.
          </p>
          <p>
            Lomé est ma base. Les tutos en dollars me passent à côté : FinFlow
            parle en francs CFA, SecureHub sert à toucher la sécu plutôt qu’à la
            citer.
          </p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 pt-4 text-sm">
            {[
              ['École', 'IAI — Lomé'],
              ['Niveau', 'Licence 3'],
              ['Filière', 'Logiciels, réseaux, SI'],
              ['Mail', 'josiastchaou1@gmail.com'],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] uppercase tracking-[0.18em]">{k}</dt>
                <dd className="mt-1 text-[var(--ink-c)]">{v}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </Section>
  );
}

function ClassicProjects() {
  const [open, setOpen] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <Section id="projects" className="!pt-8">
      <Eyebrow index="02" label="Travail" />
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display max-w-xl text-3xl sm:text-4xl">
          Trois projets. Pas une vitrine infinie.
        </h2>
        <p className="max-w-xs text-sm leading-relaxed" style={{ color: 'var(--muted-c)' }}>
          Clique une ligne. Le détail s’ouvre, le reste se tait.
        </p>
      </div>

      <ul className="border-t border-[var(--line)]" role="list">
        {projects.map((p, i) => {
          const tone = PROJECT_TONE[p.id] ?? { wash: '#1b1713', ink: '#f2ece1' };
          const active = open === p.id;
          return (
            <li key={p.id} className="border-b border-[var(--line)]">
              <button
                type="button"
                onClick={() => setOpen(active ? null : p.id)}
                className="group flex w-full items-baseline gap-4 py-7 text-left sm:gap-8"
                aria-expanded={active}
              >
                <span className="w-8 font-display text-sm italic" style={{ color: 'var(--clay)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="font-display text-3xl tracking-tight sm:text-5xl">{p.title}</span>
                    <span className="text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--muted-c)' }}>
                      {p.category}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm sm:text-base" style={{ color: 'var(--muted-c)' }}>
                    {p.tagline}
                  </span>
                </span>
                <span
                  className="hidden font-display text-2xl italic transition-transform duration-500 sm:block"
                  style={{ transform: active ? 'rotate(45deg)' : 'none', color: 'var(--clay)' }}
                >
                  +
                </span>
              </button>

              <motion.div
                initial={false}
                animate={{ height: active ? 'auto' : 0, opacity: active ? 1 : 0 }}
                transition={{ duration: 0.45, ease: ease() }}
                className="overflow-hidden"
              >
                <div
                  className="mb-8 grid gap-8 rounded-[2px] p-6 sm:grid-cols-12 sm:p-10"
                  style={{ background: tone.wash, color: tone.ink }}
                >
                  <p className="text-[1.05rem] leading-relaxed sm:col-span-7">{p.description}</p>
                  <div className="sm:col-span-5">
                    <ul className="space-y-2 text-sm opacity-90">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="font-display italic">—</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full px-2.5 py-1 text-[11px]"
                          style={{ border: '1px solid currentColor', opacity: 0.75 }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-5 text-sm">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                          <GithubIcon size={14} /> GitHub
                        </a>
                      )}
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                          <ExternalLinkIcon size={14} /> En ligne
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function skillWord(level: number) {
  if (level >= 80) return 'à l’aise';
  if (level >= 70) return 'en cours';
  return 'j’apprends';
}

function ClassicSkills() {
  const [active, setActive] = useState<string>('Design UX/UI');
  const filtered = skills.filter((s) => s.category === active);

  return (
    <Section id="skills">
      <Eyebrow index="03" label="Savoir-faire" />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="font-display text-3xl sm:text-4xl">Ce que je touche vraiment.</h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--muted-c)' }}>
            Pas de barres à 88&nbsp;%. Juste l’honnêteté : à l’aise, en cours, ou encore
            en train d’apprendre.
          </p>
          <div className="mt-8 flex flex-col items-start gap-2">
            {categories.map((cat: string) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className="font-display text-2xl italic transition-colors sm:text-3xl"
                style={{ color: active === cat ? 'var(--clay)' : 'var(--line)' }}
              >
                {CAT_LABEL[cat] ?? cat}
              </button>
            ))}
          </div>
        </div>

        <motion.ul
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="divide-y divide-[var(--line)] lg:col-span-8"
        >
          {filtered.map((s) => (
            <li key={s.name} className="flex items-baseline justify-between gap-4 py-4">
              <span className="text-lg">{s.name}</span>
              <span className="font-display text-sm italic" style={{ color: 'var(--muted-c)' }}>
                {skillWord(s.level)}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}

function ClassicJourney() {
  return (
    <Section id="journey">
      <Eyebrow index="04" label="Parcours" />
      <h2 className="font-display mb-16 max-w-2xl text-3xl sm:text-4xl">
        De la copie de code à 2&nbsp;h du matin, jusqu’à L3.
      </h2>
      <ol className="relative space-y-0">
        {journeyItems.map((item, i) => (
          <motion.li
            key={`${item.year}-${item.title}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: ease() }}
            className="grid grid-cols-12 gap-4 border-t border-[var(--line)] py-8"
          >
            <p className="col-span-3 font-display text-xl italic sm:col-span-2" style={{ color: 'var(--clay)' }}>
              {item.year}
            </p>
            <div className="col-span-9 sm:col-span-10 sm:grid sm:grid-cols-10 sm:gap-6">
              <div className="sm:col-span-4">
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted-c)' }}>
                  {item.subtitle}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed sm:col-span-6 sm:mt-0" style={{ color: 'var(--muted-c)' }}>
                {item.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}

function ClassicContact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Salut Josias — ${form.name}`);
    const body = encodeURIComponent(`De : ${form.name}\n${form.email}\n\n${form.message}`);
    window.location.href = `mailto:josiastchaou1@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const copyMail = async () => {
    await navigator.clipboard.writeText('josiastchaou1@gmail.com');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="contact">
      <Eyebrow index="05" label="Écrire" />
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">
            Un mail. Pas un tunnel de conversion.
          </h2>
          <p className="mt-6 text-[1.02rem] leading-relaxed" style={{ color: 'var(--muted-c)' }}>
            <LomeClock />
          </p>
          <div className="mt-10 space-y-4 text-sm">
            <button type="button" onClick={copyMail} className="atelier-link block text-left">
              {copied ? 'Copié dans le presse-papiers.' : 'josiastchaou1@gmail.com'}
            </button>
            <a
              href="https://github.com/josias65"
              target="_blank"
              rel="noopener noreferrer"
              className="atelier-link inline-flex items-center gap-2"
            >
              <GithubIcon size={14} /> github.com/josias65
            </a>
            <br />
            <a
              href="https://www.linkedin.com/in/josias-tchaou-48199236a"
              target="_blank"
              rel="noopener noreferrer"
              className="atelier-link inline-flex items-center gap-2"
            >
              <LinkedinIcon size={14} /> LinkedIn
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div className="flex min-h-64 flex-col justify-center border border-[var(--line)] p-8">
              <p className="font-display text-3xl italic">C’est parti.</p>
              <p className="mt-3 text-sm" style={{ color: 'var(--muted-c)' }}>
                Ton client mail s’est ouvert. Si rien ne s’affiche, écris-moi à la main.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="atelier-link mt-6 self-start text-sm"
              >
                Écrire un autre mot
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--muted-c)' }}>
                  Ton nom
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-2 w-full border-0 border-b border-[var(--line)] bg-transparent py-3 text-lg outline-none transition-colors focus:border-[var(--clay)]"
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--muted-c)' }}>
                  Ton mail
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-2 w-full border-0 border-b border-[var(--line)] bg-transparent py-3 text-lg outline-none transition-colors focus:border-[var(--clay)]"
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--muted-c)' }}>
                  Le mot
                </span>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Salut Josias, je t’écris parce que…"
                  className="mt-2 w-full resize-none border-0 border-b border-[var(--line)] bg-transparent py-3 text-lg outline-none transition-colors focus:border-[var(--clay)]"
                />
              </label>
              <Magnetic className="inline-block">
                <button
                  type="submit"
                  className="rounded-full px-7 py-3 text-sm text-[var(--paper)]"
                  style={{ background: 'var(--clay)' }}
                >
                  Envoyer
                </button>
              </Magnetic>
            </form>
          )}
        </div>
      </div>

      <footer className="mt-28 flex flex-col gap-2 border-t border-[var(--line)] pt-8 text-xs sm:flex-row sm:justify-between" style={{ color: 'var(--muted-c)' }}>
        <p>Josias Tchaou, {new Date().getFullYear()}. Fait à Lomé, à la main.</p>
        <p>Pas un template. Un gars qui code.</p>
      </footer>
    </Section>
  );
}

export function ClassicPortfolio() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink-c)' }}>
      <ClassicNavbar />
      <ClassicHero />
      <ClassicAbout />
      <ClassicProjects />
      <ClassicSkills />
      <ClassicJourney />
      <ClassicContact />
    </div>
  );
}
