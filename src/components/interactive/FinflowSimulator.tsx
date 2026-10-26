'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Plus, ArrowDownRight, RefreshCcw, CheckCircle2, Info } from 'lucide-react';
import { sound } from '@/lib/sound';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  source: 'Espèces' | 'Flooz' | 'T-Money';
  time: string;
}

const PRESETS = [
  { label: '🛵 Zémidjan Lomé', amount: 500, source: 'Espèces' as const },
  { label: '📱 Rechargement Flooz', amount: 2500, source: 'Flooz' as const },
  { label: '🍛 Déjeuner cantine IAI', amount: 1200, source: 'Espèces' as const },
  { label: '📶 Pass data 4G', amount: 1000, source: 'T-Money' as const },
];

export function FinflowSimulator() {
  const [balance, setBalance] = useState(148500);
  const [spentThisMonth, setSpentThisMonth] = useState(38000);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', name: 'Supermarché Champion', amount: 6500, source: 'Flooz', time: '14:20' },
    { id: '2', name: 'Course Zémidjan Tokoin', amount: 600, source: 'Espèces', time: '12:05' },
  ]);
  const [showUxOverlay, setShowUxOverlay] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const budgetMax = 80000;
  const budgetRatio = Math.min(100, Math.round((spentThisMonth / budgetMax) * 100));

  const addExpense = (preset: typeof PRESETS[0]) => {
    sound.playPop(580);
    setBalance((prev) => Math.max(0, prev - preset.amount));
    setSpentThisMonth((prev) => prev + preset.amount);

    const newTx: Transaction = {
      id: Date.now().toString(),
      name: preset.label,
      amount: preset.amount,
      source: preset.source,
      time: 'À l’instant',
    };

    setTransactions((prev) => [newTx, ...prev.slice(0, 3)]);
    setLastAction(`+ ${preset.amount.toLocaleString('fr-FR')} F ajouté`);
    setTimeout(() => setLastAction(null), 2500);
  };

  const reset = () => {
    sound.playClick(400);
    setBalance(148500);
    setSpentThisMonth(38000);
    setTransactions([
      { id: '1', name: 'Supermarché Champion', amount: 6500, source: 'Flooz', time: '14:20' },
      { id: '2', name: 'Course Zémidjan Tokoin', amount: 600, source: 'Espèces', time: '12:05' },
    ]);
  };

  return (
    <div className="relative rounded-3xl border border-[var(--line)] bg-[var(--surface-card)] p-5 sm:p-7 overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[var(--line)]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--forest)] text-[var(--paper)] text-xs font-mono font-bold">
            FF
          </span>
          <div>
            <h4 className="text-sm font-medium text-[var(--ink)]">Simulateur Interactif FinFlow</h4>
            <p className="text-[11px] text-[var(--muted)]">Testez la saisie instantanée en FCFA</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick(620);
              setShowUxOverlay(!showUxOverlay);
            }}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono border transition-all"
            style={{
              background: showUxOverlay ? 'var(--clay)' : 'var(--surface-subtle)',
              borderColor: showUxOverlay ? 'var(--clay)' : 'var(--line)',
              color: showUxOverlay ? 'var(--paper)' : 'var(--ink)',
            }}
          >
            <Info size={12} />
            <span>{showUxOverlay ? 'Masquer annotations UX' : 'Décoder l’UX'}</span>
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-full p-1.5 text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-subtle)] transition-colors"
            title="Réinitialiser la simulation"
          >
            <RefreshCcw size={13} />
          </button>
        </div>
      </div>

      {/* Main Interactive Screen */}
      <div className="grid gap-6 pt-6 sm:grid-cols-12">
        {/* Left: Interactive Phone UI */}
        <div className="relative sm:col-span-7 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 text-[var(--ink-c)] shadow-sm">
          {/* Balance card */}
          <div className="rounded-xl p-4 border border-[var(--line)] bg-[var(--surface-card)] mb-4">
            <span className="text-[11px] uppercase tracking-wider text-[var(--muted-c)]">
              Solde disponible (Tous comptes)
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-[var(--ink-c)]">
                {balance.toLocaleString('fr-FR')}
              </span>
              <span className="font-mono text-xs font-bold text-[var(--clay)]">FCFA</span>
            </div>

            {/* Budget track */}
            <div className="mt-3 pt-3 border-t border-[var(--line)]">
              <div className="flex justify-between text-[11px] text-[var(--muted-c)] mb-1">
                <span>Dépenses du mois</span>
                <span>{budgetRatio}% du plafond</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[var(--paper-2)] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: budgetRatio > 75 ? 'var(--clay)' : 'var(--forest)',
                  }}
                  animate={{ width: `${budgetRatio}%` }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                />
              </div>
            </div>
          </div>

          {/* Quick presets (Click to add) */}
          <div className="mb-4">
            <p className="text-[11px] font-mono text-[var(--muted-c)] uppercase tracking-wider mb-2">
              Dépenses courantes à Lomé (cliquez pour tester) :
            </p>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => addExpense(p)}
                  className="flex flex-col items-start p-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface-card)] hover:border-[var(--clay)] hover:bg-[var(--clay-tint)] transition-all text-left text-xs group"
                >
                  <span className="font-medium text-[var(--ink-c)] group-hover:text-[var(--clay)]">
                    {p.label}
                  </span>
                  <div className="mt-1 flex items-center justify-between w-full text-[11px] text-[var(--muted-c)]">
                    <span>{p.amount} F</span>
                    <span className="font-mono text-[10px] opacity-75">{p.source}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent list */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted-c)] uppercase mb-2">
              <span>Journal récent</span>
              {lastAction && (
                <span className="text-[var(--forest)] font-bold animate-pulse">{lastAction}</span>
              )}
            </div>
            <div className="space-y-1.5">
              <AnimatePresence initial={false}>
                {transactions.map((tx) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between p-2 rounded-md bg-[var(--surface-card)] border border-[var(--line)] text-xs"
                  >
                    <div>
                      <p className="font-medium text-[var(--ink-c)]">{tx.name}</p>
                      <span className="text-[10px] text-[var(--muted-c)]">{tx.source} · {tx.time}</span>
                    </div>
                    <span className="font-mono font-medium text-[var(--clay)]">
                      -{tx.amount.toLocaleString('fr-FR')} F
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* UX Sticky note if overlay is enabled */}
          {showUxOverlay && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-3 -right-3 z-20 max-w-[220px] rounded-xl p-3 shadow-lg border border-amber-300 bg-amber-50 text-[11px] text-amber-950 font-sans leading-tight rotate-1"
            >
              <div className="font-bold text-[10px] uppercase tracking-wider text-amber-700 mb-1">
                📌 Choix de Design UX
              </div>
              Pas de centimes ! En zone FCFA, 1 centime n’existe pas. Les apps occidentales forcent deux zéros inutiles qui ralentissent la frappe.
            </motion.div>
          )}
        </div>

        {/* Right: The UX Rationale */}
        <div className="sm:col-span-5 flex flex-col justify-between space-y-4 text-xs">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--clay)]">
              Problème Utilisateur résolu
            </span>
            <h5 className="font-display text-base font-medium text-[var(--ink)] mt-1">
              Pourquoi les solutions existantes échouaient à Lomé
            </h5>
            <p className="mt-2 text-[var(--muted)] leading-relaxed">
              La majorité des étudiants et travailleurs indépendants renonçaient aux apps de budget en moins de 5 jours à cause de 3 frictions majeures :
            </p>

            <ul className="mt-3 space-y-2 text-[var(--muted)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-[var(--forest)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--ink)]">Fragmentation :</strong> Séparation nette entre cash physique et portefeuilles Flooz/T-Money.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-[var(--forest)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--ink)]">Complexité de saisie :</strong> Saisir une dépense prenait 12 à 18 secondes sur les apps classiques. FinFlow l’a réduit à 3 secondes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-[var(--forest)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--ink)]">Réseau instable :</strong> Fonctionnement 100% offline avec synchronisation automatique dès retour de la 4G.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3 text-[11px] text-[var(--muted)]">
            <span className="font-mono text-[var(--clay)] uppercase tracking-wider block mb-1">
              Impact mesurable
            </span>
            Taux de rétention après 30 jours : <strong>68%</strong> (vs 22% sur les gabarits standards).
          </div>
        </div>
      </div>
    </div>
  );
}
