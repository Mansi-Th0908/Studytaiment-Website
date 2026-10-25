import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal, StoryHeadline, StoryPill } from '../story/StoryShared'
import { STORY } from '../story/storyTheme'

/*
 * "Growing Up Takes More Than Good Grades."
 * A report card sits at the center; as the user scrolls, six growth symbols
 * emerge from it: heart, lightbulb, compass, speech bubble, mountain, star.
 */

interface GrowthSymbol {
  id: string
  label: string
  icon: string
  color: string
  soft: string
  /** percentage offsets around the card */
  x: number
  y: number
  rotate: number
}

const GROWTH_SYMBOLS: GrowthSymbol[] = [
  { id: 'heart', label: 'Emotional well-being', icon: 'favorite', color: '#f26d85', soft: '#ffe4ea', x: -2, y: -26, rotate: -6 },
  { id: 'bulb', label: 'Curiosity', icon: 'lightbulb', color: STORY.orange, soft: '#ffe7d1', x: 84, y: -30, rotate: 8 },
  { id: 'compass', label: 'Direction', icon: 'explore', color: STORY.skyDeep, soft: '#e3f5ff', x: 96, y: 22, rotate: 14 },
  { id: 'chat', label: 'Communication', icon: 'forum', color: STORY.lavender, soft: '#efe9ff', x: 88, y: 74, rotate: -10 },
  { id: 'mountain', label: 'Resilience', icon: 'landscape', color: '#5f8f6e', soft: '#e2f2e8', x: -4, y: 68, rotate: 8 },
  { id: 'star', label: 'Individual strengths', icon: 'star', color: '#e0b52e', soft: '#fff3c4', x: 12, y: -8, rotate: -16 },
]

export function OpaWholePersonSection() {
  const reducedMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="opa-whole-person"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fff7ec 100%)' }}
    >
      <div className="mx-auto grid max-w-[var(--content-max-width)] grid-cols-1 items-center gap-10 px-margin md:px-margin-md lg:grid-cols-2 lg:px-margin-lg">
        <div className="flex flex-col gap-3">
          <Reveal>
            <StoryPill color={STORY.skyDeep}>Beyond the Report Card</StoryPill>
          </Reveal>
          <StoryHeadline
            text="Growing Up Takes More Than Good Grades."
            accentWords={['Grades']}
            className="max-w-xl text-[clamp(1.875rem,2.9vw,2.25rem)] leading-[1.06] text-story-midnight"
          />
          <Reveal delay={0.12} from="up">
            <p className="max-w-lg font-body-lg text-lg leading-relaxed text-on-surface-variant">
              Learning matters. So do confidence, emotional well-being, relationships,
              communication, life skills, and discovering what makes each individual unique.
            </p>
          </Reveal>
          <Reveal delay={0.2} from="up">
            <p className="mt-4 rounded-2xl bg-white p-5 font-story-script text-[clamp(1.4rem,2.4vw,1.9rem)] leading-snug text-story-midnight/80 shadow-sm">
              “Education asks what you learned. Growth also asks who you are becoming.”
            </p>
          </Reveal>
          {!reducedMotion && (
            <p className="font-story-display text-sm font-semibold text-on-surface-variant/70">
              Scroll — the card opens up ⤵
            </p>
          )}
        </div>

        {/* The releasing card */}
        <div ref={stageRef} className="relative mx-auto flex h-[400px] w-full max-w-[520px] items-center justify-center sm:h-[440px]">
          {/* card */}
          <motion.div
            className="relative z-10 w-[300px] rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(23,37,84,0.14)] sm:w-[340px]"
            initial={reducedMotion ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <div className="flex items-center justify-between border-b-2 border-dashed border-story-midnight/10 pb-3">
              <span className="font-story-display text-lg font-bold text-story-midnight">
                School Report
              </span>
              <span className="rounded-md bg-surface-container-high px-2 py-0.5 font-story-display text-xs font-bold text-on-surface-variant">
                Term II
              </span>
            </div>
            {[
              { subject: 'Mathematics', w: '86%' },
              { subject: 'Science', w: '78%' },
              { subject: 'English', w: '64%' },
              { subject: 'Art', w: '92%' },
            ].map((row) => (
              <div key={row.subject} className="mt-3 flex items-center gap-3">
                <span className="w-24 text-sm text-on-surface-variant">{row.subject}</span>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-container">
                  <motion.span
                    className="block h-full rounded-full bg-primary-container origin-left"
                    style={{ width: row.w }}
                    initial={reducedMotion ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
                  />
                </span>
              </div>
            ))}
            <p className="mt-4 rounded-xl bg-surface-container-low p-3 text-sm leading-relaxed text-on-surface-variant">
              Shows consistent effort. Curious and creative — potential that reaches beyond this
              page.
            </p>
          </motion.div>

          {/* emerging symbols */}
          {GROWTH_SYMBOLS.map((symbol, i) => {
            return (
              <motion.div
                key={symbol.id}
                className="absolute z-20 flex w-32 flex-col items-center gap-1.5 sm:w-36"
                style={{ left: `${symbol.x}%`, top: `${symbol.y}%` }}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.45, y: 34, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, y: 0, rotate: symbol.rotate * 0.35 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ type: 'spring', stiffness: 160, damping: 14, delay: i * 0.12 }}
              >
                <motion.div
                  className="flex flex-col items-center gap-1.5"
                  animate={reducedMotion ? undefined : { y: [0, -7, 0], rotate: [0, 3, -3, 0] }}
                  transition={{
                    duration: 4 + i * 0.35,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md"
                    style={{ backgroundColor: symbol.soft }}
                  >
                    <span
                      className="material-symbols-outlined text-[26px]"
                      style={{ color: symbol.color }}
                      aria-hidden="true"
                    >
                      {symbol.icon}
                    </span>
                  </span>
                  <span className="font-story-display text-xs font-bold text-story-midnight">
                    {symbol.label}
                  </span>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
