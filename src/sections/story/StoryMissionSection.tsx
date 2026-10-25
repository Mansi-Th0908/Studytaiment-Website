import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { NovaCharacter } from './StoryCharacters'
import { Reveal, StoryCloud, StoryHeadline, StoryPill } from './StoryShared'
import { STORY } from './storyTheme'

/*
 * Section 4 — "Our Mission".
 * A whimsical landscape with a winding path through five illustrated zones.
 * Scrolling drives the little explorer marker along the path.
 */

interface Zone {
  id: string
  label: string
  text: string
  color: string
  soft: string
  icon: string
}

const ZONES: Zone[] = [
  {
    id: 'science',
    label: 'Science & Discovery',
    text: 'Questions turn into experiments, and experiments into little “a-ha!” moments.',
    color: STORY.skyDeep,
    soft: '#e3f5ff',
    icon: 'science',
  },
  {
    id: 'art',
    label: 'Art & Creativity',
    text: 'Color, story and make-believe give ideas somewhere warm to live.',
    color: STORY.coral,
    soft: '#ffe9e2',
    icon: 'palette',
  },
  {
    id: 'logic',
    label: 'Logic & Problem-Solving',
    text: 'Puzzles become games, and “I can’t” slowly becomes “not yet”.',
    color: STORY.lavender,
    soft: '#efe9ff',
    icon: 'extension',
  },
  {
    id: 'own-pace',
    label: 'Independent Learning',
    text: 'Children choose their own pace — every small step still counts.',
    color: STORY.mint,
    soft: '#e0f8ee',
    icon: 'hiking',
  },
  {
    id: 'imagination',
    label: 'Imagination & Exploration',
    text: 'The destination is a child who asks “what if?” one more time.',
    color: STORY.orange,
    soft: '#ffe7d1',
    icon: 'travel_explore',
  },
]

