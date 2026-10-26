'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, KeyRound, Lock, Eye, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/sound';

type Role = 'auditeur' | 'analyste' | 'admin';

interface RoleConfig {
  name: string;
  badge: string;
  desc: string;
  color: string;
  permissions: {
    resource: string;
    level: 'read' | 'write' | 'admin' | 'none';
  }[];
  warning?: string;
}

const ROLES: Record<Role, RoleConfig> = {
  auditeur: {
    name: 'Auditeur Externe',
    badge: 'Lecture seule anonymisée',
    desc: 'Accès limité aux journaux d’audit consolidés pour certification légale. Données sensibles masquées.',
    color: '#3a5344',
    permissions: [
      { resource: 'Journaux d’audit SI', level: 'read' },
      { resource: 'Visualisation des failles CVE', level: 'read' },
      { resource: 'Révocation de sessions JWT', level: 'none' },
      { resource: 'Modification des politiques RBAC', level: 'none' },
    ],
  },
  analyste: {
    name: 'Opérateur SOC L2',
    badge: 'Investigation & Réponse',
    desc: 'Analyse des menaces actives, quarantaine d’adresses IP suspectes et clôture des faux positifs.',
    color: '#c4893c',
    permissions: [
      { resource: 'Journaux d’audit SI', level: 'read' },
      { resource: 'Visualisation des failles CVE', level: 'write' },
      { resource: 'Révocation de sessions JWT', level: 'write' },
      { resource: 'Modification des politiques RBAC', level: 'none' },
    ],
  },
  admin: {
    name: 'Administrateur Sécurité',
    badge: 'Privilèges élevés (Root)',
    desc: 'Contrôle absolu des politiques d’accès, gestion des secrets cryptographiques et clés d’API.',
    color: '#b4452a',
    warning: 'Droit destructif détecté : Double confirmation obligatoire sur toute modification de politique.',
    permissions: [
      { resource: 'Journaux d’audit SI', level: 'admin' },
      { resource: 'Visualisation des failles CVE', level: 'admin' },
      { resource: 'Révocation de sessions JWT', level: 'admin' },
      { resource: 'Modification des politiques RBAC', level: 'admin' },
    ],
  },
};

