import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { opaFaqs } from '../../data/opaFaqs'
import { Reveal, StoryHeadline, StoryPill } from '../story/StoryShared'
import { STORY } from '../story/storyTheme'

/*
 * "Questions Parents Ask" — a polished, keyboard-accessible accordion backed
 * by the real OPA FAQ copy in src/data/opaFaqs.ts. Two columns on desktop,
 * one on mobile, with an animated little book mascot by the heading.
 */

interface FaqRowProps {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
  accent: string
}

function FaqRow({ question, answer, open, onToggle, accent }: FaqRowProps) {
  const reducedMotion = useReducedMotion()
  const panelId = useId().replace(/:/g, '')

  return (
    <div
      className="rounded-2xl border bg-white/90 transition-colors duration-200"
      style={{
        borderColor: open ? accent : 'rgba(23,37,84,0.08)',
        boxShadow: open ? '0 10px 28px rgba(23,37,84,0.08)' : '0 1px 3px rgba(23,37,84,0.04)',
      }}
    >
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="font-story-display text-[15px] font-bold leading-snug text-story-midnight sm:text-base">
            {question}
          </span>
          <motion.span
            className="grid h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: open ? accent : 'rgba(23,37,84,0.06)' }}
            animate={{ rotate: open ? 45 : 0 }}
            transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 22 }}
          >
            <span
              className="material-symbols-outlined text-[20px] text-white"
              style={{ color: open ? '#ffffff' : STORY.midnight }}
              aria-hidden="true"
            >
              add
            </span>
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-on-surface-variant sm:text-[15px]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const COLUMN_ACCENTS = ['#ffb15c', '#7fb5ff']

export function OpaFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const reducedMotion = useReducedMotion()
  const midpoint = Math.ceil(opaFaqs.length / 2)
  const columns = [opaFaqs.slice(0, midpoint), opaFaqs.slice(midpoint)]

  return (
    <section
      id="opa-faq"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{
        background:
          'linear-gradient(180deg, #fffdf7 0%, #f4f7fd 50%, #fffdf7 100%)',
      }}
    >
      <div className="mx-auto flex max-w-[var(--content-max-width)] flex-col items-center px-margin md:px-margin-md lg:px-margin-lg">
        <div className="flex w-full max-w-2xl flex-col items-center gap-3 text-center">
          <Reveal>
            <div className="flex items-end gap-3">
              {/* tiny animated book mascot */}
              <svg
                viewBox="0 0 56 44"
                className="h-10 w-12"
                aria-hidden="true"
                role="img"
              >
                <motion.g
                  animate={reducedMotion ? undefined : { y: [0, -3, 0], rotate: [0, -3, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '50% 100%' }}
                >
                  <path d="M6 6 q10 -6 22 0 q12 -6 22 0 v30 q-10 -5 -22 0 q-12 -5 -22 0 Z" fill={STORY.yellow} stroke="#d8a43a" strokeWidth="2.5" />
                  <path d="M28 6 v30" stroke="#d8a43a" strokeWidth="2.5" />
                  <path d="M11 12 h12 M11 18 h12 M33 12 h12 M33 18 h12" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                </motion.g>
              </svg>
              <div className="flex flex-col items-start gap-2">
                <StoryPill color={STORY.lavender}>Real Questions, Real Answers</StoryPill>
                <StoryHeadline
                  text="Questions Parents Ask"
                  accentWords={['Parents']}
                  className="text-[clamp(1.75rem,2.6vw,2.25rem)] leading-[1.1] text-story-midnight"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[15px] leading-relaxed text-on-surface-variant">
              Every family asks these before getting started — the honest answers, kept short.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-2">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3">
              {col.map((item, i) => {
                const index = colIndex * midpoint + i
                return (
                  <FaqRow
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                    accent={COLUMN_ACCENTS[colIndex % COLUMN_ACCENTS.length]}
                    open={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
