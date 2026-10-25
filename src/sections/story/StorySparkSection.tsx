import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { GlowLightbulb } from './StoryCharacters'
import { Reveal, StoryHeadline, StoryPill } from './StoryShared'
import { STORY } from './storyTheme'

/*
 * Section 3 — "What If Learning Felt Like Play?"
 * A huge lightbulb lights up on scroll and three floating cards reveal
 * around it: Curiosity · Creativity · Confidence.
 */

interface SparkCard {
  id: string
  title: string
  color: string
  soft: string
  text: string
  art: 'treasure' | 'robot' | 'star'
}

const SPARK_CARDS: SparkCard[] = [
  {
    id: 'curiosity',
    title: 'Curiosity',
    color: STORY.orange,
    soft: '#ffe3cd',
    text: 'Encouraging children to ask questions, explore ideas, and think beyond the obvious.',
    art: 'treasure',
  },
  {
    id: 'creativity',
    title: 'Creativity',
    color: STORY.lavender,
    soft: '#e8e0ff',
    text: 'Turning imagination into ideas, experiments, and exciting possibilities.',
    art: 'robot',
  },
  {
    id: 'confidence',
    title: 'Confidence',
    color: STORY.mint,
    soft: '#d6f6ea',
    text: 'Making room for progress, experimentation, and the joy of understanding something new.',
    art: 'star',
  },
]

/** Little illustrated medallion per card. */
function SparkArt({ kind, color }: { kind: SparkCard['art']; color: string }) {
  return (
    <svg viewBox="0 0 120 96" aria-hidden="true" className="h-20 w-28">
      {kind === 'treasure' && (
        <g>
          <rect x="34" y="44" width="52" height="34" rx="8" fill="#b5651d" />
          <rect x="30" y="30" width="60" height="20" rx="9" fill="#d97b2a" />
          <rect x="34" y="44" width="52" height="6" fill="#ffd95a" />
          <circle cx="60" cy="52" r="5" fill="#ffd95a" />
          {/* glowing question gem */}
          <circle cx="86" cy="24" r="12" fill={color} />
          <path d="M83 22 q3 -6 6 0 q2 4 -3 5" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="86" cy="30" r="1.6" fill="#fff" />
        </g>
      )}
      {kind === 'robot' && (
        <g>
          <rect x="40" y="34" width="40" height="34" rx="10" fill={color} />
          <rect x="47" y="42" width="26" height="14" rx="6" fill="#2c3161" />
          <circle cx="54" cy="49" r="3" fill="#77ddb4" />
          <circle cx="66" cy="49" r="3" fill="#77ddb4" />
          <rect x="36" y="20" width="6" height="12" rx="3" fill="#8b90c9" />
          <circle cx="39" cy="17" r="4.5" fill="#ffd95a" />
          {/* blocks */}
          <rect x="24" y="70" width="20" height="18" rx="4" fill="#ff8a3d" />
          <rect x="48" y="64" width="20" height="24" rx="4" fill="#60c9f3" />
          <rect x="72" y="70" width="20" height="18" rx="4" fill="#ffd95a" />
        </g>
      )}
      {kind === 'star' && (
        <g>
          <rect x="44" y="46" width="32" height="40" rx="14" fill="#fbd0a8" />
          <circle cx="60" cy="38" r="18" fill="#fbd0a8" />
          <path d="M44 34 Q42 16 60 14 Q78 16 76 34 Q70 22 60 24 Q50 22 44 34 Z" fill="#7a4a2b" />
          <circle cx="53" cy="38" r="4" fill="#20222e" />
          <circle cx="67" cy="38" r="4" fill="#20222e" />
          <path d="M55 46 Q60 50 65 46" stroke="#20222e" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path d="M8 36 l6 12 -13 -3 Z" fill="#ffd95a" />
          <path d="M112 30 l4 10 -11 -2 Z" fill="#ff8a3d" />
          <path d="M100 62 l3 8 -9 -2 Z" fill="#b8a5ff" />
        </g>
      )}
    </svg>
  )
}

