import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { LumiCharacter, NovaCharacter, PixelCharacter } from './StoryCharacters'
import { Reveal, StoryHeadline, StoryPill } from './StoryShared'
import { STORY } from './storyTheme'

/*
 * Section 7 — "Meet the Mascots".
 * Nova the Explorer · Pixel the Inventor · Lumi the Little Owl.
 * Original characters with idle animations and expressive hover/tap moments.
 */

interface Mascot {
  id: string
  name: string
  role: string
  intro: string
  bubble: string
  color: string
  soft: string
  Character: (props: { className?: string; waving?: boolean }) => React.JSX.Element
}

const MASCOTS: Mascot[] = [
  {
    id: 'nova',
    name: 'Nova the Explorer',
    role: 'Curious · Adventurous · Fascinated by discovery',
    intro:
      'Nova treats every day like the first page of a brand-new storybook — there is always something amazing just around the corner.',
    bubble: 'Ready to discover something amazing?',
    color: STORY.orange,
    soft: '#ffe7d1',
    Character: NovaCharacter,
  },
  {
    id: 'pixel',
    name: 'Pixel the Inventor',
    role: 'Playful · Creative · Always building',
    intro:
      'Pixel believes the second-best part of an idea is rebuilding it even better — blocks, gadgets and glorious happy-mistakes welcome.',
    bubble: 'What if we built it differently?',
    color: STORY.lavender,
    soft: '#efe9ff',
    Character: PixelCharacter,
  },
  {
    id: 'lumi',
    name: 'Lumi the Little Owl',
    role: 'Thoughtful · Friendly · Puzzle-loving',
    intro:
      'Lumi knows every great question leads somewhere wonderful — and never minds pausing to think a little longer.',
    bubble: 'Every great question leads somewhere!',
    color: STORY.mint,
    soft: '#e6f9f1',
    Character: LumiCharacter,
  },
]

export function StoryMascotsSection() {
  const reducedMotion = useReducedMotion()
  const [excited, setExcited] = useState<string | null>(null)

  return (
    <section
      id="story-mascots"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #e8f7f0 100%)' }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-margin md:px-margin-md lg:px-margin-lg">
        <div className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <StoryPill color={STORY.mint}>Chapter Seven · The Buddies</StoryPill>
          </Reveal>
          <StoryHeadline
            text="Your Adventure Buddies."
            accentWords={['Buddies']}
            className="max-w-3xl text-[clamp(1.875rem,2.9vw,2.25rem)] leading-[1.06] text-story-midnight"
          />
          <Reveal delay={0.12} from="up">
            <p className="max-w-2xl font-body-lg text-lg leading-relaxed text-on-surface-variant">
              Three original friends travel with every Studytainment learner. Say hello — they
              love showing off.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {MASCOTS.map((mascot, i) => {
            const isExcited = excited === mascot.id
            return (
              <Reveal key={mascot.id} delay={i * 0.1}>
                <motion.article
                  className="group relative flex cursor-pointer flex-col items-center rounded-[2rem] border-2 border-white bg-white p-6 text-center shadow-[0_18px_48px_rgba(23,37,84,0.10)] outline-none focus-within:ring-4 focus-within:ring-story-orange/25"
                  whileHover={reducedMotion ? undefined : { y: -8 }}
                  onHoverStart={() => setExcited(mascot.id)}
                  onHoverEnd={() => setExcited(null)}
                  onPointerDown={() => setExcited(mascot.id)}
                >
                  {/* speech bubble */}
                  <motion.div
                    className="relative z-10 mb-2 rounded-2xl px-4 py-2.5 font-story-script text-xl leading-tight text-story-midnight shadow-sm"
                    style={{ backgroundColor: mascot.soft }}
                    initial={reducedMotion ? false : { opacity: 0, scale: 0.7, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 13, delay: 0.3 + i * 0.12 }}
                    animate={
                      reducedMotion
                        ? undefined
                        : isExcited
                          ? { scale: [1, 1.08, 1], rotate: [0, -2, 2, 0] }
                          : undefined
                    }
                  >
                    “{mascot.bubble}”
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 rounded-sm"
                      style={{ backgroundColor: mascot.soft }}
                    />
                  </motion.div>

                  {/* mascot stage */}
                  <div
                    className="relative mt-1 flex h-56 w-full items-end justify-center overflow-hidden rounded-3xl"
                    style={{
                      background: `radial-gradient(240px 150px at 50% 110%, ${mascot.soft}, #ffffff 75%)`,
                    }}
                  >
                    <motion.div
                      className="w-[62%] max-w-[190px]"
                      animate={
                        reducedMotion
                          ? undefined
                          : isExcited
                            ? { y: [0, -18, 0], rotate: [0, -5, 5, 0] }
                            : { y: [0, -6, 0] }
                      }
                      transition={
                        reducedMotion
                          ? undefined
                          : isExcited
                            ? { duration: 0.7, ease: 'easeOut' }
                            : { duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }
                      }
                    >
                      <mascot.Character className="h-auto w-full" waving={isExcited} />
                    </motion.div>

                    {/* excitement sparkles */}
                    <motion.span
                      aria-hidden="true"
                      className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: mascot.color }}
                      animate={reducedMotion ? undefined : isExcited ? { scale: [0, 1.6, 0] } : undefined}
                      transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.3 }}
                    />
                    <motion.span
                      aria-hidden="true"
                      className="absolute left-6 top-9 h-2 w-2 rounded-full"
                      style={{ backgroundColor: STORY.yellow }}
                      animate={reducedMotion ? undefined : isExcited ? { scale: [0, 1.5, 0] } : undefined}
                      transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.5, delay: 0.2 }}
                    />
                  </div>

                  <h3 className="mt-5 font-story-display text-2xl font-bold text-story-midnight">
                    {mascot.name}
                  </h3>
                  <p
                    className="mt-1 font-story-display text-sm font-semibold"
                    style={{ color: mascot.color }}
                  >
                    {mascot.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                    {mascot.intro}
                  </p>
                </motion.article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
