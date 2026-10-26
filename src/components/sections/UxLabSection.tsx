'use client';

import { UxLabPlayground } from '@/components/interactive/UxLabPlayground';

export function UxLabSection() {
  return (
    <section id="ux-lab" className="py-24 px-5 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[var(--clay)] mb-3">
          <span>03</span>
          <span>·</span>
          <span>Laboratoire & Design System</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-tight text-[var(--ink)]">
          Tester, ressentir, ajuster.
        </h2>
        <p className="text-sm text-[var(--muted)] max-w-xl mt-2 leading-relaxed">
          Manipulez directement les courbes de ressort et examinez les règles d’accessibilité qui structurent l’ensemble de mes créations.
        </p>
      </div>

      <UxLabPlayground />
    </section>
  );
}
