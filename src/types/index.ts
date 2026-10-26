export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string;
  uxChallenge: string;
  uxSolution: string;
  uxFieldNote: string;
  tech: string[];
  color: string;
  accentColor: string;
  icon: string;
  github?: string;
  liveUrl?: string;
  features: string[];
  metrics: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  category: string;
  level: number;
  icon: string;
  note?: string;
}

export interface JourneyItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  type: 'education' | 'work' | 'project';
  highlight?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
