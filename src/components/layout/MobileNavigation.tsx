import { useEffect } from 'react'
import { headerNavLinks } from '../../data/navigation'
import type { SectionId } from '../../types'
import { cn } from '../../utils/cn'

interface MobileNavigationProps {
  open: boolean
  onClose: () => void
  activeSection: SectionId
  /** True when the menu is rendered on the home page (anchors stay in-page). */
  onHome?: boolean
}

/**
 * Responsive navigation panel shown below the header on small screens.
 * Closes on link selection and on Escape.
 */
export function MobileNavigation({ open, onClose, activeSection, onHome = true }: MobileNavigationProps) {
  const anchorPrefix = onHome ? '' : '/'
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      id="mobile-navigation"
      className="lg:hidden absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-xl border-t border-surface-container-high shadow-md"
    >
      <nav
        aria-label="Mobile"
        className="flex flex-col gap-1 p-space-sm mx-auto max-w-[var(--content-max-width)]"
      >
        {headerNavLinks.map((link) => {
          const isActive = link.route ? false : activeSection === link.sectionId
          return (
            <a
              key={link.label}
              href={link.route ?? `${anchorPrefix}#${link.sectionId}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={onClose}
              className={cn(
                'px-space-md py-space-sm font-label-lg text-label-lg rounded-lg transition-all',
                isActive
                  ? 'bg-surface-container-high text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/70',
              )}
            >
              {link.label}
            </a>
          )
        })}
        <a
          href={`${anchorPrefix}#explore-pathways`}
          onClick={onClose}
          className="mt-1 inline-flex items-center justify-center px-space-lg py-space-sm bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm transition-all"
        >
          Explore Pathways
        </a>
      </nav>
    </div>
  )
}
