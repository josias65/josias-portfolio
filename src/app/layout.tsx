import type { Metadata } from 'next';
import { Fraunces, Karla, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/SmoothScroll';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
});

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Josias Tchaou — Product Designer & Creative Developer',
  description:
    'Product Designer & Creative Developer basé à Lomé, Togo. Étudiant en L3 à l’IAI. Conception d’interfaces centrées sur l’humain, architecture de systèmes et code fullstack pour le monde réel.',
  keywords: [
    'Product Designer', 'UX Designer', 'UI Designer', 'Creative Developer',
    'Josias Tchaou', 'IAI Lomé', 'Togo', 'FinFlow', 'SecureHub', 'Alpha Quarante',
    'Design System', 'Figma', 'Next.js', 'Frontend Engineering',
  ],
  authors: [{ name: 'Josias Tchaou' }],
  creator: 'Josias Tchaou',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://josiastchaou.dev',
    title: 'Josias Tchaou — Product Designer & Creative Developer',
    description: 'Conception d’interfaces centrées sur l’humain, UX de terrain et code fullstack · Lomé, Togo',
    siteName: 'Josias Tchaou — Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Josias Tchaou — Product Designer & Creative Developer',
    description: 'Product Designer & Creative Developer · Lomé, Togo',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${karla.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased overflow-x-hidden">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
