import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal, StoryHeadline, StoryPill } from '../story/StoryShared'
import { STORY } from '../story/storyTheme'
import { MentorSeminarScene, YoungAdult } from './OpaCharacters'

/*
 * "How Your Journey Begins" — the real three-step process: attend a seminar,
 * explore membership, begin the journey. Steps reveal sequentially and a line
 * draws itself between the stations.
 */

const STEPS = [
  {
    number: '01',
    title: 'Attend a Seminar',
    text: 'Understand the OPA approach, explore the available guidance, and ask questions.',
    color: STORY.orange,
    soft: '#ffe7d1',
  },
  {
    number: '02',
    title: 'Explore Membership',
    text: 'Understand the available membership, guidance options, and the developmental stage relevant to your needs.',
    color: STORY.lavender,
    soft: '#efe9ff',
  },
  {
    number: '03',
    title: 'Begin the Journey',
    text: 'Explore the next steps in guidance, development, and mentorship based on the applicable program.',
    color: STORY.mint,
    soft: '#e6f9f1',
  },
]

/** Small illustrated figure per step, used as a compact scene header. */
function StepArt({ step }: { step: number }) {
  const reducedMotion = useReducedMotion()

  if (step === 0) {
    return <MentorSeminarScene className="h-auto w-full max-w-[300px]" />
  }

  if (step === 1) {
    // open guidebook with a map and discovery symbols
    return (
      <svg viewBox="0 0 240 150" aria-hidden="true" className="h-auto w-full max-w-[230px]" style={{ overflow: 'visible' }}>
        <motion.g animate={reducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}>
          <path d="M120 46 C96 32 60 30 44 38 L44 108 C60 100 96 102 120 114 Z" fill={STORY.lavender} />
          <path d="M120 46 C144 32 180 30 196 38 L196 108 C180 100 144 102 120 114 Z" fill="#ffffff" />
          <path d="M120 46 L120 114" stroke="#cfc7e8" strokeWidth="3" />
          {/* map dots + trail */}
          <path
            d="M64 92 Q86 78 100 88 T150 76"
            fill="none"
            stroke={STORY.orange}
            strokeWidth="3"
            strokeDasharray="1 8"
            strokeLinecap="round"
          />
          <circle cx="64" cy="92" r="5" fill={STORY.orange} />
          <circle cx="150" cy="76" r="5" fill="#77ddb4" />
          {/* compass pin */}
          <path d="M168 44 l5 12 -5 -3 -5 3 Z" fill={STORY.coral} />
        </motion.g>
      </svg>
    )
  }

  // family beginning a glowing path
  return (
    <svg viewBox="0 0 260 130" aria-hidden="true" className="h-auto w-full max-w-[250px]" style={{ overflow: 'visible' }}>
      <motion.path
        d="M12 106 C 90 106, 120 66, 248 60"
        fill="none"
        stroke={STORY.yellow}
        strokeWidth="6"
        strokeLinecap="round"
        initial={reducedMotion ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.3 }}
      />
      {/* parent + child walking */}
      <g transform="translate(18 52)">
        <rect x="0" y="18" width="22" height="28" rx="9" fill="#8d5bd0" />
        <circle cx="11" cy="10" r="12" fill="#f3c19d" />
        <path d="M0 6 Q0 -6 11 -7 Q22 -6 22 6 Q16 -1 11 0 Q6 -1 0 6 Z" fill="#4d2f1d" />
      </g>
      <g transform="translate(48 70)">
        <rect x="0" y="10" width="15" height="18" rx="6" fill={STORY.orange} />
        <circle cx="7" cy="4" r="8" fill="#ffd9b8" />
        <path d="M0 -1 Q0 -8 7 -9 Q14 -8 14 -1 Q9 -5 7 -4 Q4 -5 0 -1 Z" fill="#7a4a2b" />
      </g>
      {/* young adult walking ahead */}
      <motion.g
        transform="translate(196 30)"
        animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="0" y="14" width="18" height="24" rx="8" fill="#2e6d76" />
        <circle cx="9" cy="6" r="9" fill="#e0a878" />
        <path d="M0 2 Q0 -6 9 -7 Q18 -6 18 2 Q13 -3 9 -2 Q4 -3 0 2 Z" fill="#2b2018" />
      </motion.g>
      {/* sparkling path forward */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={214 + i * 14}
          cy={54 - i * 2}
          r="3"
          fill={STORY.yellow}
          animate={reducedMotion ? undefined : { opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        />
      ))}
    </svg>
  )
}

export function OpaBeginSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="opa-begin"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fff4e8 100%)' }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg">
        <div className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <StoryPill color={STORY.orange}>Getting Started</StoryPill>
          </Reveal>
          <StoryHeadline
            text="A Simple First Step Toward a Clearer Journey."
            accentWords={['Simple']}
            className="max-w-3xl text-[clamp(1.875rem,2.9vw,2.25rem)] leading-[1.06] text-story-midnight"
          />
        </div>

        <div className="relative mt-10">
          {/* connector line across stations (desktop) */}
          <svg
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute left-0 right-0 top-[128px] hidden h-10 w-full md:block"
          >
            <motion.path
              d="M0 20 C 200 -6, 300 46, 500 20 S 800 -6, 1000 20"
              fill="none"
              stroke={STORY.orange}
              strokeWidth="4"
              strokeDasharray="2 12"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </svg>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5">
            {STEPS.map((step, i) => (
              <motion.article
                key={step.number}
                className="relative flex flex-col items-center gap-3 rounded-[2rem] border border-white bg-white/85 p-6 text-center shadow-[0_18px_48px_rgba(23,37,84,0.08)]"
                initial={reducedMotion ? false : { opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 110, damping: 15, delay: 0.25 * i }}
              >
                <span
                  className="absolute -left-3 -top-3 z-10 flex h-11 w-11 items-center justify-center rounded-2xl font-story-display text-lg font-extrabold text-white shadow-md"
                  style={{ backgroundColor: step.color, transform: 'rotate(-6deg)' }}
                >
                  {step.number}
                </span>
                <div className="flex min-h-[150px] items-center justify-center pt-3">
                  <StepArt step={i} />
                </div>
                <h3 className="font-story-display text-xl font-bold text-story-midnight">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-on-surface-variant">{step.text}</p>
              </motion.article>
            ))}
          </div>

          <Reveal from="up" className="mt-10 flex justify-center">
            <motion.a
              href="/#stories"
              className="group inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-story-display text-base font-bold text-story-midnight shadow-md ring-2 ring-story-orange/20 hover:ring-story-orange/60"
              whileHover={reducedMotion ? undefined : { scale: 1.04, y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16 }}
            >
              Explore Upcoming Seminars
              <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                event_available
              </span>
            </motion.a>
          </Reveal>
          <p className="mx-auto mt-3 max-w-md text-center text-xs text-on-surface-variant/70">
            No dates or fees are invented here — seminar details are shared through Studytainment’s
            channels and the footer contact points.
          </p>
          <div className="pointer-events-none absolute -bottom-8 right-2 hidden opacity-70 lg:block">
            <YoungAdult className="h-auto w-24" />
          </div>
        </div>
      </div>
    </section>
  )
}
