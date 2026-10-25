import { div } from "three/src/nodes/math/OperatorNode.js";
const MARQUEE_ITEMS: ReadonlyArray<{ text: string; highlighted?: boolean }> = [
  { text: 'Curiosity Labs' },
  { text: 'Neuroscience of Play' },
  { text: 'Multimodal Cognition' },
  { text: 'Ages 3–30 Continuum' },
  // { text: '0% Graded Anxiety', highlighted: true },
  { text: '0% Graded Anxiety' },
  { text: 'Flow-State Academies' },
  { text: 'Socratic Live Forums' },
  { text: 'Deep Mastery Tracks' },
]

function MarqueeGroupContent() {
  return (
    <>
      {MARQUEE_ITEMS.map((item) => (
        <>
          <span key={`${item.text}-bullet`} aria-hidden="true" className="p-5">
            •
          </span>
          <span key={item.text} className={item.highlighted ? 'text-primary font-bold' : undefined}>
            {item.text}
          </span>
        </>
      ))}
    </>
  )
}

/**
 * Infinite horizontal ticker rendered as two identical halves inside a 200%
 * track; the CSS keyframe shifts -50% for a seamless loop and pauses on hover.
 */
export function MarqueeSection() {
  return (
    <section
      className="w-full bg-surface-container-high overflow-hidden py-space-sm select-none shadow-[inset_0_1px_3px_rgba(24,27,32,0.05)]"
      aria-label="Studytainment highlights"
    >
      <div className="flex w-[200%] marquee-track">
        <div className="flex items-center gap-space-lg sm:gap-space-xl min-w-full justify-around font-label-md text-label-md sm:font-label-lg sm:text-label-lg tracking-widest uppercase text-on-surface-variant font-semibold">
          <MarqueeGroupContent />
        </div>
        <div
          aria-hidden="true"
          className="flex items-center gap-space-lg sm:gap-space-xl min-w-full justify-around font-label-md text-label-md sm:font-label-lg sm:text-label-lg tracking-widest uppercase text-on-surface-variant font-semibold"
        >
          <MarqueeGroupContent />
        </div>
      </div>
    </section>
  )
}
