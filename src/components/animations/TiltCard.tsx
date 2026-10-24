import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../utils/cn'

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Visual hook shared with the custom cursor. */
  cursorTarget?: boolean
}

const TILT_STRENGTH = 16

/**
 * Pointer-responsive 3D tilt: rotation is written straight to the element
 * (no React state during movement), resets with a short transition on exit,
 * and is disabled on touch devices and for reduced-motion users.
 */
export function TiltCard({ children, className, cursorTarget = true }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reducedMotion = useReducedMotion()
  const tiltEnabled = finePointer && !reducedMotion

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    const rotateX = -(y / rect.height) * TILT_STRENGTH
    const rotateY = (x / rect.width) * TILT_STRENGTH
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
  }

  const resetTilt = () => {
    const card = cardRef.current
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    }
  }

  return (
    <div
      ref={cardRef}
      onPointerMove={tiltEnabled ? handlePointerMove : undefined}
      onPointerLeave={tiltEnabled ? resetTilt : undefined}
      onPointerCancel={tiltEnabled ? resetTilt : undefined}
      className={cn(
        'st-tilt-card transform-gpu transition-transform duration-200 ease-out will-change-transform',
        cursorTarget && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  )
}
