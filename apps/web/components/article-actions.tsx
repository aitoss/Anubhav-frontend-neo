"use client"

import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

type Kind = "heart" | "bookmark"

// Per-viewer only: the Vite app stored these in localStorage and there is no
// like/bookmark endpoint. Reads/writes are guarded because storage throws in
// private mode and comes back empty with site data cleared.
function readFlag(kind: Kind, id: string) {
  try {
    return localStorage.getItem(`${kind}_${id}`) === "true"
  } catch {
    return false
  }
}

function writeFlag(kind: Kind, id: string, value: boolean) {
  try {
    localStorage.setItem(`${kind}_${id}`, String(value))
  } catch {
    // ignore
  }
}

function useToggle(kind: Kind, id: string) {
  const [on, setOn] = React.useState(false)
  const [pulsing, setPulsing] = React.useState(false)

  React.useEffect(() => {
    setOn(readFlag(kind, id))
  }, [kind, id])

  const toggle = React.useCallback(() => {
    setOn((previous) => {
      const next = !previous
      writeFlag(kind, id, next)
      return next
    })
    setPulsing(true)
    setTimeout(() => setPulsing(false), 175)
  }, [kind, id])

  return { on, pulsing, toggle }
}

const HEART_PATH =
  "M16.44 3.1001C14.63 3.1001 13.01 3.9801 12 5.3301C10.99 3.9801 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.6001 2 8.6901C2 9.8801 2.19 10.9801 2.52 12.0001C4.1 17.0001 8.97 19.9901 11.38 20.8101C11.72 20.9301 12.28 20.9301 12.62 20.8101C15.03 19.9901 19.9 17.0001 21.48 12.0001C21.81 10.9801 22 9.8801 22 8.6901C22 5.6001 19.51 3.1001 16.44 3.1001Z"

const BOOKMARK_PATH =
  "M16.82 2H7.18001C5.05001 2 3.32001 3.74 3.32001 5.86V19.95C3.32001 21.75 4.61001 22.51 6.19001 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2Z"

function IconToggle({
  kind,
  id,
  path,
  label,
  activeClass,
}: {
  kind: Kind
  id: string
  path: string
  label: string
  activeClass: string
}) {
  const { on, pulsing, toggle } = useToggle(kind, id)

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={on}
      title={label}
      // The card itself is clickable, so keep the toggle from navigating.
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
        toggle()
      }}
      onKeyDown={(event) => event.stopPropagation()}
      className="cursor-pointer p-0.5"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        aria-hidden
        className={cn(
          "transition-transform duration-[175ms] ease-in-out",
          pulsing && "scale-120",
          on ? activeClass : "fill-muted-foreground/35",
        )}
      >
        <path d={path} />
      </svg>
    </button>
  )
}

export function ArticleActions({ id, className }: { id: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconToggle
        kind="heart"
        id={id}
        path={HEART_PATH}
        label="Like article"
        activeClass="fill-[#e0245e]"
      />
      <IconToggle
        kind="bookmark"
        id={id}
        path={BOOKMARK_PATH}
        label="Bookmark article"
        activeClass="fill-foreground"
      />
    </div>
  )
}
