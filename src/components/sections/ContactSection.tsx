'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, Send, Sparkles, MapPin, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';
import { LomeTimeWidget } from '@/components/interactive/LomeTimeWidget';
import { GuestReactions } from '@/components/interactive/GuestReactions';
import { sound } from '@/lib/sound';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const copyEmail = async () => {
    sound.playPop(600);
    try {
      await navigator.clipboard.writeText('josiastchaou1@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sound.playChime();
    const subject = encodeURIComponent(`Contact Portfolio — ${form.name}`);
    const body = encodeURIComponent(
      `Bonjour Josias,\n\n${form.message}\n\nDe : ${form.name} (${form.email})`
    );
    window.location.href = `mailto:josiastchaou1@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 px-5 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[var(--clay)] mb-3">
            <span>06</span>
            <span>·</span>
            <span>Contact & Opportunités</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
            Parlons de vos projets.
          </h2>
        </div>
        <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed">
          Que ce soit pour un stage de fin d’études, une mission freelance ou simplement échanger autour du design et du code en Afrique de l’Ouest.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid gap-12 lg:grid-cols-12 pt-12 items-start">
        {/* Left column: Direct info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-card)] p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--clay)] block mb-1">
                Adresse directe
              </span>
              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-subtle)]">
                <span className="font-mono text-sm text-[var(--ink)] truncate">
                  josiastchaou1@gmail.com
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono border transition-all shrink-0"
                  style={{
                    background: copied ? 'var(--forest)' : 'var(--surface-card)',
                    borderColor: copied ? 'var(--forest)' : 'var(--line)',
                    color: copied ? 'var(--paper)' : 'var(--ink)',
                  }}
                  title="Copier l’adresse email"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copié !' : 'Copier'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] block">
                Réseaux & Plateformes :
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/josias65"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono border border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--ink)] hover:border-[var(--clay)] transition-all"
                >
                  <GithubIcon size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} className="text-[var(--muted)]" />
                </a>

                <a
                  href="https://www.linkedin.com/in/josias-tchaou-48199236a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono border border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--ink)] hover:border-[var(--clay)] transition-all"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} className="text-[var(--muted)]" />
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--line)]">
              <LomeTimeWidget />
            </div>
          </div>

          {/* Interactive Guest reactions */}
          <GuestReactions />
        </div>

        {/* Right column: Message composer */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-card)] p-6 sm:p-10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--forest)] text-[var(--paper)] mx-auto">
                  <Check size={28} />
                </div>
                <h3 className="font-display text-2xl font-medium text-[var(--ink)]">
                  Votre client email s’est ouvert !
                </h3>
                <p className="text-sm text-[var(--muted)] max-w-md mx-auto">
                  Le message pré-rempli est prêt dans votre boîte de messagerie. Si aucune application ne s’est lancée, vous pouvez m’écrire directement à <strong className="text-[var(--ink)]">josiastchaou1@gmail.com</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="inline-flex rounded-full px-5 py-2 text-xs font-mono border border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--clay)] hover:underline mt-4"
                >
                  Écrire un autre message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-medium text-[var(--ink)]">
                    Envoyer un message direct
                  </h3>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Remplissez ce formulaire pour m’envoyer un email sans intermédiaire.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
                      Votre nom ou entreprise
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Koffi Mensah / Studio Lomé"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:border-[var(--clay)] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
                      Votre email de réponse
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="koffi@exemple.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:border-[var(--clay)] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] mb-1.5">
                    Votre message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Bonjour Josias, j’ai vu vos travaux sur FinFlow et SecureHub..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/50 focus:border-[var(--clay)] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm font-medium transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-md"
                  style={{
                    background: 'var(--clay)',
                    color: 'var(--paper)',
                  }}
                >
                  <Send size={15} />
                  <span>Transmettre le message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted)]">
        <div>
          Josias Tchaou · {new Date().getFullYear()} · Lomé, Togo
        </div>
        <div className="flex items-center gap-4">
          <span>Artisanat numérique d’auteur</span>
          <span>·</span>
          <span>Zéro template préfabriqué</span>
        </div>
      </footer>
    </section>
  );
}
