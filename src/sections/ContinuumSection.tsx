import { useCallback, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AnimatedSection } from '../components/animations/AnimatedSection'
import { MaterialIcon } from '../components/common/MaterialIcon'
import { learningStages } from '../data/learningStages'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { Accent } from '../types'
import { cn } from '../utils/cn'

/** Per-stage accent classes for the ring visualization (static, so Tailwind can generate them). */
const ACCENT_GLOW_CLASSES: Record<Accent, string> = {
  coral: 'bg-primary-fixed',
  gold: 'bg-secondary-fixed',
  green: 'bg-tertiary-fixed',
  'deep-coral': 'bg-primary-fixed-dim',
  ink: 'bg-surface-container-high',
}

const ACCENT_ARC_CLASSES: Record<Accent, string> = {
  coral: 'text-primary-container',
  gold: 'text-secondary-container',
  green: 'text-tertiary-container',
  'deep-coral': 'text-primary',
  ink: 'text-on-surface',
}

const STAGE_ACCENT_NODE_CLASSES: Record<Accent, string> = {
  coral: 'fill-primary',
  gold: 'fill-secondary-container',
  green: 'fill-tertiary-container',
  'deep-coral': 'fill-primary-container',
  ink: 'fill-inverse-surface',
}

const INACTIVE_STAGE_CLASS =
  'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/70 transition-colors'

/** Stage markers sit evenly around the ring, starting at the top (12 o'clock). */
const RING_RADIUS = 86
const STAGE_NODE_POSITIONS = learningStages.map((_, index) => {
  const angle = ((-90 + (360 / learningStages.length) * index) * Math.PI) / 180
  return { cx: 100 + RING_RADIUS * Math.cos(angle), cy: 100 + RING_RADIUS * Math.sin(angle) }
})

/** Narrative reveal: the whole column exits upward while children cascade in. */
const narrativeContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
  exit: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.2,
      ease: 'easeIn' as const,
      staggerChildren: 0.035,
      staggerDirection: -1,
    },
  },
}
const narrativeItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: 'easeIn' as const } },
}

/**
 * Cinematic continuum scrubber: five keyboard-accessible stage tabs with a
 * sliding glow pill and progress rail drive a single stage viewer — staggered
 * narrative on the left, an animated arc-gauge dial on the right.
 */
