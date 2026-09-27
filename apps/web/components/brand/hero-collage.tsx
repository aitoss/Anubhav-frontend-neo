import { ROUGH_FILTER_ID } from "@/components/brand/marks"

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
 * The hero art, in two halves that are deliberately not a matched pair.
 *
 * Left is the climb while it is still theory: hairlines, plotted nodes, no
 * weight at all. Right is what you came for, printed solid. Giving both sides
 * the same shape would have been symmetry for its own sake and would have said
 * nothing, so the asymmetry is the whole point.
 *
 * Both fill the height of the hero, so the section is framed rather than
 * having two objects floated into its empty middle.
 */
export function HeroArt({ side, className }: { side: "left" | "right"; className?: string }) {
  if (side === "left") {
    return (
      <svg
        viewBox="0 0 300 620"
        preserveAspectRatio="xMinYMid meet"
        className={className}
        role="img"
        aria-label="A plotted diagram of the early interview rounds"
      >
        <g className="text-foreground/40" stroke="currentColor" fill="none">
          <path d="M-20 560C34 400 96 268 286 150" strokeWidth="1.3" strokeDasharray="6 8" />
          <path d="M34 592C104 470 168 372 300 300" strokeWidth="1.3" />
          <path d="M34 592 66 470" strokeWidth="1.3" />
          <path d="M66 470 196 238" strokeWidth="1.3" strokeDasharray="3 6" />
          <path d="M196 238 286 150" strokeWidth="1.3" strokeDasharray="3 6" />

          {[
            [34, 592],
            [66, 470],
            [196, 238],
            [286, 150],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" fill="currentColor" />
          ))}
        </g>

        <g className="text-foreground/60" {...LABEL_PROPS}>
          <text x="14" y="452">R1</text>
          <text x="204" y="230">R2</text>
        </g>

        <Stars
          className="text-foreground/70"
          points={[
            [150, 452, 15],
            [104, 356, 8],
            [214, 388, 6],
            [58, 268, 18],
            [244, 520, 10],
            [126, 172, 7],
            [22, 148, 11],
          ]}
        />

        <path
          d="M40 120C96 150 150 166 244 176"
          className="text-foreground/40"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeDasharray="4 9"
          fill="none"
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 300 620"
      preserveAspectRatio="xMaxYMid meet"
      className={className}
      role="img"
      aria-label="A printed peak rising out of the final interview rounds"
    >
      <g className="text-foreground/40" stroke="currentColor" fill="none">
        <path d="M-20 118 96 62" strokeWidth="1.3" />
        <path d="M96 62 188 156" strokeWidth="1.3" strokeDasharray="3 6" />
        <path d="M-20 200 188 156" strokeWidth="1.3" strokeDasharray="6 8" />

        {[
          [96, 62],
          [188, 156],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" fill="currentColor" />
        ))}
      </g>

      <g className="text-foreground/60" {...LABEL_PROPS}>
        <text x="78" y="46">R3</text>
        <text x="198" y="150">offer</text>
      </g>

      {/* The peak breaks the top edge of the block, so the two read as one
          print rather than a logo sitting on a square. */}
      <g filter={`url(#${ROUGH_FILTER_ID})`} className="fill-brand">
        <path d="M128 196 82 274l7.1 2.2-52.6 86.5h21c16.3 0 31.4-8.9 39.3-23l31.8-56.5 2.6 4.4 29.4 52.1c7.9 14.1 22.9 23 39.3 23h24.1l-54.6-86.8 6.6-2L128 196Z" />
        <rect x="38" y="346" width="262" height="256" />
      </g>

      <g className="fill-background">
        <path d="M182 396 142 464l6.2 1.9-45.8 75.3h18.3c14.2 0 27.3-7.7 34.2-20l27.7-49.2 2.2 3.8 25.6 45.4c6.9 12.3 20 20 34.2 20h21l-47.5-75.5 5.7-1.8L182 396Z" />
      </g>

      <Stars
        className="fill-background text-transparent"
        points={[
          [268, 392, 16],
          [72, 420, 10],
          [278, 556, 12],
          [64, 570, 7],
        ]}
      />
      <Stars className="text-foreground/70" points={[[16, 300, 13]]} />
    </svg>
  )
}
