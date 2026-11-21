import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'calm' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-sm border border-transparent',
  secondary:
    'bg-surface text-ink border border-border-warm hover:bg-subtle',
  calm:
    'bg-calm text-white hover:bg-calm-hover shadow-sm border border-transparent',
  ghost:
    'bg-transparent text-ink hover:bg-sage/70 border border-transparent',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-xs font-semibold gap-1.5 whitespace-nowrap',
  md: 'px-5 py-2.5 text-sm font-semibold gap-2 whitespace-nowrap',
  lg: 'px-7 py-3.5 text-sm md:text-base font-semibold gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-full transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
