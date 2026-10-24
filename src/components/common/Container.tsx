import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * The site-wide 1280px content container with the original responsive gutters.
 */
export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
