import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { NovaCharacter } from '../story/StoryCharacters'
import { Reveal, StoryHeadline, StoryPill } from '../story/StoryShared'
import { STORY } from '../story/storyTheme'
import { TeenExplorer, YoungAdult } from './OpaCharacters'

/*
 * "Guidance That Grows With You" — an interactive timeline showing how OPA's
 * guidance changes across the Foundation, Rising Star and Career stages.
 */

interface GuidanceStage {
  id: string
  stage: string
  ages: string
  title: string
  text: string
  areas: string[]
  color: string
  soft: string
  Character: (props: { className?: string }) => React.JSX.Element
}

const GUIDANCE: GuidanceStage[] = [
  {
    id: 'foundation',
    stage: 'Foundation',
    ages: 'Early childhood',
    title: 'Understanding the Child',
    text: 'Guidance starts with getting to know each child — how they play, what they respond to, and what steady early development looks like for them.',
    areas: ['Observing how each child learns and plays', 'Early confidence and communication habits', 'Foundational life skills woven into everyday play', 'Ways for parents to build on the guidance at home'],
    color: STORY.mint,
    soft: '#e6f9f1',
    Character: NovaCharacter,
  },
  {
    id: 'rising',
    stage: 'Rising Star',
    ages: 'Adolescence',
    title: 'Exploring & Building Confidence',
    text: 'As interests widen, guidance focuses on exploring directions, strengthening confidence, and considering future choices without pressuring a final decision.',
    areas: ['Interest exploration across study, arts, sport and technology', 'Confidence, communication and decision-making practice', 'Study habits and personal organisation', 'Early conversations around future pathways'],
    color: STORY.lavender,
    soft: '#efe9ff',
    Character: TeenExplorer,
  },
  {
    id: 'career',
    stage: 'Career Success',
    ages: 'Young adulthood',
    title: 'Skills & Professional Pathways',
    text: 'Guidance turns toward the professional world — shaping relevant skills, exploring pathways, and building the portfolio and clarity to take real steps.',
    areas: ['Skills aligned with personal goals and interests', 'Career-pathway exploration with mentors', 'Portfolio and profile building', 'Independent decision-making for the next chapter'],
    color: '#2e6d76',
    soft: '#e4f2f4',
    Character: YoungAdult,
  },
]

