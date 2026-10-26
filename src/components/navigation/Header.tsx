'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { LomeTimeWidget } from '@/components/interactive/LomeTimeWidget';
import { SoundToggle } from '@/components/interactive/SoundToggle';
import { ThemeToggle } from '@/components/interactive/ThemeToggle';
import { sound } from '@/lib/sound';

const NAV_ITEMS = [
  { label: 'Travaux', href: '#projets' },
  { label: 'Démarche UX', href: '#demarche' },
  { label: 'UX Lab', href: '#ux-lab' },
  { label: 'Savoir-faire', href: '#competences' },
  { label: 'Parcours', href: '#parcours' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['projets', 'demarche', 'ux-lab', 'competences', 'parcours', 'contact'];
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) {
          setActiveSection(s);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    sound.playClick(500);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
        style={{
          background: scrolled || mobileMenuOpen ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(20px)' : 'none',
          borderColor: scrolled ? 'var(--line)' : 'transparent',
        }}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Logo & Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              sound.playPop(550);
            }}
            className="group flex items-center gap-2"
          >
            <span className="font-display text-xl sm:text-2xl font-medium tracking-tight text-[var(--ink)]">
              Josias <span className="italic text-[var(--clay)]">Tchaou</span>
            </span>
            <span className="hidden md:inline-block text-[11px] font-mono px-2 py-0.5 rounded-full border border-[var(--line)] text-[var(--muted)] bg-[var(--surface-subtle)]">
              Product & Code
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Menu principal">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className="relative text-[13px] font-medium transition-colors hover:text-[var(--clay)]"
                  style={{
                    color: isActive ? 'var(--clay)' : 'var(--muted)',
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: 'var(--clay)' }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action buttons on the right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden xl:block">
              <LomeTimeWidget compact />
            </div>
            <SoundToggle />
            <ThemeToggle />

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => {
                sound.playClick(500);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--ink)]"
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden pt-24 px-6 flex flex-col justify-between pb-10"
            style={{
              background: 'var(--paper)',
              color: 'var(--ink-c)',
            }}
          >
            <div className="space-y-4">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--muted-c)] mb-6">
                Navigation
              </p>
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href);
                  }}
                  className="flex items-center justify-between py-3 border-b border-[var(--line)] font-display text-2xl"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={18} className="text-[var(--clay)]" />
                </motion.a>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-[var(--line)]">
              <LomeTimeWidget />
              <div className="text-xs font-mono text-[var(--muted-c)]">
                Lomé · Togo · Étudiant L3 IAI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
