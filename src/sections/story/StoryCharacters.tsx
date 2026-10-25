import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { STORY } from './storyTheme'

/*
 * Original cartoon character library for the "Our Story" page.
 * Every character is a self-contained SVG built from brand-friendly shapes —
 * no emoji, no external assets, no copyrighted characters.
 */

interface CharacterProps {
  className?: string
  waving?: boolean
}

/** Shared idle bob + reduced-motion guard for a whole character group. */
function useIdles() {
  const reducedMotion = useReducedMotion()

  const bob: React.ComponentProps<typeof motion.g>['transition'] = {
    duration: 3.2,
    repeat: Infinity,
    ease: 'easeInOut',
  }

  const blink: React.ComponentProps<typeof motion.g>['transition'] = {
    duration: 4.4,
    times: [0, 0.92, 0.96, 1],
    repeat: Infinity,
    ease: 'linear',
  }

  return { reducedMotion, bob, blink }
}

const FILL_BOX = { transformBox: 'fill-box' } as const

/* ------------------------------------------------------------------ */
/* Nova the Explorer — curious kid with an orange backpack              */
/* ------------------------------------------------------------------ */

export function NovaCharacter({ className, waving = false }: CharacterProps) {
  const { reducedMotion, bob, blink } = useIdles()

  return (
    <svg
      viewBox="0 0 200 250"
      aria-hidden="true"
      className={className}
      style={{ overflow: 'visible' }}
    >
      {/* Backpack */}
      <motion.g animate={reducedMotion ? undefined : { rotate: [0, -3, 0] }} transition={bob}>
        <rect x="52" y="118" width="40" height="56" rx="16" fill={STORY.orange} />
        <rect x="58" y="126" width="28" height="16" rx="8" fill={STORY.yellow} />
        <path d="M62 118 Q72 104 82 118" stroke="#d96f1e" strokeWidth="7" fill="none" strokeLinecap="round" />
      </motion.g>

      {/* Body */}
      <motion.g animate={reducedMotion ? undefined : { y: [0, -7, 0] }} transition={bob}>
        {/* Legs + boots */}
        <rect x="86" y="196" width="12" height="30" rx="6" fill="#4b4f70" />
        <rect x="102" y="196" width="12" height="30" rx="6" fill="#4b4f70" />
        <ellipse cx="90" cy="231" rx="11" ry="7" fill="#ff9d64" />
        <ellipse cx="110" cy="231" rx="11" ry="7" fill="#ff9d64" />

        {/* Torso with vest */}
        <rect x="78" y="150" width="44" height="54" rx="20" fill={STORY.mint} />
        <rect x="86" y="150" width="28" height="54" rx="14" fill="#fff9ee" />

        {/* Waving arm */}
        <motion.g
          animate={reducedMotion ? undefined : waving ? { rotate: [0, -24, 8, -24, 0] } : { rotate: [-4, 6, -4] }}
          transition={waving ? { duration: 1.6, repeatDelay: 1.4, repeat: Infinity } : bob}
          style={{ ...FILL_BOX, transformOrigin: 'left bottom' }}
        >
          <rect x="58" y="152" width="12" height="36" rx="6" fill="#a3e2c6" transform="rotate(24 64 158)" />
          <circle cx="55" cy="146" r="9" fill="#f3c19d" />
        </motion.g>

        {/* Other arm */}
        <rect x="128" y="154" width="12" height="34" rx="6" fill="#a3e2c6" transform="rotate(-18 134 160)" />
        <circle cx="139" cy="146" r="9" fill="#f3c19d" />
      </motion.g>

      {/* Head */}
      <motion.g animate={reducedMotion ? undefined : { y: [0, -3, 0] }} transition={{ ...bob, delay: 0.4 }}>
        <circle cx="100" cy="112" r="40" fill="#fbd0a8" />
        {/* Hair */}
        <path
          d="M62 106 Q60 70 100 68 Q140 70 138 106 Q134 88 118 86 Q126 94 124 102 Q108 84 88 92 Q78 96 76 106 Q70 100 62 106 Z"
          fill="#7a4a2b"
        />
        <circle cx="63" cy="104" r="7" fill="#7a4a2b" />
        <circle cx="137" cy="104" r="7" fill="#7a4a2b" />

        {/* Eyes (blinking) */}
        <motion.g style={FILL_BOX} animate={reducedMotion ? undefined : { scaleY: [1, 1, 0.12, 1] }} transition={blink}>
          <circle cx="87" cy="112" r="6.5" fill="#20222e" />
          <circle cx="113" cy="112" r="6.5" fill="#20222e" />
          <circle cx="89" cy="110" r="2" fill="#ffffff" />
          <circle cx="115" cy="110" r="2" fill="#ffffff" />
        </motion.g>
        {/* Blush + smile */}
        <ellipse cx="79" cy="124" rx="6" ry="4" fill="#ffb3a0" opacity="0.8" />
        <ellipse cx="121" cy="124" rx="6" ry="4" fill="#ffb3a0" opacity="0.8" />
        <path d="M92 128 Q100 136 108 128" stroke="#20222e" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Pixel the Inventor — playful little robot                           */
/* ------------------------------------------------------------------ */

export function PixelCharacter({ className }: CharacterProps) {
  const { reducedMotion, bob, blink } = useIdles()

  return (
    <svg
      viewBox="0 0 200 250"
      aria-hidden="true"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <motion.g animate={reducedMotion ? undefined : { y: [0, -6, 0] }} transition={bob}>
        {/* Treads */}
        <rect x="62" y="212" width="76" height="20" rx="10" fill="#5b5f86" />
        {[72, 88, 104, 120].map((x) => (
          <circle key={x} cx={x} cy="222" r="5" fill={STORY.yellow} />
        ))}
        {/* Legs */}
        <rect x="76" y="192" width="16" height="24" rx="8" fill="#aab2e8" />
        <rect x="108" y="192" width="16" height="24" rx="8" fill="#aab2e8" />

        {/* Body shell */}
        <rect x="58" y="138" width="84" height="62" rx="22" fill={STORY.lavender} />
        <rect x="70" y="150" width="60" height="34" rx="14" fill="#2c3161" />
        {/* Screen face */}
        <motion.g style={FILL_BOX} animate={reducedMotion ? undefined : { scaleY: [1, 1, 0.15, 1] }} transition={blink}>
          <rect x="82" y="157" width="9" height="12" rx="4" fill={STORY.mint} />
          <rect x="109" y="157" width="9" height="12" rx="4" fill={STORY.mint} />
        </motion.g>
        <path d="M86 174 Q100 182 114 174" stroke={STORY.mint} strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Arms */}
        <rect x="40" y="148" width="14" height="30" rx="7" fill="#c4c9f2" transform="rotate(18 47 156)" />
        <circle cx="36" cy="182" r="8" fill={STORY.yellow} />
        <rect x="146" y="146" width="14" height="30" rx="7" fill="#c4c9f2" transform="rotate(-22 153 154)" />
        <circle cx="156" cy="180" r="8" fill={STORY.yellow} />

        {/* Antenna with pulsing bulb */}
        <rect x="97" y="122" width="6" height="18" rx="3" fill="#8b90c9" />
        <motion.circle
          cx="100"
          cy="114"
          r="8"
          fill={STORY.yellow}
          animate={reducedMotion ? undefined : { scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ ...FILL_BOX, transformOrigin: 'center' }}
        />

        {/* Head */}
        <rect x="70" y="70" width="60" height="52" rx="18" fill={STORY.sky} />
        <rect x="70" y="70" width="60" height="18" rx="9" fill={STORY.skyDeep} />
        {/* Head face */}
        <motion.g style={FILL_BOX} animate={reducedMotion ? undefined : { scaleY: [1, 1, 0.15, 1] }} transition={{ ...blink, delay: 0.8 }}>
          <circle cx="86" cy="98" r="5.5" fill="#20222e" />
          <circle cx="114" cy="98" r="5.5" fill="#20222e" />
        </motion.g>
        <path d="M88 108 Q100 116 112 108" stroke="#20222e" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <ellipse cx="79" cy="106" rx="4" ry="3" fill="#ffb3a0" opacity="0.7" />
        <ellipse cx="121" cy="106" rx="4" ry="3" fill="#ffb3a0" opacity="0.7" />
      </motion.g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Lumi the Little Owl — thoughtful puzzle pal                         */
/* ------------------------------------------------------------------ */

export function LumiCharacter({ className }: CharacterProps) {
  const { reducedMotion, bob } = useIdles()

  return (
    <svg
      viewBox="0 0 200 250"
      aria-hidden="true"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <motion.g animate={reducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ ...bob, duration: 3.8 }}>
        {/* Tail feathers */}
        <path d="M84 208 Q78 226 66 232 Q88 230 96 214 Z" fill="#9bdca8" />
        <path d="M116 208 Q122 226 134 232 Q112 230 104 214 Z" fill="#9bdca8" />
        {/* Feet */}
        <path d="M82 212 L82 226 M82 226 l-9 4 M82 226 l9 4" stroke={STORY.yellow} strokeWidth="6" strokeLinecap="round" />
        <path d="M118 212 L118 226 M118 226 l-9 4 M118 226 l9 4" stroke={STORY.yellow} strokeWidth="6" strokeLinecap="round" />

        {/* Body */}
        <ellipse cx="100" cy="158" rx="46" ry="56" fill={STORY.mint} />
        <ellipse cx="100" cy="166" rx="32" ry="42" fill="#e4f9ee" />

        {/* Wings */}
        <motion.g
          animate={reducedMotion ? undefined : { rotate: [0, -8, 0] }}
          transition={{ ...bob, duration: 3 }}
          style={{ ...FILL_BOX, transformOrigin: 'right top' }}
        >
          <ellipse cx="52" cy="160" rx="16" ry="30" fill="#9bdca8" />
        </motion.g>
        <motion.g
          animate={reducedMotion ? undefined : { rotate: [0, 8, 0] }}
          transition={{ ...bob, duration: 3 }}
          style={{ ...FILL_BOX, transformOrigin: 'left top' }}
        >
          <ellipse cx="148" cy="160" rx="16" ry="30" fill="#9bdca8" />
        </motion.g>

        {/* Head */}
        <circle cx="100" cy="96" r="42" fill={STORY.mint} />
        {/* Ear tufts */}
        <path d="M64 74 Q58 56 70 46 Q74 64 82 68 Z" fill="#77ddb4" />
        <path d="M136 74 Q142 56 130 46 Q126 64 118 68 Z" fill="#77ddb4" />
        {/* Face disc */}
        <circle cx="84" cy="94" r="20" fill="#e4f9ee" />
        <circle cx="116" cy="94" r="20" fill="#e4f9ee" />
        {/* Glasses */}
        <circle cx="84" cy="94" r="16" fill="none" stroke="#7a4a2b" strokeWidth="4" />
        <circle cx="116" cy="94" r="16" fill="none" stroke="#7a4a2b" strokeWidth="4" />
        <path d="M100 92 L100 94" stroke="#7a4a2b" strokeWidth="4" strokeLinecap="round" />
        <circle cx="84" cy="94" r="7" fill="#20222e" />
        <circle cx="116" cy="94" r="7" fill="#20222e" />
        <circle cx="86" cy="92" r="2.4" fill="#ffffff" />
        <circle cx="118" cy="92" r="2.4" fill="#ffffff" />
        {/* Beak */}
        <path d="M100 104 L94 112 L106 112 Z" fill={STORY.yellow} />
        {/* Belly spots */}
        {[86, 100, 114].map((x, i) => (
          <circle key={x} cx={x} cy={174 + (i % 2) * 14} r="4" fill="#b6eed9" />
        ))}
      </motion.g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Dull scene: child at a gray desk with stacked books                  */
/* ------------------------------------------------------------------ */

export function ChildAtDesk({ className }: CharacterProps) {
  const { reducedMotion } = useIdles()

  return (
    <svg viewBox="0 0 260 240" aria-hidden="true" className={className} style={{ overflow: 'visible' }}>
      {/* Towers of books */}
      {[0, 1].map((stack) => (
        <g key={stack} transform={`translate(${186 + stack * 34} ${150 - stack * 8})`}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(0 ${-26 * i}) rotate(${i % 2 === 0 ? -1 : 1})`}>
              <rect x="-14" y="0" width="34" height="22" rx="4" fill={i % 2 ? '#9aa0af' : '#b0b5c4'} />
              <rect x="-11" y="4" width="28" height="5" rx="2" fill="#e3e5ec" opacity="0.8" />
            </g>
          ))}
        </g>
      ))}

      {/* Desk */}
      <rect x="30" y="158" width="150" height="14" rx="6" fill="#8a8fa0" />
      <rect x="42" y="172" width="12" height="56" rx="5" fill="#7c8194" />
      <rect x="156" y="172" width="12" height="56" rx="5" fill="#7c8194" />

      {/* Bored child slumped at the desk */}
      <motion.g animate={reducedMotion ? undefined : { y: [0, 3, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}>
        {/* Back */}
        <rect x="52" y="96" width="34" height="70" rx="16" fill="#9aa6b8" />
        {/* Head */}
        <circle cx="69" cy="82" r="25" fill="#d8c1b2" />
        <path d="M47 74 Q45 52 69 50 Q93 52 91 74 Q87 60 69 58 Q51 60 47 74 Z" fill="#6e625a" />
        {/* Unimpressed eyes (droopy) */}
        <path d="M58 82 Q62 85 66 82" stroke="#20222e" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <path d="M74 82 Q78 85 82 82" stroke="#20222e" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        {/* Tiny frown */}
        <path d="M62 94 Q69 90 76 94" stroke="#20222e" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        {/* Arms flat on desk */}
        <rect x="58" y="140" width="44" height="14" rx="7" fill="#8b97ab" transform="rotate(6 58 140)" />
      </motion.g>

      {/* Sleepy pencil with a tiny zzz */}
      <g transform="translate(120 120)">
        <rect x="0" y="0" width="10" height="26" rx="3" fill="#aeb4c4" transform="rotate(38)" />
        <path d="M-10 22 L-4 30 L2 22 Z" fill="#e8cad2" transform="rotate(38) translate(0 14)" />
      </g>
      <motion.text
        x="150"
        y="52"
        fontSize="20"
        fill="#9aa0af"
        fontFamily="inherit"
        animate={reducedMotion ? undefined : { opacity: [0, 1, 0], y: [0, -12, -18] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
      >
        z
      </motion.text>
      <motion.text
        x="162"
        y="40"
        fontSize="14"
        fill="#9aa0af"
        fontFamily="inherit"
        animate={reducedMotion ? undefined : { opacity: [0, 1, 0], y: [0, -10, -16] }}
        transition={{ duration: 4, delay: 1.4, repeat: Infinity, ease: 'easeOut' }}
      >
        z
      </motion.text>

      {/* worksheet */}
      <rect x="98" y="150" width="52" height="10" rx="2" fill="#dfe2ea" transform="rotate(-4 98 150)" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Wonder scene: books become birds, numbers bounce                    */
/* ------------------------------------------------------------------ */

export function BookBird({
  className,
  color = STORY.sky,
  delay = 0,
}: {
  className?: string
  color?: string
  delay?: number
}) {
  const { reducedMotion } = useIdles()

  return (
    <motion.svg
      viewBox="0 0 80 60"
      aria-hidden="true"
      className={className}
      style={{ overflow: 'visible' }}
      animate={reducedMotion ? undefined : { y: [0, -10, 0], rotate: [-4, 4, -4] }}
      transition={{ duration: 3.4, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* open book */}
      <path d="M40 14 C28 6 12 6 8 12 L8 40 C12 34 28 34 40 42 Z" fill={color} />
      <path d="M40 14 C52 6 68 6 72 12 L72 40 C68 34 52 34 40 42 Z" fill="#ffffff" />
      <path d="M40 14 L40 42" stroke="#cfd6e6" strokeWidth="2" />
      {/* wings */}
      <path d="M14 8 Q4 -2 0 8 Q8 10 14 8" fill={color} />
      <path d="M66 8 Q76 -2 80 8 Q72 10 66 8" fill={color} />
      {/* eye */}
      <circle cx="52" cy="22" r="3" fill="#20222e" />
    </motion.svg>
  )
}

export function BouncingNumber({
  value,
  className,
  color = STORY.orange,
  delay = 0,
}: {
  value: string
  className?: string
  color?: string
  delay?: number
}) {
  const { reducedMotion } = useIdles()

  return (
    <motion.svg
      viewBox="0 0 60 60"
      aria-hidden="true"
      className={className}
      style={{ overflow: 'visible' }}
      animate={reducedMotion ? undefined : { y: [0, -16, 0] }}
      transition={{ duration: 2.2, delay, repeat: Infinity, ease: 'easeInOut', bounce: 0.4 }}
    >
      <circle cx="30" cy="30" r="26" fill={color} />
      <circle cx="30" cy="30" r="26" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="3" />
      <text
        x="30"
        y="41"
        textAnchor="middle"
        fontSize="30"
        fontWeight="800"
        fill="#ffffff"
        fontFamily="inherit"
      >
        {value}
      </text>
    </motion.svg>
  )
}

/* ------------------------------------------------------------------ */
/* The Spark: a giant friendly lightbulb                               */
/* ------------------------------------------------------------------ */

export function GlowLightbulb({ className }: CharacterProps) {
  const { reducedMotion } = useIdles()

  return (
    <svg viewBox="0 0 220 240" aria-hidden="true" className={className} style={{ overflow: 'visible' }}>
      {/* Ambient glow */}
      <motion.circle
        cx="110"
        cy="96"
        r="92"
        fill={STORY.yellow}
        initial={reducedMotion ? { opacity: 0 } : false}
        animate={{ opacity: [0.28, 0.44, 0.28] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rays */}
      {[
        { x1: 110, y1: -8, x2: 110, y2: 18, rotate: 0 },
        { x1: 36, y1: 20, x2: 52, y2: 38, rotate: -40 },
        { x1: 184, y1: 20, x2: 168, y2: 38, rotate: 40 },
        { x1: 12, y1: 92, x2: 38, y2: 92, rotate: -90 },
        { x1: 208, y1: 92, x2: 182, y2: 92, rotate: 90 },
      ].map((ray, i) => (
        <motion.line
          key={i}
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          stroke={STORY.yellow}
          strokeWidth="7"
          strokeLinecap="round"
          style={FILL_BOX}
          animate={reducedMotion ? undefined : { opacity: [0.3, 1, 0.3], scaleX: [0.8, 1.15, 0.8] }}
          transition={{ duration: 2.6, delay: i * 0.25, repeat: Infinity, ease: 'easeInOut' }}
          transform={`rotate(${ray.rotate} 110 92)`}
        />
      ))}

      <motion.g animate={reducedMotion ? undefined : { rotate: [0, 3, -3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} style={FILL_BOX}>
        {/* Glass bulb */}
        <path
          d="M110 30 C146 30 172 56 172 92 C172 116 156 132 146 146 C138 156 136 164 136 172 L84 172 C84 164 82 156 74 146 C64 132 48 116 48 92 C48 56 74 30 110 30 Z"
          fill={STORY.yellow}
          opacity="0.95"
        />
        <path
          d="M110 30 C146 30 172 56 172 92 C172 116 156 132 146 146 C138 156 136 164 136 172 L84 172 C84 164 82 156 74 146 C64 132 48 116 48 92 C48 56 74 30 110 30 Z"
          fill="none"
          stroke="#eab63f"
          strokeWidth="5"
        />
        {/* Shine */}
        <path d="M78 62 Q92 40 118 42" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="7" fill="none" strokeLinecap="round" />

        {/* Happy face */}
        <circle cx="92" cy="94" r="6" fill="#20222e" />
        <circle cx="128" cy="94" r="6" fill="#20222e" />
        <path d="M98 108 Q110 118 122 108" stroke="#20222e" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Base */}
        <rect x="84" y="172" width="52" height="14" rx="6" fill="#8b90c9" />
        <rect x="88" y="188" width="44" height="12" rx="5" fill="#6d72a8" />
      </motion.g>

      {/* warm halo pulse (visible in markup for a11y tools) */}
      <rect x="0" y="0" width="0" height="0" fill="none" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* The magical open book — releases letters, planets and stars         */
/* ------------------------------------------------------------------ */

const BOOK_LETTERS = ['A', 'B', '1', '2', '?', '★'] as const

export function MagicalOpenBook({ className }: CharacterProps) {
  const { reducedMotion } = useIdles()

  return (
    <svg viewBox="0 0 300 220" aria-hidden="true" className={className} style={{ overflow: 'visible' }}>
      {/* Rising doodles */}
      {BOOK_LETTERS.map((letter, i) => {
        const x = 40 + i * 52
        const colors = [STORY.coral, STORY.skyDeep, STORY.orange, STORY.mint, STORY.lavender, STORY.yellow]
        return (
          <motion.text
            key={`${letter}-${i}`}
            x={x}
            y={150}
            fontSize={i === 5 ? 22 : 26}
            fontWeight="800"
            fill={colors[i]}
            textAnchor="middle"
            initial={reducedMotion ? { opacity: 0, y: 140 } : false}
            animate={
              reducedMotion
                ? { opacity: 0.7, y: [140, 120] }
                : { opacity: [0, 1, 1, 0], y: [150, 60, 40, 18] }
            }
            transition={{ duration: 3.6, delay: i * 0.55, repeat: Infinity, ease: 'easeOut' }}
          >
            {letter}
          </motion.text>
        )
      })}

      {/* Tiny planet orbiting */}
      <motion.g
        animate={reducedMotion ? undefined : { cx: [44, 74, 44], cy: [30, 8, 30] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle r="9" fill={STORY.lavender} />
        <ellipse cy="-12" rx="15" ry="4" fill="none" stroke={STORY.yellow} strokeWidth="2" opacity="0.7" />
      </motion.g>

      {/* Book base with float */}
      <motion.g animate={reducedMotion ? undefined : { y: [0, -5, 0] }} transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M150 96 C118 74 66 72 44 84 L44 156 C66 144 118 146 150 168 Z" fill={STORY.coral} />
        <path d="M150 96 C182 74 234 72 256 84 L256 156 C234 144 182 146 150 168 Z" fill="#ffffff" />
        <path d="M150 96 L150 168" stroke="#cfd6e6" strokeWidth="3" />
        <path d="M62 100 C86 92 120 96 140 110 L140 152 C118 140 88 138 68 142 Z" fill="#fff4e8" />
        <path d="M238 100 C214 92 180 96 160 110 L160 152 C182 140 212 138 232 142 Z" fill="#fff4e8" />
        {/* spine glow */}
        <ellipse cx="150" cy="176" rx="64" ry="8" fill={STORY.lavender} opacity="0.35" />
        {/* bookmark stars */}
        <path d="M92 120 l4 8 8 1 -6 6 1 8 -7-4 -7 4 1-8 -6-6 8-1 Z" fill={STORY.yellow} transform="scale(0.5) translate(100 100)" />
      </motion.g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Mini kid — parametric child for the "Every child is unique" scene    */
/* ------------------------------------------------------------------ */

export interface MiniKidProps {
  className?: string
  skin: string
  shirt: string
  hair: string
  ponytail?: boolean
  activity: 'read' | 'build' | 'draw' | 'science' | 'puzzle'
  /** Bubble doodle floating from the head. */
  bubbleColor?: string
  delay?: number
}

function KidDoodle({ color, type }: { color: string; type: MiniKidProps['activity'] }) {
  switch (type) {
    case 'read':
      return <path d="M0 -34 a6 6 0 0 1 12 0 a6 6 0 0 1 12 0 Z" fill={color} />
    case 'build':
      return <rect x="-8" y="-44" width="26" height="26" rx="6" fill={color} transform="rotate(12 0 -30)" />
    case 'draw':
      return <path d="M-12 -18 C-2 -44 14 -44 22 -22" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
    case 'science':
      return <path d="M-10 -16 h20 l-6 -20 h-8 Z" fill={color} />
    case 'puzzle':
      return <path d="M-14 -40 h10 a4 4 0 0 1 0 -8 h6 a4 4 0 0 1 0 8 h10 v10 h-10 a4 4 0 0 0 0 -8 h-6 a4 4 0 0 0 0 8 h-10 Z" fill={color} />
    default:
      return null
  }
}

export function MiniKid({
  className,
  skin,
  shirt,
  hair,
  ponytail = false,
  activity,
  bubbleColor = STORY.yellow,
  delay = 0,
}: MiniKidProps) {
  const { reducedMotion, bob, blink } = useIdles()

  return (
    <svg viewBox="-20 0 100 130" aria-hidden="true" className={className} style={{ overflow: 'visible' }}>
      <g transform="translate(10 24)">
        {/* idea bubble */}
        <motion.g
          animate={reducedMotion ? undefined : { y: [0, -8, 0], scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 3.4, delay, repeat: Infinity, ease: 'easeInOut' }}
          style={FILL_BOX}
        >
          <circle cx="36" cy="-38" r="4" fill="#ffffff" opacity="0.9" />
          <circle cx="42" cy="-52" r="6" fill="#ffffff" opacity="0.9" />
          <circle cx="52" cy="-70" r="18" fill="#ffffff" />
          <g transform="translate(52 -70)">
            <KidDoodle color={bubbleColor} type={activity} />
          </g>
        </motion.g>

        {/* head */}
        <circle cx="34" cy="26" r="21" fill={skin} />
        {/* hair */}
        <path d="M13 22 Q11 -2 34 0 Q57 -2 55 22 Q50 6 34 8 Q18 6 13 22 Z" fill={hair} />
        {ponytail && <circle cx="56" cy="30" r="7" fill={hair} />}
        {/* face */}
        <motion.g style={FILL_BOX} animate={reducedMotion ? undefined : { scaleY: [1, 1, 0.1, 1] }} transition={{ ...blink, duration: 5, delay }}>
          <circle cx="27" cy="26" r="3.6" fill="#20222e" />
          <circle cx="41" cy="26" r="3.6" fill="#20222e" />
        </motion.g>
        <path d="M29 34 Q34 38 39 34" stroke="#20222e" strokeWidth="2.6" fill="none" strokeLinecap="round" />

        {/* body */}
        <motion.g animate={reducedMotion ? undefined : { y: [0, -4, 0] }} transition={{ ...bob, delay, duration: 3.2 }}>
          <rect x="18" y="46" width="32" height="34" rx="15" fill={shirt} />
          <path d="M18 52 L14 74 M66 52 L70 70" stroke={skin} strokeWidth="8" strokeLinecap="round" />

          {/* activity prop */}
          {activity === 'read' && (
            <path d="M12 70 C20 64 30 64 34 70 L34 92 C28 86 18 86 12 92 Z M56 70 C48 64 38 64 34 70 L34 92 C40 86 50 86 56 92 Z" fill={STORY.orange} />
          )}
          {activity === 'build' && (
            <g>
              <rect x="20" y="80" width="14" height="12" rx="3" fill={STORY.skyDeep} />
              <rect x="36" y="74" width="14" height="18" rx="3" fill={STORY.coral} />
              <rect x="50" y="82" width="14" height="10" rx="3" fill={STORY.mint} />
            </g>
          )}
          {activity === 'draw' && (
            <g>
              <path d="M6 84 l14 -10 l4 6 l-14 10 Z" fill={STORY.lavender} />
              <path d="M30 78 q10 -8 20 2" stroke={STORY.coral} strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M30 86 q10 -6 18 2" stroke={STORY.skyDeep} strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}
          {activity === 'science' && (
            <g>
              <path d="M40 70 h14 l8 22 a4 4 0 0 1 -4 5 h-22 a4 4 0 0 1 -4 -5 Z" fill="#dff4ff" stroke={STORY.skyDeep} strokeWidth="2.5" />
              <rect x="44" y="60" width="6" height="12" fill={STORY.skyDeep} />
              <circle cx="46" cy="86" r="4" fill={STORY.mint} />
              <circle cx="54" cy="90" r="3" fill={STORY.orange} />
            </g>
          )}
          {activity === 'puzzle' && (
            <g>
              <path d="M18 82 h12 a3 3 0 0 0 0 -6 h4 a3 3 0 0 0 0 6 h12 v12 h-12 a3 3 0 0 0 0 -6 h-4 a3 3 0 0 0 0 6 h-12 Z" fill={STORY.yellow} transform="translate(4 0)" />
            </g>
          )}
        </motion.g>
      </g>
    </svg>
  )
}
