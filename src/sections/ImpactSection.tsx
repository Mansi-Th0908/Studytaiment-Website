import { AnimatedSection } from '../components/animations/AnimatedSection'
import { MaterialIcon } from '../components/common/MaterialIcon'
import type { StatItem } from '../types'

const HERO_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDwQMpZH04lB-kXPPzc_ujZ5XERtcpT8M9Ttfnavkl0p4Fbua-wSuZZh3hSn21BU3amxEAs7NWUS1dD3kBxYcpS6hhbY-fE3k-GGglxQ9vuv5TEt3D5DTguI6kBN3fYvqKsK39-RbZKFk051wLKQIwTjUV7RLuC8v59RdEPPDIB4J2vxJeHNIiU94k9qf946OXUP1FCCSKeUChPsSSDvdQ7b9CVjpS4l9UQF1haeZ0'

const IMPACT_STATS: StatItem[] = [
  {
    value: '8.4x',
    label: 'Engagement Uplift',
    description: 'Active voluntary session completion over conventional homework.',
    accent: 'coral',
  },
  {
    value: '180k+',
    label: 'Active Scholars',
    description: 'Spanning 42 nations without linguistic or socioeconomic silos.',
    accent: 'gold',
  },
  {
    value: '99.2%',
    label: 'Satisfaction',
    description: 'From parents, adult fellows, and institutional partners.',
    accent: 'green',
  },
  {
    value: 'Zero',
    label: 'Graded Anxiety',
    description: 'Evaluations rely entirely on mastery portfolios and creative prototypes.',
    accent: 'ink',
  },
]

const STAT_ACCENT_CLASSES: Record<StatItem['accent'], string> = {
  coral: 'text-primary',
  gold: 'text-secondary',
  green: 'text-tertiary',
  'deep-coral': 'text-primary',
  ink: 'text-on-surface',
}

/**
 * Neuroscience and learning impact: somatic-architecture artwork with the
 * overlapping stress badge, plus the four quantified proof points.
 */
export function ImpactSection() {
  return (
    <section
      id="impact"
      className="w-full max-w-[var(--content-max-width)] mx-auto scroll-mt-[var(--header-height)] px-margin md:px-margin-md lg:px-margin-lg py-margin-lg"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
        {/* Visual editorial artwork block */}
        <AnimatedSection className="lg:col-span-6 relative mb-space-md lg:mb-0">
          <div
            role="img"
            aria-label="Warm natural photograph of a diverse collaborative learning studio with learners engaged in tactile design and hands-on scientific models, soft warm directional sunlight pouring in from expansive windows, warm coral and cream editorial tones."
            className="w-full h-[300px] sm:h-[380px] lg:h-[460px] rounded-2xl overflow-hidden shadow-xl bg-cover bg-center bg-surface-container-high"
            style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
          >
            <div className="w-full h-full bg-linear-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent flex flex-col justify-end p-space-xl">
              <span className="px-space-xs py-1 rounded bg-primary-container text-on-primary font-label-sm text-label-sm self-start mb-space-xs">
                Somatic Architecture
              </span>
              <h4 className="font-headline-sm text-headline-sm text-on-primary">
                Ergonomics of the Non-Fatigued Mind
              </h4>
              <p className="font-body-sm text-body-sm text-surface-container-low max-w-md">
                Every interaction rhythm, tone, and sound is tuned in partnership with cognitive
                neuroscientists.
              </p>
            </div>
          </div>
          {/* Overlapping stat badge */}
          <div className="absolute -bottom-6 -right-4 md:right-8 bg-surface-container-lowest p-space-md rounded-xl shadow-xl flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <MaterialIcon name="vital_signs" className="text-[28px]" />
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm text-on-surface block leading-tight">
                0 bpm
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Stress Pulse Deviation
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* Quantifiable proof points */}
        <div className="lg:col-span-6 flex flex-col gap-space-lg">
          <AnimatedSection className="flex flex-col gap-space-xs">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">
              Empirical Proof
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
              The Joy-Mastery Paradox Solved
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Standard metrics pit rigor against happiness. Our multi-decade developmental model
              demonstrates that joy is the biological prerequisite for sustained deep intellect.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-md">
              {IMPACT_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col p-space-md bg-surface-container-low rounded-xl"
                >
                  <span
                    className={`font-display text-display-mobile md:text-display tracking-tight ${STAT_ACCENT_CLASSES[stat.accent]}`}
                  >
                    {stat.value}
                  </span>
                  <span className="font-title text-title text-on-surface font-semibold pt-1">
                    {stat.label}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    {stat.description}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