export function StoryMissionSection() {
  const reducedMotion = useReducedMotion()
  const journeyRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ['start 0.8', 'end 0.45'],
  })

  // CSS motion-path: position the marker along the same path the trail draws.
  const distance = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const trailScale = useTransform(scrollYProgress, [0, 1], [0.02, 0.98])

  return (
    <section
      id="story-mission"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{
        background:
          'linear-gradient(180deg, #fff9ee 0%, #ddf3ff 40%, #ffe9d6 78%, #fff9ee 100%)',
      }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg">
        <div className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <StoryPill color={STORY.skyDeep}>Chapter Four · The Mission</StoryPill>
          </Reveal>
          <StoryHeadline
            text="Our Mission Is to Make Every Mind Curious."
            accentWords={['Curious']}
            className="max-w-3xl text-[clamp(1.875rem,2.9vw,2.25rem)] leading-[1.06] text-story-midnight"
          />
          <Reveal delay={0.12} from="up">
            <p className="max-w-2xl font-body-lg text-lg leading-relaxed text-on-surface-variant">
              Studytainment brings learning and entertainment together to create experiences that
              encourage children to explore, understand, imagine, and grow.
            </p>
          </Reveal>
        </div>

        {/* Journey landscape */}
        <div
          ref={journeyRef}
          className="relative mt-10 overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/50 shadow-[0_24px_70px_rgba(23,37,84,0.12)] backdrop-blur-sm"
        >
          {/* Sky + hills */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #caedff 0%, #e9f9ef 55%, #fdeccc 100%)',
            }}
          />
          <StoryCloud className="absolute left-[6%] top-[8%] w-40 opacity-80" duration={14} />
          <StoryCloud className="absolute right-[8%] top-[14%] w-52 opacity-90" duration={17} delay={3} color="#f2e9ff" />

          {/* Winding path SVG with zones */}
          <div className="relative">
            <svg
              viewBox="0 0 1000 620"
              className="block h-auto w-full"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* layered hills */}
              <path d="M0 120 Q250 40 500 120 T1000 110 V0 H0 Z" fill="#eaf9f0" opacity="0.9" />
              <path d="M0 620 Q300 540 640 610 T1000 590 V620 H0 Z" fill="#d9f2e4" opacity="0.8" />

              {/* the path itself */}
              <path
                id="mission-path"
                d="M60 470 C 220 400, 250 250, 400 240 C 560 230, 560 380, 700 400 C 840 420, 870 330, 950 300"
                fill="none"
                stroke="#f4c98a"
                strokeWidth="26"
                strokeLinecap="round"
                opacity="0.6"
              />
              <path
                d="M60 470 C 220 400, 250 250, 400 240 C 560 230, 560 380, 700 400 C 840 420, 870 330, 950 300"
                fill="none"
                stroke="#ffffff"
                strokeWidth="6"
                strokeDasharray="2 20"
                strokeLinecap="round"
              />

              {/* zone stops */}
              {[
                { x: 60, y: 470 },
                { x: 400, y: 240 },
                { x: 620, y: 330 },
                { x: 700, y: 400 },
                { x: 950, y: 300 },
              ].map((stop, i) => (
                <motion.g
                  key={i}
                  initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 + i * 0.12 }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                  <circle cx={stop.x} cy={stop.y} r="30" fill={ZONES[i].color} />
                  <circle cx={stop.x} cy={stop.y} r="38" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.7" />
                  <circle cx={stop.x + 8} cy={stop.y - 8} r="10" fill="#ffffff" opacity="0.35" />
                </motion.g>
              ))}

              {/* little trees */}
              {[
                { x: 150, y: 250 },
                { x: 260, y: 520 },
                { x: 560, y: 500 },
                { x: 820, y: 470 },
                { x: 900, y: 180 },
              ].map((tree, i) => (
                <g key={i}>
                  <rect x={tree.x - 5} y={tree.y} width="10" height="30" rx="5" fill="#b9814f" />
                  <circle cx={tree.x} cy={tree.y - 14} r="26" fill="#77ddb4" />
                  <circle cx={tree.x - 14} cy={tree.y - 2} r="18" fill="#8fe4c4" />
                  <circle cx={tree.x + 14} cy={tree.y - 4} r="16" fill="#8fe4c4" />
                </g>
              ))}

              {/* tiny sun */}
              <g>
                <circle cx="70" cy="70" r="26" fill="#ffd95a" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <line
                    key={deg}
                    x1="70"
                    y1="26"
                    x2="70"
                    y2="14"
                    stroke="#ffd95a"
                    strokeWidth="5"
                    strokeLinecap="round"
                    transform={`rotate(${deg} 70 70)`}
                  />
                ))}
              </g>
            </svg>

            {/* The traveling explorer: CSS motion-path driven by scroll */}
            {!reducedMotion && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 w-[9%] min-w-[56px]"
                style={{
                  offsetPath: 'path("M60 470 C 220 400, 250 250, 400 240 C 560 230, 560 380, 700 400 C 840 420, 870 330, 950 300")',
                  offsetDistance: distance,
                  offsetRotate: '0deg',
                }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative"
                >
                  <NovaCharacter className="h-auto w-full drop-shadow-lg" />
                  <div className="absolute -right-3 -top-2 h-8 w-8 rounded-full bg-white/90 shadow-md" />
                </motion.div>
              </motion.div>
            )}

            {/* Zone labels overlay */}
            <div className="absolute inset-0 hidden lg:block">
              {ZONES.map((zone, i) => (
                <motion.div
                  key={zone.id}
                  className="absolute xl:flex xl:items-center xl:gap-3"
                  style={{
                    left: `${[4, 30, 52, 58, 74][i]}%`,
                    top: `${[63, 27, 44, 52, 36][i]}%`,
                    transform: `translateY(${i % 2 ? '36px' : '-88px'})`,
                  }}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <span
                    className="rounded-full px-3.5 py-1.5 font-story-display text-sm font-bold text-white shadow-md"
                    style={{ backgroundColor: zone.color }}
                  >
                    {zone.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* progress trail fill behind marker (decorative motion element) */}
          {!reducedMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute bottom-3 left-4 right-4 h-1.5 overflow-hidden rounded-full bg-story-midnight/10"
            >
              <motion.div
                className="h-full origin-left rounded-full bg-story-orange"
                style={{ scaleX: trailScale }}
              />
            </motion.div>
          )}

          {/* Mobile-friendly zone list */}
          <div className="grid grid-cols-1 gap-3 border-t border-white/70 p-5 sm:grid-cols-2 lg:hidden">
            {ZONES.map((zone, i) => (
              <Reveal key={zone.id} delay={i * 0.06} from="up">
                <div className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
                    style={{ backgroundColor: zone.color }}
                  >
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                      {zone.icon}
                    </span>
                  </span>
                  <div>
                    <span className="block font-story-display text-base font-bold text-story-midnight">
                      {zone.label}
                    </span>
                    <span className="text-sm text-on-surface-variant">{zone.text}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
