import { useState } from 'react'
import { AnimatedSection } from '../components/animations/AnimatedSection'
import { MaterialIcon } from '../components/common/MaterialIcon'

/**
 * Immersive conversion finale. Enrolment is a real, defined local action: the
 * button reveals an honest status message, since no registration backend
 * exists in this build (no fake sign-up, auth or payment flow).
 */
export function FinalCtaSection() {
  const [enrollmentRequested, setEnrollmentRequested] = useState(false)
  return (
    <section
      id="explore-pathways"
      className="w-full max-w-[var(--content-max-width)] mx-auto scroll-mt-[var(--header-height)] px-margin md:px-margin-md lg:px-margin-lg py-margin-lg"
    >
      <AnimatedSection>
        <div className="relative w-full rounded-3xl bg-inverse-surface text-inverse-on-surface p-space-lg md:px-margin-lg md:py-margin-lg overflow-hidden shadow-2xl">
          {/* Ambient gradient flare inside the card */}
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-32 w-96 h-96 bg-primary-container/30 rounded-full blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"
          />
          <div className="relative z-10 max-w-2xl flex flex-col gap-space-md">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1 bg-surface/10 rounded-full backdrop-blur-md self-start">
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-secondary-container" />
              <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">
                14-Day Discovery Journey
              </span>
            </div>
            <h2 className="font-display text-display-mobile md:text-display text-inverse-on-surface tracking-tight leading-tight">
              Give Yourself or Your Child the Gift of Effortless Curiosity.
            </h2>
            <p className="font-body-lg text-body-lg text-surface-container-high font-normal max-w-xl">
              Enter an education model where wonder replaces anxiety, and mastery is the natural
              byproduct of joy. Instant access to all four interactive modes.
            </p>
            <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
              <button
                type="button"
                onClick={() => setEnrollmentRequested(true)}
                className="px-space-xl py-space-md bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-space-xs"
              >
                <span>Start Free Journey</span>
                <MaterialIcon name="arrow_forward" className="text-[20px]" />
              </button>
              <span className="font-label-sm text-label-sm text-surface-container-high/70">
                No credit card • Cancel anytime • Zero stress guaranteed
              </span>
            </div>
            <p
              role="status"
              aria-live="polite"
              className="font-body-sm text-body-sm text-surface-container-high min-h-5"
            >
              {enrollmentRequested
                ? 'Journey request noted — enrollment is not connected to a backend in this build, so no account was created.'
                : ''}
            </p>
          </div>
        </div>
      </AnimatedSection>
    </section>
  )
}
