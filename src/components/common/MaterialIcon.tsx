import { cn } from '../../utils/cn'

interface MaterialIconProps {
  /** Material Symbols ligature name, e.g. "arrow_forward". */
  name: string
  className?: string
  /** Render the filled variation of the icon. */
  filled?: boolean
}

/**
 * Material Symbols interface icon, matching the original icon system.
 */
export function MaterialIcon({ name, className, filled = false }: MaterialIconProps) {
  return (
    <span
      className={cn('material-symbols-outlined select-none', className)}
      style={
        filled ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" } : undefined
      }
      aria-hidden="true"
    >
      {name}
    </span>
  )
}
