'use client';

import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { sound } from '@/lib/sound';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  strength?: number;
  'data-cursor-label'?: string;
}

export function MagneticButton({
  children,
  className = '',
  style,
  onClick,
  href,
  strength = 0.4,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 300, damping: 20, mass: 0.5 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * strength);
    rawY.set(dy * strength);
  }, [rawX, rawY, strength]);

  const onLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const Tag = href ? 'a' : 'button';

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative inline-block"
    >
      <motion.div style={{ x, y }}>
        <Tag
          href={href as string}
          className={className}
          style={style}
          onClick={(e: React.MouseEvent) => {
            sound.playClick(520);
            onClick?.(e);
          }}
          {...rest}
        >
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}

/** Shimmer fill on hover — for primary CTAs */
export function ShimmerButton({
  children,
  className = '',
  style,
  onClick,
  href,
}: MagneticButtonProps) {
  return (
    <MagneticButton
      className={`relative overflow-hidden group ${className}`}
      style={style}
      onClick={onClick}
      href={href}
    >
      {/* Shimmer sweep */}
      <span
        className="
          pointer-events-none absolute inset-0
          translate-x-[-110%] group-hover:translate-x-[110%]
          transition-transform duration-700 ease-in-out
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          skew-x-[-15deg]
        "
      />
      {children}
    </MagneticButton>
  );
}
