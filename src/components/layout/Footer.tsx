import { useState } from 'react'
import type { ComponentType, FormEvent, PointerEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { subscribeToDispatches } from '../../utils/subscribe'
import { cn } from '../../utils/cn'
import { MaterialIcon } from '../common/MaterialIcon'

interface FormStatus {
  kind: 'idle' | 'error' | 'info'
  message: string
}

/* Palette (fixed, so the dark footer looks the same in any theme):
   ink #1b1a20 · cream #f5efe3 · orange #ff5a1f · yellow #ffd23f · gold #f7bd4b */

const SCRIPT_FONT = "'Caveat', 'Segoe Script', 'Comic Sans MS', cursive"
const SERIF_FONT = "'Fraunces', 'Playfair Display', Georgia, serif"

const SCRIPT_TEXT = 'psst — the future is listening'

const GRID_BACKGROUND =
  'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)'
const GRID_SIZE = 40

/** Replace these hrefs with your real routes / section ids. */
const EXPLORE_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Home', href: '#ecosystem' },
  { label: 'Own Pace Academy', href: '#the-4-modes' },
  { label: 'Our Story', href: '#stories' },
  { label: 'Contact', href: '#footer' },
]

const ECOSYSTEM_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Studytainment Classroom', href: '#3-30-continuum' },
  { label: 'Smart Study', href: '#the-4-modes' },
  { label: 'Online Classes', href: '#explore-pathways' },
  { label: 'Seminars & Events', href: '#stories' },
]

const CONTACTS: ReadonlyArray<{ icon: string; label: string; href?: string }> = [
  { icon: 'mail', label: 'support@studytainment.com', href: 'mailto:support@studytainment.com' },
  { icon: 'call', label: '+91-9211273399', href: 'tel:+919211273399' },
  { icon: 'location_on', label: 'Plot No-5/1-A, Sector 14, Dwarka, Delhi-110078' },
]

/** Replace these hrefs with your real pages. */
const LEGAL_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Get the App', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
]

const HEADING_LINES: ReadonlyArray<ReadonlyArray<{ text: string; accent?: boolean }>> = [
  [{ text: 'Let' }, { text: 'learning' }, { text: 'feel' }, { text: 'like' }],
  [{ text: 'wonder', accent: true }, { text: 'again.' }],
]

const TWINKLES: ReadonlyArray<{ className: string; delay: number; duration: number }> = [
  { className: 'left-[6%] top-[14%] h-1.5 w-1.5 bg-[#ffd23f]', delay: 0, duration: 3.2 },
  { className: 'left-[44%] top-[9%] h-1 w-1 bg-[#ff5a1f]', delay: 0.8, duration: 2.8 },
  { className: 'right-[8%] top-[18%] h-1.5 w-1.5 bg-[#f7bd4b]', delay: 1.4, duration: 3.6 },
  { className: 'left-[30%] top-[44%] h-1 w-1 bg-[#f5efe3]', delay: 0.4, duration: 3 },
  { className: 'right-[28%] top-[36%] h-1 w-1 bg-[#ffd23f]', delay: 1.9, duration: 3.4 },
  { className: 'left-[3%] top-[52%] h-1.5 w-1.5 bg-[#ff5a1f]', delay: 1.1, duration: 3.8 },
]

/* ---------- Floating text finale ---------- */

const WORDMARK_LETTERS = 'Studytainment'.split('')

/** Handwritten words that drift around the wordmark. */
const FLOATING_WORDS: ReadonlyArray<{
  text: string
  className: string
  duration: number
  delay: number
  rotate: number
}> = [
    { text: 'play', className: 'left-[5%] top-[6%] text-[#f7bd4b]', duration: 5.2, delay: 0, rotate: -7 },
    {
      text: 'explore',
      className: 'left-[24%] top-[34%] hidden text-[#f5efe3]/70 sm:block',
      duration: 6.4,
      delay: 0.9,
      rotate: 5,
    },
    { text: 'create', className: 'left-[47%] top-[2%] text-[#ff5a1f]', duration: 5.8, delay: 0.4, rotate: -5 },
    {
      text: 'imagine',
      className: 'right-[22%] top-[30%] hidden text-[#ffd23f] sm:block',
      duration: 6.8,
      delay: 1.4,
      rotate: 6,
    },
    { text: 'wonder', className: 'right-[5%] top-[8%] text-[#f7bd4b]', duration: 5.5, delay: 0.7, rotate: -6 },
  ]

