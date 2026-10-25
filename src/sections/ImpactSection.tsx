import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MaterialIcon } from '../components/common/MaterialIcon'
import type { StatItem } from '../types'

// Register GSAP ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

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
  coral: 'text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-primary to-orange-400',
  gold: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-secondary',
  green: 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-tertiary',
  'deep-coral': 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-primary',
  ink: 'text-on-surface',
}

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const heroCardRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const statsContainerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const glowOrbRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading & Text Fade-in Scroll Animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // 2. Main Hero Artwork Image Reveal
      gsap.fromTo(
        heroCardRef.current,
        { opacity: 0, scale: 0.95, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: heroCardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // 3. Floating Continuous Animation for the Stress Badge
      gsap.to(badgeRef.current, {
        y: -8,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // 4. Ambient Glowing Orb Pulse
      gsap.to(glowOrbRef.current, {
        scale: 1.15,
        opacity: 0.7,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // 5. Staggered Entrance for Stats Cards Grid
      if (statsContainerRef.current) {
        const cards = statsContainerRef.current.children
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Magnetic 3D Mouse Movement effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return
    const rect = heroCardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(heroCardRef.current, {
      rotateY: (x / rect.width) * 10,
      rotateX: (-y / rect.height) * 10,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4,
    })
  }

  const handleMouseLeave = () => {
    if (!heroCardRef.current) return
    gsap.to(heroCardRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power3.out',
      duration: 0.8,
    })
  }

  const handleStatMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -6, scale: 1.02, duration: 0.3, ease: 'power2.out' })
  }

  const handleStatMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' })
  }

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="w-full max-w-[var(--content-max-width)] mx-auto scroll-mt-[var(--header-height)] px-margin md:px-margin-md lg:px-margin-lg py-margin-lg overflow-hidden relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
        {/* Visual editorial artwork block with Glowing Ambient Background */}
        <div className="lg:col-span-6 relative mb-space-md lg:mb-0">
          {/* Ambient Glowing Color Aura behind card */}
          <div
            ref={glowOrbRef}
            className="absolute -inset-4 bg-gradient-to-tr from-primary/30 via-secondary/25 to-tertiary/30 rounded-3xl blur-2xl opacity-50 pointer-events-none -z-10"
          />

          <div
            ref={heroCardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              role="img"
              aria-label="Warm natural photograph of a diverse collaborative learning studio with learners engaged in tactile design and hands-on scientific models"
              className="w-full h-[300px] sm:h-[380px] lg:h-[460px] rounded-2xl overflow-hidden shadow-2xl bg-cover bg-center bg-surface-container-high relative border border-white/10"
              style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
            >
              <div className="w-full h-full bg-gradient-to-t from-inverse-surface/95 via-inverse-surface/40 to-transparent flex flex-col justify-end p-space-xl relative z-20">
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-primary to-rose-500 text-white font-label-sm text-label-sm self-start mb-space-xs shadow-md">
                  Somatic Architecture
                </span>
                <h4 className="font-headline-sm text-headline-sm text-white drop-shadow-sm">
                  Ergonomics of the Non-Fatigued Mind
                </h4>
                <p className="font-body-sm text-body-sm text-slate-200 max-w-md">
                  Every interaction rhythm, tone, and sound is tuned in partnership with cognitive
                  neuroscientists.
                </p>
              </div>
            </div>

            {/* Overlapping stat badge with floating GSAP animation */}
            <div
              ref={badgeRef}
              className="absolute -bottom-6 -right-4 md:right-8 bg-surface-container-lowest/95 backdrop-blur-xl p-space-md rounded-2xl shadow-2xl flex items-center gap-space-md z-30 border border-primary/20"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-tertiary-fixed to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-tertiary/20">
                <MaterialIcon name="vital_signs" className="text-[28px]" />
              </div>
              <div>
                <span className="font-headline-sm text-headline-sm text-on-surface block leading-tight">
                  0 bpm
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Stress Pulse Deviation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quantifiable proof points */}
        <div className="lg:col-span-6 flex flex-col gap-space-lg">
          <div ref={headingRef} className="flex flex-col gap-space-xs opacity-0">
            <span className="font-label-sm text-label-sm uppercase tracking-widest bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent font-extrabold">
              Empirical Proof
            </span>
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface tracking-tight">
              The Joy-Mastery Paradox Solved
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Standard metrics pit rigor against happiness. Our multi-decade developmental model
              demonstrates that joy is the biological prerequisite for sustained deep intellect.
            </p>
          </div>

          <div>
            <div ref={statsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-gutter-md">
              {IMPACT_STATS.map((stat) => (
                <div
                  key={stat.label}
                  onMouseEnter={handleStatMouseEnter}
                  onMouseLeave={handleStatMouseLeave}
                  className="flex flex-col p-space-md bg-gradient-to-b from-surface-container-low to-surface-container rounded-2xl opacity-0 shadow-md hover:shadow-2xl hover:border-primary/30 border border-transparent transition-all duration-300 cursor-pointer relative group overflow-hidden"
                >
                  {/* Subtle top glow line on stat cards */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <span
                    className={`font-display text-display-mobile md:text-display tracking-tight font-bold ${STAT_ACCENT_CLASSES[stat.accent]
                      }`}
                  >
                    {stat.value}
                  </span>
                  <span className="font-title text-title text-on-surface font-semibold pt-1">
                    {stat.label}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant pt-1">
                    {stat.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}