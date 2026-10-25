import { useEffect, useState } from 'react'
import { headerSectionIds } from '../data/navigation'
import type { SectionId } from '../types'

const NAV_SECTION_IDS = headerSectionIds

/**
 * Determines which navigation section is currently in view based on scroll
 * position, accounting for the fixed header offset. Updates are rAF-throttled
 * and listeners are passive + cleaned up.
 */
export function useActiveSection(offset = 140): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>('ecosystem')

  useEffect(() => {
    let frame = 0

    const updateActiveSection = () => {
      frame = 0

      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

      if (nearBottom) {
        setActiveSection('explore-pathways')
        return
      }

      let current: SectionId = 'ecosystem'
      for (const id of NAV_SECTION_IDS) {
        const element = document.getElementById(id)
        if (!element) continue
        if (element.getBoundingClientRect().top <= offset) {
          current = id
        }
      }
      setActiveSection(current)
    }

    const requestUpdate = () => {
      if (frame === 0) {
        frame = requestAnimationFrame(updateActiveSection)
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate, { passive: true })

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame !== 0) cancelAnimationFrame(frame)
    }
  }, [offset])

  return activeSection
}
