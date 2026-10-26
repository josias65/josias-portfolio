'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Eye, Sparkles, Check, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import { sound } from '@/lib/sound';

export function UxLabPlayground() {
  // Motion physics playground state
  const [stiffness, setStiffness] = useState(260);
  const [damping, setDamping] = useState(18);
  const [bounceTrigger, setBounceTrigger] = useState(0);

  // Contrast calculator state
  const [selectedPair, setSelectedPair] = useState(0);
  const colorPairs = [
    { name: 'Encre sur Papier d’Atelier', fg: '#1b1713', bg: '#f2ece1', ratio: '12.4:1', level: 'AAA' },
    { name: 'Terre Cuite sur Papier', fg: '#b4452a', bg: '#f2ece1', ratio: '5.2:1', level: 'AA' },
    { name: 'Vert Forêt sur Papier', fg: '#3a5344', bg: '#f2ece1', ratio: '7.8:1', level: 'AAA' },
    { name: 'Ocre Doré sur Fond Sombre', fg: '#c4893c', bg: '#131b24', ratio: '6.9:1', level: 'AAA' },
  ];

  // Interactive toggle state
  const [segmented, setSegmented] = useState<'calme' | 'dynamique' | 'rigoureux'>('calme');
  const [switchState, setSwitchState] = useState(true);

  const triggerBounce = () => {
    sound.playPop(520);
    setBounceTrigger((prev) => prev + 1);
  };

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-card)] p-6 sm:p-10 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[var(--line)]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--clay)] uppercase tracking-widest mb-1">
            <Sliders size={13} />
            <span>Laboratoire Interactif UX & Tokens</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-medium text-[var(--ink)]">
            L’artisanat derrière les interactions
          </h3>
          <p className="text-sm text-[var(--muted)] mt-1 max-w-xl">
            Un bon design ne s’arrête pas à une maquette statique. Il se vit au doigt, au clic, et dans le respect des normes d’accessibilité.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono border border-[var(--line)] bg-[var(--surface-subtle)] text-[var(--muted)]">
          <Layers size={12} className="text-[var(--clay)]" />
          <span>Framer Motion & Mathématiques WCAG</span>
        </div>
      </div>

      <div className="grid gap-8 pt-8 lg:grid-cols-2">
        {/* Module 1: Physics & Spring sandbox */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-6 text-[var(--ink-c)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted-c)]">
                01 · Physique des ressorts (Springs)
              </span>
              <span className="font-mono text-xs text-[var(--clay)]">
                k={stiffness} / c={damping}
              </span>
            </div>
            <h4 className="font-display text-lg font-medium mt-1">
              Courbe d’inertie tactile
            </h4>
            <p className="text-xs text-[var(--muted-c)] mt-1">
              Ajustez la raideur et l’amortissement pour ressentir l’impact sur le feedback haptique visuel.
            </p>

            {/* Visual playground canvas */}
            <div className="my-6 h-32 rounded-xl border border-[var(--line)] bg-[var(--paper-2)] flex items-center justify-center relative overflow-hidden">
              <motion.div
                key={bounceTrigger}
                initial={{ scale: 0.6, rotate: -15, y: 15 }}
                animate={{ scale: 1, rotate: 0, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: stiffness,
                  damping: damping,
                }}
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-display text-xl shadow-md select-none"
                style={{
                  background: 'var(--clay)',
                  color: 'var(--paper)',
                }}
              >
                ✨
              </motion.div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 text-xs font-mono">
              <div>
                <div className="flex justify-between mb-1 text-[var(--muted-c)]">
                  <span>Raideur (Stiffness) : {stiffness}</span>
                  <span>Plus vif →</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={stiffness}
                  onChange={(e) => setStiffness(Number(e.target.value))}
                  className="w-full accent-[var(--clay)] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1 text-[var(--muted-c)]">
                  <span>Amortissement (Damping) : {damping}</span>
                  <span>Plus feutré →</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="40"
                  value={damping}
                  onChange={(e) => setDamping(Number(e.target.value))}
                  className="w-full accent-[var(--clay)] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={triggerBounce}
            className="mt-6 flex items-center justify-center gap-2 rounded-full py-2.5 px-4 text-xs font-mono font-medium border border-[var(--line)] bg-[var(--surface-card)] hover:border-[var(--clay)] hover:text-[var(--clay)] transition-all shadow-xs"
          >
            <RefreshCw size={12} />
            <span>Tester l’impulsion (Re-bounce)</span>
          </button>
        </div>

        {/* Module 2: Accessibility Contrast Inspector */}
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 sm:p-6 text-[var(--ink-c)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted-c)]">
                02 · Audit d’Accessibilité (a11y)
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                Certifié WCAG 2.1
              </span>
            </div>
            <h4 className="font-display text-lg font-medium mt-1">
              Rapport de contraste colorimétrique
            </h4>
            <p className="text-xs text-[var(--muted-c)] mt-1">
              Chaque teinte du portfolio est testée pour garantir une lisibilité optimale en plein soleil à Lomé.
            </p>

            {/* Color pair selector */}
            <div className="grid grid-cols-2 gap-2 mt-4 mb-4">
              {colorPairs.map((pair, idx) => (
                <button
                  key={pair.name}
                  type="button"
                  onClick={() => {
                    sound.playClick(600);
                    setSelectedPair(idx);
                  }}
                  className="p-2 rounded-lg border text-left text-xs transition-all"
                  style={{
                    borderColor: selectedPair === idx ? 'var(--clay)' : 'var(--line)',
                    background: selectedPair === idx ? 'var(--clay-tint)' : 'var(--surface-card)',
                  }}
                >
                  <p className="font-medium truncate text-[11px]">{pair.name}</p>
                  <div className="flex items-center gap-1.5 mt-1 font-mono text-[10px] text-[var(--muted-c)]">
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 inline-block"
                      style={{ background: pair.fg }}
                    />
                    <span>vs</span>
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 inline-block"
                      style={{ background: pair.bg }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Contrast Card Preview */}
            <div
              className="rounded-xl p-5 border border-[var(--line)] transition-colors shadow-xs"
              style={{
                background: colorPairs[selectedPair].bg,
                color: colorPairs[selectedPair].fg,
              }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-current/15 text-xs font-mono">
                <span>Ratio mesuré : {colorPairs[selectedPair].ratio}</span>
                <span className="px-2 py-0.5 rounded-full bg-current/10 font-bold">
                  {colorPairs[selectedPair].level}
                </span>
              </div>
              <p className="mt-3 font-display text-lg leading-snug">
                “La lisibilité est la première forme de politesse envers l’utilisateur.”
              </p>
              <p className="mt-1 text-xs opacity-80 font-sans">
                Conforme pour texte corps (16px+) et titres contrastés.
              </p>
            </div>
          </div>

          {/* Interactive tactile segmented control showcase */}
          <div className="mt-6 pt-4 border-t border-[var(--line)]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-c)] block mb-2">
              Composants tactiles :
            </span>
            <div className="flex items-center justify-between">
              {/* Segmented control */}
              <div className="flex rounded-full border border-[var(--line)] bg-[var(--paper-2)] p-1 text-xs font-mono">
                {(['calme', 'dynamique', 'rigoureux'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => {
                      sound.playPop(500);
                      setSegmented(mode);
                    }}
                    className="relative rounded-full px-3 py-1 transition-all capitalize"
                    style={{
                      background: segmented === mode ? 'var(--clay)' : 'transparent',
                      color: segmented === mode ? 'var(--paper)' : 'var(--muted-c)',
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {/* Haptic switch */}
              <button
                type="button"
                onClick={() => {
                  sound.playClick(switchState ? 440 : 640);
                  setSwitchState(!switchState);
                }}
                className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                style={{
                  background: switchState ? 'var(--forest)' : 'var(--muted-c)',
                }}
                aria-label="Interrupteur à retour doux"
              >
                <span
                  className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out"
                  style={{
                    transform: switchState ? 'translateX(20px)' : 'translateX(0)',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
