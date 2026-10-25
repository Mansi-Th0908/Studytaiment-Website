import { useId, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../utils/cn'
import { STORY } from './storyTheme'

/* Shared springy-transition presets. */
const STORY_VIEWPORT = { once: true, amount: 0.15 } as const

/**
 * Scroll-triggered reveal used across story sections. Respects reduced motion
 * by rendering fully visible content immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
  from = 'left',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  from?: 'left' | 'right' | 'up'
}) {
  const reducedMotion = useReducedMotion()
  const start =
    from === 'up' ? { opacity: 0, y } : { opacity: 0, x: from === 'left' ? -y : y, y: 12 }

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={start}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={STORY_VIEWPORT}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/** A tiny word of a staggered headline. */
function HeadlineWord({
  text,
  order,
  accent,
  reducedMotion,
}: {
  text: string
  order: number
  accent?: boolean
  reducedMotion: boolean
}) {
  return (
    <motion.span
      className="inline-block"
      style={{ transformPerspective: 700, transformOrigin: '50% 100%' }}
      initial={reducedMotion ? false : { opacity: 0, y: 54, rotateX: -70 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={STORY_VIEWPORT}
      transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.08 * order }}
    >
      {accent ? (
        <span
          className="inline-block px-1 font-[inherit]"
          style={{ color: STORY.coral, fontStyle: 'normal' }}
        >
          {text}
        </span>
      ) : (
        text
      )}
    </motion.span>
  )
}

/**
 * Headline that springs in word by word while entering the viewport.
 */
export function StoryHeadline({
  text,
  className,
  as: Tag = 'h2',
  accentWords = [],
}: {
  text: string
  className?: string
  as?: 'h1' | 'h2'
  /** Words rendered in the brand coral accent. */
  accentWords?: ReadonlyArray<string>
}) {
  const reducedMotion = useReducedMotion()
  const words = text.split(' ')

  let order = 0
  return (
    <Tag
      className={cn('font-story-display font-bold tracking-tight whitespace-pre-wrap', className)}
    >
      {words.map((word) => {
        const currentOrder = order++
        const clean = word.replace(/[.,!?]/g, '')
        return (
          <span key={`${word}-${currentOrder}`} className="inline-block">
            <HeadlineWord
              text={word}
              order={currentOrder}
              accent={accentWords.includes(clean)}
              reducedMotion={reducedMotion}
            />{' '}
          </span>
        )
      })}
    </Tag>
  )
}

/** Five-point star used as a floating decoration. */
export function StoryStar({
  className,
  color = STORY.yellow,
  delay = 0,
  duration = 3.4,
  twinkle = true,
}: {
  className?: string
  color?: string
  delay?: number
  duration?: number
  twinkle?: boolean
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('pointer-events-none select-none', className)}
      animate={
        reducedMotion || !twinkle
          ? undefined
          : { opacity: [0.35, 1, 0.35], scale: [0.85, 1.08, 0.85], rotate: [0, 12, 0] }
      }
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path
        d="M12 2l2.7 5.9 6.3.7-4.7 4.3 1.3 6.2L12 15.9 6.4 19.1l1.3-6.2L3 8.6l6.3-.7L12 2z"
        fill={color}
      />
    </motion.svg>
  )
}

/** Soft rounded cloud with subtle drift, for scene backdrops. */
export function StoryCloud({
  className,
  color = '#ffffff',
  duration = 9,
  delay = 0,
  drift = 26,
}: {
  className?: string
  color?: string
  duration?: number
  delay?: number
  drift?: number
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 120 56"
      aria-hidden="true"
      className={cn('pointer-events-none select-none', className)}
      animate={reducedMotion ? undefined : { x: [-drift, drift, -drift] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <g fill={color}>
        <ellipse cx="38" cy="38" rx="26" ry="15" />
        <ellipse cx="66" cy="30" rx="22" ry="18" />
        <ellipse cx="92" cy="39" rx="22" ry="13" />
        <rect x="20" y="30" width="80" height="22" rx="11" />
      </g>
    </motion.svg>
  )
}

/** Organic background blob. */
export function StoryBlob({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={cn('pointer-events-none', className)}>
      <path
        fill={color}
        d="M42.9,-65.2C56.7,-58.1,69.8,-47.7,76.4,-34C83,-20.3,83.2,-3.3,78.7,11.9C74.1,27.2,64.9,40.8,52.7,49.6C40.4,58.5,25.2,62.5,9.2,66.1C-6.8,69.7,-23.6,72.9,-37.3,67C-51,61.1,-61.6,46.2,-68.4,30C-75.2,13.8,-78.2,-3.7,-73.5,-19C-68.9,-34.3,-56.6,-47.4,-42.5,-54.7C-28.4,-62,-14.2,-63.5,0.8,-64.6C15.7,-65.7,31.4,-66.4,42.9,-65.2Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

/** Hand-drawn squiggle accent line. */
export function StorySquiggle({
  className,
  color = STORY.yellow,
}: {
  className?: string
  color?: string
}) {
  return (
    <svg
      viewBox="0 0 220 18"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn('pointer-events-none', className)}
    >
      <path
        d="M4 12 C 34 2, 66 16, 98 8 S 156 2, 216 10"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Illustrated section divider: rolling hills with a wandering dashed trail. */
export function StoryDivider({
  className,
  topColor = STORY.cream,
  bottomColor = '#ffffff',
  flip = false,
}: {
  className?: string
  topColor?: string
  bottomColor?: string
  flip?: boolean
}) {
  const pathId = useId()

  return (
    <div
      aria-hidden="true"
      className={cn('relative w-full overflow-hidden leading-none', className)}
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="block h-[70px] w-full">
        <path
          d="M0 46 C 180 10, 360 78, 560 44 S 900 4, 1100 42 S 1330 72, 1440 40 L 1440 90 L 0 90 Z"
          fill={bottomColor}
        />
        <path
          d="M0 48 C 180 12, 360 80, 560 46 S 900 6, 1100 44 S 1330 74, 1440 42"
          fill="none"
          stroke={topColor}
          strokeWidth="0"
        />
        <path
          d="M0 46 C 180 10, 360 78, 560 44 S 900 4, 1100 42 S 1330 72, 1440 40"
          fill="none"
          stroke={STORY.orange}
          strokeOpacity="0.35"
          strokeWidth="3"
          strokeDasharray="1 14"
          strokeLinecap="round"
        />
        <circle cx="720" cy="60" r="10" fill={STORY.yellow} />
        <circle cx="240" cy="26" r="6" fill={STORY.sky} />
        <circle cx="1180" cy="24" r="6" fill={STORY.lavender} />
      </svg>
      <span className="sr-only">{pathId}</span>
    </div>
  )
}

/** Small rounded pill label used as story section eyebrows. */
export function StoryPill({
  children,
  color = STORY.lavender,
  className,
}: {
  children: ReactNode
  color?: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5 font-story-display text-sm font-semibold tracking-wide text-white shadow-sm',
        className,
      )}
      style={{ backgroundColor: color }}
    >
      <motion.span
        aria-hidden="true"
        className="h-2 w-2 rounded-full bg-white/90"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {children}
    </span>
  )
}
