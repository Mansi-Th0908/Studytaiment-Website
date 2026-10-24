import { LearningModeCard } from '../components/cards/LearningModeCard'
import { MaterialIcon } from '../components/common/MaterialIcon'
import { SectionHeading } from '../components/common/SectionHeading'
import { AnimatedSection } from '../components/animations/AnimatedSection'
import { learningModes } from '../data/learningModes'

/**
 * The 4 Dynamic Modes of Learning — heading plus the tilt-enabled card grid.
 */
export function LearningModesSection() {
  return (
    <section
      id="the-4-modes"
      className="w-full max-w-[var(--content-max-width)] mx-auto scroll-mt-[var(--header-height)] px-margin md:px-margin-md lg:px-margin-lg py-margin-lg flex flex-col gap-space-xl"
    >
      <AnimatedSection>
        <SectionHeading
          eyebrow="Dynamic Orchestration"
          title="The 4 Interlocking Modes of Mastery"
          description="Learning bends to human biorhythms. Shift freely across four complementary modalities calibrated to eradicate cognitive burnout and spark persistent curiosity."
          aside={
            <div className="hidden sm:flex items-center gap-space-xs text-label-sm font-label-sm text-on-surface-variant bg-surface-container px-space-md py-space-xs rounded-full">
              <MaterialIcon name="touch_app" className="text-[16px] text-primary" />
              Hover cards to engage 3D tilt perspective
            </div>
          }
        />
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-md [perspective:1000px]">
          {learningModes.map((mode) => (
            <LearningModeCard key={mode.id} mode={mode} />
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}
