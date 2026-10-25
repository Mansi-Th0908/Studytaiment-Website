import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { STORY } from '../story/storyTheme'

/*
 * Original character scenes for the Own Pace Academy page. The Foundation
 * explorer (Nova) and owl mascot (Lumi) are reused from the story library.
 */

/** Shared gentle bob transition. */
const BOB = { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } as const
const FILL_BOX = { transformBox: 'fill-box' } as const

/* ------------------------------------------------------------------ */
/* Teen Explorer — energetic hoodie kid with interests orbiting        */
/* ------------------------------------------------------------------ */

export function TeenExplorer({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion()

  return (
    <svg viewBox="0 0 200 250" aria-hidden="true" className={className} style={{ overflow: 'visible' }}>
      <motion.g animate={reducedMotion ? undefined : { y: [0, -6, 0] }} transition={BOB}>
        {/* shoes */}
        <ellipse cx="88" cy="236" rx="12" ry="7" fill="#2c3161" />
        <ellipse cx="112" cy="236" rx="12" ry="7" fill="#2c3161" />
        {/* legs */}
        <rect x="84" y="200" width="13" height="32" rx="6" fill="#3d4470" />
        <rect x="103" y="200" width="13" height="32" rx="6" fill="#3d4470" />
        {/* hoodie body */}
        <rect x="74" y="140" width="52" height="64" rx="22" fill="#5b6bd6" />
        <path d="M88 142 Q100 158 112 142" stroke="#4a58b8" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* backpack */}
        <rect x="126" y="150" width="26" height="40" rx="12" fill={STORY.orange} />
        <rect x="131" y="158" width="16" height="12" rx="6" fill={STORY.yellow} />
        {/* arms (one thumbs-up-ish) */}
        <motion.g
          style={{ ...FILL_BOX, transformOrigin: 'left bottom' }}
          animate={reducedMotion ? undefined : { rotate: [-4, 10, -4] }}
          transition={{ ...BOB, duration: 2.6 }}
        >
          <rect x="56" y="150" width="13" height="34" rx="6" fill="#4a58b8" transform="rotate(22 62 156)" />
          <circle cx="61" cy="146" r="9" fill="#c9885c" />
        </motion.g>
        <rect x="72" y="152" width="12" height="30" rx="6" fill="#4a58b8" />
        {/* head */}
        <circle cx="100" cy="106" r="37" fill="#c9885c" />
        {/* curly hair */}
        {[
          [74, 84, 12],
          [92, 74, 13],
          [110, 76, 12],
          [124, 88, 11],
          [128, 102, 9],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#241d16" />
        ))}
        {/* headphones */}
        <path d="M64 96 Q100 44 136 96" stroke="#2c3161" strokeWidth="7" fill="none" strokeLinecap="round" />
        <rect x="56" y="92" width="13" height="22" rx="6" fill={STORY.lavender} />
        <rect x="131" y="92" width="13" height="22" rx="6" fill={STORY.lavender} />
        {/* face */}
        <motion.g style={FILL_BOX} animate={reducedMotion ? undefined : { scaleY: [1, 1, 0.12, 1] }} transition={{ duration: 4.6, times: [0, 0.9, 0.94, 1], repeat: Infinity }}>
          <circle cx="88" cy="108" r="5.5" fill="#20222e" />
          <circle cx="112" cy="108" r="5.5" fill="#20222e" />
        </motion.g>
        <path d="M90 120 Q100 129 110 120" stroke="#20222e" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <ellipse cx="80" cy="118" rx="5" ry="3.5" fill="#deb08a" opacity="0.7" />
        <ellipse cx="120" cy="118" rx="5" ry="3.5" fill="#deb08a" opacity="0.7" />
      </motion.g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Young Adult — composed figure with portfolio, facing the horizon    */
/* ------------------------------------------------------------------ */

export function YoungAdult({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion()

  return (
    <svg viewBox="0 0 200 260" aria-hidden="true" className={className} style={{ overflow: 'visible' }}>
      <motion.g animate={reducedMotion ? undefined : { y: [0, -4, 0] }} transition={{ ...BOB, duration: 3.6 }}>
        {/* shadow */}
        <ellipse cx="100" cy="246" rx="42" ry="8" fill="#172554" opacity="0.08" />
        {/* shoes */}
        <ellipse cx="90" cy="242" rx="11" ry="6" fill="#33291f" />
        <ellipse cx="110" cy="242" rx="11" ry="6" fill="#33291f" />
        {/* trousers */}
        <rect x="83" y="196" width="14" height="42" rx="6" fill="#40476b" />
        <rect x="103" y="196" width="14" height="42" rx="6" fill="#40476b" />
        {/* smart-casual blazer */}
        <path d="M70 142 h60 v62 h-60 Z" fill="#2e6d76" rx="14" />
        <path d="M70 204 q30 8 60 0 l0 -8 h-60 Z" fill="#265960" />
        <rect x="84" y="142" width="32" height="62" rx="10" fill="#fff9ee" />
        <path d="M96 146 l4 8 4 -8" stroke={STORY.coral} strokeWidth="3" fill="none" />
        {/* arm holding folio */}
        <rect x="120" y="148" width="13" height="38" rx="6" fill="#146a74" transform="rotate(-24 126 154)" />
        <circle cx="140" cy="142" r="8" fill="#e0a878" />
        {/* tablet / portfolio */}
        <motion.g
          style={FILL_BOX}
          animate={reducedMotion ? undefined : { rotate: [-3, 3, -3] }}
          transition={{ ...BOB, duration: 4.2 }}
        >
          <rect x="130" y="150" width="34" height="26" rx="4" fill="#20334d" />
          <rect x="133" y="153" width="28" height="20" rx="2" fill="#cfeaff" />
          <rect x="136" y="156" width="12" height="3" rx="1.5" fill={STORY.orange} />
          <rect x="136" y="162" width="22" height="2" rx="1" fill="#9db7cc" />
          <rect x="136" y="166" width="18" height="2" rx="1" fill="#9db7cc" />
        </motion.g>
        {/* other arm */}
        <rect x="64" y="150" width="12" height="36" rx="6" fill="#146a74" transform="rotate(18 70 156)" />
        <circle cx="76" cy="148" r="7" fill="#e0a878" />
        {/* head */}
        <circle cx="100" cy="112" r="33" fill="#e0a878" />
        <path d="M70 104 Q68 74 100 72 Q132 74 130 104 Q120 88 100 88 Q80 88 70 104 Z" fill="#2b2018" />
        <path d="M100 88 Q120 90 128 104 Q132 76 100 74 Z" fill="#2b2018" />
        <motion.g style={FILL_BOX} animate={reducedMotion ? undefined : { scaleY: [1, 1, 0.14, 1] }} transition={{ duration: 5.2, times: [0, 0.9, 0.94, 1], repeat: Infinity }}>
          <circle cx="89" cy="112" r="4.8" fill="#20222e" />
          <circle cx="111" cy="112" r="4.8" fill="#20222e" />
        </motion.g>
        <path d="M92 124 Q100 130 108 124" stroke="#20222e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Seminar Scene — mentor presenting to a parent + child               */
/* ------------------------------------------------------------------ */

export function MentorSeminarScene({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion()

  return (
    <svg viewBox="0 0 340 220" aria-hidden="true" className={className} style={{ overflow: 'visible' }}>
      {/* board */}
      <rect x="18" y="34" width="120" height="86" rx="10" fill="#fdfffc" stroke="#d7dbe6" strokeWidth="3" />
      <rect x="30" y="46" width="60" height="10" rx="5" fill={STORY.orange} />
      <rect x="30" y="62" width="92" height="7" rx="3.5" fill="#c9d2e4" />
      <rect x="30" y="74" width="78" height="7" rx="3.5" fill="#c9d2e4" />
      <motion.circle
        cx="118"
        cy="56"
        r="14"
        fill="#ffe9a3"
        stroke={STORY.yellow}
        strokeWidth="3"
        animate={reducedMotion ? undefined : { scale: [1, 1.12, 1] }}
        transition={{ ...BOB, duration: 2.4 }}
        style={FILL_BOX}
      />
      <path d="M118 49 l2.6 5.4 6 .6-4.4 4 1.2 6-5.4-3-5.4 3 1.2-6-4.4-4 6-.6z" fill={STORY.orange} />
      {/* mentor */}
      <g transform="translate(60 118)">
        <motion.g animate={reducedMotion ? undefined : { y: [0, -3, 0] }} transition={BOB}>
          <rect x="18" y="38" width="34" height="42" rx="15" fill="#2e6d76" />
          <circle cx="35" cy="22" r="22" fill="#e6b184" />
          <path d="M14 18 Q13 -4 35 -6 Q57 -4 56 18 Q46 4 35 6 Q24 4 14 18 Z" fill="#262f3f" />
          {/* glasses */}
          <circle cx="27" cy="22" r="8" fill="none" stroke="#3b4657" strokeWidth="3" />
          <circle cx="43" cy="22" r="8" fill="none" stroke="#3b4657" strokeWidth="3" />
          <path d="M35 22 h1" stroke="#3b4657" strokeWidth="3" />
          <circle cx="27" cy="22" r="3" fill="#20222e" />
          <circle cx="43" cy="22" r="3" fill="#20222e" />
          <path d="M29 32 Q35 36 41 32" stroke="#20222e" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          {/* pointing arm */}
          <motion.g
            style={{ ...FILL_BOX, transformOrigin: 'right center' }}
            animate={reducedMotion ? undefined : { rotate: [0, -14, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <rect x="46" y="42" width="26" height="10" rx="5" fill="#2e6d76" />
            <circle cx="72" cy="44" r="6" fill="#e6b184" />
          </motion.g>
        </motion.g>
      </g>
      {/* parent listening */}
      <g transform="translate(166 128)">
        <motion.g animate={reducedMotion ? undefined : { y: [0, -2, 0] }} transition={{ ...BOB, delay: 0.6 }}>
          <rect x="6" y="40" width="36" height="46" rx="16" fill="#8d5bd0" />
          <circle cx="24" cy="22" r="21" fill="#f3c19d" />
          <path d="M4 18 Q3 -2 24 -4 Q45 -2 44 18 Q36 6 24 8 Q12 6 4 18 Z" fill="#4d2f1d" />
          <circle cx="12" cy="18" r="6" fill="#4d2f1d" />
          <circle cx="36" cy="18" r="6" fill="#4d2f1d" />
          <circle cx="17" cy="24" r="3.4" fill="#20222e" />
          <circle cx="31" cy="24" r="3.4" fill="#20222e" />
          <path d="M19 32 Q24 35 29 32" stroke="#20222e" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        </motion.g>
      </g>
      {/* child listening */}
      <g transform="translate(234 140)">
        <motion.g animate={reducedMotion ? undefined : { y: [0, -4, 0] }} transition={{ ...BOB, delay: 1.1 }}>
          <rect x="2" y="34" width="30" height="40" rx="14" fill={STORY.orange} />
          <circle cx="17" cy="18" r="18" fill="#ffd9b8" />
          <path d="M0 14 Q-1 -6 17 -8 Q35 -6 34 14 Q26 4 17 6 Q8 4 0 14 Z" fill="#7a4a2b" />
          <circle cx="11" cy="20" r="3" fill="#20222e" />
          <circle cx="23" cy="20" r="3" fill="#20222e" />
          <path d="M13 27 Q17 30 21 27" stroke="#20222e" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          {/* raised hand */}
          <motion.g
            style={{ ...FILL_BOX, transformOrigin: 'left bottom' }}
            animate={reducedMotion ? undefined : { rotate: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          >
            <rect x="26" y="34" width="9" height="22" rx="4.5" fill="#ffd9b8" transform="rotate(34 30 40)" />
          </motion.g>
        </motion.g>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Compass Rose — gently seeking its direction                         */
/* ------------------------------------------------------------------ */

export function CompassRose({ className, size = 120 }: { className?: string; size?: number }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <circle cx="60" cy="60" r="52" fill="#fdfffc" stroke="#d8ceb8" strokeWidth="5" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="#f0e6d2" strokeWidth="2" />
      {['N', 'E', 'S', 'W'].map((letter, i) => (
        <text
          key={letter}
          x={60}
          y={18}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#8f7069"
          transform={`rotate(${i * 90} 60 60)`}
        >
          {letter}
        </text>
      ))}
      <motion.g
        animate={reducedMotion ? undefined : { rotate: [0, 22, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <path d="M60 22 L70 60 L60 54 L50 60 Z" fill={STORY.coral} />
        <path d="M60 98 L50 60 L60 66 L70 60 Z" fill="#c6b98f" />
      </motion.g>
      <circle cx="60" cy="60" r="6" fill={STORY.yellow} stroke="#d8ceb8" strokeWidth="2" />
    </motion.svg>
  )
}

/* ------------------------------------------------------------------ */
/* Words of Direction — small labeled interest chips                   */
/* ------------------------------------------------------------------ */

export function InterestChip({
  label,
  icon,
  color,
  soft,
  className,
  selected = false,
  highlight = false,
  onClick,
  selectable = false,
}: {
  label: string
  icon: string
  color: string
  soft: string
  className?: string
  selected?: boolean
  highlight?: boolean
  onClick?: () => void
  selectable?: boolean
}) {
  const reducedMotion = useReducedMotion()
  const shared = 'relative inline-flex items-center gap-2 rounded-full shadow-sm font-story-display text-sm font-bold transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-story-orange/30'

  if (!selectable) {
    return (
      <motion.span
        className={`${shared} px-3.5 py-1.5 text-white ${className ?? ''}`}
        style={{ backgroundColor: color }}
        animate={reducedMotion ? undefined : { y: highlight ? [0, -5, 0] : [0, 0, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
          {icon}
        </span>
        {label}
      </motion.span>
    )
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      whileHover={reducedMotion ? undefined : { y: -3, scale: 1.04 }}
      whileTap={reducedMotion ? undefined : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 320, damping: 16 }}
      className={`${shared} px-4 py-2 ${selected ? 'text-white' : 'text-story-midnight'} ${className ?? ''}`}
      style={{
        backgroundColor: selected ? color : soft,
        boxShadow: selected ? `0 10px 26px ${color}66` : undefined,
      }}
    >
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
        {icon}
      </span>
      {label}
    </motion.button>
  )
}
