import {
  FIG_PROPS,
  GRUNGE_FILTER_ID,
  HALFTONE_ID,
  Splatter,
  Stars,
} from "@/components/brand/marks"

/**
 * The figure for a page that has nothing to show: a 404, a failed load, an
 * empty list.
 *
 * The climb stops. A dashed run sets off from the torn mass, reaches a node,
 * and simply ends, with the last stretch left as a ghost of where it was going.
 * It says "this went nowhere" in the same language the rest of the site uses to
 * say the opposite, which is cheaper and better than a stock illustration of a
 * person shrugging.
 */
export function EmptyPlate({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 240" className={className} role="img" aria-label="A path that stops short">
      <g opacity={0.45}>
        <path
          fill={`url(#${HALFTONE_ID})`}
          filter={`url(#${GRUNGE_FILTER_ID})`}
          d="M22 118c16-32 62-50 104-42 32 6 50 28 44 54-8 32-52 52-92 46-34-6-58-24-60-44-1-6 1-10 4-14Z"
        />
      </g>

      <g className="text-foreground/35" stroke="currentColor" fill="none">
        {/* The run, and then the run's ghost: it gets thinner and stops. */}
        <path d="M140 132C188 150 226 138 262 104" strokeWidth="1.3" />
        <path d="M262 104 296 74" strokeWidth="1.3" strokeDasharray="4 7" />
        <path d="M296 74 340 40" strokeWidth="1" strokeDasharray="2 9" opacity={0.5} />
      </g>

      <g className="text-foreground/45" fill="currentColor">
        <circle cx="262" cy="104" r="4.5" />
      </g>

      {/* Where it should have arrived, left as an outline. */}
      <circle
        className="text-brand/60"
        cx="330"
        cy="46"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="3 4"
      />

      <Splatter className="text-foreground/25" x={196} y={188} seed={13} count={18} spread={62} />
      <Stars
        className="text-foreground/40"
        points={[
          [54, 44, 13],
          [318, 168, 9],
          [148, 214, 7],
        ]}
      />

      <g className="text-muted-foreground/55" {...FIG_PROPS}>
        <text x="20" y="228">FIG. 0</text>
      </g>
    </svg>
  )
}
