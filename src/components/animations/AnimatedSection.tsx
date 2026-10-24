import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  /** Stagger the reveal by seconds. */
  delay?: number
}

/**
 * Smooth section reveal on scroll. Respects reduced motion by rendering a
 * plain, fully visible wrapper instead.
 */
export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
