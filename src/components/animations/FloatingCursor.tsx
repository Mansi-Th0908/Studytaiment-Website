import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], .st-tilt-card, .st-stage-btn'

/**
 * Interactive cursor dot + lagging ring. Only mounted for fine-pointer,
 * non-reduced-motion environments, driven by a single passive pointermove
 * listener and one rAF loop (no React state during movement).
 */
export function FloatingCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reducedMotion = useReducedMotion()
  const enabled = finePointer && !reducedMotion

  useEffect(() => {
    if (!enabled) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let rafId = 0
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let visible = false

    // One persistent rAF loop performs all cursor rendering; the pointer
    // listener only records coordinates, so movement never schedules frames.
    const handleMove = (event: PointerEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
      if (!visible) {
        visible = true
        dot.classList.add('is-visible')
        ring.classList.add('is-visible')
      }
    }

    const handleOver = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return
      ring.classList.toggle('is-expanded', event.target.closest(INTERACTIVE_SELECTOR) !== null)
    }

    const render = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      rafId = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerover', handleOver, { passive: true })
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerover', handleOver)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
