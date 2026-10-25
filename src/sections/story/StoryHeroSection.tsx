import { useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { MaterialIcon } from '../../components/common/MaterialIcon'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  BouncingNumber,
  BookBird,
  MagicalOpenBook,
  NovaCharacter,
} from './StoryCharacters'
import { StoryCloud, StoryHeadline, StoryStar } from './StoryShared'
import { STORY } from './storyTheme'

/*
 * Section 1 — Magical hero: "Every Great Adventure Begins With Curiosity."
 * Layers drift at different depths with the pointer, springing back on leave.
 */

const FLOATERS = [
  { hue: STORY.yellow, x: '6%', y: '20%', size: 74, d: 0 },
  { hue: STORY.sky, x: '86%', y: '14%', size: 88, d: 1.2 },
  { hue: STORY.lavender, x: '90%', y: '58%', size: 96, d: 0.6 },
  { hue: STORY.mint, x: '8%', y: '62%', size: 92, d: 1.8 },
] as const

const HERO_STARS = [
  { className: 'left-[10%] top-[10%] w-4', color: STORY.yellow, delay: 0.2, duration: 3.4 },
  { className: 'left-[46%] top-[6%] w-3', color: '#ffffff', delay: 0.9, duration: 2.8 },
  { className: 'right-[14%] top-[16%] w-5', color: '#ffffff', delay: 1.6, duration: 3.8 },
  { className: 'left-[24%] top-[40%] w-3', color: STORY.yellow, delay: 0.5, duration: 3 },
  { className: 'right-[36%] top-[34%] w-4', color: '#ffffff', delay: 1.2, duration: 3.2 },
  { className: 'left-[4%] top-[58%] w-3', color: STORY.yellow, delay: 2, duration: 4 },
] as const

