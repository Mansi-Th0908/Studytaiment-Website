import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { NovaCharacter } from '../story/StoryCharacters'
import { StoryCloud, StoryStar } from '../story/StoryShared'
import { STORY } from '../story/storyTheme'
import { TeenExplorer, YoungAdult } from './OpaCharacters'

/*
 * Own Pace Academy hero — "Your Pace. Your Potential."
 * A three-stage journey strip: childhood discovery, teenage exploration and
 * the career horizon, connected by a path that draws itself on load.
 */

const DRAW_DURATION = 2.6

/** One soft floating speck for atmosphere. */
function Floater({
  color,
  className,
  delay,
  square = false,
}: {
  color: string
  className: string
  delay: number
  square?: boolean
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.span
      aria-hidden="true"
      className={`pointer-events-none absolute inline-block ${className}`}
      style={{
        backgroundColor: color,
        borderRadius: square ? 6 : 999,
        boxShadow: `0 8px 20px ${color}55`,
      }}
      animate={reducedMotion ? undefined : { y: [0, -14, 0], rotate: square ? [0, 8, -8, 0] : undefined }}
      transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export function OpaHeroSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="opa-overview"
      aria-label="Every child has potential. Every journey is different."
      className="relative w-full overflow-hidden scroll-mt-[var(--header-height)]"
      style={{
        background:
          'linear-gradient(180deg, #fff9ee 0%, #e8f3ff 36%, #e6f0ff 58%, #fff3e4 100%)',
      }}
    >
      {/* ambience */}
      <StoryCloud className="pointer-events-none absolute left-[4%] top-[10%] w-44 opacity-80" duration={13} />
      <StoryCloud className="pointer-events-none absolute right-[30%] top-[4%] w-32 opacity-70" duration={16} delay={3} color="#efe6ff" />
      <StoryStar className="pointer-events-none absolute right-[8%] top-[18%] w-4" delay={0.4} />
      <StoryStar className="pointer-events-none absolute left-[26%] top-[26%] w-3" color="#ffffff" delay={1.2} />

      <div className="mx-auto grid max-w-[var(--content-max-width)] grid-cols-1 items-center gap-10 px-margin pb-16 pt-28 md:px-margin-md lg:grid-cols-[1fr_1fr] lg:gap-6 lg:px-margin-lg">
        {/* ---------- Copy column ---------- */}
        <div className="flex flex-col gap-space-md">
          <motion.span
            className="w-fit rounded-full bg-white/80 px-4 py-1.5 font-story-display text-sm font-bold tracking-wide text-story-midnight shadow-sm"
            initial={reducedMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            OWN PACE ACADEMY · AGES 3–30
          </motion.span>

          <h1 className="font-story-display text-[clamp(2.4rem,4.4vw,3.125rem)] font-bold leading-[1.04] tracking-tight text-story-midnight">
            {['Every', 'Child', 'Has', 'Potential.'].map((word, i) => (
              <motion.span
                key={word}
                className="inline-block"
                initial={reducedMotion ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.15 + i * 0.09 }}
              >
                {word}{' '}
              </motion.span>
            ))}
            {['Every', 'Journey', 'Is'].map((word, i) => (
              <motion.span
                key={word}
                className="inline-block"
                initial={reducedMotion ? false : { opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.45 + i * 0.09 }}
              >
                {word}{' '}
              </motion.span>
            ))}
            <motion.span
              className="inline-block"
              style={{ color: STORY.orange }}
              initial={reducedMotion ? false : { opacity: 0, y: 40, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 13, delay: 0.72 }}
            >
              Different.
            </motion.span>
          </h1>

          <motion.p
            className="max-w-xl font-body-lg text-lg leading-relaxed text-on-surface-variant"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
          >
            From the first steps of childhood to the choices that shape a career, Own Pace Academy
            supports growth beyond grades—with personalized guidance, confidence-building, life
            skills, and a clearer path forward.
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-3 pt-2" initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}>
            <motion.a
              href="#opa-worlds"
              className="group inline-flex items-center gap-2 rounded-2xl bg-story-orange px-7 py-4 font-story-display text-lg font-bold text-white shadow-[0_12px_30px_rgba(255,138,61,0.4)]"
              whileHover={reducedMotion ? undefined : { scale: 1.05, y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16 }}
            >
              <span>Explore the Journey</span>
              <span className="material-symbols-outlined text-[22px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                explore
              </span>
            </motion.a>
            <motion.a
              href="/#footer"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-story-midnight/10 bg-white/85 px-7 py-4 font-story-display text-lg font-bold text-story-midnight shadow-sm hover:border-story-orange/40 hover:text-story-orange"
              whileHover={reducedMotion ? undefined : { scale: 1.04, y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16 }}
            >
              Talk to Our Experts
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                support_agent
              </span>
            </motion.a>
          </motion.div>
        </div>

        {/* ---------- Journey strip ---------- */}
        <div className="relative mx-auto w-full max-w-[640px]">
          {/* connecting scene with the self-drawing glowing path */}
          <motion.svg
            viewBox="0 0 640 300"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            initial={false}
          >
            {!reducedMotion && (
              <motion.path
                d="M120 240 C 60 190, 120 130, 220 120 C 330 110, 330 210, 420 220 C 520 230, 560 120, 520 60"
                fill="none"
                stroke={STORY.yellow}
                strokeWidth="7"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ duration: DRAW_DURATION, delay: 0.9, ease: 'easeInOut' }}
              />
            )}
          </motion.svg>

          <div className="relative flex items-end justify-between gap-2 sm:gap-4">
            {/* Stage 1 vignette */}
            <motion.div
              className="relative w-[30%] max-w-[210px]"
              initial={reducedMotion ? false : { opacity: 0, y: 34, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.35 }}
            >
              <div className="rounded-3xl bg-linear-to-b from-[#ffe9d1] to-[#d9f4e6] p-2 shadow-lg">
                <NovaCharacter className="mx-auto h-auto w-[78%]" />
                <div className="flex items-end justify-center gap-1 pb-1.5">
                  {[
                    { c: STORY.coral, s: 'h-4 w-4' },
                    { c: STORY.mint, s: 'h-6 w-6' },
                    { c: STORY.yellow, s: 'h-5 w-5' },
                  ].map((block, i) => (
                    <motion.span
                      key={i}
                      className={`inline-block rounded-md ${block.s}`}
                      style={{ backgroundColor: block.c }}
                      animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
                      transition={{ duration: 2 + i * 0.5, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}
                  <motion.span
                    className="material-symbols-outlined text-[18px]"
                    aria-hidden="true"
                    style={{ color: STORY.lavender }}
                    animate={reducedMotion ? undefined : { y: [0, -8, 0], rotate: [0, -12, 0, 12, 0] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    flutter_dash
                  </motion.span>
                </div>
              </div>
              <span className="mt-2 block text-center font-story-display text-xs font-bold text-story-midnight/80">
                Ages 3–12 · Discovery
              </span>
            </motion.div>

            {/* Stage 2 vignette */}
            <motion.div
              className="relative mt-10 w-[30%] max-w-[210px]"
              initial={reducedMotion ? false : { opacity: 0, y: 34, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.55 }}
            >
              <div className="rounded-3xl bg-linear-to-b from-[#e6e3ff] to-[#ffe6d6] p-2 shadow-lg">
                <TeenExplorer className="mx-auto h-auto w-[82%]" />
                <div className="flex items-center justify-center gap-1 pb-1.5">
                  {[
                    { icon: 'science', c: STORY.skyDeep },
                    { icon: 'brush', c: STORY.coral },
                    { icon: 'sports_soccer', c: STORY.mint },
                  ].map((chip, i) => (
                    <motion.span
                      key={chip.icon}
                      className="material-symbols-outlined text-[17px]"
                      aria-hidden="true"
                      style={{ color: chip.c }}
                      animate={reducedMotion ? undefined : { y: [0, -6, 0], scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.4, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {chip.icon}
                    </motion.span>
                  ))}
                </div>
              </div>
              <span className="mt-2 block text-center font-story-display text-xs font-bold text-story-midnight/80">
                Ages 13–20 · Direction
              </span>
            </motion.div>

            {/* Stage 3 vignette */}
            <motion.div
              className="relative mt-16 w-[30%] max-w-[210px]"
              initial={reducedMotion ? false : { opacity: 0, y: 34, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.75 }}
            >
              <div
                className="rounded-3xl p-2 shadow-lg"
                style={{ background: 'linear-gradient(180deg, #dfe8ff 0%, #ffe3bd 100%)' }}
              >
                <YoungAdult className="mx-auto h-auto w-[80%]" />
                {/* sunrise strip */}
                <div className="relative mx-1 mb-1 h-3 overflow-hidden rounded-full">
                  <motion.span
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, #ffd95a, #ff9d6b)' }}
                    animate={reducedMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              <span className="mt-2 block text-center font-story-display text-xs font-bold text-story-midnight/80">
                Ages 21–30 · Career
              </span>
            </motion.div>
          </div>

          {/* floating specks with gentle parallax-ish depth */}
          {!reducedMotion && (
            <>
              <Floater color={STORY.sky} className="left-[2%] top-[16%] h-3 w-3 opacity-70" delay={0.2} />
              <Floater color={STORY.lavender} className="right-[4%] top-[8%] h-2.5 w-2.5 opacity-70" delay={1.1} />
              <Floater color={STORY.yellow} className="left-[46%] top-[2%] h-2 w-2 opacity-80" delay={0.7} square />
              <Floater color={STORY.mint} className="right-[16%] bottom-[24%] h-2.5 w-2.5 opacity-60" delay={1.6} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
