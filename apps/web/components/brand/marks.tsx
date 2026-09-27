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

/**
 * The filters that give flat vectors a printed feel.
 *
 * `rough` only chews the outline. `grunge` also eats into the fill: a second,
 * much finer noise is turned into an alpha mask and composited away, so ink
 * drops out in speckles the way it does on a bad pull. A flat fill reads as a
 * div with a background colour; this reads as something that was printed.
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

        <filter id={GRUNGE_FILTER_ID} x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.024"
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

          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.16"
            numOctaves="3"
            seed="13"
            result="speckle"
          />
          {/* A hard threshold, not a ramp. A ramp just makes the whole shape
              semi-transparent; this keeps the ink solid and punches out the
              occasional flake, which is what a bad pull actually looks like. */}
          <feComponentTransfer in="speckle" result="holes">
            <feFuncA type="discrete" tableValues="1 1 1 1 1 1 0 1 1 1" />
          </feComponentTransfer>
          <feComposite in="rough" in2="holes" operator="in" />
        </filter>
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
