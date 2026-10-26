'use client';

import { Header } from '@/components/navigation/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { UxPhilosophySection } from '@/components/sections/UxPhilosophySection';
import { UxLabSection } from '@/components/sections/UxLabSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { ContactSection } from '@/components/sections/ContactSection';
import { MagneticCursor } from '@/components/interactive/MagneticCursor';
import { AmbientBackground } from '@/components/interactive/AmbientBackground';

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Custom magnetic cursor (desktop only) */}
      <MagneticCursor />

      {/* Ambient animated background — orbs + grid */}
      <AmbientBackground />

      {/* Paper grain subtle texture overlay */}
      <div className="paper-grain" aria-hidden />

      {/* Main navigation */}
      <Header />

      {/* Sections — each with its own reveal variant */}
      <HeroSection />
      <ProjectsSection />
      <UxPhilosophySection />
      <UxLabSection />
      <SkillsSection />
      <JourneySection />
      <ContactSection />
    </main>
  );
}
