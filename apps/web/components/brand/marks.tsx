/**
 * The pieces the Anubhav brand is drawn from.
 *
 * The idea: an interview is a climb through rounds, and the wordmark is
 * already a peak. So the identity is that peak, printed badly on purpose,
 * with edges roughened the way ink bleeds into paper, crossed with the dry
 * schematic language of a textbook diagram. The warmth is the story; the
 * diagram is the preparation.
 *
 * Everything here is drawn with `currentColor` or a brand token, so a mark
 * takes the colour of wherever it is placed and follows the theme.
 */

/** Ids are global in SVG, so each filter is namespaced by where it is used. */
export const ROUGH_FILTER_ID = "anubhav-rough"
export const GRUNGE_FILTER_ID = "anubhav-grunge"
export const HALFTONE_ID = "anubhav-halftone"

/**
 * The filters that give flat vectors a printed feel.
 *
 * `rough` only chews the outline. `grunge` goes further: it erodes a solid
 * core, takes the band between core and outline, and breaks that band up with
 * noise. Ink runs out at the edge of a stroke, not in the middle of it, so the
 * rim comes away ragged while the fill stays solid.
 *
 * Render once per page; the marks below reference them by id.
 */
export function BrandFilters() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <filter id={ROUGH_FILTER_ID}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.019"
            numOctaves="4"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id={GRUNGE_FILTER_ID} x="-15%" y="-15%" width="130%" height="130%">
          {/* 1. Chew the outline. */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.021"
            numOctaves="4"
            seed="7"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
            result="rough"
          />

          {/* 2. Shrink it to get a solid core that the speckle never touches.
                 Punching holes through the whole shape left it looking moth
                 eaten; ink only breaks up where it runs out, at the edge. */}
          <feMorphology in="rough" operator="erode" radius="3" result="core" />

          {/* 3. The band between the two is the only place flakes are allowed. */}
          <feComposite in="rough" in2="core" operator="out" result="band" />

          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.09"
            numOctaves="3"
            seed="13"
            result="noise"
          />
          <feComponentTransfer in="noise" result="flakes">
            <feFuncA type="discrete" tableValues="1 1 0 1 1 1 0 1" />
          </feComponentTransfer>
          <feComposite in="band" in2="flakes" operator="in" result="edge" />

          {/* 4. Solid middle, ragged rim. */}
          <feMerge>
            <feMergeNode in="core" />
            <feMergeNode in="edge" />
          </feMerge>
        </filter>

        {/* Brand as a printed screen rather than a flat area. A solid block of
            this colour is the loudest thing on any page it lands on; broken
            into dots it carries the same colour at a fraction of the weight. */}
        <pattern
          id={HALFTONE_ID}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(18)"
        >
          <circle className="fill-brand" cx="1.6" cy="1.6" r="1.25" />
          <circle className="fill-brand" cx="5.1" cy="5.1" r="1.25" />
        </pattern>
      </defs>
    </svg>
  )
}

/** The wordmark's peak, as a shape rather than a logo. */
export function Peak({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="currentColor" aria-hidden>
      <path d="M39.51 20.25 28.45 38.43l1.70.53L17.50 59.75h5.06c3.90 0 7.51-2.11 9.42-5.51l7.63-13.57.60 1.05 7.05 12.52c1.92 3.40 5.52 5.51 9.43 5.51H62.5L49.39 38.91l1.56-.48-11.44-18.18Z" />
    </svg>
  )
}

/** A four-point star, the punctuation of the whole set. */
export function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.9 6.6 4.5 10.2 12 12-7.5 1.8-11.1 5.4-12 12-.9-6.6-4.5-10.2-12-12C7.5 10.2 11.1 6.6 12 0Z" />
    </svg>
  )
}

const STAR =
  "M12 0c.9 6.6 4.5 10.2 12 12-7.5 1.8-11.1 5.4-12 12-.9-6.6-4.5-10.2-12-12C7.5 10.2 11.1 6.6 12 0Z"

/** Scatters the four-point star without repeating the path every time. */
export function Stars({
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
export function Splatter({
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

/** Mono and small: the caption under a figure in a textbook, not copy. */
export const FIG_PROPS = {
  fill: "currentColor",
  fontSize: 10,
  letterSpacing: 1.6,
  fontFamily: "var(--font-mono), ui-monospace, monospace",
} as const
