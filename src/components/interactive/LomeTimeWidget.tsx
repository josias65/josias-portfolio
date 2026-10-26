'use client';

import { useEffect, useState } from 'react';
import { Clock, MapPin, Sparkles } from 'lucide-react';

export function LomeTimeWidget({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const lomeStr = new Intl.DateTimeFormat('fr-FR', {
          timeZone: 'Africa/Lome',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(now);
        setTime(lomeStr);

        // Calculate hour in Lomé
        const hourPart = parseInt(lomeStr.split(':')[0], 10);
        if (hourPart >= 6 && hourPart < 12) {
          setStatus('Matinée à Lomé · Au travail');
        } else if (hourPart >= 12 && hourPart < 17) {
          setStatus('Après-midi tropical · En ligne');
        } else if (hourPart >= 17 && hourPart < 20) {
          setStatus('Heure dorée sur le littoral · Disponible');
        } else {
          setStatus('Soirée calme · Code & prototypage');
        }
      } catch {
        setTime('19:40');
        setStatus('Lomé · Togo (GMT+0)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono border"
        style={{
          background: 'var(--surface-subtle)',
          borderColor: 'var(--line)',
          color: 'var(--muted)',
        }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--forest)' }}></span>
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--forest)' }}></span>
        </span>
        <span className="text-[var(--ink)] font-medium">{time}</span>
        <span>Lomé (GMT)</span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex flex-wrap items-center gap-3 rounded-2xl p-3 px-4 text-xs border transition-colors shadow-xs"
      style={{
        background: 'var(--surface-card)',
        borderColor: 'var(--line)',
      }}
    >
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--forest)' }} />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--forest)' }} />
        </span>
        <span className="font-mono font-medium text-[var(--ink)]">{time || '19:40'}</span>
        <span className="text-[var(--muted)]">à Lomé, Togo</span>
      </div>

      <span className="hidden sm:inline-block h-3 w-px bg-[var(--line)]" />

      <div className="flex items-center gap-1.5 text-[var(--muted)] font-mono text-[11px]">
        <Sparkles size={11} className="text-[var(--clay)]" />
        <span>{status}</span>
      </div>
    </div>
  );
}
