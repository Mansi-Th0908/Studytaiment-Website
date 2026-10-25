import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { MiniKid } from './StoryCharacters'
import { Reveal, StoryHeadline, StoryPill } from './StoryShared'
import { STORY } from './storyTheme'

/*
 * Section 6 — "Every Child Has a Universe Inside".
 * Five diverse kids, each lost in their own kind of learning, each with an
 * idea bubble blooming into something magical.
 */

const KIDS = [
  {
    id: 'reader',
    skin: '#f3c19d',
    shirt: STORY.coral,
    hair: '#5b3a21',
    activity: 'read' as const,
    bubble: STORY.orange,
    label: 'reads stories',
  },
  {
    id: 'builder',
    skin: '#c9885c',
    shirt: STORY.skyDeep,
    hair: '#2f2418',
    activity: 'build' as const,
    bubble: STORY.sky,
    label: 'builds towers',
    ponytail: false,
  },
  {
    id: 'artist',
    skin: '#ffd9b8',
    shirt: STORY.lavender,
    hair: '#d99b3e',
    activity: 'draw' as const,
    bubble: STORY.lavender,
    label: 'draws worlds',
    ponytail: true,
  },
  {
    id: 'scientist',
    skin: '#8d5a3a',
    shirt: STORY.mint,
    hair: '#1f1a14',
    activity: 'science' as const,
    bubble: STORY.mint,
    label: 'mixes potions',
  },
  {
    id: 'thinker',
    skin: '#e8b48c',
    shirt: STORY.yellow,
    hair: '#7a4a2b',
    activity: 'puzzle' as const,
    bubble: STORY.yellow,
    label: 'solves puzzles',
    ponytail: true,
  },
]

export function StoryBeliefSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="story-belief"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{
        background:
          'radial-gradient(1100px 520px at 50% -10%, rgba(255,217,90,0.35), rgba(255,217,90,0) 65%), linear-gradient(180deg, #fff9ee 0%, #ffe8d9 100%)',
      }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg">
        <div className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <StoryPill color={STORY.coral}>Chapter Six · The Heart</StoryPill>
          </Reveal>
          <StoryHeadline
            text="Every Child Is Curious. Every Mind Is Unique."
            accentWords={['Unique']}
            className="max-w-3xl text-[clamp(1.875rem,2.9vw,2.25rem)] leading-[1.06] text-story-midnight"
          />
          <Reveal delay={0.12} from="up">
            <p className="max-w-2xl font-body-lg text-lg leading-relaxed text-on-surface-variant">
              Children do not all learn in the same way, at the same speed, or through the same
              experiences. We believe great learning gives curiosity room to grow and every child
              the freedom to discover their own path.
            </p>
          </Reveal>
        </div>

        {/* The kids */}
        <div className="mt-10 flex flex-wrap items-end justify-center gap-2 sm:gap-6">
          {KIDS.map((kid, i) => (
            <motion.figure
              key={kid.id}
              className="group flex w-24 flex-col items-center sm:w-32 md:w-36"
              initial={reducedMotion ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.1 * i }}
              whileHover={reducedMotion ? undefined : { y: -8, rotate: i % 2 ? 2 : -2 }}
            >
              <MiniKid
                className="h-auto w-full"
                skin={kid.skin}
                shirt={kid.shirt}
                hair={kid.hair}
                ponytail={kid.ponytail}
                activity={kid.activity}
                bubbleColor={kid.bubble}
                delay={i * 0.35}
              />
              <figcaption className="mt-2 rounded-full bg-white/85 px-3 py-1 font-story-display text-xs font-bold text-story-midnight shadow-sm sm:text-sm">
                {kid.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Floating transformations: stars, rocket, flower, galaxy */}
        <div aria-hidden="true" className="pointer-events-none relative mt-4 h-36">
          <motion.svg
            viewBox="0 0 40 40"
            className="absolute left-[10%] top-4 h-8 w-8"
            animate={reducedMotion ? undefined : { y: [0, -14, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M20 3l5 10 11 1.3-8 7.6 2 11L20 27.4 9.9 33l2-11L4 14.3 15 13z" fill={STORY.yellow} />
          </motion.svg>
          <motion.svg
            viewBox="0 0 40 40"
            className="absolute left-[34%] top-0 h-10 w-10"
            animate={reducedMotion ? undefined : { y: [0, -18, 0], x: [0, 8, 0] }}
            transition={{ duration: 5, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M20 2c6 6 8 14 6 24h-12c-2-10 0-18 6-24z" fill={STORY.coral} />
            <circle cx="20" cy="16" r="4" fill="#cfeaff" />
            <path d="M14 26l-6 8 9-3z" fill={STORY.orange} />
            <path d="M26 26l6 8-9-3z" fill={STORY.orange} />
          </motion.svg>
          <motion.svg
            viewBox="0 0 40 40"
            className="absolute left-[56%] top-6 h-9 w-9"
            animate={reducedMotion ? undefined : { y: [0, -10, 0], rotate: [0, -12, 0] }}
            transition={{ duration: 4.4, delay: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {[0, 72, 144, 216, 288].map((deg) => (
              <ellipse key={deg} cx="20" cy="10" rx="5" ry="9" fill="#f7a8c4" transform={`rotate(${deg} 20 20)`} />
            ))}
            <circle cx="20" cy="20" r="4" fill="#ffd95a" />
          </motion.svg>
          <motion.svg
            viewBox="0 0 40 40"
            className="absolute left-[78%] top-1 h-10 w-10"
            animate={reducedMotion ? undefined : { scale: [0.9, 1.1, 0.9], rotate: [0, 8, 0] }}
            transition={{ duration: 5.2, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="20" cy="20" r="12" fill="#6d5bd0" />
            <circle cx="20" cy="20" r="7" fill="#b8a5ff" />
            <circle cx="20" cy="20" r="3" fill="#ffffff" />
          </motion.svg>
        </div>

        {/* Warm closing line */}
        <Reveal from="up" className="mx-auto mt-2 max-w-2xl text-center">
          <p className="font-story-script text-[clamp(1.6rem,3vw,2.3rem)] leading-tight text-story-midnight/85">
            “There is a little universe inside every mind — and every one of them deserves to
            sparkle.”
          </p>
        </Reveal>
      </div>
    </section>
  )
}
