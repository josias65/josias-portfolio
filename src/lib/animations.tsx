'use client';

import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';

/** Reveal on scroll — supports multiple entry styles */
export type RevealVariant =
  | 'fadeUp'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scaleIn'
  | 'clipLeft'
  | 'clipUp'
  | 'maskReveal'
  | 'blurIn'
  | 'slideUp'
  | 'rotateIn';

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
  maskReveal: {
    hidden: { clipPath: 'circle(0%)' },
    visible: { clipPath: 'circle(100%)' },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  slideUp: {
    hidden: { y: '100%' },
    visible: { y: '0%' },
  },
  rotateIn: {
    hidden: { opacity: 0, rotateX: 15 },
    visible: { opacity: 1, rotateX: 0 },
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

  const motionContent = (
    <motion.div
      className={variant === 'slideUp' ? undefined : className}
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

  if (variant === 'slideUp') {
    return (
      <div className={`overflow-hidden ${className}`.trim()}>
        {motionContent}
      </div>
    );
  }

  return motionContent;
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
        ? children.map((child, i) =>
            childVariant === 'slideUp' ? (
              <div key={i} className="overflow-hidden">
                <motion.div
                  variants={vars}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  {child}
                </motion.div>
              </div>
            ) : (
              <motion.div
                key={i}
                variants={vars}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                {child}
              </motion.div>
            )
          )
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

/** Révélation caractère par caractère avec décalage progressif (stagger) */
export interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: 'animate' | 'inView';
  once?: boolean;
}

export function CharacterReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.02,
  trigger = 'animate',
  once = true,
}: CharacterRevealProps) {
  const words = text.split(' ');
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const charVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { y: '100%', opacity: 0 },
        visible: { y: '0%', opacity: 1 },
      };

  const animationProps =
    trigger === 'inView'
      ? { whileInView: 'visible' as const, viewport: { once, margin: '-40px' } }
      : { animate: 'visible' as const };

  return (
    <motion.span
      className={`inline-block ${className}`.trim()}
      initial="hidden"
      {...animationProps}
      variants={containerVariants}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, charIndex) => (
            <span
              key={charIndex}
              className="overflow-hidden inline-block"
              style={{ lineHeight: 'inherit' }}
            >
              <motion.span
                className="inline-block"
                variants={charVariants}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {char}
              </motion.span>
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}

/** Couche de parallaxe basée sur le défilement */
export interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className = '',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Déplacement relatif au défilement selon la vitesse
  // speed: 0 = statique, 1 = se déplace avec le défilement, >1 = plus rapide
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [100 * speed, -100 * speed]
  );

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, willChange: 'transform' }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Compteur numérique animé avec formatage français (fr-FR) */
export interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  from = 0,
  to,
  duration = 1.5,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(from);

  const formatted = useTransform(count, (latest: number) => {
    const factor = Math.pow(10, decimals);
    const rounded = Math.round(latest * factor) / factor;
    const formattedNum = rounded.toLocaleString('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${prefix}${formattedNum}${suffix}`;
  });

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      count.set(to);
      return;
    }

    const controls = animate(count, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [isInView, to, duration, count, shouldReduceMotion]);

  return (
    <motion.span ref={ref} className={className}>
      {formatted}
    </motion.span>
  );
}

