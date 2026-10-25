import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { LumiCharacter } from '../story/StoryCharacters'
import { Reveal, StoryHeadline, StoryPill } from '../story/StoryShared'
import { STORY } from '../story/storyTheme'

/*
 * "The Whole Person. Not Just the Student."
 * Three glowing growth islands — physical, personal, social — orbiting an
 * original mascot. Interacting with a pillar highlights its illustration and
 * shows its explanation.
 */

type PillarId = 'physical' | 'personal' | 'social'

interface Pillar {
  id: PillarId
  title: string
  text: string
  icon: string
  color: string
  soft: string
  angle: number
}

const PILLARS: Pillar[] = [
  {
    id: 'physical',
    title: 'Physical Growth',
    text: 'Healthy habits, movement, participation, and personal well-being — energy that makes every other kind of growth possible.',
    icon: 'directions_run',
    color: STORY.mint,
    soft: '#e6f9f1',
    angle: -90,
  },
  {
    id: 'personal',
    title: 'Personal Growth',
    text: 'Confidence, emotional awareness, resilience, self-understanding, and communication — the inner toolkit for life.',
    icon: 'self_improvement',
    color: STORY.lavender,
    soft: '#efe9ff',
    angle: 30,
  },
  {
    id: 'social',
    title: 'Social Growth',
    text: 'Empathy, relationships, cooperation, responsibility, and teamwork — learning and growing alongside others.',
    icon: 'diversity_3',
    color: STORY.orange,
    soft: '#ffe7d1',
    angle: 150,
  },
]

/** Illustration pod for a pillar. */
function PillarIsland({
  pillar,
  active,
  onSelect,
  index,
}: {
  pillar: Pillar
  active: boolean
  onSelect: () => void
  index: number
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`${pillar.title}: ${pillar.text}`}
      className="group relative flex w-40 flex-col items-center gap-2 rounded-3xl border-2 bg-white p-4 text-center shadow-md transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-story-orange/30 sm:w-48"
      style={{
        borderColor: active ? pillar.color : 'rgba(255,255,255,0.9)',
        boxShadow: active ? `0 18px 44px ${pillar.color}44` : undefined,
      }}
      initial={reducedMotion ? false : { opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 130, damping: 14, delay: 0.15 * index }}
      whileHover={reducedMotion ? undefined : { y: -6 }}
    >
      {/* island tree / icon */}
      <motion.span
        className="relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-inner"
        style={{ backgroundColor: pillar.color }}
        animate={reducedMotion ? undefined : { y: active ? [0, -5, 0] : [0, -2, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
      >
        <span className="material-symbols-outlined text-[30px]" aria-hidden="true">
          {pillar.icon}
        </span>
        {active && (
          <motion.span
            aria-hidden="true"
            className="absolute -inset-2 rounded-full border-2"
            style={{ borderColor: `${pillar.color}55` }}
            animate={reducedMotion ? undefined : { scale: [1, 1.18, 1], opacity: [0.9, 0.2, 0.9] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.span>
      <span className="font-story-display text-base font-bold text-story-midnight sm:text-lg">
        {pillar.title}
      </span>
    </motion.button>
  )
}

export function OpaPillarsSection() {
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState<PillarId>('personal')
  const activePillar = PILLARS.find((p) => p.id === active) ?? PILLARS[0]

  return (
    <section
      id="opa-pillars"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{
        background:
          'radial-gradient(900px 460px at 50% 0%, rgba(184,165,255,0.18), transparent 70%), linear-gradient(180deg, #fff9ee 0%, #eef4ff 100%)',
      }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg">
        <div className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <StoryPill color={STORY.orange}>One Model · Three Dimensions</StoryPill>
          </Reveal>
          <StoryHeadline
            text="The Whole Person. Not Just the Student."
            accentWords={['Whole']}
            className="max-w-3xl text-[clamp(1.875rem,2.9vw,2.25rem)] leading-[1.06] text-story-midnight"
          />
          <Reveal delay={0.1} from="up">
            <p className="max-w-2xl font-body-lg text-lg leading-relaxed text-on-surface-variant">
              Growth runs on more than academics. Tap a pillar to see what each dimension supports —
              and how they hold each other up.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* The interconnected island stage: mascot up top, islands below */}
          <div className="relative mx-auto flex w-full max-w-[560px] flex-col items-center gap-10">
            {/* mascot with soft connecting rings behind */}
            <div className="relative flex flex-col items-center">
              <div aria-hidden="true" className="pointer-events-none absolute -inset-x-14 inset-y-0">
                {[0, 1].map((ring) => (
                  <motion.span
                    key={ring}
                    className="absolute rounded-full border-2"
                    style={{
                      borderColor: `${activePillar.color}${ring ? '22' : '33'}`,
                      height: ring ? '130%' : '165%',
                      width: ring ? '135%' : '100%',
                      left: ring ? '-17.5%' : '0',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                    animate={reducedMotion ? undefined : { rotate: ring ? [0, -360] : [0, 360] }}
                    transition={{ duration: 60 + ring * 30, repeat: Infinity, ease: 'linear' }}
                  />
                ))}
              </div>
              <motion.div
                animate={reducedMotion ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <LumiCharacter className="h-auto w-32 sm:w-40" />
              </motion.div>
              <span className="rounded-full bg-white px-3 py-1 font-story-display text-xs font-bold text-story-midnight shadow">
                Growing together
              </span>
            </div>

            {/* the three growth islands */}
            <div className="relative z-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:items-end sm:justify-around">
              <PillarIsland
                pillar={PILLARS[0]}
                index={0}
                active={active === 'physical'}
                onSelect={() => setActive('physical')}
              />
              <PillarIsland
                pillar={PILLARS[1]}
                index={1}
                active={active === 'personal'}
                onSelect={() => setActive('personal')}
              />
              <PillarIsland
                pillar={PILLARS[2]}
                index={2}
                active={active === 'social'}
                onSelect={() => setActive('social')}
              />
            </div>
          </div>

          {/* explanation panel */}
          <motion.div
            className="glass rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_18px_50px_rgba(23,37,84,0.10)] backdrop-blur sm:p-8"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 110, damping: 15 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={reducedMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -14 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="flex flex-col gap-3"
              >
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: activePillar.soft }}
                >
                  <span
                    className="material-symbols-outlined text-[26px]"
                    style={{ color: activePillar.color }}
                    aria-hidden="true"
                  >
                    {activePillar.icon}
                  </span>
                </span>
                <h3 className="font-story-display text-2xl font-bold text-story-midnight">
                  {activePillar.title}
                </h3>
                <p className="text-base leading-relaxed text-on-surface-variant">
                  {activePillar.text}
                </p>
                <p className="font-story-display text-sm font-semibold text-on-surface-variant/70">
                  The three dimensions support one another — steady movement steadies mood, and
                  feeling understood makes teamwork easier.
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
