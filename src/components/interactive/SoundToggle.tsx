'use client';

import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from '@/lib/sound';

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(sound.isEnabled());
  }, []);

  const handleToggle = () => {
    const next = sound.toggle();
    setEnabled(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-mono transition-all duration-200 border"
      style={{
        background: enabled ? 'var(--clay-tint)' : 'transparent',
        borderColor: enabled ? 'var(--clay)' : 'var(--line)',
        color: enabled ? 'var(--clay)' : 'var(--muted)',
      }}
      title={enabled ? 'Désactiver les sons tactiles' : 'Activer les retours sonores tactiles'}
      aria-label="Sons tactiles de l’interface"
    >
      {enabled ? (
        <Volume2 size={13} className="animate-pulse" />
      ) : (
        <VolumeX size={13} className="opacity-60 group-hover:opacity-100" />
      )}
      <span className="hidden sm:inline">
        {enabled ? 'Sons ON' : 'Sons OFF'}
      </span>
    </button>
  );
}
