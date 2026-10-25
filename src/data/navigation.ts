import type { NavLinkItem } from '../types'

/** Primary header navigation: home anchors plus the standalone Our Story page. */
export const headerNavLinks: NavLinkItem[] = [
  { label: 'Ecosystem', sectionId: 'ecosystem' },
  { label: 'The 4 Modes', sectionId: 'the-4-modes' },
  { label: '3-30 Continuum', sectionId: '3-30-continuum' },
  { label: 'Impact', sectionId: 'impact' },
  { label: 'Stories', sectionId: 'stories' },

]

/** Section ids covered by the header navigation's in-page anchors. */
export const headerSectionIds = headerNavLinks.flatMap((link) =>
  link.sectionId ? [link.sectionId] : [],
)
