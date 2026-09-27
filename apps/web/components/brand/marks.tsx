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

/**
 * The filter that gives flat vectors a printed feel: it chews edges the way
 * ink bleeds into paper.
 *
 * Render once per page; the marks below reference it by id.
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
