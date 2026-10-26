'use client';

import { motion } from 'framer-motion';

interface ModeToggleProps {
  mode: 'immersive' | 'classic';
  onToggle: () => void;
}

export function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  const isClassic = mode === 'classic';

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="fixed bottom-5 right-5 z-[65] px-3 py-2 text-[11px] tracking-wide"
      style={
        isClassic
          ? {
              color: '#6a6358',
              border: '1px solid rgba(27,23,19,0.16)',
              background: 'rgba(242,236,225,0.8)',
              backdropFilter: 'blur(10px)',
            }
          : {
              color: '#efe6d4',
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(7,9,12,0.55)',
              backdropFilter: 'blur(10px)',
            }
      }
      aria-label={isClassic ? 'Ouvrir la version 3D' : 'Revenir au site'}
    >
      {isClassic ? 'version 3D' : 'revenir au site'}
    </motion.button>
  );
}
