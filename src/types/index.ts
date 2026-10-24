/* Shared domain types for the Studytainment app. */

/** Stable IDs for every scrollable page section (also used as anchor hrefs). */
export type SectionId =
  | 'ecosystem'
  | 'the-4-modes'
  | '3-30-continuum'
  | 'impact'
  | 'stories'
  | 'explore-pathways'

/** Palette accents reused across cards, badges and illustrations. */
export type Accent = 'coral' | 'gold' | 'green' | 'deep-coral' | 'ink'

export interface LearningStage {
  /** Stage number rendered inside the round badge. */
  number: number
  /** Pill label, e.g. "1. The Spark (3–7)". */
  label: string
  /** Age range plus subtitle, e.g. "Ages 3–7 • Sensory Wonder". */
  ageRange: string
  title: string
  description: string
  modality: string
  keystone: string
  quote: string
  /** Accent driving the stage-specific illustration treatment. */
  accent: Accent
}

export interface LearningMode {
  id: string
  /** Material Symbols ligature name. */
  icon: string
  ageRange: string
  tag: string
  title: string
  description: string
  footerText: string
  accent: Accent
}

export interface Testimonial {
  id: string
  initials: string
  name: string
  role: string
  quote: string
  accent: Accent
}

export interface NavLinkItem {
  label: string
  sectionId: SectionId
}

export interface FooterLinkItem {
  label: string
  sectionId: SectionId
  /** Material Symbols ligature for channel-style links. */
  icon?: string
}

export interface FooterLinkGroup {
  title: string
  links: FooterLinkItem[]
}

export interface StatItem {
  value: string
  label: string
  description: string
  accent: Accent
}
