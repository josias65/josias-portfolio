'use client';

import { motion, type Variants } from 'framer-motion';

/** Reveal on scroll — supports multiple entry styles */
export type RevealVariant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'clipLeft' | 'clipUp';

const revealVariants: Record<RevealVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1 },
  },
  clipLeft: {
    hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
    visible: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
  },
  clipUp: {
    hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 1 },
    visible: { clipPath: 'inset(0% 0 0 0)', opacity: 1 },
  },
};

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.7,
  className = '',
  once = true,
}: RevealProps) {
  const vars = revealVariants[variant];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={vars}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger children on scroll entry */
interface StaggerRevealProps {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
  childVariant?: RevealVariant;
}

export function StaggerReveal({
  children,
  stagger = 0.08,
  delay = 0,
  className = '',
  childVariant = 'fadeUp',
}: StaggerRevealProps) {
  const vars = revealVariants[childVariant];

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={vars}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

/** Text split — animates each word with a bottom-up slide */
export function TextSplit({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(' ');

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="overflow-hidden inline-block"
          style={{ lineHeight: 'inherit' }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '105%', opacity: 0 },
              visible: { y: '0%', opacity: 1 },
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
