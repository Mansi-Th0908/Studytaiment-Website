import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { NovaCharacter } from '../story/StoryCharacters'
import { Reveal, StoryHeadline, StoryPill } from '../story/StoryShared'
import { STORY } from '../story/storyTheme'
import { CompassRose, InterestChip, TeenExplorer, YoungAdult } from './OpaCharacters'

/*
 * The signature experience — three developmental worlds joined by one winding
 * path. Childhood is playful; adolescence is energetic and exploratory; the
 * career stage is mature and aspirational. A sticky indicator tracks which
 * stage the visitor is traveling through.
 */

const WORLD_IDS = ['opa-world-foundation', 'opa-world-rising', 'opa-world-career'] as const

const STAGES = [
  { id: 'foundation', label: '1 · Foundation', ages: 'Ages 3–12' },
  { id: 'rising', label: '2 · Rising Star', ages: 'Ages 13–20' },
  { id: 'career', label: '3 · Career Success', ages: 'Ages 21–30' },
] as const

/* ---------------- World One: Foundation (Ages 3–12) ---------------- */

const FOUNDATION_MESSAGES = [
  { id: 'seed', icon: 'psychology_alt', label: 'Curious flower', message: 'Every question is a new beginning.', color: STORY.coral, soft: '#ffe9e2' },
  { id: 'block', icon: 'front_hand', label: 'Helper block', message: 'Small steps create big possibilities.', color: STORY.mint, soft: '#e6f9f1' },
  { id: 'book', icon: 'auto_stories', label: 'Story book', message: 'Discover what makes you special.', color: STORY.lavender, soft: '#efe9ff' },
]

