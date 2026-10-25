import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { headerNavLinks } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useAmbientSound } from '../../hooks/useAmbientSound'
import { cn } from '../../utils/cn'
import { MaterialIcon } from '../common/MaterialIcon'
import { MobileNavigation } from './MobileNavigation'

/**
 * Fixed 80px editorial header: brand, desktop pill navigation, ambient
 * "Focus Sound" toggle, primary pathway CTA and mobile menu control.
 * Shared by the home page and standalone pages (e.g. /our-story).
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection()
  const { enabled: soundOn, toggle: toggleSound } = useAmbientSound()
  const { pathname } = useLocation()
  // Away from the home page, anchors must point back to "/#section".
  const home = pathname === '/'
  const anchorPrefix = home ? '' : '/'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(24,27,32,0.04)]">
      <div className="h-20 w-full mx-auto max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <a
            href={home ? '#ecosystem' : '/#ecosystem'}
            className="flex items-center gap-space-xs group"
            aria-label="Studytainment — home"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container shadow-[0_0_10px_#ff5733] transition-transform duration-300 group-hover:scale-125" />
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight group-hover:text-primary transition-colors">
              Studytainment
            </span>
          </a>
        </div>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-space-xs p-space-xs bg-surface-container-low/60 rounded-xl"
        >
          {headerNavLinks.map((link) => {
            const isActive = link.route
              ? pathname === link.route
              : home && activeSection === link.sectionId
            return (
              <a
                key={link.label}
                href={link.route ?? `${anchorPrefix}#${link.sectionId}`}
                aria-current={isActive ? 'page' : undefined}
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
        </nav>

        <div className="flex items-center gap-space-md">
          <button
            type="button"
            aria-pressed={soundOn}
            onClick={toggleSound}
            className={cn(
              'hidden sm:flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all group',
              soundOn && 'bg-surface-container-high text-on-surface ring-1 ring-tertiary-container',
            )}
          >
            <MaterialIcon
              name="graphic_eq"
              filled={soundOn}
              className="text-[20px] text-tertiary group-hover:scale-110 transition-transform"
            />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">
              Focus Sound
            </span>
          </button>

          <a
            href={home ? '#explore-pathways' : '/#explore-pathways'}
            className="hidden md:inline-flex items-center justify-center px-space-lg py-space-sm bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm hover:shadow-md transition-all active:translate-y-0.5"
          >
            Explore Pathways
          </a>

          {/* <a
            href="#explore-pathways"
            aria-label="Your learning profile"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm cursor-pointer hover:ring-2 hover:ring-primary-container transition-all"
          >
            <MaterialIcon name="person" className="text-on-primary text-[18px]" />
          </a> */}

          <button
            type="button"
            className="lg:hidden w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MaterialIcon name={menuOpen ? 'close' : 'menu'} className="text-[22px]" />
          </button>
        </div>
      </div>

      <MobileNavigation
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={activeSection}
        onHome={home}
      />
    </header>
  )
}