export function ContinuumSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const stage = learningStages[activeIndex]
  // Arc spans to the start of the next milestone, matching the pill rail fill below.
  const arcProgress = (activeIndex + 1) / learningStages.length

  // Arrow-key roving traversal for the tablist.
  const handleTablistKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      let nextIndex: number | null = null
      if (event.key === 'ArrowRight') nextIndex = (activeIndex + 1) % learningStages.length
      else if (event.key === 'ArrowLeft')
        nextIndex = (activeIndex - 1 + learningStages.length) % learningStages.length
      else if (event.key === 'Home') nextIndex = 0
      else if (event.key === 'End') nextIndex = learningStages.length - 1
      if (nextIndex !== null) {
        event.preventDefault()
        setActiveIndex(nextIndex)
        document.getElementById(`stage-tab-${learningStages[nextIndex].number}`)?.focus()
      }
    },
    [activeIndex],
  )

  return (
    <section id="3-30-continuum" className="w-full bg-surface-container-low py-margin-lg scroll-mt-[var(--header-height)]">
      <div className="max-w-[var(--content-max-width)] mx-auto px-margin md:px-margin-md lg:px-margin-lg flex flex-col gap-space-xl">
        <AnimatedSection className="flex flex-col items-center text-center gap-space-xs max-w-2xl mx-auto">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
            The 3 to 30 Evolutionary Arc
          </span>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
            One Seamless Continuum of Human Growth
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Traditional education cuts learners into fractured silos. Studytainment anchors
            continuous cognitive expansion with zero cliff-edges.
          </p>
        </AnimatedSection>

        {/* Scrubber stage navigation pills with sliding glow + progress rail */}
        <AnimatedSection delay={0.05}>
          <div
            role="tablist"
            aria-label="Continuum stages"
            onKeyDown={handleTablistKeyDown}
            className="flex flex-wrap items-start justify-center gap-space-xs p-space-xs bg-surface-container-lowest rounded-2xl shadow-sm max-w-3xl mx-auto"
          >
            {learningStages.map((stageOption, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={stageOption.number}
                  id={`stage-tab-${stageOption.number}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls="stage-viewer"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'relative px-space-md py-space-xs rounded-xl font-label-lg text-label-lg transition-colors st-stage-btn',
                    isActive ? 'text-on-primary' : INACTIVE_STAGE_CLASS,
                  )}
                >
                  {isActive && (
                    <motion.span
                      aria-hidden="true"
                      layoutId={reducedMotion ? undefined : 'stage-pill-glow'}
                      transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                      className="absolute inset-0 rounded-xl bg-primary-container shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{stageOption.label}</span>
                </button>
              )
            })}
            <div
              aria-hidden="true"
              className="relative h-1 w-full mx-space-xs rounded-full bg-surface-container-high overflow-hidden"
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-primary-container via-primary to-secondary-container"
                initial={false}
                animate={{ width: `${((activeIndex + 1) / learningStages.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Interactive stage viewer display */}
        <div
          id="stage-viewer"
          role="tabpanel"
          aria-labelledby={`stage-tab-${stage.number}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center bg-surface-container-lowest rounded-2xl p-space-lg sm:p-space-xl shadow-md min-h-[440px]"
        >
          {/* Left: stage editorial narrative (staggered reveal) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.number}
                variants={narrativeContainer}
                initial={reducedMotion ? 'visible' : 'hidden'}
                animate="visible"
                exit={reducedMotion ? undefined : 'exit'}
                className="flex flex-col gap-space-md"
              >
                <motion.div variants={narrativeItem} className="flex items-center gap-space-sm">
                  <span className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center font-title text-title text-primary font-bold">
                    {stage.number}
                  </span>
                  <span className="font-label-lg text-label-lg text-primary font-bold">
                    {stage.ageRange}
                  </span>
                </motion.div>
                <motion.h3
                  variants={narrativeItem}
                  className="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface tracking-tight"
                >
                  {stage.title}
                </motion.h3>
                <motion.p
                  variants={narrativeItem}
                  className="font-body-md text-body-md text-on-surface-variant leading-relaxed"
                >
                  {stage.description}
                </motion.p>
                <motion.div
                  variants={narrativeItem}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs"
                >
                  <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Core Modality
                    </span>
                    <span className="font-title text-title text-on-surface">{stage.modality}</span>
                  </div>
                  <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Cognitive Keystone
                    </span>
                    <span className="font-title text-title text-on-surface">{stage.keystone}</span>
                  </div>
                </motion.div>
                <motion.div
                  variants={narrativeItem}
                  className="p-space-md bg-secondary-fixed/30 rounded-xl flex items-start gap-space-sm mt-space-xs"
                >
                  <MaterialIcon name="format_quote" className="text-secondary text-[24px]" />
                  <p className="font-body-sm text-body-sm italic text-on-surface">
                    “{stage.quote}”
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: arc-gauge dial with stage markers and orbiting satellites */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[360px] bg-surface-container-low rounded-2xl flex items-center justify-center overflow-hidden shadow-inner">
              {/* Accent glow that shifts with the active stage */}
              <div
                aria-hidden="true"
                className={cn(
                  'absolute w-64 h-64 rounded-full blur-3xl opacity-70 transition-colors duration-700',
                  ACCENT_GLOW_CLASSES[stage.accent],
                )}
              />

              {/* Orbiting satellite tracks */}
              <div
                aria-hidden="true"
                className="absolute inset-[8%] animate-[dial-spin_28s_linear_infinite]"
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary-fixed shadow-[0_0_10px_#ffb4a4]" />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-[2%] animate-[dial-spin_44s_linear_infinite_reverse]"
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-secondary-fixed-dim shadow-[0_0_8px_#f7bd4b]" />
              </div>

              {/* Ring, animated progress arc and stage markers */}
              <svg
                viewBox="0 0 200 200"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full animate-[dial-spin_60s_linear_infinite]"
              >
                <circle
                  cx="100"
                  cy="100"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="3 7"
                  className="text-surface-container-high"
                />
              </svg>
              <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 w-full h-full">
                <motion.circle
                  cx="100"
                  cy="100"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="currentColor"
                  transform="rotate(-90 100 100)"
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeLinecap="round"
                  strokeWidth="4"
                  className={cn(ACCENT_ARC_CLASSES[stage.accent], 'transition-colors duration-500')}
                  initial={{ strokeDashoffset: reducedMotion ? 1 - arcProgress : 1 }}
                  animate={{ strokeDashoffset: 1 - arcProgress }}
                  transition={{ type: 'spring', stiffness: 80, damping: 22 }}
                />
                {STAGE_NODE_POSITIONS.map((position, index) => {
                  const isActiveNode = index === activeIndex
                  const accent = learningStages[index].accent
                  return (
                    <g key={index} className="transition-all duration-500">
                      {isActiveNode && (
                        <circle
                          cx={position.cx}
                          cy={position.cy}
                          r="13"
                          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                          className={cn(
                            STAGE_ACCENT_NODE_CLASSES[accent],
                            'opacity-30 animate-ping origin-center',
                          )}
                        />
                      )}
                      <circle
                        cx={position.cx}
                        cy={position.cy}
                        r={isActiveNode ? 8 : 5}
                        className={cn(
                          STAGE_ACCENT_NODE_CLASSES[accent],
                          isActiveNode ? 'stroke-surface-container-low' : 'opacity-50',
                          'transition-all duration-500',
                        )}
                        strokeWidth="3"
                      />
                    </g>
                  )
                })}
              </svg>

              {/* Center: animated stage counter */}
              <div className="relative flex flex-col items-center justify-center text-center">
                <motion.span
                  key={`num-${stage.number}`}
                  initial={reducedMotion ? false : { opacity: 0, scale: 0.55 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  className="font-display text-[64px] leading-none font-bold text-on-surface tabular-nums"
                >
                  {String(stage.number).padStart(2, '0')}
                </motion.span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mt-space-xs">
                  Ages 3–30 Arc
                </span>
              </div>

              {/* Retention chip */}
              <div className="absolute bottom-space-sm left-space-md right-space-md bg-surface-container-lowest/90 backdrop-blur-sm p-space-xs rounded-lg flex items-center justify-between gap-space-xs text-label-sm font-label-sm">
                <span className="text-on-surface-variant">Cognitive Retention Matrix</span>
                <span className="text-tertiary font-bold">+94.6%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
