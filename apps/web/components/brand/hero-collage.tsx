import { GRUNGE_FILTER_ID } from "@/components/brand/marks"

/** The wordmark's peak, reused as a shape. Local bounds are roughly 36..247 x 196..362. */
const MASK_ID = "anubhav-hero-mask"
const CLEAR_ID = "anubhav-hero-clear"
const TRACK_ID = "anubhav-hero-track"

const PEAK_PATH =
  "M128 196 82 274l7.1 2.2-52.6 86.5h21c16.3 0 31.4-8.9 39.3-23l31.8-56.5 2.6 4.4 29.4 52.1c7.9 14.1 22.9 23 39.3 23h24.1l-54.6-86.8 6.6-2L128 196Z"

/**
 * The ridgeline, as one silhouette rather than the wordmark stamped three
 * times. Repeating the logo read as a lockup; a single irregular horizon with
 * a paler range behind it reads as landscape, which is what the climb needs to
 * look like. Baselines sit at y 400 and the peaks are deliberately uneven.
 */
const RIDGE_BACK =
  "M1050 400 1118 288 1160 334 1216 210 1262 288 1312 238 1358 308 1402 266 1440 310 1440 400Z"
const RIDGE_FRONT =
  "M1086 400 1142 316 1172 352 1246 234 1288 302 1330 260 1372 332 1408 296 1440 342 1440 400Z"

/**
 * The dots that walk the climb. Long durations and staggered starts, so the
 * eye never catches two of them moving together and the whole thing reads as
 * drift rather than as an animation playing.
 */
const TRAVELLERS = [
  { track: "a", dur: "48s", begin: "0s", r: 2.6 },
  { track: "b", dur: "62s", begin: "-21s", r: 3.2 },
  { track: "c", dur: "36s", begin: "-13s", r: 2.2 },
  { track: "d", dur: "54s", begin: "-31s", r: 2.6 },
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

// Mono, because these are annotations on a figure, not copy.
const LABEL_PROPS = {
  fill: "currentColor",
  fontSize: 13,
  letterSpacing: 1.4,
  fontFamily: "var(--font-mono), ui-monospace, monospace",
} as const

/**
 * The hero backdrop: one figure spread across the whole section rather than two
 * panels stacked at the edges.
 *
 * The climb is plotted left to right across the full width, so the marks are
 * distributed through the space instead of clustered into columns. Nothing here
 * is drawn large; it covers ground by being spread out, which is what keeps the
 * section from reading as two objects and a lot of empty page.
 *
 * The viewBox is 1:1 with a 1440px window, so every stroke and star is authored
 * at the size it actually renders.
 */
export function HeroBackdrop({
  className,
  anchor = "xMidYMid",
  fit = "slice",
  idPrefix = "a",
}: {
  className?: string
  /** Which part of the figure survives the crop. */
  anchor?: "xMidYMid" | "xMaxYMid"
  /** slice fills its box and crops; meet shows the whole figure. */
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
      aria-label="A diagram plotting the interview rounds from first contact to offer"
    >
      <defs>
        {/* Fades the figure out under the type. Without it a stroke runs
            straight through the paragraph. */}
        <radialGradient id={clearId} gradientUnits="userSpaceOnUse" cx="720" cy="250" r="640">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="52%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="82%" stopColor="#fff" stopOpacity="1" />
        </radialGradient>
        <mask id={maskId}>
          <rect width="1440" height="520" fill={`url(#${clearId})`} />
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
      {/* The climb itself, sweeping the full width. */}
      <g className="text-foreground/35" stroke="currentColor" fill="none">
        <path id={`${trackId}-a`} d="M-40 486C180 392 360 268 706 188 980 124 1210 108 1480 56" strokeWidth="1.3" strokeDasharray="6 9" />
        <path id={`${trackId}-b`} d="M60 512C300 470 520 392 812 318 1060 254 1270 236 1480 196" strokeWidth="1.3" />
        <path d="M96 444 96 486" strokeWidth="1.3" />
        <path id={`${trackId}-c`} d="M96 444 402 214" strokeWidth="1.3" strokeDasharray="3 7" />
        <path id={`${trackId}-d`} d="M402 214 1086 128" strokeWidth="1.3" strokeDasharray="3 7" />
        <path d="M1086 128 1316 206" strokeWidth="1.3" />
        <path d="M402 214 1316 206" strokeWidth="1.3" strokeDasharray="6 9" />
      </g>

      {/* Dots walking the climb. Slow enough to be movement you notice only
          once, and gone entirely for anyone who asked for less motion. */}
      <g className="brand-travellers fill-brand/70">
        {TRAVELLERS.map(({ track, dur, begin, r }) => (
          <circle key={`${track}-${begin}`} r={r}>
            <animateMotion dur={dur} begin={begin} repeatCount="indefinite" rotate="auto">
              <mpath href={`#${trackId}-${track}`} />
            </animateMotion>
            {/* Fades in and out at the ends so a dot never pops. */}
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

      {/* Nodes spaced right across the width, not bunched at one end. */}
      <g className="text-foreground/45" fill="currentColor">
        {[
          [96, 444],
          [96, 486],
          [402, 214],
          [1086, 128],
          [1316, 206],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
        ))}
      </g>

      <g className="text-foreground/50" {...LABEL_PROPS}>
        <text x="48" y="438">R1</text>
        <text x="392" y="196">R2</text>
        <text x="1076" y="110">R3</text>
        <text x="1330" y="212">offer</text>
      </g>

      {/* Scattered the whole way across. The ones under the type are the
          faintest, so they read as texture rather than clutter. */}
      <Stars
        className="text-foreground/60"
        points={[
          [176, 372, 15],
          [246, 462, 8],
          [88, 268, 11],
          [318, 300, 6],
          [286, 116, 9],
          [1214, 348, 14],
          [1382, 288, 9],
          [1160, 452, 7],
          [1298, 92, 6],
          [1420, 430, 11],
        ]}
      />
      <Stars
        className="text-foreground/22"
        points={[
          [520, 400, 10],
          [640, 96, 7],
          [828, 452, 12],
          [960, 72, 8],
          [740, 246, 6],
          [1020, 392, 9],
        ]}
      />

      </g>

      {/* The landscape the climb ends in. Two ranges, the far one paler, so
          it has depth without repeating a shape. */}
      <g filter={`url(#${GRUNGE_FILTER_ID})`}>
        <path className="fill-brand" opacity={0.42} d={RIDGE_BACK} />
        <path className="fill-brand" d={RIDGE_FRONT} />
      </g>

      {/* A far-off fragment of the same range at the other end, so the two
          sides of the figure belong to one place. */}
      <path
        className="fill-brand/35"
        filter={`url(#${GRUNGE_FILTER_ID})`}
        d="M20 400 54 356 76 378 108 338 134 372 156 352 178 386 200 366 220 396 220 400Z"
      />

    </svg>
  )
}
