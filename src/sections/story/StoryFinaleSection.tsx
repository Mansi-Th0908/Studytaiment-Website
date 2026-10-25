import { motion } from 'framer-motion'
import { MaterialIcon } from '../../components/common/MaterialIcon'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { MagicalOpenBook, NovaCharacter } from './StoryCharacters'
import { Reveal, StoryHeadline, StoryPill } from './StoryShared'
import { STORY } from './storyTheme'

/*
 * Section 8 — Final celebration: "Ready to Make Learning an Adventure?"
 * Nova waves beside a giant glowing storybook under a confetti-sprinkled sky.
 */

const CONFETTI = [
  { l: '6%', t: '18%', c: STORY.yellow, r: '8px', d: 0 },
  { l: '16%', t: '52%', c: STORY.coral, r: '6px', d: 0.9 },
  { l: '26%', t: '12%', c: STORY.sky, r: '7px', d: 1.6 },
  { l: '70%', t: '10%', c: STORY.lavender, r: '8px', d: 0.4 },
  { l: '84%', t: '30%', c: STORY.mint, r: '6px', d: 1.2 },
  { l: '92%', t: '62%', c: STORY.yellow, r: '7px', d: 2 },
  { l: '48%', t: '6%', c: STORY.orange, r: '6px', d: 2.6 },
  { l: '44%', t: '66%', c: STORY.sky, r: '6px', d: 1.9 },
] as const

export function StoryFinaleSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="story-finale"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{
        background:
          'linear-gradient(180deg, #172554 0%, #2c3a7a 34%, #6d64c2 58%, #ff9d6b 82%, #ffd95a 100%)',
      }}
    >
      {/* twinkling upper sky */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {CONFETTI.map((bit, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: bit.l,
              top: bit.t,
              width: bit.r,
              height: bit.r,
              backgroundColor: bit.c,
            }}
            animate={
              reducedMotion
                ? { opacity: 0.8 }
                : { opacity: [0.25, 1, 0.25], scale: [0.8, 1.35, 0.8], y: [0, -14, 0] }
            }
            transition={{ duration: 3 + i * 0.3, delay: bit.d, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {/* tiny planets */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`planet-${i}`}
            className="absolute h-10 w-10 rounded-full md:h-14 md:w-14"
            style={{
              left: `${14 + i * 34}%`,
              top: `${12 + i * 7}%`,
              background: `radial-gradient(circle at 30% 30%, #ffffffcc, ${[STORY.lavender, '#60c9f3', '#f7a8c4'][i]})`,
            }}
            animate={reducedMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 5 + i, delay: i, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span
              className="absolute -left-2 top-1/2 h-2 w-9 -translate-y-1/2 rounded-full border-2 border-story-yellow/70"
              style={{ transform: 'rotate(-14deg)' }}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-[var(--content-max-width)] flex-col items-center gap-6 px-margin pb-20 pt-10 text-center md:px-margin-md lg:px-margin-lg">
        {/* Mascot + open book diorama */}
        <div className="relative flex w-full max-w-[540px] items-end justify-center">
          <Reveal from="up">
            <motion.div
              className="w-[62%] max-w-[330px]"
              animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MagicalOpenBook className="h-auto w-full" />
            </motion.div>
          </Reveal>
          <motion.div
            className="absolute bottom-[-10px] left-[-6%] w-[42%] max-w-[210px]"
            initial={reducedMotion ? false : { opacity: 0, x: -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 110, damping: 12, delay: 0.25 }}
          >
            <NovaCharacter className="h-auto w-full" waving />
          </motion.div>
        </div>

        <Reveal>
          <StoryPill color={STORY.coral} className="mt-2">
            The final page… for now
          </StoryPill>
        </Reveal>

        <Reveal from="up">
          <StoryHeadline
            as="h2"
            text="Ready to Make Learning an Adventure?"
            accentWords={['Adventure']}
            className="text-[clamp(2.3rem,5.4vw,4rem)] leading-[1.05] text-white"
          />
        </Reveal>

        <Reveal from="up" delay={0.1}>
          <p className="max-w-2xl font-body-lg text-lg leading-relaxed text-white/85">
            Come explore a world where questions are welcome, imagination runs wild, and every
            discovery opens a new door.
          </p>
        </Reveal>

        <Reveal from="up" delay={0.2}>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="/#explore-pathways"
              className="group inline-flex items-center gap-2 rounded-2xl bg-story-yellow px-8 py-4 font-story-display text-lg font-bold text-story-midnight shadow-[0_14px_36px_rgba(0,0,0,0.25)]"
              whileHover={reducedMotion ? undefined : { scale: 1.05, y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 15 }}
            >
              <span>Start Your Adventure</span>
              <MaterialIcon
                name="arrow_forward"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>

            <motion.a
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-white/40 bg-white/10 px-8 py-4 font-story-display text-lg font-bold text-white backdrop-blur hover:border-white/70 hover:bg-white/20"
              whileHover={reducedMotion ? undefined : { scale: 1.04, y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 320, damping: 15 }}
            >
              <MaterialIcon name="home" className="text-[20px]" />
              <span>Back to Home</span>
            </motion.a>
          </div>
        </Reveal>

        {/* rolling sparkle hills closing the book */}
        {/* <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
          <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="block h-[120px] w-full md:h-[160px]">
            <path d="M0 90 Q260 20 520 84 T1000 70 T1440 88 L1440 150 L0 150 Z" fill="#77ddb4" opacity="0.75" />
            <path d="M0 120 Q360 66 720 116 T1440 112 L1440 150 L0 150 Z" fill="#4db98d" opacity="0.9" />
          </svg>
        </div> */}
      </div>
    </section>
  )
}