/**
- Closing floating-text band: handwritten words drift above a giant outlined
- wordmark whose letters rise in, then bob in a wave. Hovering a letter makes it
- jump and fill with orange.
 */
function FloatingWordmark({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div aria-hidden="true" className="relative mt-4 select-none overflow-hidden">
      {/* Drifting handwritten words */}
      {FLOATING_WORDS.map((word) => (
        <motion.span
          key={word.text}
          className={cn(
            'pointer-events-none absolute z-10 text-[clamp(1.5rem,2.8vw,2.4rem)] leading-none',
            word.className,
          )}
          style={{ fontFamily: SCRIPT_FONT }}
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 0.95 }}
          viewport={{ once: true }}
          animate={
            reducedMotion
              ? undefined
              : { y: [0, -18, 0], x: [0, 10, 0], rotate: [word.rotate, -word.rotate, word.rotate] }
          }
          transition={{
            duration: word.duration,
            delay: word.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {word.text}
        </motion.span>
      ))}

      {/* Giant wordmark, bottom cropped by the footer edge */}
      <div
        className="flex translate-y-[14%] justify-center px-2 pt-20 text-[clamp(3rem,11.5vw,11rem)] font-bold leading-[0.85] tracking-tight"
        style={{ fontFamily: SERIF_FONT }}
      >
        {WORDMARK_LETTERS.map((letter, index) => (
          // Outer layer: one-time rise-in. Inner layer: endless wave + hover jump.
          <motion.span
            key={`${letter}-${index}`}
            className="inline-block"
            initial={reducedMotion ? false : { y: 90, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.05 * index }}
          >
            <motion.span
              className="inline-block cursor-default"
              style={{
                color: 'rgba(255, 90, 31, 0)',
                WebkitTextStroke: '1.5px rgba(245, 239, 227, 0.28)',
              }}
              animate={reducedMotion ? undefined : { y: [0, -16, 0] }}
              transition={{
                duration: 3.4,
                delay: index * 0.14,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                    y: -30,
                    scale: 1.12,
                    rotate: index % 2 === 0 ? -4 : 4,
                    color: 'rgba(255, 90, 31, 1)',
                    transition: { type: 'spring', stiffness: 300, damping: 14 },
                  }
              }
            >
              {letter}
            </motion.span>
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/* ---------- Social brand icons ---------- */

type IconComponent = ComponentType<{ className?: string }>

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M3 9h4v12H3z" />
      <circle cx="5" cy="5" r="2.2" />
      <path d="M10 9h3.8v1.7h.1c.5-1 1.8-2.1 3.8-2.1 4 0 4.7 2.6 4.7 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" />
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8V13.5h2.5V21z" />
    </svg>
  )
}

interface SocialLink {
  label: string
  href: string
  Icon: IconComponent
  hoverClass: string
}

const SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    Icon: InstagramIcon,
    hoverClass: 'bg-linear-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5]',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    Icon: LinkedInIcon,
    hoverClass: 'bg-[#0A66C2]',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    Icon: YouTubeIcon,
    hoverClass: 'bg-[#FF0000]',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/',
    Icon: FacebookIcon,
    hoverClass: 'bg-[#1877F2]',
  },
]

/** Circular social button */
function SocialButton({
  link,
  index,
  reducedMotion,
}: {
  link: SocialLink
  index: number
  reducedMotion: boolean
}) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 220, damping: 16 })
  const y = useSpring(rawY, { stiffness: 220, damping: 16 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    rawX.set(Math.max(-8, Math.min(8, dx * 0.35)))
    rawY.set(Math.max(-8, Math.min(8, dy * 0.35)))
  }

  const handlePointerLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.4 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: 'spring', stiffness: 170, damping: 13, delay: 0.1 * index }}
    >
      <motion.div
        style={reducedMotion ? undefined : { x, y }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
          transition={{
            duration: 3 + index * 0.4,
            delay: index * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Studytainment on ${link.label} (opens in a new tab)`}
            whileHover={reducedMotion ? undefined : { y: -6, scale: 1.12, rotate: -6 }}
            whileFocus={reducedMotion ? undefined : { y: -6, scale: 1.12 }}
            whileTap={reducedMotion ? undefined : { scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 16 }}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-[#f5efe3] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#ffd23f]"
          >
            <span
              aria-hidden="true"
              className={cn(
                'absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100',
                link.hoverClass,
              )}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full opacity-0 ring-2 ring-[#ffd23f]/60 motion-safe:group-hover:animate-ping motion-safe:group-hover:opacity-100"
            />
            <link.Icon className="relative h-5 w-5 transition-colors duration-300 group-hover:text-white group-focus-visible:text-white" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-[#f5efe3] px-2 py-0.5 text-xs font-medium text-[#1b1a20] opacity-0 shadow-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            >
              {link.label}
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** One headline word */
function HeadingWord({
  text,
  accent,
  order,
  reducedMotion,
}: {
  text: string
  accent?: boolean
  order: number
  reducedMotion: boolean
}) {
  return (
    <motion.span
      className="inline-block"
      style={{ transformPerspective: 700, transformOrigin: '50% 100%' }}
      initial={reducedMotion ? false : { opacity: 0, y: 46, rotateX: -70 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: 'spring', stiffness: 110, damping: 16, delay: 0.1 + 0.09 * order }}
    >
      {accent ? (
        <span className="relative inline-block px-1 italic">
          <motion.span
            className="inline-block bg-linear-to-r from-[#ff5a1f] via-[#ffb347] to-[#ff5a1f] bg-[length:200%_100%] bg-clip-text pr-1 text-transparent"
            animate={reducedMotion ? undefined : { backgroundPosition: ['0% 50%', '200% 50%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            {text}
          </motion.span>
          <svg
            aria-hidden="true"
            viewBox="0 0 200 12"
            preserveAspectRatio="none"
            className="absolute -bottom-1 left-0 h-3 w-full text-[#ffd23f]"
          >
            <motion.path
              d="M2 8 C 30 2, 50 12, 80 6 S 130 2, 160 7 S 190 9, 198 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.1, ease: 'easeInOut' }}
            />
          </svg>
        </span>
      ) : (
        text
      )}
    </motion.span>
  )
}

/** A footer link column */
function LinkColumn({
  title,
  links,
  index,
  reducedMotion,
}: {
  title: string
  links: ReadonlyArray<{ label: string; href: string }>
  index: number
  reducedMotion: boolean
}) {
  return (
    <motion.div
      className="flex flex-col gap-space-md"
      initial={reducedMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 * index }}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f5efe3]/45">
        {title}
      </span>
      <ul className="flex flex-col gap-3 text-[#f5efe3]">
        {links.map((link) => (
          <li key={link.label}>
            <motion.a
              href={link.href}
              whileHover={reducedMotion ? undefined : { x: 6 }}
              transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              className="inline-block transition-colors hover:text-[#ffd23f] focus-visible:text-[#ffd23f] focus-visible:outline-none"
            >
              {link.label}
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/** Dark, editorial footer */
export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle', message: '' })
  const reducedMotion = useReducedMotion()

  // Cursor spotlight (px relative to the footer).
  const spotX = useMotionValue(520)
  const spotY = useMotionValue(220)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotX}px ${spotY}px, rgba(255, 90, 31, 0.16), transparent 70%)`

  // Normalised pointer [-0.5, 0.5] for the gentle 3D tilt of the headline block.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointerX = useSpring(rawX, { stiffness: 60, damping: 18 })
  const pointerY = useSpring(rawY, { stiffness: 60, damping: 18 })
  const headingRotateY = useTransform(pointerX, [-0.5, 0.5], [-3, 3])
  const headingRotateX = useTransform(pointerY, [-0.5, 0.5], [3, -3])

  const handleFooterPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    spotX.set(event.clientX - rect.left)
    spotY.set(event.clientY - rect.top)
    rawX.set((event.clientX - rect.left) / rect.width - 0.5)
    rawY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handleFooterPointerLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void subscribeToDispatches(email).then((result) => {
      setStatus({ kind: result.ok ? 'info' : 'error', message: result.message })
      if (result.ok) setEmail('')
    })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  let wordOrder = 0

  return (
    <footer
      id="footer"
      onPointerMove={handleFooterPointerMove}
      onPointerLeave={handleFooterPointerLeave}
      className="relative w-full overflow-hidden bg-[#1b1a20] pt-24 text-[#f5efe3]"
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: GRID_BACKGROUND,
            backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
          }}
          animate={
            reducedMotion
              ? undefined
              : { backgroundPosition: ['0px 0px', `${GRID_SIZE}px ${GRID_SIZE}px`] }
          }
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#ff5a1f]/10 blur-3xl"
          animate={reducedMotion ? undefined : { x: [0, 60, -20, 0], y: [0, 40, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#ffd23f]/10 blur-3xl"
          animate={reducedMotion ? undefined : { x: [0, -50, 20, 0], y: [0, -30, 10, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        {!reducedMotion && (
          <motion.div className="absolute inset-0" style={{ backgroundImage: spotlight }} />
        )}
        {TWINKLES.map((twinkle, index) => (
          <motion.span
            key={index}
            className={cn('absolute rounded-full', twinkle.className)}
            animate={reducedMotion ? { opacity: 0.4 } : { opacity: [0.1, 0.9, 0.1], scale: [0.8, 1.6, 0.8] }}
            transition={{
              duration: twinkle.duration,
              delay: twinkle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[var(--content-max-width)] flex-col px-margin pb-10 md:px-margin-md lg:px-margin-lg">
        {/* Top: tagline + headline, description + subscribe pill */}
        <div className="grid grid-cols-1 items-center gap-12 pb-20 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <motion.div
            className="flex flex-col gap-3"
            style={
              reducedMotion
                ? undefined
                : { rotateX: headingRotateX, rotateY: headingRotateY, transformPerspective: 1000 }
            }
          >
            <p
              aria-label={SCRIPT_TEXT}
              className="-rotate-1 text-[clamp(1.75rem,3vw,2.25rem)] leading-none text-[#f7bd4b]"
              style={{ fontFamily: SCRIPT_FONT }}
            >
              {SCRIPT_TEXT.split('').map((character, index) => (
                <motion.span
                  key={index}
                  aria-hidden="true"
                  className="inline-block"
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.03 * index }}
                >
                  {character === ' ' ? '\u00A0' : character}
                </motion.span>
              ))}
            </p>
            <h2
              className="text-[clamp(2.75rem,6vw,5.25rem)] font-medium leading-[1.04] tracking-tight text-[#f5efe3]"
              style={{ fontFamily: SERIF_FONT }}
            >
              {HEADING_LINES.map((line, lineIndex) => (
                <span key={lineIndex} className="block">
                  {line.map((word, wordIndex) => {
                    const order = wordOrder++
                    return (
                      <span key={word.text}>
                        <HeadingWord
                          text={word.text}
                          accent={word.accent}
                          order={order}
                          reducedMotion={reducedMotion}
                        />
                        {wordIndex < line.length - 1 ? ' ' : ''}
                        {word.accent ? ' ' : ''}
                      </span>
                    )
                  })}
                </span>
              ))}
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6"
            initial={reducedMotion ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <p className="max-w-xl text-lg leading-relaxed text-[#f5efe3]/55">
              Parenting insights, learning resources, seminars and updates from our growing
              ecosystem — once in a while, never spam.
            </p>
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 pl-6 transition-all duration-300 focus-within:border-[#ff5a1f]/60 focus-within:shadow-[0_0_0_4px_rgba(255,90,31,0.14),0_0_36px_rgba(255,90,31,0.22)]"
            >
              <label htmlFor="dispatch-email" className="sr-only">
                Email address
              </label>
              <input
                id="dispatch-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-describedby="dispatch-status"
                placeholder="your@email.com"
                className="min-w-0 flex-1 bg-transparent py-3 text-base text-[#f5efe3] outline-none placeholder:text-[#f5efe3]/35"
              />
              <motion.button
                type="submit"
                whileHover={reducedMotion ? undefined : { scale: 1.05 }}
                whileTap={reducedMotion ? undefined : { scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-[#FF6D00] px-6 py-3 font-semibold text-[#1b1a20]"
              >
                {!reducedMotion && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent"
                    initial={{ x: '-150%' }}
                    animate={{ x: '450%' }}
                    transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                  />
                )}
                <span className="relative">Subscribe</span>
                <motion.span
                  className="relative inline-flex"
                  animate={reducedMotion ? undefined : { x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MaterialIcon name="arrow_forward" className="text-[20px]" />
                </motion.span>
              </motion.button>
            </form>
            <p
              id="dispatch-status"
              role="status"
              aria-live="polite"
              className={cn(
                'min-h-5 text-sm',
                status.kind === 'error' ? 'text-[#ff8a7a]' : 'text-[#f5efe3]/70',
              )}
            >
              <AnimatePresence mode="wait">
                {status.message && (
                  <motion.span
                    key={status.message}
                    className="block"
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                  >
                    {status.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          aria-hidden="true"
          className="h-px w-full origin-left bg-white/10"
          initial={reducedMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Four columns */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            className="flex flex-col gap-5"
            initial={reducedMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3">
              <motion.span
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5efe3] text-2xl font-bold leading-none text-[#ff5a1f]"
                style={{ fontFamily: SERIF_FONT }}
                whileHover={reducedMotion ? undefined : { rotate: -8, scale: 1.1 }}
                animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                S
              </motion.span>
              <span
                className="text-2xl font-bold tracking-tight text-[#f5efe3]"
                style={{ fontFamily: SERIF_FONT }}
              >
                Studytainment
              </span>
            </div>
            <p className="max-w-xs leading-relaxed text-[#f5efe3]/55">
              Studytainment Smart Learning Private Limited — empowering future-ready learners
              through innovative, holistic and personalised education.
            </p>
          </motion.div>

          <LinkColumn title="Explore" links={EXPLORE_LINKS} index={1} reducedMotion={reducedMotion} />
          <LinkColumn
            title="Ecosystem"
            links={ECOSYSTEM_LINKS}
            index={2}
            reducedMotion={reducedMotion}
          />

          {/* Say hello */}
          <motion.div
            className="flex flex-col gap-space-md"
            initial={reducedMotion ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.3 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#f5efe3]/45">
              Say hello
            </span>
            <ul className="flex flex-col gap-3 text-[#f5efe3]">
              {CONTACTS.map((contact) => {
                const inner = (
                  <>
                    <motion.span
                      className="mt-0.5 inline-flex text-[#ff5a1f]"
                      variants={{ hover: { rotate: [0, -14, 14, 0], scale: 1.15 } }}
                      transition={{ duration: 0.5 }}
                    >
                      <MaterialIcon name={contact.icon} className="text-[20px]" />
                    </motion.span>
                    <span>{contact.label}</span>
                  </>
                )
                return (
                  <li key={contact.label}>
                    {contact.href ? (
                      <motion.a
                        href={contact.href}
                        initial="rest"
                        whileHover={reducedMotion ? undefined : 'hover'}
                        className="flex items-start gap-3 transition-colors hover:text-[#ffd23f] focus-visible:text-[#ffd23f] focus-visible:outline-none"
                      >
                        {inner}
                      </motion.a>
                    ) : (
                      <motion.div
                        initial="rest"
                        whileHover={reducedMotion ? undefined : 'hover'}
                        className="flex items-start gap-3"
                      >
                        {inner}
                      </motion.div>
                    )}
                  </li>
                )
              })}
            </ul>
            <ul className="flex items-center gap-3 pt-2" aria-label="Social media">
              {SOCIAL_LINKS.map((link, index) => (
                <li key={link.label}>
                  <SocialButton link={link} index={index} reducedMotion={reducedMotion} />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Legal row */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-[#f5efe3]/45 sm:flex-row">
          <p>© 2026 Studytainment. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[#f5efe3] focus-visible:text-[#f5efe3] focus-visible:outline-none"
              >
                {link.label}
              </a>
            ))}
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={reducedMotion ? undefined : { y: -3 }}
              className="flex items-center gap-1.5 transition-colors hover:text-[#f5efe3] focus-visible:text-[#f5efe3] focus-visible:outline-none"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <MaterialIcon name="arrow_upward" className="text-[16px]" />
            </motion.button>
          </div>
        </div>

        {/* Wordmark finale */}
        <FloatingWordmark reducedMotion={reducedMotion} />
      </div>
    </footer>
  )
}