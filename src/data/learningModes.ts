import type { LearningMode } from '../types'

/**
 * The four interlocking modes of mastery.
 * Copy preserved verbatim from the original design.
 */
export const learningModes: LearningMode[] = [
  {
    id: 'classroom-dynamic',
    icon: 'toys',
    ageRange: 'Ages 3–12',
    tag: 'Sensory Quest',
    title: 'Classroom Dynamic',
    description:
      'Tactile, tactile-first quests and cooperative puzzle rooms where early fundamentals in physics and numeracy feel like playground discoveries.',
    footerText: '0 Screen Fatigue',
    accent: 'coral',
  },
  {
    id: 'self-study-studio',
    icon: 'headphones',
    ageRange: 'Ages 10–18',
    tag: 'Deep Flow',
    title: 'Self-Study Studio',
    description:
      'Autonomous deep-work tracks with gamified streaks, ambient binaural soundscapes, and gentle peer checkpoints instead of timed exam pressure.',
    footerText: 'Binaural Audio Labs',
    accent: 'gold',
  },
  {
    id: 'online-synchronous',
    icon: 'groups_3',
    ageRange: 'Ages 14–25',
    tag: 'Live Cohorts',
    title: 'Online Synchronous',
    description:
      'Global real-time debates, Socratic inquiry rings, international team simulations, and live critiques mentored by domain pioneers.',
    footerText: '42 Active Guilds',
    accent: 'green',
  },
  {
    id: 'own-pace-academy',
    icon: 'rocket_launch',
    ageRange: 'Ages 18–30',
    tag: 'Executive Modular',
    title: 'Own Pace Academy',
    description:
      'Venture-grade sprints, algorithmic trading sandboxes, bio-engineering workshops, and self-directed career architectures for adult pioneers.',
    footerText: 'Portfolio-Driven',
    accent: 'deep-coral',
  },
]
