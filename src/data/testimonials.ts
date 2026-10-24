import type { Testimonial } from '../types'

/**
 * Learner stories. The original design supplies exactly three testimonials;
 * they are preserved verbatim rather than extended.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'sarah-m',
    initials: 'SM',
    name: 'Sarah M.',
    role: 'Mother of two • London',
    quote:
      'My 8-year-old taught me astrophysics over Sunday breakfast! She built a miniature cosmic orbital system in Studytainment and was genuinely breathless with excitement.',
    accent: 'coral',
  },
  {
    id: 'julian-k',
    initials: 'JK',
    name: 'Julian K.',
    role: 'Age 17 • Honors Scholar',
    quote:
      'Studytainment turned differential calculus into a strategic spatial puzzle game I couldn’t put down. It bypassed all my test anxiety and got me into my dream aeronautics program.',
    accent: 'gold',
  },
  {
    id: 'elena-v',
    initials: 'EV',
    name: 'Dr. Elena V.',
    role: 'Age 28 • Venture Partner',
    quote:
      'From medical residency into deep-tech venture building, Studytainment rewired how I synthesise complex cross-domain systems in real time. It is true lifelong cognitive scaffolding.',
    accent: 'green',
  },
]
