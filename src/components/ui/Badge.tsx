import React from 'react';

type BadgeTone = 'sage' | 'terracotta' | 'neutral' | 'match';

interface BadgeProps {
  tone?: BadgeTone;
  nowrap?: boolean;
  children: React.ReactNode;
  className?: string;
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  sage: 'bg-sage text-ink border border-border-soft/60',
  terracotta: 'bg-accent-soft text-primary-hover border border-primary/15',
  neutral: 'bg-subtle text-ink-secondary border border-border-soft',
  match: 'bg-calm text-white border border-transparent',
};

export function Badge({
  tone = 'sage',
  nowrap = false,
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold leading-snug ${
        nowrap ? 'whitespace-nowrap' : ''
      } ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
