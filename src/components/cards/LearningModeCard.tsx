import type { Accent, LearningMode } from '../../types'
import { MaterialIcon } from '../common/MaterialIcon'
import { TiltCard } from '../animations/TiltCard'

interface AccentStyle {
  iconBox: string
  tagChip: string
  titleHover: string
  arrow: string
}

const ACCENT_STYLES: Record<Accent, AccentStyle> = {
  coral: {
    iconBox: 'bg-primary-fixed text-primary',
    tagChip: 'bg-tertiary-fixed text-on-tertiary-fixed',
    titleHover: 'group-hover:text-primary',
    arrow: 'text-primary-container',
  },
  gold: {
    iconBox: 'bg-secondary-fixed text-secondary',
    tagChip: 'bg-secondary-fixed-dim text-on-secondary-fixed',
    titleHover: 'group-hover:text-secondary',
    arrow: 'text-secondary',
  },
  green: {
    iconBox: 'bg-tertiary-fixed text-tertiary',
    tagChip: 'bg-tertiary-fixed text-on-tertiary-fixed',
    titleHover: 'group-hover:text-tertiary',
    arrow: 'text-tertiary',
  },
  'deep-coral': {
    iconBox: 'bg-primary-fixed-dim text-primary',
    tagChip: 'bg-primary-fixed text-on-primary-fixed',
    titleHover: 'group-hover:text-primary',
    arrow: 'text-primary',
  },
  ink: {
    iconBox: 'bg-surface-container-high text-on-surface',
    tagChip: 'bg-surface-container-high text-on-surface',
    titleHover: 'group-hover:text-on-surface',
    arrow: 'text-on-surface',
  },
}

/**
 * One of the four interlocking modes of mastery. The card tilts in 3D on
 * pointer hover; it performs no action, so it stays a non-interactive element.
 */
export function LearningModeCard({ mode }: { mode: LearningMode }) {
  const accent = ACCENT_STYLES[mode.accent]

  return (
    <TiltCard cursorTarget={false} className="group relative bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm hover:shadow-xl">
      <div className="flex flex-col gap-space-md">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${accent.iconBox}`}>
          <MaterialIcon name={mode.icon} className="text-[28px]" />
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm">
            {mode.ageRange}
          </span>
          <span
            className={`px-space-xs py-0.5 rounded font-label-sm text-label-sm ${accent.tagChip}`}
          >
            {mode.tag}
          </span>
        </div>
        <h3 className={`font-title text-title text-on-surface transition-colors ${accent.titleHover}`}>
          {mode.title}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{mode.description}</p>
      </div>
      <div className="pt-space-md flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-on-surface-variant">{mode.footerText}</span>
        <MaterialIcon
          name="arrow_forward"
          className={`group-hover:translate-x-1 transition-transform ${accent.arrow}`}
        />
      </div>
    </TiltCard>
  )
}
