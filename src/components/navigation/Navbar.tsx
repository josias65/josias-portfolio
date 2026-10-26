'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About',    href: '#about',    color: '#a855f7' },
  { label: 'Projects', href: '#projects', color: '#3b82f6' },
  { label: 'Skills',   href: '#skills',   color: '#4dd9c0' },
  { label: 'Journey',  href: '#journey',  color: '#10b981' },
  { label: 'Contact',  href: '#contact',  color: '#f59e0b' },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[60] transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(7,9,12,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
        }}
      >
        <nav
          className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between"
          aria-label="Navigation principale"
        >
          {/* Logo */}
          <a
            href="#hero"
            className="font-mono text-sm tracking-widest uppercase flex items-center gap-2 group"
            aria-label="Retour au début"
          >
            <span
              className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold text-black transition-all group-hover:scale-110"
              style={{ background: '#ff7a18' }}
            >
              J
            </span>
            <span className="text-ink group-hover:text-amber transition-colors">Josias<span className="text-amber">.</span>dev</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navItems.map(({ label, href, color }) => (
              <li key={label}>
                <a
                  href={href}
                  className="px-3 py-2 font-mono text-[11px] tracking-widest uppercase text-muted hover:text-ink rounded-lg hover:bg-white/5 transition-all duration-200 relative group"
                >
                  {label}
                  <span
                    className="absolute bottom-1 left-3 right-3 h-px scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"
                    style={{ background: color }}
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href="mailto:josiastchaou1@gmail.com"
                className="ml-2 px-4 py-2 rounded-xl font-mono text-[11px] tracking-widest uppercase transition-all hover:scale-105 hover:opacity-90"
                style={{ background: 'rgba(255,122,24,0.12)', border: '1px solid rgba(255,122,24,0.35)', color: '#ff7a18' }}
              >
                Hire Me
              </a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center glass rounded-lg text-muted hover:text-ink transition-colors"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-16 left-0 right-0 z-[59] md:hidden"
            style={{ background: 'rgba(7,9,12,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
          >
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map(({ label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-xl font-mono text-[11px] tracking-widest uppercase text-muted hover:text-ink hover:bg-white/5 transition-all flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                  {label}
                </a>
              ))}
              <a
                href="mailto:josiastchaou1@gmail.com"
                className="mt-2 px-4 py-3 rounded-xl font-mono text-[11px] tracking-widest uppercase text-center transition-all"
                style={{ background: 'rgba(255,122,24,0.12)', border: '1px solid rgba(255,122,24,0.35)', color: '#ff7a18' }}
                onClick={() => setMenuOpen(false)}
              >
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
