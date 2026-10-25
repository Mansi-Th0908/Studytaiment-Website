import { useState } from 'react'
import type { PointerEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { AnimatedSection } from '../components/animations/AnimatedSection'
import { MaterialIcon } from '../components/common/MaterialIcon'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../utils/cn'

interface CtaImage {
  /** Put the files in /public/images/cta/ (or change these paths). */
  src: string
  alt: string
  label: string
  icon: string
  /** Fallback gradient shown if the image is missing or fails to load. */
  gradient: string
  /** Badge colour for the pop-out icon. */
  badge: string
  /** Absolute position inside the card (xl screens). */
  position: string
  /** Card size on xl screens. */
  size: string
  /** Parallax travel in px at full pointer deflection. */
  depth: number
  duration: number
  delay: number
  rotate: number
}

const CTA_IMAGES: ReadonlyArray<CtaImage> = [
  {
    src: '/images/cta/play.jpg',
    alt: 'A child enjoying a playful learning game',
    label: 'Play',
    icon: 'sports_esports',
    gradient: 'from-secondary-container to-primary-container',
    badge: 'bg-secondary-container text-on-surface',
    position: 'right-[26%] top-[6%]',
    size: 'h-44 w-36',
    depth: 34,
    duration: 5.2,
    delay: 0,
    rotate: 3,
  },
  {
    src: '/images/cta/explore.jpg',
    alt: 'Learners exploring the world together',
    label: 'Explore',
    icon: 'explore',
    gradient: 'from-primary-container to-primary',
    badge: 'bg-primary-container text-on-primary',
    position: 'right-[5%] top-[16%]',
    size: 'h-48 w-40',
    depth: 22,
    duration: 6.4,
    delay: 0.9,
    rotate: -4,
  },
  {
    src: '/images/cta/create.jpg',
    alt: 'Young creators making art and projects',
    label: 'Create',
    icon: 'brush',
    gradient: 'from-tertiary-container to-secondary-container',
    badge: 'bg-tertiary-container text-on-surface',
    position: 'right-[27%] bottom-[6%]',
    size: 'h-44 w-40',
    depth: 40,
    duration: 5.8,
    delay: 0.4,
    rotate: -3,
  },
  {
    src: '/images/cta/imagine.jpg',
    alt: 'A learner imagining big ideas',
    label: 'Imagine',
    icon: 'auto_awesome',
    gradient: 'from-secondary-fixed to-tertiary-container',
    badge: 'bg-secondary-fixed text-on-surface',
    position: 'right-[6%] bottom-[7%]',
    size: 'h-40 w-36',
    depth: 28,
    duration: 6.8,
    delay: 1.4,
    rotate: 4,
  },
]

/** Sparkles that rise from the bottom of the card on a loop. */
const SPARKLES: ReadonlyArray<{
  left: string
  size: number
  rise: number
  duration: number
  delay: number
  star: boolean
}> = [
    { left: '6%', size: 10, rise: 280, duration: 7, delay: 0, star: true },
    { left: '16%', size: 6, rise: 220, duration: 5.5, delay: 1.8, star: false },
    { left: '30%', size: 8, rise: 300, duration: 8, delay: 0.7, star: false },
    { left: '44%', size: 12, rise: 260, duration: 6.5, delay: 3, star: true },
    { left: '58%', size: 6, rise: 240, duration: 5.8, delay: 2.2, star: false },
    { left: '72%', size: 9, rise: 320, duration: 7.5, delay: 1.1, star: true },
    { left: '84%', size: 7, rise: 250, duration: 6, delay: 3.6, star: false },
    { left: '93%', size: 11, rise: 290, duration: 8.5, delay: 0.3, star: true },
  ]

/**
 * Photo card with a pointer-driven 3D tilt, moving glare, image zoom on hover
 * and a pop-out icon badge. Falls back to a gradient tile if the image is
 * missing, so the layout never breaks.
 */
function TiltImageCard({
  image,
  reducedMotion,
  className,
}: {
  image: CtaImage
  reducedMotion: boolean
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const [hovered, setHovered] = useState(false)

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(py, [0, 1], [13, -13]), { stiffness: 200, damping: 16 })
  const rotateY = useSpring(useTransform(px, [0, 1], [-15, 15]), { stiffness: 200, damping: 16 })
  const glareX = useTransform(px, (value) => `${value * 100}%`)
  const glareY = useTransform(py, (value) => `${value * 100}%`)
  const glare = useMotionTemplate`radial-gradient(180px circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.38), transparent 60%)`

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width)
    py.set((event.clientY - rect.top) / rect.height)
  }

  const handlePointerLeave = () => {
    setHovered(false)
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className={cn('[perspective:800px]', className)}>
      <motion.div
        className="relative h-full w-full cursor-pointer"
        style={reducedMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={reducedMotion ? undefined : { scale: 1.07 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onPointerEnter={() => setHovered(true)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="group relative h-full w-full overflow-hidden rounded-2xl bg-surface/10 shadow-xl ring-1 ring-surface/20">
          {failed ? (
            <div
              className={cn(
                'flex h-full w-full items-center justify-center bg-linear-to-br',
                image.gradient,
              )}
            >
              <MaterialIcon name={image.icon} filled className="text-[56px] text-on-surface/60" />
            </div>
          ) : (
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={() => setFailed(true)}
              className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}

          {/* Bottom fade + label */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-inverse-surface/80 to-transparent"
          />
          <span className="absolute bottom-space-xs left-space-sm font-label-lg text-label-lg font-bold text-inverse-on-surface drop-shadow">
            {image.label}
          </span>

          {/* Moving glare */}
          {!reducedMotion && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: glare }}
              initial={false}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            />
          )}
        </div>

        {/* Pop-out icon badge (sits in front thanks to preserve-3d) */}
        <motion.span
          aria-hidden="true"
          className={cn(
            'absolute -left-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-lg ring-4 ring-inverse-surface [transform:translateZ(45px)]',
            image.badge,
          )}
          animate={reducedMotion ? undefined : { rotate: [-8, 8, -8], scale: [1, 1.08, 1] }}
          transition={{ duration: 3 + image.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MaterialIcon name={image.icon} filled className="text-[18px]" />
        </motion.span>
      </motion.div>
    </div>
  )
}

interface FloatingImageProps {
  image: CtaImage
  pointerX: ReturnType<typeof useSpring>
  pointerY: ReturnType<typeof useSpring>
  reducedMotion: boolean
}

/** One floating collage card (xl screens): outer layer follows the pointer, inner layer floats on its own tempo. */
function FloatingImage({ image, pointerX, pointerY, reducedMotion }: FloatingImageProps) {
  const x = useTransform(pointerX, (value) => value * image.depth)
  const y = useTransform(pointerY, (value) => value * image.depth)

  return (
    <motion.div
      className={cn('absolute z-10 hidden xl:block', image.position)}
      style={reducedMotion ? undefined : { x, y }}
    >
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : { y: [0, -16, 0], rotate: [-image.rotate, image.rotate, -image.rotate] }
        }
        transition={{
          duration: image.duration,
          delay: image.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <TiltImageCard image={image} reducedMotion={reducedMotion} className={image.size} />
      </motion.div>
    </motion.div>
  )
}

/**
 * Immersive conversion finale with floating, tilting photo cards: a parallax
 * collage on large screens (grid below that), rising sparkles, drifting glows
 * and a bobbing, shimmering button. Enrolment is a real, defined local action:
 * the button reveals an honest status message, since no registration backend
 * exists in this build (no fake sign-up, auth or payment flow).
 */
export function FinalCtaSection() {
  const [enrollmentRequested, setEnrollmentRequested] = useState(false)
  const reducedMotion = useReducedMotion()

  // Pointer position over the card, normalised to [-0.5, 0.5], smoothed with a spring.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointerX = useSpring(rawX, { stiffness: 60, damping: 18 })
  const pointerY = useSpring(rawY, { stiffness: 60, damping: 18 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    rawX.set((event.clientX - rect.left) / rect.width - 0.5)
    rawY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handlePointerLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section
      id="explore-pathways"
      className="w-full max-w-[var(--content-max-width)] mx-auto scroll-mt-[var(--header-height)] px-margin md:px-margin-md lg:px-margin-lg py-margin-lg"
    >
      <AnimatedSection>
        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative w-full rounded-3xl bg-inverse-surface text-inverse-on-surface p-space-lg md:px-margin-lg md:py-margin-lg overflow-hidden shadow-2xl"
        >
          {/* Ambient gradient flares inside the card, slowly drifting */}
          <motion.div
            aria-hidden="true"
            className="absolute -top-32 -right-32 w-96 h-96 bg-primary-container/30 rounded-full blur-3xl pointer-events-none"
            animate={
              reducedMotion ? undefined : { x: [0, -50, 20, 0], y: [0, 40, -10, 0], scale: [1, 1.15, 0.95, 1] }
            }
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"
            animate={
              reducedMotion ? undefined : { x: [0, 60, -20, 0], y: [0, -40, 10, 0], scale: [1, 0.92, 1.12, 1] }
            }
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Rising sparkles */}
          {!reducedMotion &&
            SPARKLES.map((sparkle, index) => (
              <motion.span
                key={index}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 text-secondary-container"
                style={{ left: sparkle.left, fontSize: sparkle.size }}
                initial={{ y: 20, opacity: 0, rotate: 0 }}
                animate={{
                  y: [20, -sparkle.rise],
                  opacity: [0, 0.85, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: sparkle.duration,
                  delay: sparkle.delay,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              >
                {sparkle.star ? (
                  <MaterialIcon name="star" filled className="text-[inherit]" />
                ) : (
                  <span className="block h-[1em] w-[1em] rounded-full bg-current" />
                )}
              </motion.span>
            ))}

          {/* Floating, tilting photo collage (xl and up) */}
          {CTA_IMAGES.map((image) => (
            <FloatingImage
              key={image.label}
              image={image}
              pointerX={pointerX}
              pointerY={pointerY}
              reducedMotion={reducedMotion}
            />
          ))}

          <div className="relative z-10 flex flex-col gap-space-lg">
            <div className="max-w-2xl flex flex-col gap-space-md">
              <motion.div
                className="inline-flex items-center gap-space-xs px-space-md py-1 bg-surface/10 rounded-full backdrop-blur-md self-start"
                animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="relative flex h-2 w-2">
                  {!reducedMotion && (
                    <span
                      aria-hidden="true"
                      className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-container opacity-70"
                    />
                  )}
                  <span aria-hidden="true" className="relative h-2 w-2 rounded-full bg-secondary-container" />
                </span>
                <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">
                  14-Day Discovery Journey
                </span>
              </motion.div>
              <h2 className="font-display text-display-mobile md:text-display text-inverse-on-surface tracking-tight leading-tight">
                Give Yourself or Your Child the Gift of Effortless Curiosity.
              </h2>
              <p className="font-body-lg text-body-lg text-surface-container-high font-normal max-w-xl">
                Enter an education model where wonder replaces anxiety, and mastery is the natural
                byproduct of joy. Instant access to all four interactive modes.
              </p>
              <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                {/* Floating wrapper so the bob doesn't fight the button's hover/tap scale */}
                <motion.div
                  animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.button
                    type="button"
                    onClick={() => setEnrollmentRequested(true)}
                    whileHover={reducedMotion ? undefined : { scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                    className="group relative overflow-hidden px-space-xl py-space-md bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-xl shadow-lg transition-colors flex items-center gap-space-xs"
                  >
                    {/* Shimmer sweep */}
                    {!reducedMotion && (
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-150%' }}
                        animate={{ x: '450%' }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          repeatDelay: 2.8,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                    <span className="relative">Start Free Journey</span>
                    <motion.span
                      className="relative inline-flex"
                      animate={reducedMotion ? undefined : { x: [0, 5, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <MaterialIcon name="arrow_forward" className="text-[20px]" />
                    </motion.span>
                  </motion.button>
                </motion.div>
                <span className="font-label-sm text-label-sm text-surface-container-high/70">
                  No credit card • Cancel anytime • Zero stress guaranteed
                </span>
              </div>
              <p
                role="status"
                aria-live="polite"
                className="font-body-sm text-body-sm text-surface-container-high min-h-5"
              >
                <AnimatePresence>
                  {enrollmentRequested && (
                    <motion.span
                      className="block"
                      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                    >
                      Journey request noted — enrollment is not connected to a backend in this build, so
                      no account was created.
                    </motion.span>
                  )}
                </AnimatePresence>
              </p>
            </div>

            {/* Tilting photo grid for screens below xl */}
            <div className="grid grid-cols-2 gap-space-md sm:grid-cols-4 xl:hidden">
              {CTA_IMAGES.map((image, index) => (
                <motion.div
                  key={image.label}
                  animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
                  transition={{
                    duration: 4 + index * 0.6,
                    delay: index * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <TiltImageCard image={image} reducedMotion={reducedMotion} className="h-40 w-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}