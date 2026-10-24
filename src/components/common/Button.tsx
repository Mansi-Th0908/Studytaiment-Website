import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export type ButtonVariant = 'primary' | 'surface' | 'ghost'
export type ButtonSize = 'md' | 'lg'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-container hover:bg-primary text-on-primary shadow-md hover:shadow-lg active:translate-y-0.5',
  surface:
    'bg-surface-container-lowest/80 backdrop-blur-sm hover:bg-surface-container text-on-surface shadow-sm',
  ghost: 'bg-surface-container hover:bg-surface-container-high text-on-surface',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: 'px-space-lg py-space-sm rounded-lg',
  lg: 'px-space-xl py-space-md rounded-xl',
}

function getButtonClassNames(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'lg',
  className?: string,
): string {
  return cn(
    'inline-flex items-center justify-center gap-space-sm font-label-lg text-label-lg transition-all active:scale-95',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  )
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'lg',
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={getButtonClassNames(variant, size, className)} {...rest}>
      {children}
    </button>
  )
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

/**
 * Anchor styled as a button — used for real in-page navigation CTAs so the
 * element stays a genuine, accessible link.
 */
export function ButtonLink({
  variant = 'primary',
  size = 'lg',
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={getButtonClassNames(variant, size, className)} {...rest}>
      {children}
    </a>
  )
}
