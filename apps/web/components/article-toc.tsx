"use client"

import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

type Heading = { id: string; text: string; level: number }

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "section"
  )
}

/**
 * Reads the headings straight out of the rendered article and gives each one an
 * id. Article bodies are stored as HTML written in the editor, so the ids have
 * to be added here rather than assumed.
 */
function useHeadings(containerRef: React.RefObject<HTMLElement | null>, body: string) {
  const [headings, setHeadings] = React.useState<Heading[]>([])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const seen = new Map<string, number>()
    const found: Heading[] = []

    for (const node of container.querySelectorAll("h1, h2, h3")) {
      const text = node.textContent?.trim()
      if (!text) continue

      if (!node.id) {
        const base = slugify(text)
        const count = seen.get(base) ?? 0
        seen.set(base, count + 1)
        node.id = count === 0 ? base : `${base}-${count}`
      }

      found.push({ id: node.id, text, level: Number(node.tagName[1]) })
    }

    setHeadings(found)
  }, [containerRef, body])

  return headings
}

/** Highlights whichever heading the reader is currently under. */
function useActiveHeading(headings: Heading[]) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    if (headings.length === 0) return

    // Measured on scroll rather than with an IntersectionObserver: a band
    // narrow enough to pick one heading is also narrow enough for a fast
    // scroll to jump clean over it, leaving nothing highlighted.
    const update = () => {
      let current = headings[0]!.id

      for (const heading of headings) {
        const node = document.getElementById(heading.id)
        if (!node) continue
        // The offset clears the sticky header, so a heading becomes current
        // once it reaches the top of the readable area.
        if (node.getBoundingClientRect().top > 120) break
        current = heading.id
      }

      setActiveId(current)
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
  }, [headings])

  return activeId
}

export function ArticleToc({
  containerRef,
  body,
}: {
  containerRef: React.RefObject<HTMLElement | null>
  body: string
}) {
  const headings = useHeadings(containerRef, body)
  const activeId = useActiveHeading(headings)

  // One heading is a label, not a table of contents.
  if (headings.length < 2) return null

  return (
    <nav
      aria-label="On this page"
      // Sits beside the 3xl column, so it only appears once there is room for
      // it outside the text rather than on top of it.
      className="group fixed top-1/2 left-[max(1rem,calc(50%-40rem))] z-30 hidden w-56 -translate-y-1/2 xl:block"
    >
      <ul className="border-border bg-card/80 flex max-h-[70vh] flex-col gap-1 overflow-y-auto rounded-xl border p-2 opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "hover:text-foreground block truncate rounded-md px-2 py-1 text-sm transition-colors",
                heading.level === 3 && "pl-5 text-xs",
                heading.id === activeId
                  ? "bg-accent text-foreground font-medium"
                  : "text-muted-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>

      {/* The collapsed state: one rule per heading, the current one lit. */}
      <ul
        aria-hidden
        className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-2 p-2 pl-4 opacity-100 transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0"
      >
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "h-0.5 rounded-full transition-all duration-200",
              heading.id === activeId
                ? "bg-foreground w-6"
                : "bg-muted-foreground/40 w-3",
            )}
          />
        ))}
      </ul>
    </nav>
  )
}
