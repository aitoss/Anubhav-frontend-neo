import { GRUNGE_FILTER_ID } from "@/components/brand/marks"

/**
 * The three steps of writing an article, drawn rather than screenshotted.
 *
 * Screenshots of our own form went stale the moment the form changed, carried
 * the UI's own spacing into a card that had its own, and rendered text at a
 * size nobody could read. These are abstractions of the same three moments:
 * fields, a page being written, a page going out. Real enough to recognise,
 * loose enough to survive a redesign.
 *
 * Each one is a single inline SVG on a shared 320x200 stage, so the three sit
 * on the same grid and take the palette with them into either theme.
 */

const STAGE = "0 0 320 200"

/** A torn strip of brand, used to anchor each composition. */
function InkStrip({ d, opacity = 1 }: { d: string; opacity?: number }) {
  return (
    <path
      className="fill-brand"
      opacity={opacity}
      filter={`url(#${GRUNGE_FILTER_ID})`}
      d={d}
    />
  )
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox={STAGE} className="h-auto w-full" aria-hidden>
      {children}
    </svg>
  )
}

/** Step one: the details you fill in before you write anything. */
export function StepDetails() {
  return (
    <Frame>
      <InkStrip d="M0 44 96 36 100 196 0 200Z" opacity={0.9} />

      <g className="fill-card stroke-border" strokeWidth="1.5">
        <rect x="64" y="24" width="238" height="152" rx="10" />
      </g>

      {/* Field rows: a short label over a long input, three times. */}
      <g>
        {[52, 92, 132].map((y, index) => (
          <g key={y}>
            <rect
              className="fill-muted-foreground/35"
              x="84"
              y={y}
              width={index === 1 ? 46 : 34}
              height="5"
              rx="2.5"
            />
            <rect
              className="fill-muted/70 stroke-border"
              strokeWidth="1.2"
              x="84"
              y={y + 12}
              width="118"
              height="18"
              rx="5"
            />
          </g>
        ))}
      </g>

      {/* The banner drop zone, dashed the way an empty one always is. */}
      <rect
        className="fill-muted/40 stroke-border"
        strokeWidth="1.4"
        strokeDasharray="5 5"
        x="216"
        y="52"
        width="68"
        height="90"
        rx="8"
      />
      <path
        className="fill-brand/70"
        d="M250 88 238 106h7v12h10v-12h7L250 88Z"
      />
    </Frame>
  )
}

/** Step two: the page, mid-sentence. */
export function StepWrite() {
  return (
    <Frame>
      <InkStrip d="M226 12 320 24 316 168 222 158Z" opacity={0.85} />

      <g className="fill-card stroke-border" strokeWidth="1.5">
        <rect x="18" y="30" width="248" height="150" rx="10" />
      </g>

      {/* Toolbar: marks rather than icons, so nothing pretends to be a control. */}
      <g className="fill-muted-foreground/40">
        {[34, 48, 62, 80, 94, 112, 126, 140].map((x) => (
          <rect key={x} x={x} y="46" width="8" height="8" rx="2" />
        ))}
      </g>
      <line className="stroke-border" strokeWidth="1.2" x1="18" y1="64" x2="266" y2="64" />

      {/* A heading, a caret, and the lines that have not been written yet. */}
      <rect className="fill-foreground/70" x="34" y="84" width="96" height="9" rx="3" />
      <rect className="fill-brand" x="136" y="80" width="2.5" height="17" rx="1.2">
        <animate
          attributeName="opacity"
          values="1;1;0;0"
          keyTimes="0;0.45;0.55;1"
          dur="1.1s"
          repeatCount="indefinite"
        />
      </rect>

      <g className="fill-muted-foreground/25">
        <rect x="34" y="110" width="212" height="6" rx="3" />
        <rect x="34" y="126" width="196" height="6" rx="3" />
        <rect x="34" y="142" width="150" height="6" rx="3" />
      </g>
    </Frame>
  )
}

/** Step three: the finished piece, on its way out. */
export function StepPublish() {
  return (
    <Frame>
      <InkStrip d="M0 128 320 112 320 200 0 200Z" opacity={0.85} />

      {/* Two pages, the back one offset, so it reads as published rather than
          still being edited. */}
      <g className="fill-card stroke-border" strokeWidth="1.5">
        <rect
          x="46"
          y="18"
          width="212"
          height="128"
          rx="10"
          opacity={0.6}
          transform="rotate(-4 152 82)"
        />
        <rect x="58" y="26" width="212" height="128" rx="10" />
      </g>

      <g className="fill-muted-foreground/30">
        <rect x="76" y="46" width="104" height="8" rx="3" />
        <rect x="76" y="68" width="172" height="5" rx="2.5" />
        <rect x="76" y="82" width="158" height="5" rx="2.5" />
        <rect x="76" y="96" width="120" height="5" rx="2.5" />
      </g>

      {/* The button, and the one place the eye should land. */}
      <g>
        <rect className="fill-foreground" x="158" y="112" width="92" height="28" rx="14" />
        <rect className="fill-background" x="174" y="123" width="40" height="6" rx="3" />
        <path className="fill-brand" d="M226 118 240 126 226 134 229 126Z" />
      </g>
    </Frame>
  )
}
