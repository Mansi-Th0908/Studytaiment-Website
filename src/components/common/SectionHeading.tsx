import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  /** Extra nodes rendered next to the heading (e.g. carousel controls). */
  aside?: ReactNode
  className?: string
}

/**
 * The editorial eyebrow + headline + description pattern used across sections.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  aside,
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-space-md',
        centered && 'items-center text-center',
        'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('flex flex-col gap-space-xs', 'max-w-2xl', centered && 'mx-auto text-center')}>
        <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
          {eyebrow}
        </span>
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
          {title}
        </h2>
        {description ? (
          <p className="font-body-md text-body-md text-on-surface-variant">{description}</p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  )
}
