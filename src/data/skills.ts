import type { Skill } from '@/types';

export const skills: Skill[] = [
  // UX & Design d'interface
  { name: 'Architecture de l’information', category: 'Design UX/UI', level: 90, icon: '01', note: 'Parcours utilisateurs, wireframing, fluidité cognitive' },
  { name: 'Figma & Design Systems', category: 'Design UX/UI', level: 88, icon: '02', note: 'Tokens, composants réutilisables, auto-layout millimétré' },
  { name: 'Accessibilité (WCAG / a11y)', category: 'Design UX/UI', level: 85, icon: '03', note: 'Contrastes réels, navigation clavier, sémantique pure' },
  { name: 'Micro-interactions & Motion', category: 'Design UX/UI', level: 84, icon: '04', note: 'Framer Motion, physique des springs, timing tactile' },
  { name: 'Recherche Utilisateur & Terrain', category: 'Design UX/UI', level: 82, icon: '05', note: 'Interviews à Lomé, tests d’utilisabilité concrets' },

  // Ingénierie Frontend
  { name: 'React 19 & Next.js', category: 'Front-end & Web', level: 90, icon: '01', note: 'App Router, Server Components, hydratation soignée' },
  { name: 'TypeScript', category: 'Front-end & Web', level: 86, icon: '02', note: 'Typage strict, interfaces fiables, DX confortable' },
  { name: 'Tailwind CSS & CSS Moderne', category: 'Front-end & Web', level: 92, icon: '03', note: 'Tokens dynamiques, responsive fluide, zéro artefact' },
  { name: 'WebGL / Three.js', category: 'Front-end & Web', level: 68, icon: '04', note: 'Scènes 3D légères, shaders discrets sans lag' },

  // Backend & Données
  { name: 'Node.js & Express', category: 'Backend & Data', level: 86, icon: '01', note: 'APIs REST structurées, middlewares propres' },
  { name: 'PostgreSQL & Prisma', category: 'Backend & Data', level: 82, icon: '02', note: 'Modélisation relationnelle, indexation propre' },
  { name: 'Sécurité d’Auth (JWT & Sessions)', category: 'Backend & Data', level: 88, icon: '03', note: 'Cookies httpOnly, RBAC, anti-CSRF/XSS' },

  // Culture Système & Terrain
  { name: 'Git & Collaboration', category: 'Outils & Système', level: 90, icon: '01', note: 'Branches claires, commits conventionnels, revues' },
  { name: 'Docker & Conteneurs', category: 'Outils & Système', level: 75, icon: '02', note: 'Environnements reproductibles partout' },
  { name: 'Linux & Réseaux (IAI Lomé)', category: 'Outils & Système', level: 80, icon: '03', note: 'Analyse paquets, SSH, configuration serveurs' },
];

export const skillCategories = ['Design UX/UI', 'Front-end & Web', 'Backend & Data', 'Outils & Système'] as const;
export const categories = skillCategories;