export function StorySparkSection() {
  const reducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  // Touch users tap to reveal; pointer users hover. Tap also works on click.
  const activeCard = hovered ?? selected

  const toggleSelected = (id: string) =>
    setSelected((current) => (current === id ? null : id))

  return (
    <section className="relative w-full overflow-hidden py-margin-lg">
      {/* soft sky backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(720px 460px at 50% 18%, rgba(255,217,90,0.35), rgba(255,217,90,0) 70%), linear-gradient(180deg, #fff9ee 0%, #f3ecff 100%)',
        }}
      />

      <div className="mx-auto max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg">
        <div className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <StoryPill color={STORY.yellow}>Chapter Three · The Spark</StoryPill>
          </Reveal>
          <StoryHeadline
            text="One Little Question. A Whole New World."
            accentWords={['World']}
            className="max-w-3xl text-[clamp(1.875rem,2.9vw,2.25rem)] leading-[1.06] text-story-midnight"
          />
          <Reveal delay={0.15} from="up">
            <p className="max-w-2xl font-body-lg text-lg leading-relaxed text-on-surface-variant">
              What if every lesson felt like an adventure? What if curiosity led the way, children
              learned at their own pace, and every discovery felt like a little victory?
            </p>
          </Reveal>
        </div>

        {/* Bulb + cards stage */}
        <div className="relative mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto flex max-w-[420px] items-center justify-center">
            <Reveal from="up">
              <div className="relative">
                <GlowLightbulb className="h-auto w-full drop-shadow-xl" />
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-8 bottom-10 h-4 rounded-full bg-story-yellow/60 blur-md"
                  animate={reducedMotion ? undefined : { scaleX: [1, 1.18, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
            {SPARK_CARDS.map((card, i) => (
              <motion.article
                key={card.id}
                className="group relative flex cursor-pointer flex-col gap-3 rounded-3xl bg-white p-6 shadow-[0_14px_40px_rgba(23,37,84,0.10)] outline-none transition-shadow focus-visible:ring-4 focus-visible:ring-story-orange/30"
                initial={reducedMotion ? false : { opacity: 0, y: 46 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 110, damping: 15, delay: 0.12 * i }}
                whileHover={reducedMotion ? undefined : { y: -10, rotate: i === 1 ? 0 : i === 0 ? -1.6 : 1.6 }}
                whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                onHoverStart={() => setHovered(card.id)}
                onHoverEnd={() => setHovered(null)}
                onFocus={() => setHovered(card.id)}
                onBlur={() => setHovered(null)}
                onClick={() => toggleSelected(card.id)}
                tabIndex={0}
                aria-labelledby={`spark-${card.id}-title`}
              >
                {/* hover halo */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  style={{ boxShadow: `0 0 0 3px ${card.color}55, 0 24px 50px ${card.color}33` }}
                />
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: card.soft }}
                >
                  <motion.svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    animate={
                      reducedMotion
                        ? undefined
                        :                      activeCard === card.id
                        ? { rotate: [0, -12, 10, 0], scale: [1, 1.2, 1] }
                        : undefined
                    }
                    transition={{ duration: 0.6 }}
                  >
                    <path
                      d="M12 17.3l-6.2 3.1 1.4-6.6-5-4.6 6.8-.8L12 2.3l3 6.1 6.8.8-5 4.6 1.4 6.6z"
                      fill={card.color}
                    />
                  </motion.svg>
                </div>
                <h3
                  id={`spark-${card.id}-title`}
                  className="font-story-display text-xl font-bold text-story-midnight"
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">{card.text}</p>
                <div
                  className="mt-auto overflow-hidden transition-all duration-500"
                  style={{ maxHeight: activeCard === card.id ? 80 : 0, opacity: activeCard === card.id ? 1 : 0 }}
                >
                  <SparkArt kind={card.art} color={card.color} />
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* The question line */}
        <Reveal from="up" className="mx-auto mt-10 max-w-2xl text-center">
          <p className="font-story-script text-[clamp(1.6rem,3vw,2.4rem)] leading-tight text-story-midnight/80">
            “What if learning felt like play?”
          </p>
          <p className="mt-2 text-sm font-medium uppercase tracking-widest text-on-surface-variant/70">
            We built the whole site around that one question.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
