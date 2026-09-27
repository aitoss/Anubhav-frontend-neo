import { ROUGH_FILTER_ID } from "@/components/brand/marks"

/**
 * The hero image, drawn rather than photographed or bought.
 *
 * Three layers, read back to front: a schematic of the rounds you climb, a
 * printed block of ink, and the peak breaking out of the top of it. The
 * schematic is deliberately dry and the block deliberately rough, because the
 * product is the place where preparation meets what actually happened.
 *
 * It is one inline SVG on purpose: it themes with the palette, costs no
 * request, and stays crisp at any size.
 */
export function HeroCollage({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 560"
      className={className}
      role="img"
      aria-label="A printed peak rising out of a diagram of interview rounds"
    >
      {/* ---- the schematic: rounds, plotted like a textbook figure ---- */}
      <g className="text-foreground/45" stroke="currentColor" fill="none">
        <path d="M36 246C96 132 214 88 330 96" strokeWidth="1.1" strokeDasharray="5 6" />
        <path d="M60 300C148 214 266 186 404 210" strokeWidth="1.1" />
        <path d="M330 96 466 168" strokeWidth="1.1" />
        <path d="M404 210 466 168" strokeWidth="1.1" strokeDasharray="3 5" />
        <path d="M330 96 404 210" strokeWidth="1.1" strokeDasharray="3 5" />
        <path d="M36 246 60 300" strokeWidth="1.1" />

        {[
          [36, 246],
          [330, 96],
          [404, 210],
          [466, 168],
          [60, 300],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="currentColor" />
        ))}
      </g>

      {/* Round labels, small enough to read as annotation rather than copy. */}
      <g
        className="text-foreground/55"
        fill="currentColor"
        fontSize="11"
        fontStyle="italic"
        fontFamily="var(--font-display), Georgia, serif"
      >
        <text x="22" y="236">R1</text>
        <text x="322" y="84">R2</text>
        <text x="412" y="222">R3</text>
        <text x="474" y="160">offer</text>
      </g>

      {/* ---- the block: flat ink, printed badly on purpose ---- */}
      <g filter={`url(#${ROUGH_FILTER_ID})`}>
        <rect x="176" y="248" width="318" height="286" className="fill-brand" />
      </g>

      {/* ---- the peak, breaking out of the top edge of the block ---- */}
      <g filter={`url(#${ROUGH_FILTER_ID})`} className="fill-brand">
        <path d="M254 96 214 164l6.2 1.9-45.8 75.3h18.3c14.2 0 27.3-7.7 34.2-20l27.7-49.2 2.2 3.8 25.6 45.4c6.9 12.3 20 20 34.2 20h21l-47.5-75.6 5.7-1.7L254 96Z" />
      </g>

      {/* The same peak again inside the block, knocked out in paper. */}
      <g className="fill-background">
        <path d="M356 330 316 398l6.2 1.9-45.8 75.3h18.3c14.2 0 27.3-7.7 34.2-20l27.7-49.2 2.2 3.8 25.6 45.4c6.9 12.3 20 20 34.2 20h21l-47.5-75.5 5.7-1.8L356 330Z" />
      </g>

      {/* ---- punctuation: the trail of stars leaving the frame ---- */}
      <g className="text-foreground" fill="currentColor">
        {[
          [120, 372, 13],
          [92, 428, 8],
          [150, 452, 6],
          [64, 486, 17],
          [196, 508, 7],
          [258, 536, 10],
        ].map(([x, y, s]) => (
          <path
            key={`${x}-${y}`}
            transform={`translate(${x! - s! / 2} ${y! - s! / 2}) scale(${s! / 24})`}
            d="M12 0c.9 6.6 4.5 10.2 12 12-7.5 1.8-11.1 5.4-12 12-.9-6.6-4.5-10.2-12-12C7.5 10.2 11.1 6.6 12 0Z"
          />
        ))}
        <path
          d="M74 480C140 508 210 528 300 540"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeDasharray="4 7"
          fill="none"
        />
      </g>

      {/* A couple of stars punched out of the block, so it is not a slab. */}
      <g className="fill-background">
        {[
          [418, 296, 15],
          [452, 344, 9],
          [388, 502, 11],
        ].map(([x, y, s]) => (
          <path
            key={`${x}-${y}`}
            transform={`translate(${x! - s! / 2} ${y! - s! / 2}) scale(${s! / 24})`}
            d="M12 0c.9 6.6 4.5 10.2 12 12-7.5 1.8-11.1 5.4-12 12-.9-6.6-4.5-10.2-12-12C7.5 10.2 11.1 6.6 12 0Z"
          />
        ))}
      </g>
    </svg>
  )
}
