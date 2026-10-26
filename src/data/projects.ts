import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'finflow',
    title: 'FinFlow',
    tagline: 'L’argent du quotidien en Afrique de l’Ouest, sans jargon bancaire',
    description:
      'Une application de gestion budgétaire conçue autour des réalités financières de Lomé : transactions en Francs CFA (XOF), gestion hybride Mobile Money (Flooz & T-Money) et cash physique, sans centimes inutiles.',
    longDescription:
      'Les applications comme Mint ou YNAB supposent des cartes de crédit, des virements IBAN et des salaires mensuels fixes. À Lomé, l’argent circule en espèces, par kiosques de transfert et tontines. FinFlow a été prototypé pour supprimer la charge mentale de la réconciliation financière quotidienne.',
    category: 'Product Design & Fintech',
    uxChallenge:
      'Les utilisateurs perdaient le fil de leurs dépenses parce que 80% des flux passaient par des transferts Mobile Money sans reçu papier détaillé. Les apps existantes imposaient des devises à virgule et des catégories inadaptées.',
    uxSolution:
      'Conception d’un sélecteur de flux rapide à une main (Espèces / Flooz / T-Money / Tontine), suppression totale des centimes (non utilisés en FCFA), et calcul de solde disponible en temps réel avec alerte visuelle douce.',
    uxFieldNote:
      '“À Lomé, si ton app me demande de taper 00 après la virgule pour 500 F de taxi-moto zémidjan, je désinstalle après 2 jours.” — Retours utilisateurs lors des premiers tests.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Framer Motion'],
    color: '#2a5a44',
    accentColor: '#d6ede0',
    icon: '01',
    github: 'https://github.com/josias65/finflow',
    liveUrl: undefined,
    features: [
      'Saisie express de dépense en 3 secondes chrono à une seule main',
      'Comptes multiples adaptés : Cash poche, Flooz, T-Money, Banque',
      'Jauge de dépense mensuelle avec seuils visuels intuitifs',
      'Mode hors-ligne résilient aux coupures de connexion mobile',
    ],
    metrics: [
      { label: 'Temps de saisie', value: '3,2s' },
      { label: 'Unité monétaire', value: '100% XOF' },
      { label: 'Friction formulaire', value: '-65%' },
    ],
  },
  {
    id: 'securehub',
    title: 'SecureHub',
    tagline: 'Rendre la gouvernance d’accès et la cybersécurité lisibles pour les humains',
    description:
      'Un tableau de bord de sécurité et de contrôle d’accès (RBAC) pensé pour que des humains — et pas seulement des ingénieurs réseau — comprennent instantanément qui a accès à quoi sur un système d’information.',
    longDescription:
      'En cours de sécurité à l’IAI, la plupart des outils étudiés ressemblaient à des tableaux austères des années 90 où une mauvaise case cochée peut compromettre tout un réseau. SecureHub est une exploration UX : comment rendre les permissions limpides et prévenir les erreurs humaines avant qu’elles n’arrivent ?',
    category: 'Systèmes & UX Sécurité',
    uxChallenge:
      'Dans les consoles de sécurité classiques, les matrices de droits sont incompréhensibles. Les administrateurs accordent trop de privilèges par inadvertance faute d’un modèle mental clair.',
    uxSolution:
      'Modélisation visuelle interactive des rôles, alertes contextuelles en langage naturel plutôt qu’en codes d’erreur cryptiques, et journal d’audit avec chronologie fluide.',
    uxFieldNote:
      '“Le premier vecteur d’attaque reste l’erreur de configuration humaine. Si l’interface est opaque, l’erreur est inévitable.” — Note de recherche UX.',
    tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'JWT httpOnly'],
    color: '#a3422b',
    accentColor: '#fbe8e4',
    icon: '02',
    github: 'https://github.com/josias65/securehub',
    liveUrl: undefined,
    features: [
      'Visualisateur de permissions avec simulation de rôle en direct',
      'Audit log lisible en français naturel avec filtres temporels',
      'Auth JWT sécurisée en cookie httpOnly avec rafraîchissement transparent',
      'Avertissement proactif en cas d’attribution de droits à haut risque',
    ],
    metrics: [
      { label: 'Compréhension rôles', value: '+85%' },
      { label: 'Temps d’audit', value: '÷ 3' },
      { label: 'Vecteurs sécurisés', value: '100% httpOnly' },
    ],
  },
  {
    id: 'alpha-quarante',
    title: 'Alpha Quarante',
    tagline: 'Espace d’entraide communautaire sobre, rapide et sans bruit algorithmique',
    description:
      'Une plateforme de mise en relation et d’échanges pour collectifs locaux : annonces, partage de compétences, événements et ressources, conçue pour charger instantanément même sur réseau 3G précaire.',
    longDescription:
      'Les réseaux sociaux saturés d’algorithmes et de publicités détruisent la clarté des échanges communautaires. Alpha Quarante remet l’écrit, la proximité et la légèreté au premier plan avec une architecture conteneurisée ultra-sobre.',
    category: 'Design d’Espace & Web',
    uxChallenge:
      'Offrir un sentiment de communauté chaleureux sans tomber dans les pièges de l’économie de l’attention (notifications agressives, métriques d’ego, flux infinis anxiogènes).',
    uxSolution:
      'Hiérarchie typographique forte, flux linéaire chronologique sans tri opaque, et interface ultra-légère (moins de 60 Ko de payload initial).',
    uxFieldNote:
      '“On a supprimé le compteur de likes pour le remplacer par un bouton ‘Prendre contact’. La dynamique de conversation a changé du jour au lendemain.”',
    tech: ['Vanilla JS', 'Modern CSS', 'HTML5 Sémantique', 'Docker', 'SQLite'],
    color: '#8b6528',
    accentColor: '#fbf3de',
    icon: '03',
    github: 'https://github.com/josias65/alpha-quarante',
    liveUrl: undefined,
    features: [
      'Fil de discussions chronologique, zéro manipulation algorithmique',
      'Pages membres épurées avec mise en avant des compétences partagées',
      'Conteneurisation Docker pour un déploiement réplicable en une ligne',
      'Performance exemplaire : 100/100 sur Google Lighthouse mobile',
    ],
    metrics: [
      { label: 'Poids payload', value: '54 KB' },
      { label: 'Score Lighthouse', value: '100/100' },
      { label: 'Temps de chargement', value: '0.4s' },
    ],
  },
];
