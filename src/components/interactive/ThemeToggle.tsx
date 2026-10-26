'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { sound } from '@/lib/sound';

export type Theme = 'paper' | 'studio';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('paper');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') as Theme | null;
    if (saved === 'studio' || saved === 'paper') {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      // Default to paper for humanized editorial feel
      document.documentElement.setAttribute('data-theme', 'paper');
    }
  }, []);

  const toggle = () => {
    sound.playClick(520);
    const next: Theme = theme === 'paper' ? 'studio' : 'paper';
    setTheme(next);
    localStorage.setItem('portfolio-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono transition-all duration-200 border"
      style={{
        background: 'var(--surface-subtle)',
        borderColor: 'var(--line)',
        color: 'var(--ink)',
      }}
      title={theme === 'paper' ? 'Passer en mode Studio Sombre' : 'Passer en mode Papier d’Atelier'}
      aria-label="Changer de thème visuel"
    >
      {theme === 'paper' ? (
        <>
          <Moon size={13} className="text-[var(--clay)]" />
          <span className="hidden sm:inline">Studio</span>
        </>
      ) : (
        <>
          <Sun size={13} className="text-[var(--ochre)]" />
          <span className="hidden sm:inline">Papier</span>
        </>
      )}
    </button>
  );
}
