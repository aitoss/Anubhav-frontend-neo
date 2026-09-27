import { GRUNGE_FILTER_ID, HALFTONE_ID } from "@/components/brand/marks"

const MASK_ID = "anubhav-hero-mask"
const CLEAR_ID = "anubhav-hero-clear"
const TRACK_ID = "anubhav-hero-track"

/**
 * The dots that walk the plate. Long durations and staggered starts, so the
 * eye never catches two of them moving together and the whole thing reads as
 * drift rather than as an animation playing.
 */
const TRAVELLERS = [
  { track: "a", dur: "52s", begin: "0s", r: 2.6 },
] as const

const STAR =
  "M12 0c.9 6.6 4.5 10.2 12 12-7.5 1.8-11.1 5.4-12 12-.9-6.6-4.5-10.2-12-12C7.5 10.2 11.1 6.6 12 0Z"

/** Scatters the four-point star without repeating the path every time. */
function Stars({
  points,
  className,
}: {
  points: [number, number, number][]
  className?: string
}) {
  return (
    <g className={className} fill="currentColor">
      {points.map(([x, y, size]) => (
        <path
          key={`${x}-${y}`}
          transform={`translate(${x - size / 2} ${y - size / 2}) scale(${size / 24})`}
          d={STAR}
        />
      ))}
    </g>
  )
}

/**
 * Ink thrown off the edge of a shape.
 *
 * Deterministic rather than random, so the plate is identical on the server
 * and the client and does not reshuffle itself on every render.
 */
function Splatter({
  x,
  y,
  seed,
  count = 22,
  spread = 70,
  className,
}: {
  x: number
  y: number
  seed: number
  count?: number
  spread?: number
  className?: string
}) {
  const dots = Array.from({ length: count }, (_, i) => {
    const angle = (seed * 12.9898 + i * 78.233) % 6.283
    const distance = ((seed * 437.585 + i * 127.1) % 100) / 100
    const size = ((seed * 311.7 + i * 269.5) % 100) / 100
    return {
      cx: x + Math.cos(angle) * spread * distance,
      cy: y + Math.sin(angle) * spread * distance * 0.7,
      r: 0.7 + size * 2.4,
    }
  })

  return (
    <g className={className} fill="currentColor">
      {dots.map((dot, index) => (
        <circle key={index} cx={dot.cx} cy={dot.cy} r={dot.r} />
      ))}
    </g>
  )
}

// Mono and small: the caption under a figure in a textbook, not copy.
const FIG_PROPS = {
  fill: "currentColor",
  fontSize: 10,
  letterSpacing: 1.6,
  fontFamily: "var(--font-mono), ui-monospace, monospace",
} as const

/**
 * The hero backdrop, as a plate of figures.
 *
 * Two shapes pulled off a screenprint, a torn mass and a ladder, annotated
 * FIG. 1 and FIG. 2 with a dashed line running between them. Four figures and
 * three splatters filled the section but left nowhere for the eye to rest;
 * two is enough to establish the language.
 *
 * Every solid is screened into halftone rather than filled flat, so the plate
 * reads as printed colour without any one shape becoming the loudest thing in
 * a section that is mostly type. The viewBox is 1:1 with a 1440px window.
 */
export function HeroBackdrop({
  className,
  anchor = "xMidYMid",
  fit = "slice",
  idPrefix = "a",
}: {
  className?: string
  /** Which part of the plate survives the crop. */
  anchor?: "xMidYMid" | "xMaxYMid"
  /** slice fills its box and crops; meet shows the whole plate. */
  fit?: "slice" | "meet"
  /** Ids are global in SVG, so two instances must not share them. */
  idPrefix?: string
}) {
  const maskId = `${MASK_ID}-${idPrefix}`
  const clearId = `${CLEAR_ID}-${idPrefix}`
  const trackId = `${TRACK_ID}-${idPrefix}`

  return (
    <svg
      viewBox="0 0 1440 520"
      preserveAspectRatio={`${anchor} ${fit}`}
      className={className}
      role="img"
      aria-label="A printed plate of two abstract figures: a torn mass and a ladder"
    >
      <defs>
        {/* Fades the plate out under the type, which otherwise has figures
            running straight through it. */}
        <radialGradient id={clearId} gradientUnits="userSpaceOnUse" cx="720" cy="250" r="660">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="80%" stopColor="#fff" stopOpacity="1" />
        </radialGradient>
        <mask id={maskId}>
          <rect width="1440" height="520" fill={`url(#${clearId})`} />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        {/* The dashed lines that tie one figure to the next. */}
        <g className="text-foreground/25" stroke="currentColor" fill="none">
          <path
            id={`${trackId}-a`}
            d="M104 232C240 300 320 392 452 404 700 426 900 300 1236 196"
            strokeWidth="1.2"
            strokeDasharray="5 8"
          />
        </g>

        <g className="brand-travellers fill-brand/60">
          {TRAVELLERS.map(({ track, dur, begin, r }) => (
            <circle key={track} r={r}>
              <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
                <mpath href={`#${trackId}-${track}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                dur={dur}
                begin={begin}
                repeatCount="indefinite"
                values="0;1;1;0"
                keyTimes="0;0.12;0.88;1"
              />
            </circle>
          ))}
        </g>

        {/* FIG. 1 — a torn mass, the shape everything else is measured off.
            Held back, so the two figures are not competing: the ladder is the
            one that means something and this one sets the language. */}
        <g opacity={0.45}>
          <g filter={`url(#${GRUNGE_FILTER_ID})`}>
            <path
              fill={`url(#${HALFTONE_ID})`}
              d="M58 168c30-40 96-58 148-44 40 11 62 44 56 80-7 44-60 72-112 70-48-2-92-26-102-56-7-22 0-36 10-50Z"
            />
          </g>
          <Splatter className="text-foreground/30" x={186} y={118} seed={3} count={16} spread={54} />
          <Stars
            className="text-foreground/45"
            points={[
              [42, 118, 15],
              [250, 210, 10],
            ]}
          />
          <g className="text-foreground/45" {...FIG_PROPS}>
            <text x="64" y="296">FIG. 1</text>
          </g>
        </g>

        {/* FIG. 2 — the ladder. The one figure that says outright what the
            product is about, so it is drawn in line rather than in mass. */}
        <g
          className="text-brand/60"
          stroke="currentColor"
          strokeLinecap="round"
          fill="none"
          filter={`url(#${GRUNGE_FILTER_ID})`}
        >
          <path d="M1196 486 1332 212" strokeWidth="5" />
          <path d="M1252 514 1388 240" strokeWidth="5" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const t = i / 5
            return (
              <path
                key={i}
                d={`M${1196 + 136 * t} ${486 - 274 * t} ${1252 + 136 * t} ${514 - 274 * t}`}
                strokeWidth="3.4"
              />
            )
          })}
        </g>
        <Splatter className="text-foreground/25" x={1310} y={424} seed={19} count={22} spread={58} />
        <Stars
          className="text-foreground/45"
          points={[
            [1408, 150, 13],
            [1188, 176, 7],
          ]}
        />
        <g className="text-foreground/45" {...FIG_PROPS}>
          <text x="1350" y="184">FIG. 2</text>
        </g>
      </g>
    </svg>
  )
}