export function StoryHeroSection() {
  const reducedMotion = useReducedMotion()
  const sceneRef = useRef<HTMLElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 50, damping: 18 })
  const springY = useSpring(rawY, { stiffness: 50, damping: 18 })

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (reducedMotion) return
    const rect = sceneRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
  }

  const handlePointerLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section
      ref={sceneRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Every great adventure begins with curiosity"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #fff9ee 0%, #d8f0fc 34%, #a9e0f8 62%, #ffe4c2 100%)',
      }}
    >
      {/* ---------- Depth layer 1: far sky ---------- */}
      <ParallaxLayer x={springX} y={springY} depth={14} className="pointer-events-none absolute inset-0">
        {HERO_STARS.map((star, i) => (
          <StoryStar
            key={`star-${i}`}
            className={`absolute ${star.className}`}
            color={star.color}
            delay={star.delay}
            duration={star.duration}
          />
        ))}
      </ParallaxLayer>

      {/* ---------- Depth layer 2: clouds ---------- */}
      <ParallaxLayer x={springX} y={springY} depth={26} className="pointer-events-none absolute inset-0">
        <StoryCloud className="absolute left-[4%] top-[12%] w-40 opacity-80" duration={11} />
        <StoryCloud className="absolute right-[10%] top-[8%] w-52 opacity-90" duration={13} delay={2} />
        <StoryCloud className="absolute left-[30%] top-[62%] w-64 opacity-70" duration={15} delay={4} color="#ffe9d2" />
        <StoryCloud className="absolute right-[24%] top-[46%] w-36 opacity-60" duration={12} delay={1} color="#e8dcff" />
      </ParallaxLayer>

      {/* ---------- Colorful geometry floaters ---------- */}
      <ParallaxLayer x={springX} y={springY} depth={38} className="pointer-events-none absolute inset-0">
        {FLOATERS.map((floater, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 60 60"
            className="absolute"
            style={{ left: floater.x, top: floater.y, width: floater.size }}
            animate={reducedMotion ? undefined : { y: [0, -14, 0], rotate: [-6, 6, -6] }}
            transition={{ duration: 5 + i, delay: floater.d, repeat: Infinity, ease: 'easeInOut' }}
          >
            {i % 2 === 0 ? (
              <circle cx="30" cy="30" r="24" fill={floater.hue} opacity="0.85" />
            ) : (
              <rect x="8" y="8" width="44" height="44" rx="14" fill={floater.hue} opacity="0.7" />
            )}
          </motion.svg>
        ))}
        {/* bouncing numbers + book birds */}
        <BouncingNumber value="1" className="absolute left-[18%] top-[26%] w-10" color={STORY.coral} delay={0.2} />
        <BouncingNumber value="7" className="absolute right-[20%] bottom-[30%] w-12" color={STORY.mint} delay={1} />
        <BookBird className="absolute left-[12%] top-[44%] w-16" color={STORY.sky} delay={0.5} />
        <BookBird className="absolute right-[8%] top-[36%] w-20" color={STORY.lavender} delay={1.6} />
      </ParallaxLayer>

      {/* ---------- Hills + foreground ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 190" preserveAspectRatio="none" className="block h-[180px] w-full md:h-[240px]">
          <path d="M0 90 Q240 18 480 84 T960 70 T1440 92 L1440 190 L0 190 Z" fill={STORY.mint} opacity="0.55" />
          <path d="M0 130 Q300 60 620 122 T1040 108 T1440 128 L1440 190 L0 190 Z" fill="#8fd8b6" />
          <path d="M0 158 Q360 96 760 152 T1440 148 L1440 190 L0 190 Z" fill="#6cc89e" />
        </svg>
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto grid w-full max-w-[var(--content-max-width)] grid-cols-1 items-center gap-8 px-margin pb-24 pt-32 md:px-margin-md lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:px-margin-lg">
        <div className="flex flex-col gap-space-md">
          <motion.span
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 font-story-display text-sm font-semibold text-story-midnight shadow-sm backdrop-blur"
            initial={reducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <span className="h-2 w-2 rounded-full bg-story-orange" />
            Chapter One · Our Story
          </motion.span>

          <StoryHeadline
            as="h1"
            text="Every Great Adventure Begins With Curiosity."
            accentWords={['Curiosity']}
            className="text-[clamp(2.6rem,4.8vw,3.5rem)] leading-[1.02] text-story-midnight"
          />

          <motion.p
            className="max-w-xl font-body-lg text-lg leading-relaxed text-story-midnight/70"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            We believe learning should spark imagination, unlock hidden talents, and make every
            child excited to discover what&apos;s possible.
          </motion.p>

          <motion.div
            className="mt-2 flex flex-wrap items-center gap-3"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.75, duration: 0.6 }}
          >
            <motion.a
              href="#story-problem"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-story-orange px-7 py-4 font-story-display text-lg font-bold text-white shadow-[0_10px_28px_rgba(255,138,61,0.45)]"
              whileHover={reducedMotion ? undefined : { scale: 1.05, y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16 }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -skew-x-12 bg-white/25 opacity-0 transition-opacity duration-300 group-hover:animate-pulse group-hover:opacity-100"
              />
              <span className="relative">Explore Our Story</span>
              <MaterialIcon name="auto_stories" className="relative text-[22px]" />
            </motion.a>

            <motion.a
              href="/#explore-pathways"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-story-midnight/10 bg-white/80 px-7 py-4 font-story-display text-lg font-bold text-story-midnight shadow-sm backdrop-blur hover:border-story-orange/40 hover:text-story-orange"
              whileHover={reducedMotion ? undefined : { scale: 1.04, y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16 }}
            >
              Start Your Adventure
              <MaterialIcon
                name="rocket_launch"
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </motion.div>

          {/* scroll hint */}
          <motion.div
            className="mt-10 hidden items-center gap-2 font-story-display text-sm font-semibold text-story-midnight/50 sm:flex"
            animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <MaterialIcon name="keyboard_double_arrow_down" className="text-[20px]" />
            Scroll to open the book
          </motion.div>
        </div>

        {/* Mascot + magic book stage */}
        <div className="relative mx-auto flex w-full max-w-[560px] items-end justify-center">
          <motion.div
            className="relative w-[74%] max-w-[380px]"
            initial={reducedMotion ? false : { opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.2 }}
          >
            <MagicalOpenBook className="h-auto w-full" />
          </motion.div>

          <motion.div
            className="absolute bottom-[-14px] left-[-2%] w-[52%] max-w-[260px]"
            initial={reducedMotion ? false : { x: -70, opacity: 0, scale: 0.7, y: 30 }}
            animate={{ x: 0, opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 11, delay: 0.55 }}
          >
            <NovaCharacter className="h-auto w-full" waving />
          </motion.div>

          {/* orbiting planets around the book */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute"
              style={{ left: `${12 + i * 38}%`, top: `${6 + i * 9}%` }}
              animate={reducedMotion ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 4 + i, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                className="h-9 w-9 rounded-full shadow-md md:h-12 md:w-12"
                style={{
                  backgroundColor: [STORY.lavender, STORY.sky, STORY.yellow][i],
                  boxShadow: `inset -6px -5px 0 rgba(0,0,0,0.08)`,
                }}
              >
                <div
                  className="absolute left-[-7px] top-1/2 h-3 w-10 -translate-y-1/2 rounded-full border-2 md:h-4 md:w-14"
                  style={{ borderColor: 'rgba(255,217,90,0.75)', transform: 'rotate(-16deg)' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** One parallax depth wrapper: translates with the shared springs. */
function ParallaxLayer({
  x,
  y,
  depth,
  className,
  children,
}: {
  x: ReturnType<typeof useSpring>
  y: ReturnType<typeof useSpring>
  depth: number
  className?: string
  children: React.ReactNode
}) {
  const tx = useTransform(x, [-1, 1], [-depth, depth])
  const ty = useTransform(y, [-1, 1], [-depth * 0.6, depth * 0.6])

  return (
    <motion.div className={className} style={{ x: tx, y: ty }}>
      {children}
    </motion.div>
  )
}
