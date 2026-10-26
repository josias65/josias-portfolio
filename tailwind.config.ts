import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS v4 — config complémentaire au thème CSS (`src/app/globals.css` @theme).
 * Les tokens de design (couleurs, polices) vivent dans @theme ; ce fichier
 * sert surtout à l’outillage (chemins de contenu, plugins).
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
};

export default config;