export function OpaGuidanceSection() {
  const reducedMotion = useReducedMotion()
  const [activeId, setActiveId] = useState<string>('foundation')
  const active = GUIDANCE.find((g) => g.id === activeId) ?? GUIDANCE[0]

  return (
    <section
      id="opa-guidance"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{ background: 'linear-gradient(180deg, #f7f9ff 0%, #ffffff 100%)' }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg">
        <div className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <StoryPill color={STORY.skyDeep}>Guidance Over Time</StoryPill>
          </Reveal>
          <StoryHeadline
            text="Guidance That Grows With You."
            accentWords={['Grows']}
            className="max-w-3xl text-[clamp(1.875rem,2.9vw,2.25rem)] leading-[1.06] text-story-midnight"
          />
          <Reveal delay={0.1} from="up">
            <p className="max-w-2xl font-body-lg text-lg leading-relaxed text-on-surface-variant">
              The shape of support changes with each stage. What a learner receives depends on
              their stage, needs, program, and availability — not on padded promises.
            </p>
          </Reveal>
        </div>

        {/* ---------- Timeline: horizontal route (desktop) ---------- */}
        <div className="relative mt-10 hidden md:block">
          {/* connected illustrated route */}
          <svg viewBox="0 0 900 90" className="absolute inset-x-0 top-[42px] h-[90px] w-full" aria-hidden="true" preserveAspectRatio="none">
            <motion.path
              d="M80 48 C 220 8, 340 84, 450 48 S 680 8, 820 48"
              fill="none"
              stroke="#e3e8f4"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <motion.path
              d="M80 48 C 220 8, 340 84, 450 48 S 680 8, 820 48"
              fill="none"
              stroke={STORY.yellow}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="1 16"
              initial={reducedMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            />
          </svg>

          <div className="relative grid grid-cols-3 gap-4" role="tablist" aria-label="Guidance stages">
            {GUIDANCE.map((stage, i) => {
              const isActive = activeId === stage.id
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(stage.id)}
                  className="group flex flex-col items-center gap-3 focus-visible:outline-none"
                >
                  <motion.span
                    className={`relative flex h-16 w-16 items-center justify-center rounded-full border-4 shadow-md transition-colors ${isActive ? 'text-white' : 'bg-white text-story-midnight'}`}
                    style={{
                      backgroundColor: isActive ? stage.color : '#ffffff',
                      borderColor: isActive ? stage.color : '#e3e8f4',
                    }}
                    initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.2 + i * 0.15 }}
                    whileHover={reducedMotion ? undefined : { scale: 1.08 }}
                  >
                    <span className="font-story-display text-lg font-extrabold">{i + 1}</span>
                    {isActive && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute -inset-1.5 rounded-full border-2"
                        style={{ borderColor: `${stage.color}55` }}
                        animate={reducedMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.9, 0.2, 0.9] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                  </motion.span>
                  <span
                    className={`rounded-xl px-4 py-2 font-story-display text-sm font-bold shadow-sm transition-colors ${
                      isActive ? 'text-white' : 'bg-white text-story-midnight/70'
                    }`}
                    style={isActive ? { backgroundColor: stage.color } : undefined}
                  >
                    {stage.stage}
                    <span className="ml-1.5 font-semibold opacity-75">{stage.ages}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* stage panel */}
          <motion.div
            className="mt-8 overflow-hidden rounded-[2rem] border border-white bg-white/90 shadow-[0_20px_56px_rgba(23,37,84,0.09)]"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="grid grid-cols-[200px_1fr] items-center gap-6 p-7"
                initial={reducedMotion ? false : { opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, x: -18 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className="relative flex h-full items-center justify-center">
                  <span
                    className="absolute inset-3 rounded-full"
                    style={{ backgroundColor: active.soft }}
                  />
                  <motion.div
                    className="relative w-[76%]"
                    animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <active.Character className="h-auto w-full" />
                  </motion.div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-story-display text-2xl font-bold text-story-midnight">
                    {active.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{active.text}</p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5 pt-1">
                    {active.areas.map((area) => (
                      <li key={area} className="flex items-start gap-2 text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined mt-0.5 text-[16px] shrink-0" style={{ color: active.color }} aria-hidden="true">
                          arrow_forward
                        </span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ---------- Timeline: vertical (mobile) ---------- */}
        <div className="mt-10 flex flex-col md:hidden">
          {GUIDANCE.map((stage, i) => (
            <Reveal key={stage.id} delay={i * 0.08}>
              <div className="relative flex gap-4 pb-6">
                {/* rail */}
                {i < GUIDANCE.length - 1 && (
                  <span aria-hidden="true" className="absolute left-6 top-12 bottom-0 w-1 rounded-full bg-surface-container-high" />
                )}
                <span
                  className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-story-display font-extrabold text-white shadow-md"
                  style={{ backgroundColor: stage.color }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 rounded-2xl bg-white p-4 shadow-md">
                  <span
                    className="rounded-full px-2.5 py-0.5 font-story-display text-[11px] font-bold text-white"
                    style={{ backgroundColor: stage.color }}
                  >
                    {stage.stage}
                  </span>
                  <h3 className="mt-1.5 font-story-display text-lg font-bold text-story-midnight">
                    {stage.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{stage.text}</p>
                  <ul className="mt-2 flex flex-col gap-1">
                    {stage.areas.map((area) => (
                      <li key={area} className="flex items-start gap-2 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined mt-0.5 shrink-0 text-[14px]" style={{ color: stage.color }} aria-hidden="true">
                          arrow_forward
                        </span>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
