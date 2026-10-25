import { useCallback, useEffect, useState } from 'react'
import { ArtifactModal } from '../../components/modals/ArtifactModal'
import { ContinuumSection } from '../../sections/ContinuumSection'
import { FinalCtaSection } from '../../sections/FinalCtaSection'
import { HeroSection } from '../../sections/HeroSection'
import { ImpactSection } from '../../sections/ImpactSection'
import { LearningModesSection } from '../../sections/LearningModesSection'
import { MarqueeSection } from '../../sections/MarqueeSection'
import { TestimonialsSection } from '../../sections/TestimonialsSection'

const DEFAULT_TITLE = 'Studytainment — Learning Should Never Feel Like a Burden'

/**
 * The complete Studytainment home experience: ten preserved sections, footer
 * with dispatch subscription, the artifact dialog and ambient glows.
 */
export function HomePage() {
  const [tourOpen, setTourOpen] = useState(false)
  const openTour = useCallback(() => setTourOpen(true), [])
  const closeTour = useCallback(() => setTourOpen(false), [])

  useEffect(() => {
    document.title = DEFAULT_TITLE
  }, [])

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]">
      <div className="flex flex-col w-full relative overflow-x-clip">
        {/* Ambient backdrop glows */}
        <div
          aria-hidden="true"
          className="absolute top-12 left-1/4 w-[460px] h-[460px] bg-secondary-container/20 rounded-full blur-3xl pointer-events-none -z-10"
        />
        <div
          aria-hidden="true"
          className="absolute top-96 right-10 w-[520px] h-[520px] bg-primary-container/10 rounded-full blur-[100px] pointer-events-none -z-10"
        />
        <div
          aria-hidden="true"
          className="absolute top-[1800px] left-10 w-[600px] h-[600px] bg-tertiary-fixed/30 rounded-full blur-[120px] pointer-events-none -z-10"
        />

        <HeroSection onOpenTour={openTour} />
        <MarqueeSection />
        <LearningModesSection />
        <ContinuumSection />
        <ImpactSection />
        <TestimonialsSection />
        <FinalCtaSection />
      </div>

      <ArtifactModal open={tourOpen} onClose={closeTour} />
    </main>
  )
}
