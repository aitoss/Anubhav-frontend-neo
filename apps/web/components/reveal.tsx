"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"

/**
 * The one entrance the site uses: rise a little, fade in, settle.
 *
 * Every section reaching for its own animation is how a page ends up feeling
 * assembled rather than designed, so the distance, the duration and the curve
 * live here and nowhere else. Sections differ only in when they start.
 *
 * It fires once, on entering the viewport, so scrolling back up does not
 * replay the whole page. Anyone who asked for less motion gets the content
 * with no transform and no delay at all.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  /** Seconds. Stagger siblings rather than animating them as one block. */
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: [0.33, 1, 0.68, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** The stagger the hero uses, so its items do not arrive all at once. */
export const HERO_STEP = 0.08
