import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal, StoryHeadline, StoryPill } from '../story/StoryShared'
import { STORY } from '../story/storyTheme'

/*
 * "Because Growing Up Is a Journey for Families Too."
 * A calm, parent-focused scene: a parent and child talking beneath a tree,
 * gentle conversation bubbles, a reassuring mentor presence, and three
 * concise benefits.
 */

const LEAVES = [
  { l: '18%', t: '6%', c: '#8fd8a8', d: 0 },
  { l: '34%', t: '2%', c: '#a5e3bd', d: 0.8 },
  { l: '52%', t: '8%', c: '#8fd8a8', d: 1.6 },
  { l: '68%', t: '3%', c: '#a5e3bd', d: 2.4 },
  { l: '82%', t: '9%', c: '#8fd8a8', d: 1.2 },
] as const

const BENEFITS = [
  {
    icon: 'family_restroom',
    title: 'Better understanding',
    text: 'See individual strengths and needs more clearly — what energises your child and what weighs on them.',
    color: STORY.lavender,
    soft: '#efe9ff',
  },
  {
    icon: 'quiz',
    title: 'Age-relevant answers',
    text: 'Guidance around the questions that actually come up at each age, from early confidence to future choices.',
    color: STORY.orange,
    soft: '#ffe7d1',
  },
  {
    icon: 'tips_and_updates',
    title: 'Growth beyond grades',
    text: 'A more thoughtful, low-pressure way of talking about development — with school progress staying where it belongs.',
    color: STORY.mint,
    soft: '#e6f9f1',
  },
] as const

export function OpaFamilySection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="opa-family"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{
        background:
          'radial-gradient(800px 400px at 20% 10%, rgba(143,216,168,0.22), transparent 70%), linear-gradient(180deg, #f2faf4 0%, #fffdf7 100%)',
      }}
    >
      <div className="mx-auto grid max-w-[var(--content-max-width)] grid-cols-1 items-center gap-10 px-margin md:px-margin-md lg:grid-cols-2 lg:px-margin-lg">
        {/* tree scene */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-linear-to-b from-[#eff8f0] to-[#fdf6e9] p-6 shadow-[0_20px_56px_rgba(20,82,60,0.08)]">
            {/* tree canopy + falling leaves */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28">
              {LEAVES.map((leaf, i) => (
                <motion.span
                  key={i}
                  className="absolute h-2.5 w-4 rounded-t-full rounded-b-full"
                  style={{ left: leaf.l, top: leaf.t, backgroundColor: leaf.c }}
                  animate={reducedMotion ? undefined : { y: [0, 42, 0], x: [0, 10, 0], rotate: [0, 30, 0], opacity: [0.9, 0.5, 0.9] }}
                  transition={{ duration: 7, delay: leaf.d, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
            <svg viewBox="0 0 460 300" className="block h-auto w-full" aria-hidden="true">
              {/* ground */}
              <ellipse cx="230" cy="268" rx="200" ry="26" fill="#d9efdd" />
              {/* big tree */}
              <rect x="96" y="128" width="26" height="120" rx="12" fill="#a4713f" />
              <circle cx="109" cy="96" r="66" fill="#77b98a" />
              <circle cx="66" cy="122" r="40" fill="#8fd8a8" />
              <circle cx="156" cy="118" r="44" fill="#8fd8a8" />
              {/* parent sitting with child */}
              <g transform="translate(238 168)">
                {/* parent */}
                <g>
                  <rect x="0" y="26" width="30" height="44" rx="14" fill="#8d5bd0" />
                  <rect x="24" y="28" width="10" height="34" rx="5" fill="#7b4aba" transform="rotate(34 29 33)" />
                  <circle cx="15" cy="12" r="17" fill="#f3c19d" />
                  <path d="M-2 6 Q-3 -10 15 -12 Q33 -10 32 6 Q25 -3 15 -2 Q5 -3 -2 6 Z" fill="#4d2f1d" />
                  <rect x="26" y="58" width="9" height="26" rx="4.5" fill="#444a63" />
                  <rect x="14" y="58" width="9" height="26" rx="4.5" fill="#444a63" />
                </g>
                {/* child turned toward parent */}
                <g transform="translate(52 34)">
                  <rect x="0" y="16" width="24" height="30" rx="11" fill={STORY.orange} />
                  <circle cx="12" cy="7" r="13" fill="#ffd9b8" />
                  <path d="M-1 2 Q-1 -12 12 -13 Q25 -12 25 2 Q18 -7 12 -6 Q5 -7 -1 2 Z" fill="#7a4a2b" />
                  <circle cx="7" cy="7" r="2.6" fill="#20222e" />
                  <circle cx="17" cy="7" r="2.6" fill="#20222e" />
                  <path d="M8 13 Q12 16 16 13" stroke="#20222e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                </g>
              </g>
              {/* friendly guide presence */}
              <g transform="translate(330 176)">
                <motion.g animate={reducedMotion ? undefined : { y: [0, -4, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
                  <rect x="0" y="24" width="26" height="40" rx="12" fill="#2e6d76" />
                  <circle cx="13" cy="10" r="16" fill="#e6b184" />
                  <path d="M-2 4 Q-3 -12 13 -14 Q29 -12 28 4 Q21 -7 13 -6 Q6 -7 -2 4 Z" fill="#262f3f" />
                  <path d="M0 44 Q34 40 40 58" stroke="#2e6d76" strokeWidth="7" fill="none" strokeLinecap="round" />
                </motion.g>
                {/* mentor welcome bubble */}
                <motion.g
                  animate={reducedMotion ? undefined : { y: [0, -6, 0], opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <rect x="34" y="-26" width="74" height="26" rx="10" fill="#ffffff" stroke="#d7dbe6" strokeWidth="2" />
                  <path d="M48 0 l-2 8 10 -8 Z" fill="#ffffff" />
                  <path d="M40 -16 h56 M40 -9 h44" stroke="#b6becf" strokeWidth="3" strokeLinecap="round" />
                </motion.g>
              </g>
            </svg>
          </div>
        </div>

        {/* copy + benefits */}
        <div className="flex flex-col gap-5">
          <Reveal>
            <StoryPill color={STORY.mint}>For Parents & Families</StoryPill>
          </Reveal>
          <StoryHeadline
            text="Because Growing Up Is a Journey for Families Too."
            accentWords={['Families']}
            className="max-w-xl text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.08] text-story-midnight"
          />
          <Reveal delay={0.1} from="up">
            <p className="max-w-lg font-body-lg text-lg leading-relaxed text-on-surface-variant">
              Parents do not need every answer. Sometimes, the most valuable step is having the
              right conversation, understanding a child&apos;s needs, and exploring the available
              guidance together.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, type: 'spring', stiffness: 130, damping: 15 }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: benefit.soft }}
                >
                  <span className="material-symbols-outlined text-[22px]" style={{ color: benefit.color }} aria-hidden="true">
                    {benefit.icon}
                  </span>
                </span>
                <span className="mt-2 block font-story-display text-sm font-bold text-story-midnight">
                  {benefit.title}
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-on-surface-variant">
                  {benefit.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
