import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal, StoryHeadline, StoryPill } from '../story/StoryShared'
import { STORY } from '../story/storyTheme'

/*
 * Final CTA — "Every Stage Has Possibilities. Let's Explore Yours."
 * The three illustrated worlds merge into one sunset landscape: the childhood
 * explorer, the teenage explorer, and the young adult stand along the same
 * glowing path toward a shared horizon. Links go to real destinations only.
 */

const STARS = [
  { l: '12%', t: '18%', c: STORY.yellow, d: 0, s: 2.5 },
  { l: '24%', t: '8%', c: '#ffffff', d: 0.6, s: 2 },
  { l: '38%', t: '14%', c: STORY.yellow, d: 1.2, s: 2.5 },
  { l: '55%', t: '6%', c: '#ffffff', d: 1.8, s: 2 },
  { l: '68%', t: '16%', c: STORY.yellow, d: 0.9, s: 2.5 },
  { l: '82%', t: '9%', c: '#ffffff', d: 1.5, s: 2 },
  { l: '90%', t: '20%', c: STORY.yellow, d: 2.1, s: 2.5 },
] as const

export function OpaFinalSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="opa-start"
      className="relative w-full scroll-mt-[var(--header-height)] overflow-hidden py-margin-lg"
      style={{
        background:
          'linear-gradient(180deg, #1b1f33 0%, #36457e 22%, #6d6ba4 42%, #c97b6d 66%, #f2a05f 100%)',
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {STARS.map((star, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ left: star.l, top: star.t, width: star.s, height: star.s, backgroundColor: star.c }}
            animate={reducedMotion ? undefined : { opacity: [0.3, 1, 0.3], scale: [0.8, 1.25, 0.8] }}
            transition={{ duration: 3.4, delay: star.d, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* merged landscape: three environments + shared glowing path + sun */}
      <svg viewBox="0 0 1280 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-auto max-w-none">
        {/* sunrise horizon */}
        <defs>
          <radialGradient id="opa-finale-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe9a8" />
            <stop offset="100%" stopColor="#ffb15c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="opa-finale-path" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={STORY.yellow} />
            <stop offset="100%" stopColor="#ffcf7a" />
          </linearGradient>
        </defs>
        {/* sun */}
        <motion.circle
          cx="640" cy="392" r="98" fill="url(#opa-finale-sun)"
          initial={reducedMotion ? false : { opacity: 0.4 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          animate={reducedMotion ? undefined : { opacity: [0.85, 1, 0.85] }}
        />
        <circle cx="640" cy="392" r="46" fill="#ffe9a8" />
        {/* world silhouettes: blocks (childhood), branching spark (teen), skyline (career) */}
        <g opacity="0.85">
          {/* childhood village silhouette */}
          <rect x="60" y="318" width="42" height="42" rx="8" fill="#2c3b63" />
          <rect x="112" y="332" width="34" height="28" rx="7" fill="#2c3b63" />
          <circle cx="176" cy="352" r="20" fill="#2c3b63" />
          {/* teenage spark hills */}
          <path d="M330 360 q40 -60 96 -6 l-96 0 Z" fill="#2c3b63" />
          <path d="M430 360 q34 -44 78 -2 l-78 0 Z" fill="#31406b" />
          {/* career skyline */}
          <rect x="990" y="284" width="40" height="76" rx="5" fill="#2c3b63" />
          <rect x="1036" y="300" width="30" height="60" rx="5" fill="#31406b" />
          <rect x="1072" y="266" width="48" height="94" rx="6" fill="#2c3b63" />
          <rect x="1126" y="292" width="34" height="68" rx="5" fill="#31406b" />
          <rect x="1166" y="308" width="40" height="52" rx="5" fill="#2c3b63" />
        </g>
        {/* shared glowing path */}
        <path d="M0 400 C 200 340, 380 356, 560 372 S 900 372, 1080 350 S 1240 330, 1280 322" stroke="url(#opa-finale-path)" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.9" />
        <path d="M0 404 C 200 344, 380 360, 560 376 S 900 376, 1080 354 S 1240 334, 1280 326" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.35" />
        {/* travellers along the path */}
        <g>
          {/* child explorer */}
          <g transform="translate(200 336)">
            <motion.g animate={reducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
              <rect x="-10" y="6" width="20" height="24" rx="9" fill={STORY.coral} />
              <circle cx="0" cy="-2" r="11" fill="#ffd9b8" />
              <path d="M-2 -16 h4 v6 h-4 Z" fill={STORY.orange} />
              <circle cx="-3.5" cy="-3" r="2" fill="#20222e" />
              <circle cx="3.5" cy="-3" r="2" fill="#20222e" />
            </motion.g>
          </g>
          {/* teenage explorer */}
          <g transform="translate(640 368)">
            <motion.g animate={reducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
              <rect x="-11" y="4" width="22" height="26" rx="9" fill={STORY.mint} />
              <rect x="8" y="10" width="10" height="14" rx="4" fill={STORY.lavender} />
              <circle cx="0" cy="-4" r="12" fill="#e6b184" />
              <path d="M-12 -10 a12 12 0 0 1 24 0 l-3 3 a9 9 0 0 0 -18 0 Z" fill="#3b2a20" />
              <circle cx="-4" cy="-5" r="2" fill="#20222e" />
              <circle cx="4" cy="-5" r="2" fill="#20222e" />
            </motion.g>
          </g>
          {/* young adult */}
          <g transform="translate(1040 344)">
            <motion.g animate={reducedMotion ? undefined : { y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}>
              <rect x="-10" y="4" width="20" height="24" rx="8" fill="#2e6d76" />
              <circle cx="0" cy="-5" r="11" fill="#f3c19d" />
              <path d="M-11 -12 a11 11 0 0 1 22 0 l-2.5 3 a8.5 8.5 0 0 0 -17 0 Z" fill="#4d2f1d" />
              <circle cx="-3.5" cy="-6" r="1.9" fill="#20222e" />
              <circle cx="3.5" cy="-6" r="1.9" fill="#20222e" />
            </motion.g>
          </g>
        </g>
      </svg>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-margin pb-16 pt-24 text-center md:pt-28 md:px-margin-md lg:px-margin-lg">
        <Reveal>
          <StoryPill>Every Stage. One Journey. Your Pace.</StoryPill>
        </Reveal>
        <StoryHeadline
          text="Every Stage Has Possibilities. Let's Explore Yours."
          accentWords={['Let’s', 'Explore', 'Yours.']}
          className="mt-4 text-[clamp(1.9rem,3.2vw,2.5rem)] leading-[1.05] text-[#fff9ee] drop-shadow-[0_4px_24px_rgba(27,31,51,0.55)]"
        />
        <Reveal delay={0.08} from="up">
          <p className="mt-4 max-w-xl font-body-lg text-base leading-relaxed text-[#fff9ee]/90 sm:text-lg">
            Discover a more thoughtful approach to learning, personal growth, and future
            direction with Own Pace Academy.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="/#impact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-display text-sm font-bold text-story-midnight shadow-[0_10px_30px_rgba(27,31,51,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <i className="material-symbols-outlined text-[20px] text-[#c2410c]" aria-hidden="true">
                chat
              </i>
              {"Talk to Our Experts"}
              <i
                className="material-symbols-outlined transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                arrow_forward
              </i>
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#fff9ee]/50 px-7 py-3.5 font-display text-sm font-bold text-[#fff9ee] transition-colors duration-200 hover:bg-[#fff9ee]/10"
            >
              {"Explore Studytainment"}
              <i className="material-symbols-outlined text-[20px]" aria-hidden="true">
                home
              </i>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
