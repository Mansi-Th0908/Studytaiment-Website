import { useCallback, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AnimatedSection } from '../components/animations/AnimatedSection'
import { TestimonialCard } from '../components/cards/TestimonialCard'
import { MaterialIcon } from '../components/common/MaterialIcon'
import { testimonials } from '../data/testimonials'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../utils/cn'

/**
 * Editorial carousel over the learner stories. With exactly three stories the
 * controls rotate the visible order. Animation is direction-aware (cards slide
 * the way the viewer is moving), cards cascade in with a per-card delay, and a
 * dash indicator tracks — and jumps to — the current rotation.
 */
export function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const reducedMotion = useReducedMotion()
  const count = testimonials.length

  const rotate = useCallback(
    (delta: 1 | -1) => {
      setDirection(delta)
      setStartIndex((index) => (index + delta + count) % count)
    },
    [count],
  )

  const jumpTo = useCallback(
    (index: number) => {
      if (index === startIndex) return
      setDirection(index > startIndex ? 1 : -1)
      setStartIndex(index)
    },
    [startIndex],
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      rotate(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      rotate(1)
    }
  }

  const visibleTestimonials = Array.from({ length: Math.min(3, count) }, (_, offset) =>
    testimonials[(((startIndex + offset) % count) + count) % count],
  )

  const controlClasses =
    'w-10 h-10 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container-high flex items-center justify-center transition-colors'

  return (
    <section id="stories" className="w-full bg-surface-container py-margin-lg scroll-mt-[var(--header-height)]">
      <div className="max-w-[var(--content-max-width)] mx-auto px-margin md:px-margin-md lg:px-margin-lg flex flex-col gap-space-xl">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Lived Realities
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
              Voices Across the Continuum
            </h2>
          </div>
          <div
            className="flex items-center gap-space-sm"
            role="group"
            aria-label="Testimonial navigation"
            onKeyDown={handleKeyDown}
          >
            <motion.button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => rotate(-1)}
              whileTap={reducedMotion ? undefined : { scale: 0.86 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={controlClasses}
            >
              <MaterialIcon name="chevron_left" className="text-[20px]" />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Next testimonial"
              onClick={() => rotate(1)}
              whileTap={reducedMotion ? undefined : { scale: 0.86 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={controlClasses}
            >
              <MaterialIcon name="chevron_right" className="text-[20px]" />
            </motion.button>
          </div>
        </AnimatedSection>

        {/* Testimonial grid — direction-aware slides; cards cascade in per index */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={startIndex}
            custom={direction}
            initial={reducedMotion ? false : { opacity: 0, x: 36 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, x: -36 * direction }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-md"
          >
            {visibleTestimonials.map((testimonial, offset) => (
              <motion.div
                key={testimonial.id}
                className="h-full"
                initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut', delay: 0.07 * offset }}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Rotation indicator dashes — clickable, spring-animated widths */}
        <div className="flex items-center justify-center gap-space-xs" role="presentation">
          {testimonials.map((testimonial, index) => {
            const isActive = index === startIndex
            return (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => jumpTo(index)}
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-pressed={isActive}
                className="group px-space-xs py-space-xs flex items-center"
              >
                <motion.span
                  aria-hidden="true"
                  animate={{ width: isActive ? 30 : 12 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={cn(
                    'block h-2 rounded-full transition-colors duration-300',
                    isActive
                      ? 'bg-primary group-hover:bg-primary'
                      : 'bg-outline-variant group-hover:bg-outline',
                  )}
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
