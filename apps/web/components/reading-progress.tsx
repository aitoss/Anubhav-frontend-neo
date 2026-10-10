"use client"

import * as React from "react"

/**
 * How far the reader is through the article body, as a hairline under the
 * header. Measured against the body rather than the document so the footer and
 * the similar-articles list do not count as unread article.
 */
export function ReadingProgress({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>
}) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const update = () => {
      const container = containerRef.current
      if (!container) return

      const { top, height } = container.getBoundingClientRect()
      // Everything below the fold is still unread, so the bar fills as the
      // last line arrives rather than as the last pixel of the page does.
      const readable = height - window.innerHeight
      if (readable <= 0) {
        setProgress(top <= 0 ? 1 : 0)
        return
      }

      setProgress(Math.min(Math.max(-top / readable, 0), 1))
    }

    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [containerRef])

  return (
    <div
      // Under the sticky header, which is z-50.
      className="fixed top-0 right-0 left-0 z-[51] h-0.5"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div
        className="bg-foreground h-full origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
