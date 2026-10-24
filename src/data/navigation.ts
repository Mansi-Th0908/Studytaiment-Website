import type { FooterLinkGroup, NavLinkItem } from '../types'

/** Primary header navigation, mapped to real section anchors. */
export const headerNavLinks: NavLinkItem[] = [
  { label: 'Ecosystem', sectionId: 'ecosystem' },
  { label: 'The 4 Modes', sectionId: 'the-4-modes' },
  { label: '3-30 Continuum', sectionId: '3-30-continuum' },
  { label: 'Impact', sectionId: 'impact' },
  { label: 'Stories', sectionId: 'stories' },
]

/** Footer information groups, preserving the original four-column structure. */
export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: 'Lifelong Pathways',
    links: [
      { label: 'Foundation Explorers (Ages 3–7)', sectionId: '3-30-continuum' },
      { label: 'Curiosity Lab (Ages 8–14)', sectionId: '3-30-continuum' },
      { label: 'Autonomy & Mastery (Ages 15–21)', sectionId: '3-30-continuum' },
      { label: 'Vanguard Specialists (Ages 22–30)', sectionId: '3-30-continuum' },
      { label: 'Synchronous Play Modalities', sectionId: 'the-4-modes' },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { label: 'Core Manifesto', sectionId: 'ecosystem' },
      { label: '4 Modes Architecture', sectionId: 'the-4-modes' },
      { label: 'Longitudinal Metrics', sectionId: 'impact' },
      { label: 'Learner Case Studies', sectionId: 'stories' },
      { label: 'Safety & Accessibility', sectionId: 'ecosystem' },
    ],
  },
  {
    title: 'Channels',
    links: [
      { label: 'Dispatches', sectionId: 'explore-pathways', icon: 'podcasts' },
      { label: 'Community', sectionId: 'stories', icon: 'forum' },
      { label: 'Publications', sectionId: 'impact', icon: 'menu_book' },
      { label: 'Editorial Desk', sectionId: 'explore-pathways', icon: 'mail' },
    ],
  },
]
