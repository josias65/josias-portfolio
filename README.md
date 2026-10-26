# Josias Tchaou — Portfolio 3D

Portfolio interactif (Next.js, React Three Fiber, Tailwind CSS v4) : web, réseaux et cybersécurité.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** (`@theme` dans `src/app/globals.css`, config dans `tailwind.config.ts`)
- **Three.js** + `@react-three/fiber` + `@react-three/drei`
- **Framer Motion** + **Lucide**
- Polices : **Inter** et **JetBrains Mono** via `next/font/google` (pas de package Geist)

## Démarrage

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Structure

```
src/
  app/                 # layout, page, styles globaux
  components/
    3d/HeroCanvas.tsx  # champ d’étoiles + graphe
    navigation/
    sections/          # Hero, About, Projects, Skills, Contact
  data/                # projets, compétences, parcours
  types/
```

## Contenu

Les projets (SecureHub, FinFlow, Alpha Quarante), compétences et timeline se trouvent dans `src/data/`.

Le formulaire de contact ouvre le client mail (`mailto:`) — aucun backend requis.

## Déploiement

Compatible Vercel : `npm run build` puis déploiement du dossier du projet.