export function SecurehubSimulator() {
  const [activeRole, setActiveRole] = useState<Role>('analyste');
  const [log, setLog] = useState<string[]>([
    '19:42:10 — Auth JWT validée (cookie httpOnly)',
    '19:42:11 — Politique RBAC chargée : 4 règles actives',
  ]);

  const setRole = (role: Role) => {
    sound.playClick(role === 'admin' ? 380 : 560);
    setActiveRole(role);
    const time = new Intl.DateTimeFormat('fr-FR', {
      timeZone: 'Africa/Lome',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date());

    setLog((prev) => [
      `${time} — Changement de rôle vers [${ROLES[role].name}]`,
      ...prev.slice(0, 3),
    ]);
  };

  const current = ROLES[activeRole];

  return (
    <div className="relative rounded-3xl border border-[var(--line)] bg-[var(--surface-card)] p-5 sm:p-7 overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[var(--line)]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--clay)] text-[var(--paper)] text-xs font-mono font-bold">
            SH
          </span>
          <div>
            <h4 className="text-sm font-medium text-[var(--ink)]">Simulateur RBAC SecureHub</h4>
            <p className="text-[11px] text-[var(--muted)]">Testez la clarté visuelle des privilèges de sécurité</p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-1 text-xs">
          {(['auditeur', 'analyste', 'admin'] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className="relative rounded-lg px-3 py-1 font-mono text-[11px] transition-all capitalize"
              style={{
                background: activeRole === r ? 'var(--surface-card)' : 'transparent',
                color: activeRole === r ? 'var(--ink)' : 'var(--muted)',
                boxShadow: activeRole === r ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulator grid */}
      <div className="grid gap-6 pt-6 sm:grid-cols-12">
        {/* Left column: Role state & matrix */}
        <div className="sm:col-span-7 space-y-4">
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4 text-[var(--ink-c)]">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-c)]">
                  Rôle actif simulé
                </span>
                <h5 className="font-display text-lg font-medium text-[var(--ink-c)]">
                  {current.name}
                </h5>
              </div>
              <span
                className="text-[11px] font-mono px-2.5 py-1 rounded-full text-[var(--paper)] font-medium"
                style={{ background: current.color }}
              >
                {current.badge}
              </span>
            </div>

            <p className="mt-2 text-xs text-[var(--muted-c)] leading-relaxed">
              {current.desc}
            </p>

            {current.warning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 flex items-start gap-2 rounded-xl border border-red-300 bg-red-50 p-2.5 text-[11px] text-red-900 leading-tight"
              >
                <AlertTriangle size={14} className="shrink-0 text-red-600 mt-0.5" />
                <span>{current.warning}</span>
              </motion.div>
            )}

            {/* Matrix */}
            <div className="mt-4 pt-3 border-t border-[var(--line)]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-c)] block mb-2">
                Droits d’accès contextuels (Matrice d’autorisation) :
              </span>

              <div className="space-y-1.5">
                {current.permissions.map((p) => {
                  const isBlocked = p.level === 'none';
                  const isAdmin = p.level === 'admin';
                  return (
                    <div
                      key={p.resource}
                      className="flex items-center justify-between p-2 rounded-lg border border-[var(--line)] bg-[var(--surface-card)] text-xs"
                    >
                      <span className="font-medium text-[var(--ink-c)]">{p.resource}</span>
                      <span
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md font-semibold"
                        style={{
                          background: isBlocked ? 'rgba(0,0,0,0.06)' : isAdmin ? 'rgba(180,69,42,0.15)' : 'rgba(58,83,68,0.15)',
                          color: isBlocked ? 'var(--muted-c)' : isAdmin ? 'var(--clay)' : 'var(--forest)',
                        }}
                      >
                        {isBlocked ? '✕ Refusé' : isAdmin ? '★ Contrôle Total' : '✓ Lecture Seule'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Audit snippet */}
          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3 font-mono text-[11px] text-[var(--muted)]">
            <span className="text-[10px] uppercase text-[var(--clay)] block mb-1">
              Journal d’audit en direct (Audit Trail)
            </span>
            {log.map((l, i) => (
              <p key={i} className="truncate">{l}</p>
            ))}
          </div>
        </div>

        {/* Right column: Design rationale */}
        <div className="sm:col-span-5 flex flex-col justify-between space-y-4 text-xs">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--clay)]">
              Le parti-pris UX
            </span>
            <h5 className="font-display text-base font-medium text-[var(--ink)] mt-1">
              La sécurité sans ergonomie est une illusion
            </h5>
            <p className="mt-2 text-[var(--muted)] leading-relaxed">
              Dans un rapport du NIST, plus de 75% des fuites de données internes résultent de privilèges mal compris ou laissés ouverts par omission.
            </p>

            <ul className="mt-3 space-y-2 text-[var(--muted)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-[var(--clay)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--ink)]">Feedback immédiat :</strong> Chaque droit accordé modifie instantanément la jauge de risque globale.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-[var(--clay)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--ink)]">Pas de jargon abstrait :</strong> Remplacer les masques de bits UNIX par des verbes d’action explicites.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-[var(--clay)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--ink)]">Protection contre l’erreur :</strong> Les actions destructives requièrent une temporisation d’invalidation.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-[var(--line)] bg-[var(--surface-subtle)] p-3 text-[11px] text-[var(--muted)]">
            <span className="font-mono text-[var(--forest)] uppercase tracking-wider block mb-1">
              Résultat IAI Lomé
            </span>
            Architecture validée en projet d’étude avec note maximale sur la séparation des privilèges et la clarté du flux d’administration.
          </div>
        </div>
      </div>
    </div>
  );
}
