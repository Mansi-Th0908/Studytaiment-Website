import { useEffect, useState } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Tracks the user's reduced-motion preference reactively,
 * so animation systems can disable themselves at runtime.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window === 'undefined' ? false : window.matchMedia(REDUCED_MOTION_QUERY).matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return reduced
}