function BloomingFlower({ color, delay }: { color: string; delay: number }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 60 60"
      className="h-10 w-10 sm:h-12 sm:w-12"
      aria-hidden="true"
      initial={reducedMotion ? false : { scale: 0, rotate: -30 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, delay }}
    >
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx="30" cy="18" rx="6.5" ry="10" fill={color} transform={`rotate(${deg} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="6" fill={STORY.yellow} />
    </motion.svg>
  )
}

function FlutterButterfly({ delay }: { delay: number }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 60 44"
      className="h-7 w-9"
      aria-hidden="true"
      animate={reducedMotion ? undefined : { x: [0, 26, 0], y: [0, -18, 0], rotate: [-6, 8, -6] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{ overflow: 'visible' }}
    >
      <ellipse cx="22" cy="16" rx="12" ry="9" fill={STORY.lavender} />
      <ellipse cx="38" cy="16" rx="12" ry="9" fill={STORY.lavender} opacity="0.75" />
      <ellipse cx="24" cy="30" rx="8" ry="6" fill={STORY.yellow} />
      <ellipse cx="36" cy="30" rx="8" ry="6" fill={STORY.yellow} opacity="0.75" />
      <rect x="28" y="10" width="4" height="26" rx="2" fill="#5f4b6e" />
    </motion.svg>
  )
}

/** A tappable foundation object that reveals a short message. */
function TapMessage({ item, open, onToggle }: { item: (typeof FOUNDATION_MESSAGES)[number]; open: boolean; onToggle: () => void }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="relative flex flex-col items-center gap-1.5">
      <AnimatePresence>
        {open && (
          <motion.div
            role="status"
            className="absolute -top-2 left-1/2 z-10 w-44 -translate-x-1/2 -translate-y-full rounded-2xl bg-white p-3 text-center font-story-display text-sm font-semibold text-story-midnight shadow-lg"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 8, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 240, damping: 16 }}
          >
            “{item.message}”
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 rounded-sm bg-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex h-16 w-16 items-center justify-center rounded-2xl shadow-md transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-story-orange/30 hover:scale-105 active:scale-95 sm:h-[4.5rem] sm:w-[4.5rem]"
        style={{ backgroundColor: item.soft }}
        whileHover={reducedMotion ? undefined : { rotate: [0, -6, 6, 0] }}
        transition={{ duration: 0.6 }}
      >
        <span className="material-symbols-outlined text-[28px]" style={{ color: item.color }} aria-hidden="true">
          {item.icon}
        </span>
      </motion.button>
      <span className="font-story-display text-[11px] font-bold text-story-midnight/70 sm:text-xs">
        {item.label}
      </span>
    </div>
  )
}

function FoundationWorld() {
  const reducedMotion = useReducedMotion()
  const [openMessage, setOpenMessage] = useState<string | null>('seed')

  return (
    <div className="relative">
      {/* sparkles dotting the garden */}
      {[
        { l: '10%', t: '18%' }, { l: '82%', t: '12%' }, { l: '66%', t: '30%' }, { l: '22%', t: '58%' },
      ].map((pos, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute h-2 w-2 rounded-full"
          style={{ left: pos.l, top: pos.t, backgroundColor: STORY.yellow }}
          animate={reducedMotion ? undefined : { opacity: [0.3, 1, 0.3], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 2.4, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col gap-3">
          <StoryPill color={STORY.mint}>Stage One · {STAGES[0].ages}</StoryPill>
          <StoryHeadline
            text="Little Discoveries. Strong Foundations."
            accentWords={['Foundations']}
            className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.08] text-[#14523c]"
          />
          <p className="max-w-lg font-body-lg text-lg leading-relaxed text-[#2c5347]">
            The early years are a time for curiosity, exploration, confidence, and building the
            foundations for life — social skills, emotional awareness, and the joy of figuring
            things out through play.
          </p>
          <Reveal delay={0.15} from="up">
            <div className="mt-4 flex flex-wrap gap-2">
              {['Curiosity', 'Confidence', 'Social skills', 'Emotional awareness', 'Playful exploration'].map(
                (theme, i) => (
                  <motion.span
                    key={theme}
                    className="rounded-full bg-white/90 px-3.5 py-1.5 font-story-display text-xs font-bold text-[#14523c] shadow-sm"
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 200, damping: 14 }}
                  >
                    {theme}
                  </motion.span>
                ),
              )}
            </div>
          </Reveal>
        </div>

        {/* garden scene */}
        <div className="relative flex flex-col items-center justify-center gap-8 rounded-[2rem] border border-white/80 bg-linear-to-b from-white/70 via-[#fef3df]/60 to-[#d9f4e6]/70 p-5 shadow-inner md:p-7">
          {/* interactive objects row */}
          <div className="relative z-10 flex items-start gap-3 sm:gap-6">
            {FOUNDATION_MESSAGES.map((item) => (
              <TapMessage
                key={item.id}
                item={item}
                open={openMessage === item.id}
                onToggle={() => setOpenMessage((current) => (current === item.id ? null : item.id))}
              />
            ))}
          </div>

          {/* garden row: blooming flowers + butterflies */}
          <div className="relative flex items-center justify-center gap-2 sm:gap-3">
            <BloomingFlower color={STORY.coral} delay={0.1} />
            <BloomingFlower color={STORY.yellow} delay={0.35} />
            <FlutterButterfly delay={0.4} />
            <BloomingFlower color={STORY.lavender} delay={0.6} />
          </div>
          <FlutterButterfly delay={2.2} />

          {/* assembling puzzle + explorer */}
          <div className="relative flex w-full items-end justify-center">
            {/* puzzle pieces slide together */}
            <svg viewBox="0 0 220 130" className="h-28 w-52 shrink-0" aria-hidden="true">
              {[
                { x: 18, y: 44, c: STORY.coral, d: 0 },
                { x: 92, y: 44, c: STORY.skyDeep, d: 0.25 },
                { x: 18, y: 4, c: STORY.yellow, d: 0.5 },
                { x: 92, y: 4, c: STORY.mint, d: 0.75 },
              ].map((piece, i) => (
                <motion.rect
                  key={i}
                  x={piece.x}
                  y={piece.y}
                  width="86"
                  height="84"
                  rx="12"
                  fill={piece.c}
                  initial={reducedMotion ? false : { x: (i - 1.5) * 46, opacity: 0, rotate: i % 2 ? 14 : -14 }}
                  whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 90, damping: 13, delay: 0.9 + piece.d }}
                />
              ))}
            </svg>
            {/* open book releasing stars */}
            <motion.div
              className="relative -ml-8"
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4, type: 'spring', stiffness: 110, damping: 14 }}
            >
              <svg viewBox="0 0 150 90" className="h-24 w-36" aria-hidden="true" style={{ overflow: 'visible' }}>
                <path d="M75 28 C58 16 34 15 24 22 L24 66 C34 60 58 61 75 72 Z" fill={STORY.coral} />
                <path d="M75 28 C92 16 116 15 126 22 L126 66 C116 60 92 61 75 72 Z" fill="#ffffff" />
                <path d="M75 28 L75 72" stroke="#d3d9ea" strokeWidth="2.5" />
                {[0, 1, 2, 3].map((i) => (
                  <motion.circle
                    key={i}
                    cx={34 + i * 26}
                    cy="18"
                    r="3.5"
                    fill={i % 2 ? STORY.yellow : STORY.orange}
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={reducedMotion ? undefined : { opacity: [0, 1, 0], y: [0, -22, -32], cx: [34 + i * 26, 30 + i * 24, 28 + i * 22] }}
                    transition={{ duration: 2.6, delay: i * 0.45, repeat: Infinity, ease: 'easeOut' }}
                  />
                ))}
              </svg>
            </motion.div>
            <NovaCharacter className="h-auto w-[34%] max-w-[150px] shrink-0" waving />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- World Two: Rising Star (Ages 13–20) ---------------- */

interface InterestCardData {
  id: string
  label: string
  icon: string
  color: string
  soft: string
  description: string
  branch: 'code' | 'design' | 'sports' | 'lead' | 'academic' | 'business'
}

const INTERESTS: InterestCardData[] = [
  {
    id: 'tech',
    label: 'Technology & innovation',
    icon: 'code',
    color: STORY.skyDeep,
    soft: '#e3f5ff',
    description: 'Build, break and rebuild — apps, robotics, circuits and the ideas that power them.',
    branch: 'code',
  },
  {
    id: 'arts',
    label: 'Creative arts & design',
    icon: 'palette',
    color: STORY.lavender,
    soft: '#efe9ff',
    description: 'Sketches, instruments, cameras and stages — expression that becomes identity.',
    branch: 'design',
  },
  {
    id: 'sports',
    label: 'Sports & performance',
    icon: 'sports_soccer',
    color: STORY.mint,
    soft: '#e6f9f1',
    description: 'Discipline, teamwork and the confidence that comes from training and play.',
    branch: 'sports',
  },
  {
    id: 'comms',
    label: 'Communication & leadership',
    icon: 'record_voice_over',
    color: STORY.coral,
    soft: '#ffe9e2',
    description: 'Debate, present, lead a team — the skills that make ideas land.',
    branch: 'lead',
  },
  {
    id: 'academic',
    label: 'Academic & higher education',
    icon: 'school',
    color: '#c98a1b',
    soft: '#fff3c4',
    description: 'Subjects, streams and study skills explored with clarity instead of pressure.',
    branch: 'academic',
  },
  {
    id: 'business',
    label: 'Entrepreneurship & new ideas',
    icon: 'lightbulb',
    color: STORY.orange,
    soft: '#ffe7d1',
    description: 'Turn a spark into a project — try things, iterate, and learn what building takes.',
    branch: 'business',
  },
]

function RisingWorld() {
  const reducedMotion = useReducedMotion()
  const [selected, setSelected] = useState<InterestCardData | null>(INTERESTS[0])

  return (
    <div className="relative">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
        {/* interest cards + explorer */}
        <div className="relative">
          <div className="mb-4 flex items-start gap-3 sm:gap-5">
            <div className="hidden shrink-0 sm:block">
              <CompassRose size={104} />
            </div>
            <div className="flex flex-1 flex-wrap items-start gap-2.5">
              {INTERESTS.map((interest, i) => (
                <motion.div
                  key={interest.id}
                  initial={reducedMotion ? false : { opacity: 0, x: i % 2 ? 30 : -30, y: 14 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 15, delay: 0.15 + i * 0.07 }}
                >
                  <InterestChip
                    label={interest.label}
                    icon={interest.icon}
                    color={interest.color}
                    soft={interest.soft}
                    selectable
                    selected={selected?.id === interest.id}
                    onClick={() => setSelected((current) => (current?.id === interest.id ? null : interest))}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* selected description + illuminated branch */}
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                className="rounded-2xl bg-white/85 p-4 shadow-md"
                initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <p className="flex items-start gap-2 text-sm leading-relaxed text-[#27304e]">
                  <span className="material-symbols-outlined mt-0.5 text-[20px]" style={{ color: selected.color }} aria-hidden="true">
                    {selected.icon}
                  </span>
                  <span>
                    <span className="font-story-display font-bold text-[#27304e]">{selected.label}.</span>{' '}
                    {selected.description} Exploring doesn&apos;t lock in a decision — it simply
                    makes future choices more informed ones.
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* branching path */}
          <svg viewBox="0 0 360 120" className="mt-4 h-auto w-full" aria-hidden="true">
            <path
              d="M20 100 C 120 100, 120 40, 180 40"
              fill="none"
              stroke="#c9d3f2"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {[
              { branch: 'code', d: 'M180 40 C 260 40, 280 18, 340 14', c: STORY.skyDeep },
              { branch: 'design', d: 'M180 40 C 250 34, 280 60, 340 56', c: STORY.lavender },
              { branch: 'sports', d: 'M180 40 C 260 56, 280 92, 340 100', c: STORY.mint },
            ].map((branch, i) => (
              <motion.path
                key={branch.branch}
                d={branch.d}
                fill="none"
                stroke={branch.c}
                strokeWidth={selected?.branch === branch.branch ? 7 : 4}
                strokeLinecap="round"
                opacity={selected ? (selected.branch === branch.branch ? 1 : 0.3) : 0.6}
                initial={reducedMotion ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.2, ease: 'easeInOut' }}
                style={{ transformOrigin: 'center', transition: 'stroke-width 0.3s, opacity 0.3s' }}
              />
            ))}
            <circle cx="20" cy="100" r="7" fill={STORY.yellow} />
          </svg>

          <p className="mt-2 font-story-display text-xs font-semibold text-[#27304e]/70">
            Select an interest to light its path.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <StoryPill color={STORY.lavender}>Stage Two · {STAGES[1].ages}</StoryPill>
          <StoryHeadline
            text="Find Your Spark. Explore Your Possibilities."
            accentWords={['Spark']}
            className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.08] text-[#27304e]"
          />
          <p className="max-w-lg font-body-lg text-lg leading-relaxed text-[#454f73]">
            Adolescence is a time to discover strengths, explore interests, develop confidence,
            and make more informed decisions about the future — with a compass instead of a
            timetable.
          </p>
          <div className="relative mt-4 flex w-full max-w-[300px] items-end justify-center self-center lg:-ml-6">
            <TeenExplorer className="h-auto w-[58%]" />
            <motion.span
              aria-hidden="true"
              className="absolute right-0 top-2 material-symbols-outlined text-[26px]"
              style={{ color: STORY.orange }}
              animate={reducedMotion ? undefined : { rotate: [0, 12, -8, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              sports_esports
            </motion.span>
            <motion.span
              aria-hidden="true"
              className="absolute left-0 top-6 material-symbols-outlined text-[24px]"
              style={{ color: STORY.skyDeep }}
              animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            >
              motorbike
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- World Three: Career Success (Ages 21–30) ---------------- */

const CAREER_SKILLS = [
  { label: 'Skill development', icon: 'construction', color: '#2e6d76' },
  { label: 'Career exploration', icon: 'travel_explore', color: '#b8762a' },
  { label: 'Mentorship & guidance', icon: 'supervisor_account', color: '#5f5bb0' },
  { label: 'Portfolio building', icon: 'folder_special', color: '#b05a3c' },
  { label: 'Professional confidence', icon: 'workspace_premium', color: '#8a6d1d' },
  { label: 'Independent decisions', icon: 'swipe_up_alt', color: '#34798c' },
]

function CareerWorld() {
  const reducedMotion = useReducedMotion()

  return (
    <div className="relative">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.15fr]">
        <div className="flex flex-col gap-3">
          <StoryPill color="#2e6d76">Stage Three · {STAGES[2].ages}</StoryPill>
          <StoryHeadline
            text="Turn Your Potential Into Your Next Chapter."
            accentWords={['Chapter']}
            className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.08] text-[#172554]"
          />
          <p className="max-w-lg font-body-lg text-lg leading-relaxed text-[#33405f]">
            Build skills, develop confidence, explore professional possibilities, and move toward
            your goals with greater clarity — guided by mentors who have walked similar roads.
          </p>

          {/* skill symbols organize into a tidy composition */}
          <div className="mt-3 flex flex-wrap gap-2">
            {CAREER_SKILLS.map((skill, i) => (
              <motion.span
                key={skill.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 font-story-display text-xs font-bold text-[#33405f] shadow-sm"
                initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 170, damping: 14, delay: 0.2 + i * 0.08 }}
              >
                <span className="material-symbols-outlined text-[16px]" style={{ color: skill.color }} aria-hidden="true">
                  {skill.icon}
                </span>
                {skill.label}
              </motion.span>
            ))}
          </div>

          {/* progressively illuminating career path */}
          <svg viewBox="0 0 420 90" className="mt-2 h-auto w-full max-w-md" aria-hidden="true">
            <motion.path
              d="M10 70 C 90 70, 130 30, 210 30 C 290 30, 320 62, 410 62"
              fill="none"
              stroke="#b98d3c"
              strokeWidth="6"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0.25 }}
              whileInView={{ pathLength: 1, opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.4 }}
            />
            <motion.path
              d="M10 70 C 90 70, 130 30, 210 30 C 290 30, 320 62, 410 62"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="1 12"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.7 }}
            />
          </svg>
          <p className="text-xs text-[#33405f]/70">
            No two maps look alike — the route depends on the person, the goals, and the program.
          </p>
        </div>

        {/* horizon scene */}
        <div className="relative overflow-hidden rounded-[2rem] p-6 pt-5 shadow-inner md:p-8" style={{ background: 'linear-gradient(180deg, #101d42 0%, #23406e 42%, #caa268 78%, #ffd9a0 100%)' }}>
          {/* brightening horizon */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: 'radial-gradient(120% 90% at 50% 100%, rgba(255,217,90,0.85), rgba(255,157,107,0.35) 55%, transparent 80%)' }}
            initial={reducedMotion ? { opacity: 0.7 } : { opacity: 0.15 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
          {/* sun */}
          <motion.span
            aria-hidden="true"
            className="absolute bottom-6 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle at 40% 40%, #fff7d6, #ffb35c)' }}
            initial={reducedMotion ? false : { y: 40, opacity: 0.3 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />
          {/* skyline silhouette */}
          <svg viewBox="0 0 300 60" className="absolute bottom-10 left-0 w-full opacity-25" aria-hidden="true">
            <path d="M0 60 V38 h20 v-12 h16 v12 h14 v-20 h18 v20 h12 v-8 h18 v8 h20 v-16 h16 v16 h14 v-10 h18 v10 h16 v-18 h20 v18 h14 V60 Z" fill="#172554" />
          </svg>
          {/* floating portfolio pages */}
          {!reducedMotion && (
            <>
              {[
                { l: '6%', t: '14%', c: '#cfeaff', d: 0 },
                { l: '76%', t: '10%', c: '#ffe3bd', d: 1.2 },
                { l: '64%', t: '30%', c: '#dcd2ff', d: 2.1 },
              ].map((page, i) => (
                <motion.div
                  key={i}
                  className="absolute h-9 w-12 rounded-md shadow-md"
                  style={{ left: page.l, top: page.t, backgroundColor: page.c }}
                  animate={{ y: [0, -12, 0], rotate: [-6 + i * 8, 8 - i * 4, -6 + i * 8] }}
                  transition={{ duration: 5 + i, delay: page.d, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </>
          )}
          <div className="relative flex items-end justify-center pt-16">
            <YoungAdult className="h-auto w-[46%] max-w-[220px]" />
          </div>
          <p className="relative mt-2 text-center font-story-display text-sm font-bold text-white/85">
            The horizon is not a destination — it is the next chapter, chosen one step at a time.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------------- World section wrapper + progress ---------------- */

/** Wrapper giving each world its environment + chapter framing. */
function WorldFrame({
  id,
  children,
  connector = false,
}: {
  id: string
  children: ReactNode
  connector?: boolean
}) {
  const reducedMotion = useReducedMotion()

  return (
    <div>
      {connector && (
        <div aria-hidden="true" className="mx-4 h-16 overflow-hidden md:h-20">
          <svg viewBox="0 0 1000 60" preserveAspectRatio="none" className="h-full w-full">
            <motion.path
              d="M0 30 C 160 4, 340 56, 520 30 S 840 4, 1000 30"
              fill="none"
              stroke={STORY.yellow}
              strokeWidth="6"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      )}
      <section
        id={id}
        className="scroll-mt-[calc(var(--header-height)+56px)] px-margin py-6 md:px-margin-md lg:px-margin-lg md:py-8"
      >
        {children}
      </section>
    </div>
  )
}

export function OpaGrowthWorldsSection() {
  const reducedMotion = useReducedMotion()
  const [activeStage, setActiveStage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.7', 'end 0.7'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = value < 0.34 ? 0 : value < 0.67 ? 1 : 2
    setActiveStage((current) => (current === next ? current : next))
  })

  const jumpTo = (index: number) => {
    const element = document.getElementById(WORLD_IDS[index])
    if (!element) return
    element.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div ref={containerRef} id="opa-worlds" className="relative scroll-mt-[var(--header-height)]">
      <div className="mx-auto max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg">
        {/* heading */}
        <div className="flex flex-col items-center gap-3 text-center">
          <StoryPill color={STORY.skyDeep}>The Signature Journey</StoryPill>
          <StoryHeadline
            text="One Connected Journey. Three Evolving Worlds."
            accentWords={['Journey']}
            className="max-w-3xl text-[clamp(1.875rem,2.9vw,2.25rem)] leading-[1.06] text-story-midnight"
          />
        </div>

        {/* sticky stage indicator */}
        <div className="sticky top-[var(--header-height)] z-30 mt-8 flex justify-center">
          <div className="flex items-center gap-1 rounded-2xl border border-white/60 bg-white/80 p-1.5 shadow-md backdrop-blur">
            {STAGES.map((stage, i) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => jumpTo(i)}
                aria-current={activeStage === i}
                className={`rounded-xl px-3 py-2 font-story-display text-xs font-bold transition-all sm:text-sm ${
                  activeStage === i
                    ? 'bg-story-orange text-white shadow'
                    : 'text-story-midnight/60 hover:text-story-midnight'
                }`}
              >
                {stage.label}
                <span className="ml-1 hidden opacity-70 sm:inline">· {stage.ages}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* WORLD ONE */}
      <WorldFrame id={WORLD_IDS[0]}>
        <div className="mt-10 overflow-hidden rounded-[2.5rem] border border-white/80 bg-[#f4fbf5] p-5 shadow-[0_24px_70px_rgba(20,82,60,0.08)] md:p-9">
          <FoundationWorld />
        </div>
      </WorldFrame>

      {/* WORLD TWO */}
      <WorldFrame id={WORLD_IDS[1]} connector>
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-[#eef1ff]/70 p-5 shadow-[0_24px_70px_rgba(39,48,78,0.10)] md:p-9">
          <RisingWorld />
        </div>
      </WorldFrame>

      {/* WORLD THREE */}
      <WorldFrame id={WORLD_IDS[2]} connector>
        <CareerWorld />
      </WorldFrame>
    </div>
  )
}
