import {
  FIG_PROPS,
  GRUNGE_FILTER_ID,
  HALFTONE_ID,
  Splatter,
  Stars,
} from "@/components/brand/marks"

/**
 * The band that sits behind a page heading.
 *
 * The landing hero gets a whole plate; every other page gets this, which is
 * the same vocabulary at a quarter of the height: a torn halftone field, a
 * dashed run, ink off the edge, a couple of stars and a FIG. caption. It is
 * what keeps `/videos` and `/team` looking like they belong to the same
 * product as the homepage without either of them repeating it.
 *
 * `variant` only changes which side the mass sits on and which way the run
 * sweeps, so two pages in a row never open identically.
 */
export function PagePlate({
  className,
  variant = "left",
  fig,
}: {
  className?: string
  variant?: "left" | "right"
  /** The caption, if the page wants one. Omit on pages that are already busy. */
  fig?: string
}) {
  const flip = variant === "right"

  return (
    <svg
      viewBox="0 0 1440 200"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <g transform={flip ? "translate(1440 0) scale(-1 1)" : undefined}>
        <g opacity={0.4}>
          <path
            fill={`url(#${HALFTONE_ID})`}
            filter={`url(#${GRUNGE_FILTER_ID})`}
            d="M40 40c26-26 82-36 128-24 36 10 54 36 48 64-8 34-56 54-104 50-44-4-80-22-88-44-6-18 2-32 16-46Z"
          />
        </g>

        <g className="text-foreground/22" stroke="currentColor" fill="none">
          <path d="M150 128C340 176 620 168 1000 96 1180 62 1320 46 1460 28" strokeWidth="1.2" strokeDasharray="5 8" />
        </g>

        <Splatter
          className="text-foreground/20"
          x={248}
          y={132}
          seed={flip ? 23 : 5}
          count={16}
          spread={58}
        />

        <Stars
          className="text-foreground/35"
          points={[
            [92, 150, 11],
            [332, 42, 8],
            [1180, 128, 12],
            [1392, 58, 7],
          ]}
        />
      </g>

      {fig ? (
        <g className="text-muted-foreground/50" {...FIG_PROPS}>
          <text x={flip ? 40 : 1330} y={34}>
            {fig}
          </text>
        </g>
      ) : null}
    </svg>
  )
}
