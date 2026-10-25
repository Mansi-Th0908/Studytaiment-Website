import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { useReducedMotion } from '../../hooks/useReducedMotion'
import {
  BookBird,
  BouncingNumber,
  ChildAtDesk,
  NovaCharacter,
} from './StoryCharacters'
import { StoryHeadline, StoryPill } from './StoryShared'
import { STORY } from './storyTheme'

const VIEWPORT = { once: true, amount: 0.15 } as const

const COLORS = [
  STORY.yellow,
  STORY.coral,
  STORY.sky,
  STORY.lavender,
]

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: `particle-${i}`,
  left: `${(i * 47 + 9) % 96}%`,
  top: `${(i * 31 + 7) % 82}%`,
  size: 4 + ((i * 7) % 6),
  delay: (i % 5) * 0.25,
  duration: 2.5 + (i % 4) * 0.5,
}))

export function StoryProblemSection() {
  const reducedMotion = useReducedMotion()
  const sceneRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ['start 0.95', 'end 0.4'],
  })

  // Scroll Transforms
  const grayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8],
    [1, 0.45, 0.08]
  )

  const grayY = useTransform(scrollYProgress, [0, 1], [0, 25])

  const wonderY = useTransform(
    scrollYProgress,
    [0, 0.6],
    [45, 0]
  )

  const wonderOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.65],
    [0, 0.7, 1]
  )

  const wonderScale = useTransform(
    scrollYProgress,
    [0, 0.65],
    [0.94, 1]
  )

  const background = useTransform(
    scrollYProgress,
    [0, 0.55],
    ['#e7e9ef', '#b8f0dc']
  )

  return (
    <section
      id="story-problem"
      className="relative isolate overflow-hidden py-6 md:py-9"
    >
      {/* Background Gradient & Color Transition */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 transition-colors"
        style={{
          backgroundColor: reducedMotion ? '#b8f0dc' : background,
        }}
      />

      {/* Decorative Glow Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-16 -z-10 h-56 w-56 rounded-full blur-3xl md:h-72 md:w-72"
        style={{ backgroundColor: STORY.sky, opacity: 0.2 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/3 -z-10 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: STORY.yellow, opacity: 0.2 }}
      />

      {/* Section Header */}
      <div className="mx-auto flex max-w-[var(--content-max-width)] flex-col items-start gap-1 px-margin md:px-margin-md lg:px-margin-lg">
        <motion.span
          className="rounded-full border border-white/70 bg-white/75 px-3 py-1 font-story-display text-xs font-bold shadow-sm"
          style={{ color: STORY.midnight }}
          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.45 }}
        >
          Chapter Two · The Why
        </motion.span>

        <StoryHeadline
          text="Learning Was Never Meant to Be Boring."
          accentWords={['Boring']}
          className="max-w-3xl text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.05]"
        />

        <motion.p
          className="max-w-2xl text-sm leading-relaxed text-[#4a4f5e] md:text-base"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Somewhere along the way, curiosity became memorization,
          questions became pressure, and discovering something new
          started feeling like a chore. We imagined something different.
        </motion.p>
      </div>

      {/* Interactive Transformation Scene */}
      <div
        ref={sceneRef}
        className="mx-auto mt-2 w-full max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg"
      >
        <div className="relative h-[275px] min-[420px]:h-[315px] sm:h-[340px] md:h-[410px]">
          {/* Accessible Screen Reader Context */}
          <span className="sr-only">
            Visual comparison showing a transformation from traditional, repetitive routine learning to an engaging, interactive experience with characters and playfulness.
          </span>

          {/* Background Orbit Rings */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50 md:h-80 md:w-80"
            style={{ scale: wonderScale }}
          />

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/80 md:h-64 md:w-64 will-change-transform"
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* State 1: Traditional Routine Learning (Grayscale) */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center will-change-[opacity,transform]"
            style={{
              opacity: reducedMotion ? 1 : grayOpacity,
              y: reducedMotion ? 0 : grayY,
              filter: 'grayscale(0.75)',
            }}
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#666a75] px-3 py-1 font-story-display text-[11px] font-semibold text-white shadow sm:text-xs">
              Same routine · every day
            </span>

            <motion.div
              className="flex h-full w-full items-end justify-center"
              animate={reducedMotion ? undefined : { y: [0, 3, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ChildAtDesk className="h-auto max-h-[250px] w-auto max-w-[75%] drop-shadow-md sm:max-h-[300px] md:max-h-[370px]" />
            </motion.div>
          </motion.div>

          {/* State 2: Playful Interactive Learning */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center will-change-[opacity,transform]"
            style={{
              opacity: reducedMotion ? 1 : wonderOpacity,
              y: reducedMotion ? 0 : wonderY,
              scale: reducedMotion ? 1 : wonderScale,
            }}
          >
            {/* Soft Central Glow */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[5%] left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-2xl md:h-64 md:w-64"
              style={{
                background: `radial-gradient(circle, ${STORY.yellow}88, ${STORY.sky}44, transparent 72%)`,
              }}
              animate={
                reducedMotion
                  ? undefined
                  : { scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.8, 0.4] }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/70 bg-story-mint px-3 py-1 font-story-display text-[11px] font-bold text-white shadow sm:text-xs">
              A whole new feeling ✨
            </span>

            {/* Floating Sparkle Particles */}
            {PARTICLES.map((particle, i) => (
              <motion.span
                key={particle.id}
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full will-change-transform"
                style={{
                  left: particle.left,
                  top: particle.top,
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: COLORS[i % COLORS.length],
                  boxShadow: `0 0 8px ${COLORS[i % COLORS.length]}`,
                }}
                animate={
                  reducedMotion
                    ? undefined
                    : {
                      y: [0, -12, 5, 0],
                      opacity: [0.35, 1, 0.5, 0.35],
                    }
                }
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}

            {/* Learning Feature Card */}
            <motion.div
              className="absolute right-0 top-[20%] z-0 w-[31%] max-w-[150px] overflow-hidden rounded-xl border-[3px] border-white shadow-lg sm:right-[3%] sm:max-w-[190px] md:right-[7%] md:max-w-[220px]"
              initial={reducedMotion ? false : { opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <motion.img
                src="/images/learning-wonder.png"
                alt="Colorful playful learning and discovery illustration"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Main Nova Character */}
            <motion.div
              className="relative z-10 w-[43%] max-w-[205px] sm:w-[42%] md:max-w-[245px]"
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, y: 20, scale: 0.92 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={VIEWPORT}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
            >
              <motion.div
                animate={
                  reducedMotion
                    ? undefined
                    : { rotate: [0, 1, 0, -1, 0] }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <NovaCharacter className="h-auto w-full drop-shadow-xl" />
              </motion.div>
            </motion.div>

            {/* Floating Character Elements */}
            <motion.div
              className="absolute left-0 top-[20%] z-20 w-12 sm:left-[3%] sm:w-16 md:w-20"
              animate={
                reducedMotion
                  ? undefined
                  : { y: [0, -10, 0], rotate: [-5, 5, -5] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <BookBird color={STORY.orange} delay={0.3} />
            </motion.div>

            <motion.div
              className="absolute left-[23%] top-[12%] z-20 w-7 sm:w-9"
              animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <BouncingNumber value="2" color={STORY.sky} />
            </motion.div>

            <motion.div
              className="absolute right-[8%] top-[43%] z-20 hidden w-9 sm:block"
              animate={
                reducedMotion
                  ? undefined
                  : { y: [0, 9, 0], rotate: [5, -5, 5] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <BouncingNumber value="×" color={STORY.yellow} />
            </motion.div>
          </motion.div>
        </div>

        {/* Comparison Summary Cards */}
        <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <motion.div
            className="rounded-2xl border border-white/70 bg-white/65 p-3 shadow-sm backdrop-blur-sm sm:p-4"
            initial={reducedMotion ? false : { opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5 }}
            whileHover={reducedMotion ? undefined : { y: -2 }}
          >
            <StoryPill color="#6b7080">Before</StoryPill>
            <p className="mt-1.5 font-story-display text-sm font-semibold leading-snug text-[#3f4450] sm:text-base">
              Long worksheets, tall book towers and quiet
              “get it done” afternoons.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-white/80 bg-white/75 p-3 shadow-sm backdrop-blur-sm sm:p-4"
            initial={reducedMotion ? false : { opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={reducedMotion ? undefined : { y: -2 }}
          >
            <StoryPill color={STORY.mint}>After</StoryPill>
            <p className="mt-1.5 font-story-display text-sm font-semibold leading-snug text-story-midnight sm:text-base">
              Stories, playful numbers and flying ideas — the same
              child, wide awake with wonder.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}