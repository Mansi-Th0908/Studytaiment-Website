import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal, StoryHeadline, StoryPill } from './StoryShared'
import { STORY } from './storyTheme'

/*
 * Section 5 — "The Studytainment Universe".
 * Four illustrated worlds; hovering makes each planet idly rotate and
 * clicking (or tapping) reveals its playful description.
 */

interface World {
  id: string
  name: string
  tagline: string
  description: string
  color: string
  soft: string
  deep: string
  icon: string
}

const WORLDS: World[] = [
  {
    id: 'wonder-lab',
    name: 'The Wonder Lab',
    tagline: 'Science, experiments & discovery',
    description:
      'A place where “why?” is the most important question — beakers, magnets and big ideas get to bubble over.',
    color: STORY.mint,
    soft: '#e6f9f1',
    deep: '#2e6d54',
    icon: 'science',
  },
  {
    id: 'creative-corner',
    name: 'The Creative Corner',
    tagline: 'Art, imagination & self-expression',
    description:
      'Crayons, costumes and cardboard masterpieces. Every child leaves a little more themselves than they arrived.',
    color: STORY.coral,
    soft: '#ffebe4',
    deep: '#9a3413',
    icon: 'palette',
  },
  {
    id: 'puzzle-planet',
    name: 'The Puzzle Planet',
    tagline: 'Logic, thinking & critical strategy',
    description:
      'Riddles, mazes and playful brainteasers — where stubborn problems are simply unbeaten friends.',
    color: STORY.lavender,
    soft: '#f1ecff',
    deep: '#4c3d9d',
    icon: 'extension',
  },
  {
    id: 'dream-academy',
    name: 'The Dream Academy',
    tagline: 'Independent learning & growing up',
    description:
      'Learners choose their quests, set their pace, and keep a little journal of every “I did it!”',
    color: STORY.skyDeep,
    soft: '#e4f5ff',
    deep: '#17517d',
    icon: 'auto_stories',
  },
]

/** Rotating planet illustration with an orbiting moon. */
function PlanetArt({ world, spinning }: { world: World; spinning: boolean }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="relative mx-auto h-36 w-36 md:h-44 md:w-44">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 32% 28%, ${world.soft}, ${world.color} 62%, ${world.deep} 130%)`,
          boxShadow: `inset -14px -12px 24px rgba(0,0,0,0.14), 0 18px 40px ${world.color}55`,
        }}
        animate={
          reducedMotion
            ? undefined
            : spinning
              ? { rotate: 360 }
              : { y: [0, -8, 0] }
        }
        transition={
          reducedMotion
            ? undefined
            : spinning
              ? { duration: 9, repeat: Infinity, ease: 'linear' }
              : { duration: 4.4, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {/* surface blobs (they reveal the rotation) */}
        <span className="absolute left-9 top-7 h-6 w-9 rounded-full bg-white/35" />
        <span className="absolute bottom-8 left-16 h-4 w-6 rounded-full bg-white/25" />
        <span className="absolute right-9 top-16 h-5 w-5 rounded-full bg-white/20" />
      </motion.div>

      {/* orbiting moon */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-[-14%]"
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: spinning ? 6 : 14, repeat: Infinity, ease: 'linear' }}
      >
        <span
          className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full shadow"
          style={{ backgroundColor: STORY.yellow }}
        />
      </motion.div>

      {/* ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12%] top-1/2 h-8 w-[124%] -translate-y-1/2 rounded-[100%] border-4"
        style={{ borderColor: `${world.deep}33`, transform: 'rotate(-14deg)' }}
      />
    </div>
  )
}

export function StoryUniverseSection() {
  const reducedMotion = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>('wonder-lab')
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section
      id="story-universe"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #eef3ff 100%)' }}
    >
      {/* sprinkles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {[
          { l: '8%', t: '14%' }, { l: '90%', t: '10%' }, { l: '78%', t: '76%' },
          { l: '12%', t: '70%' }, { l: '50%', t: '6%' }, { l: '60%', t: '88%' },
        ].map((pos, i) => (
          <motion.span
            key={i}
            className="absolute h-2.5 w-2.5 rounded-full"
            style={{
              left: pos.l,
              top: pos.t,
              backgroundColor: [STORY.yellow, STORY.sky, STORY.lavender, STORY.mint, STORY.coral, STORY.yellow][i],
            }}
            animate={reducedMotion ? undefined : { scale: [0.8, 1.4, 0.8], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.6, delay: i * 0.35, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg">
        <div className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <StoryPill color={STORY.lavender}>Chapter Five · The Universe</StoryPill>
          </Reveal>
          <StoryHeadline
            text="A Little Wonder Everywhere."
            accentWords={['Wonder']}
            className="max-w-3xl text-[clamp(1.875rem,2.9vw,2.25rem)] leading-[1.06] text-story-midnight"
          />
          <Reveal delay={0.12} from="up">
            <p className="max-w-2xl font-body-lg text-lg leading-relaxed text-on-surface-variant">
              Four little worlds live inside Studytainment. Visit one — every planet keeps a
              surprise for curious travelers.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WORLDS.map((world, i) => {
            const isOpen = openId === world.id
            const isHovered = hovered === world.id
            return (
              <motion.div
                key={world.id}
                className={`group relative flex ${i % 2 === 0 ? 'lg:translate-y-6' : ''} flex-col items-center gap-4 rounded-[2rem] border border-white bg-white/80 p-6 text-center shadow-[0_16px_44px_rgba(23,37,84,0.09)] backdrop-blur transition-colors focus-within:ring-4 focus-within:ring-story-orange/25 hover:bg-white focus-visible:ring-4 focus-visible:ring-story-orange/25`}
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, x: i % 2 === 0 ? -48 : 48, y: 24 }
                }
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.08 * i }}
                onHoverStart={() => setHovered(world.id)}
                onHoverEnd={() => setHovered(null)}
              >
                <PlanetArt world={world} spinning={isHovered && !reducedMotion} />

                <div>
                  <h3 className="font-story-display text-xl font-bold text-story-midnight">
                    {world.name}
                  </h3>
                  <p
                    className="mt-1 font-story-display text-sm font-semibold"
                    style={{ color: world.deep }}
                  >
                    {world.tagline}
                  </p>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      key="desc"
                      className="overflow-hidden text-sm leading-relaxed text-on-surface-variant"
                      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      {world.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setOpenId((current) => (current === world.id ? null : world.id))}
                  aria-expanded={isOpen}
                  aria-controls={`universe-desc-${world.id}`}
                  className="mt-auto inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-story-display text-sm font-bold text-white shadow transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none"
                  style={{ backgroundColor: world.color }}
                >
                  {isOpen ? 'Close the world' : 'Peek inside'}
                  <motion.span
                    aria-hidden="true"
                    className="material-symbols-outlined text-[18px]"
                    animate={reducedMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                  >
                    expand_more
                  </motion.span>
                </button>
                <span id={`universe-desc-${world.id}`} className="sr-only">
                  {world.description}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
