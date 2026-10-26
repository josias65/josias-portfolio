'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  { label: 'Moi', href: '#classic-about' },
  { label: 'Travail', href: '#classic-projects' },
  { label: 'Savoir-faire', href: '#classic-skills' },
  { label: 'Parcours', href: '#classic-journey' },
  { label: 'Écrire', href: '#classic-contact' },
];

export function ClassicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = navItems.map((n) => n.href.replace('#classic-', ''));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(`classic-${id}`);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.38) {
          setActiveId(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-[background,border] duration-300"
        style={{
          background: scrolled || menuOpen ? 'rgba(242,236,225,0.88)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(18px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        }}
      >
        <nav
          className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:px-8"
          aria-label="Navigation principale"
        >
          <a href="#classic-hero" className="font-display text-[1.35rem] italic leading-none tracking-tight">
            Josias
          </a>

          <ul className="hidden items-center gap-8 md:flex" role="list">
            {navItems.map(({ label, href }) => {
              const id = href.replace('#classic-', '');
              const isActive = activeId === id;
              return (
                <li key={label}>
                  <a
                    href={href}
                    className="relative text-[13px] transition-colors"
                    style={{ color: isActive ? 'var(--ink-c)' : 'var(--muted-c)' }}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="atelierNav"
                        className="absolute -bottom-1 left-0 right-0 h-px"
                        style={{ background: 'var(--clay)' }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="relative h-10 w-10 md:hidden"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <span
              className="absolute left-2 right-2 top-[14px] h-px bg-[var(--ink-c)] transition-transform duration-300"
              style={{ transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }}
            />
            <span
              className="absolute left-2 right-2 top-[24px] h-px bg-[var(--ink-c)] transition-transform duration-300"
              style={{ transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-[var(--paper)] px-6 pb-12 pt-24 md:hidden"
          >
            {navItems.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * i, duration: 0.4 }}
                className="font-display border-b border-[var(--line)] py-4 text-4xl italic"
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
