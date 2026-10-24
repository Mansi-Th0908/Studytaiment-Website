import type { Accent, Testimonial } from '../../types'
import { MaterialIcon } from '../common/MaterialIcon'
import { TiltCard } from '../animations/TiltCard'

const AVATAR_ACCENT_CLASSES: Record<Accent, string> = {
  coral: 'bg-primary-fixed text-primary font-bold',
  gold: 'bg-secondary-fixed text-secondary font-bold',
  green: 'bg-tertiary-fixed text-tertiary font-bold',
  'deep-coral': 'bg-primary-fixed-dim text-primary font-bold',
  ink: 'bg-surface-container-high text-on-surface font-bold',
}

const AVATAR_RING_CLASSES: Record<Accent, string> = {
  coral: 'group-hover:ring-primary-fixed',
  gold: 'group-hover:ring-secondary-fixed',
  green: 'group-hover:ring-tertiary-fixed',
  'deep-coral': 'group-hover:ring-primary-fixed',
  ink: 'group-hover:ring-outline-variant',
}

/**
 * A single learner story card: five stars, the quote and the author row.
 * Tilts in 3D on pointer hover (shared with the learning-mode cards), lifts a
 * gradient accent into the top edge and brightens the avatar ring.
 */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <TiltCard cursorTarget={false} className="h-full group">
      <div className="relative h-full overflow-hidden bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between gap-space-md">
        {/* Hover-revealed accent wash along the top edge */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-primary-container via-secondary-container to-tertiary-container opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        {/* Soft corner glow that follows the hover state */}
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary-fixed/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />

        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center gap-1 text-secondary" aria-label="Rated 5 out of 5 stars">
            {Array.from({ length: 5 }, (_, index) => (
              <MaterialIcon key={index} name="star" filled className="text-[18px]" />
            ))}
          </div>
          <p className="font-body-md text-body-md text-on-surface leading-relaxed">
            “{testimonial.quote}”
          </p>
        </div>
        <div className="flex items-center gap-space-sm pt-space-sm">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] ring-2 ring-transparent ring-offset-2 ring-offset-surface-container-lowest transition-all duration-300 ${AVATAR_ACCENT_CLASSES[testimonial.accent]} ${AVATAR_RING_CLASSES[testimonial.accent]}`}
            aria-hidden="true"
          >
            {testimonial.initials}
          </div>
          <div className="flex flex-col">
            <span className="font-title text-title text-on-surface text-[15px]">{testimonial.name}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {testimonial.role}
            </span>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}
