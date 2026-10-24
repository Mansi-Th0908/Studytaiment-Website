import { useEffect, useRef } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MaterialIcon } from '../common/MaterialIcon'
import { Button } from '../common/Button'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Externally configurable destination for the full 3D sandbox. When no sandbox
 * destination exists for the application this stays null and the button falls
 * back to a clearly scoped local action (returning to the interactive 3D hero
 * scene instead of pretending a sandbox exists).
 */
const SANDBOX_URL: string | null = null

interface ArtifactModalProps {
  open: boolean
  onClose: () => void
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Accessible rewrite of the original `tour-modal`: labelled dialog semantics,
 * focus moved in on open and restored to the trigger on close, Tab trapping,
 * Escape/backdrop/icon/Dismiss closing, and body scroll locking.
 */
export function ArtifactModal({ open, onClose }: ArtifactModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const reducedMotion = useReducedMotion()

  // Focus management + scroll lock + keyboard handling while open.
  useEffect(() => {
    if (!open) return

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'

    const dialog = dialogRef.current
    if (dialog) {
      dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const current = dialogRef.current
      if (!current) return
      const focusableElements = current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      if (focusableElements.length === 0) return

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocusedRef.current?.focus()
      previouslyFocusedRef.current = null
    }
  }, [open, onClose])

  const handleBackdropClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleLaunchSandbox = () => {
    if (SANDBOX_URL) {
      window.open(SANDBOX_URL, '_blank', 'noopener,noreferrer')
      onClose()
      return
    }
    onClose()
    document.getElementById('ecosystem')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="tour-modal-backdrop"
          initial={reducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-md flex items-center justify-center p-space-md"
        >
          <div className="sr-only">Artifact viewer dialog. Press Escape to close.</div>
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="artifact-modal-title"
            aria-describedby="artifact-modal-desc"
            initial={reducedMotion ? undefined : { opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={handleBackdropClick}
            className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl p-space-xl shadow-2xl flex flex-col gap-space-md relative"
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              className="absolute top-space-md right-space-md w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface"
            >
              <MaterialIcon name="close" className="text-[18px]" />
            </button>

            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest">
              Interactive Artifact Viewer
            </span>
            <h3 id="artifact-modal-title" className="font-headline-sm text-headline-sm text-on-surface">
              Spatial Geometry &amp; Curiosity Node 04
            </h3>
            <p id="artifact-modal-desc" className="font-body-sm text-body-sm text-on-surface-variant">
              This mathematical orbital node represents orbital mechanics for young explorers.
              Scholars manipulate gravity wells with gesture inputs, intuitively synthesizing Newton
              and Kepler before formal formulas are introduced.
            </p>

            <div className="w-full h-56 bg-surface-container-low rounded-xl flex items-center justify-center relative overflow-hidden">
              <svg className="w-36 h-36 animate-pulse" viewBox="0 0 200 200" aria-hidden="true">
                <circle
                  className="text-primary-container"
                  cx="100"
                  cy="100"
                  fill="none"
                  r="70"
                  stroke="currentColor"
                  strokeDasharray="4 8"
                  strokeWidth="2"
                />
                <circle className="fill-primary" cx="100" cy="100" r="30" />
                <circle className="fill-secondary-container animate-bounce" cx="170" cy="100" r="10" />
              </svg>
            </div>

            <div className="flex justify-end gap-space-sm pt-space-xs">
              <Button variant="ghost" size="md" onClick={onClose}>
                Dismiss
              </Button>
              <Button variant="primary" size="md" className="shadow-sm" onClick={handleLaunchSandbox}>
                Launch Full 3D Sandbox
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
