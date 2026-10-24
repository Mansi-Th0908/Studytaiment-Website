import type { LearningStage } from '../types'

/**
 * The five-stage Ages 3–30 continuum.
 * Copy preserved verbatim from the original design.
 */
export const learningStages: LearningStage[] = [
  {
    number: 1,
    label: '1. The Spark (3–7)',
    ageRange: 'Ages 3–7 • Sensory Wonder',
    title: 'The Spark: Somatic Grounding & Natural Wonder',
    description:
      'Early neurological pathways develop most durably when learning is tactile, story-infused, and unburdened by rigid testing. Learners manipulate physical geometry, decode musical math rhythms, and cultivate intuitive curiosity.',
    modality: 'Kinesthetic Story-Worlds',
    keystone: 'Spatial Fluidity',
    quote:
      'Children do not play to escape learning; they learn by surrendering to immersive play.',
    accent: 'coral',
  },
  {
    number: 2,
    label: '2. The Explorer (8–13)',
    ageRange: 'Ages 8–13 • Quest Inquiry',
    title: 'The Explorer: Scientific Method as Playful Quest',
    description:
      'Transitioning from spontaneous wonder into systemic hypotheses. Learners build operational robotics, run micro-biodomes, and solve ecological mystery narratives in collaborative guilds.',
    modality: 'Guild-Based Missions',
    keystone: 'Causal Synthesis',
    quote:
      'Curiosity transforms from an aimless ember into a laser beam of targeted investigation.',
    accent: 'gold',
  },
  {
    number: 3,
    label: '3. The Catalyst (14–18)',
    ageRange: 'Ages 14–18 • Autonomy & Voice',
    title: 'The Catalyst: Social Socratic Inquiry & Prototyping',
    description:
      'Adolescent energy channeled into high-leverage creation. Global peer debates, open-source code contributions, and public policy simulations where arguments must withstand rigorous scrutiny.',
    modality: 'Socratic Amphitheaters',
    keystone: 'Independent Reasoning',
    quote:
      'Education must not be a lecture endured, but an intellectual sparring ground celebrated.',
    accent: 'green',
  },
  {
    number: 4,
    label: '4. The Architect (19–24)',
    ageRange: 'Ages 19–24 • Systems Building',
    title: 'The Architect: Interdisciplinary Real-World Systems',
    description:
      'Higher education re-engineered around live venture projects, algorithmic ethics, and multi-tier systems architecture. Theory translates directly into functional human infrastructure.',
    modality: 'Venture Incubation',
    keystone: 'Complex Architecture',
    quote:
      'True mastery happens when you cannot distinguish where academic theory ends and creative output begins.',
    accent: 'ink',
  },
  {
    number: 5,
    label: '5. The Master (25–30)',
    ageRange: 'Ages 25–30 • Mastery Contribution',
    title: 'The Master: Visionary Leadership & Mentorship',
    description:
      'Senior fellows lead research collectives, launch public goods, and return as mentors for emerging explorers. The cycle of learning evolves seamlessly into lifelong contribution.',
    modality: 'Executive Synthesis',
    keystone: 'Generative Legacy',
    quote:
      'The ultimate proof of learning is the generosity to illuminate the path for those who follow.',
    accent: 'deep-coral',
  },
]
