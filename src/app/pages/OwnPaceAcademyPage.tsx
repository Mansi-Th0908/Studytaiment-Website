import { OpaHeroSection } from '../../sections/opa/OpaHeroSection'
import { OpaWholePersonSection } from '../../sections/opa/OpaWholePersonSection'
import { OpaGrowthWorldsSection } from '../../sections/opa/OpaGrowthWorldsSection'
import { OpaPillarsSection } from '../../sections/opa/OpaPillarsSection'
import { OpaGuidanceSection } from '../../sections/opa/OpaGuidanceSection'
import { OpaBeginSection } from '../../sections/opa/OpaBeginSection'
import { OpaFamilySection } from '../../sections/opa/OpaFamilySection'
import { OpaFaqSection } from '../../sections/opa/OpaFaqSection'
import { OpaFinalSection } from '../../sections/opa/OpaFinalSection'

/**
 * Own Pace Academy — a scroll-driven journey through three worlds of growth
 * (Foundation 3–12, Rising Star 13–20, Career Success 21–30), composed from
 * `src/sections/opa/*` and styled with the shared story tokens.
 */
export function OwnPaceAcademyPage() {
  return (
    <main className="relative w-full overflow-x-clip">
      <OpaHeroSection />
      <OpaWholePersonSection />
      <OpaGrowthWorldsSection />
      <OpaPillarsSection />
      <OpaGuidanceSection />
      <OpaBeginSection />
      <OpaFamilySection />
      <OpaFaqSection />
      <OpaFinalSection />
    </main>
  )
}
