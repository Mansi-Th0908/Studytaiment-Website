import { useEffect } from 'react'
import { StoryFinaleSection } from '../../sections/story/StoryFinaleSection'
import { StoryHeroSection } from '../../sections/story/StoryHeroSection'
import { StoryBeliefSection } from '../../sections/story/StoryBeliefSection'
import { StoryMascotsSection } from '../../sections/story/StoryMascotsSection'
import { StoryMissionSection } from '../../sections/story/StoryMissionSection'
import { StoryProblemSection } from '../../sections/story/StoryProblemSection'
import { StorySparkSection } from '../../sections/story/StorySparkSection'
import { StoryUniverseSection } from '../../sections/story/StoryUniverseSection'
import { StoryDivider } from '../../sections/story/StoryShared'

const STORY_TITLE = 'Our Story — Studytainment'

/**
 * The standalone "Our Story" adventure page: a scroll-driven, illustrated
 * journey through the Studytainment philosophy — opening on curiosity and
 * closing with an invitation to begin.
 */
export function OurStoryPage() {
  useEffect(() => {
    document.title = STORY_TITLE
  }, [])

  return (
    <main id="our-story" className="relative w-full overflow-x-clip bg-story-cream pt-20">
      <StoryHeroSection />
      <StoryDivider className="bg-story-cream" topColor="#fff9ee" />
      <StoryProblemSection />
      <StoryDivider className="bg-white" flip bottomColor="#fff9ee" topColor="#ffffff" />
      <StorySparkSection />
      <StoryMissionSection />
      <StoryUniverseSection />
      <StoryBeliefSection />
      <StoryMascotsSection />
      <StoryFinaleSection />
    </main>
  )
}
