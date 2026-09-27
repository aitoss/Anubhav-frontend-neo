import {
  FIG_PROPS,
  GRUNGE_FILTER_ID,
  HALFTONE_ID,
  Splatter,
  Stars,
} from "@/components/brand/marks"

/**
 * The three steps of writing an article, drawn rather than screenshotted.
 *
 * Screenshots of our own form went stale the moment the form changed, carried
 * the UI's own spacing into a card that had its own, and rendered text at a
 * size nobody could read. These are abstractions of the same three moments:
 * fields, a page being written, a page going out.
 *
 * They are drawn in the same language as the hero plate, so the page reads as
 * one piece of work: a torn halftone field, ink thrown off its edge, a couple
 * of stars, and a FIG. caption. Each sits on a shared 320x200 stage and takes
 * the palette with it into either theme.
 */

const STAGE = "0 0 320 200"

/**
 * A torn field of brand behind each composition.
 *
 * Screened into halftone and held right back, because it is the ground the
 * panel sits on, not the thing you are meant to look at.
 */
function InkStrip({ d, opacity = 0.3 }: { d: string; opacity?: number }) {
  return (
    <path
      fill={`url(#${HALFTONE_ID})`}
      opacity={opacity}
      filter={`url(#${GRUNGE_FILTER_ID})`}
      d={d}
    />
  )
}

function Fig({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <g className="text-muted-foreground/60" {...FIG_PROPS}>
      <text x={x} y={y}>
        {children}
      </text>
    </g>
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
      <InkStrip d="M6 40 104 30 108 190 10 196Z" />
      <Splatter
        className="text-muted-foreground/30"
        x={64}
        y={168}
        seed={5}
        count={14}
        spread={44}
      />

      {/* Tipped a couple of degrees: square to the frame it read as a wireframe
          rather than something laid on a page. */}
      <g transform="rotate(-1.6 186 100)">
        <g className="fill-card stroke-border" strokeWidth="1.5">
          <rect x="68" y="26" width="232" height="148" rx="10" />
        </g>

        {/* A short label over a long input, three times. */}
        {[52, 92, 132].map((y, index) => (
          <g key={y}>
            <rect
              className="fill-muted-foreground/35"
              x="88"
              y={y}
              width={index === 1 ? 46 : 34}
              height="5"
              rx="2.5"
            />
            <rect
              className="fill-muted/70 stroke-border"
              strokeWidth="1.2"
              x="88"
              y={y + 12}
              width="112"
              height="18"
              rx="5"
            />
          </g>
        ))}

        {/* The banner drop zone, dashed the way an empty one always is. */}
        <rect
          className="fill-muted/40 stroke-border"
          strokeWidth="1.4"
          strokeDasharray="5 5"
          x="216"
          y="52"
          width="66"
          height="88"
          rx="8"
        />
        <path className="fill-brand/60" d="M249 86 237 104h7v12h10v-12h7L249 86Z" />
      </g>

      <Stars
        className="text-muted-foreground/45"
        points={[
          [36, 62, 11],
          [300, 178, 7],
        ]}
      />
      <Fig x={12} y={20}>
        FIG. 1
      </Fig>
    </Frame>
  )
}

/** Step two: the page, mid-sentence. */
export function StepWrite() {
  return (
    <Frame>
      <InkStrip d="M222 14 314 26 310 166 218 156Z" />
      <Splatter
        className="text-muted-foreground/30"
        x={272}
        y={176}
        seed={11}
        count={14}
        spread={42}
      />

      <g transform="rotate(1.2 140 104)">
        <g className="fill-card stroke-border" strokeWidth="1.5">
          <rect x="16" y="32" width="244" height="146" rx="10" />
        </g>

        {/* Toolbar: marks rather than icons, so nothing pretends to be a control. */}
        <g className="fill-muted-foreground/40">
          {[32, 46, 60, 78, 92, 110, 124, 138].map((x) => (
            <rect key={x} x={x} y="48" width="8" height="8" rx="2" />
          ))}
        </g>
        <line className="stroke-border" strokeWidth="1.2" x1="16" y1="66" x2="260" y2="66" />

        {/* A heading, a caret, and the lines not written yet. */}
        <rect className="fill-foreground/70" x="32" y="86" width="94" height="9" rx="3" />
        <rect className="fill-brand/80" x="132" y="82" width="2.5" height="17" rx="1.2">
          <animate
            attributeName="opacity"
            values="1;1;0;0"
            keyTimes="0;0.45;0.55;1"
            dur="1.1s"
            repeatCount="indefinite"
          />
        </rect>

        <g className="fill-muted-foreground/25">
          <rect x="32" y="112" width="206" height="6" rx="3" />
          <rect x="32" y="128" width="190" height="6" rx="3" />
          <rect x="32" y="144" width="146" height="6" rx="3" />
        </g>
      </g>

      <Stars
        className="text-muted-foreground/45"
        points={[
          [292, 64, 12],
          [20, 176, 8],
        ]}
      />
      <Fig x={276} y={20}>
        FIG. 2
      </Fig>
    </Frame>
  )
}

/** Step three: the finished piece, on its way out. */
export function StepPublish() {
  return (
    <Frame>
      <InkStrip d="M4 132 316 116 314 196 6 200Z" />
      <Splatter
        className="text-muted-foreground/30"
        x={44}
        y={92}
        seed={19}
        count={14}
        spread={44}
      />

      {/* Three pages fanned, so it reads as published rather than still being
          edited: one is the piece, the ones behind it are everyone else's. */}
      <g className="fill-card stroke-border" strokeWidth="1.5">
        <rect
          x="40"
          y="20"
          width="206"
          height="124"
          rx="10"
          opacity={0.45}
          transform="rotate(-6 143 82)"
        />
        <rect
          x="50"
          y="22"
          width="206"
          height="124"
          rx="10"
          opacity={0.7}
          transform="rotate(-3 153 84)"
        />
        <rect x="62" y="26" width="206" height="124" rx="10" />
      </g>

      <g className="fill-muted-foreground/30">
        <rect x="80" y="46" width="100" height="8" rx="3" />
        <rect x="80" y="68" width="166" height="5" rx="2.5" />
        <rect x="80" y="82" width="152" height="5" rx="2.5" />
        <rect x="80" y="96" width="116" height="5" rx="2.5" />
      </g>

      {/* The button, and the one place the eye should land. */}
      <g>
        <rect className="fill-foreground" x="160" y="110" width="90" height="28" rx="14" />
        <rect className="fill-background" x="176" y="121" width="38" height="6" rx="3" />
        <path className="fill-brand/80" d="M226 116 240 124 226 132 229 124Z" />
      </g>

      <Stars
        className="text-muted-foreground/45"
        points={[
          [292, 36, 11],
          [26, 174, 7],
        ]}
      />
      <Fig x={12} y={20}>
        FIG. 3
      </Fig>
    </Frame>
  )
}
