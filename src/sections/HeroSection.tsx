import { motion } from 'framer-motion'
import { ThreeScene } from '../components/animations/ThreeScene'
import { Button } from '../components/common/Button'
import { MaterialIcon } from '../components/common/MaterialIcon'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface HeroSectionProps {
  onOpenTour: () => void
}

const HERO_FOOTNOTES: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'Ages 3–30', label: 'Continuous Architecture' },
  { value: '0% Stress', label: 'Somatic Intrinsic Flow' },
  { value: '42 Nations', label: 'Synchronous Guilds' },
]

/**
 * Interactive hero: managed 3D layer behind the editorial content cluster,
 * with entrance animation, live telemetry chip and conversion actions.
 */
export function HeroSection({ onOpenTour }: HeroSectionProps) {
  const reducedMotion = useReducedMotion()

  const content = (
    <div className="flex flex-col gap-space-md">
      <div className="inline-flex items-center gap-space-xs self-start px-space-md py-1 bg-surface-container-lowest/90 backdrop-blur-sm rounded-full shadow-sm">
        <span aria-hidden="true" className="w-2 h-2 rounded-full bg-primary-container animate-ping" />
        <span className="font-label-md text-label-md text-on-surface-variant tracking-wide font-medium">
          4.98 Rating • 180k+ Active Learners • 94% Retention
        </span>
      </div>

      <h1 className="font-display text-display-mobile md:text-display text-on-surface tracking-tight leading-[1.12]">
        Learning Should{' '}
        <span className="inline-block relative px-space-xs my-1 bg-primary-container text-on-primary rounded-lg shadow-sm transform -rotate-1">
          Never Feel
        </span>{' '}
        <br className="hidden sm:inline" />
        Like a Burden.
      </h1>

      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl font-normal leading-relaxed">
        Where playful curiosity sparks lifelong mastery. Reimagining human growth from early
        childhood wonder to executive leadership across ages 3 to 30 with sensory-grounded,
        stress-free pedagogy.
      </p>

      <div className="flex flex-wrap items-center gap-space-sm sm:gap-space-md pt-space-xs">
        <a
          className="group inline-flex items-center gap-space-sm px-space-lg md:px-space-xl py-space-md bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-xl shadow-md transition-all active:scale-95"
          href="#3-30-continuum"
        >
          <span>Begin Your Journey</span>
          <MaterialIcon
            name="arrow_forward"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
        <Button
          variant="surface"
          size="lg"
          onClick={onOpenTour}
          className="px-space-lg py-space-md"
          aria-haspopup="dialog"
        >
          <MaterialIcon name="play_circle" filled className="text-primary-container text-[20px]" />
          <span>Explore 3D Artifacts</span>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-space-sm md:gap-space-md pt-space-sm md:pt-space-md border-t border-outline-variant/40">
        {HERO_FOOTNOTES.map((footnote) => (
          <div key={footnote.value} className="flex flex-col">
            <span className="font-title text-title text-on-surface font-bold">{footnote.value}</span>
            <span className="font-label-md text-label-md text-on-surface-variant">
              {footnote.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section
      id="ecosystem"
      className="relative w-full min-h-[calc(100svh-var(--header-height))] flex items-center overflow-hidden scroll-mt-[var(--header-height)] pt-[calc(var(--header-height)+var(--spacing-space-md))] pb-space-lg md:pt-[calc(var(--header-height)+var(--spacing-space-lg))] md:pb-space-xl"
    >
      {/* 3D Three.js scene layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <ThreeScene />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-surface via-surface/85 to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent pointer-events-none"
        />
      </div>

      {/* Shared container: keep these classes identical to your Header / other sections */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        <div className="max-w-[760px] flex flex-col">
          {reducedMotion ? (
            content
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              {content}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}