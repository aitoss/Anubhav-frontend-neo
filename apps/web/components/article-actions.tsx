"use client"

import * as React from "react"

import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/solid"

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

function IconToggle({
  kind,
  id,
  Icon,
  label,
  activeClass,
}: {
  kind: Kind
  id: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
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
      <Icon
        aria-hidden
        className={cn(
          "size-5 transition-transform duration-[175ms] ease-in-out",
          pulsing && "scale-120",
          on ? activeClass : "fill-muted-foreground/35",
        )}
      />
    </button>
  )
}

export function ArticleActions({ id, className }: { id: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconToggle
        kind="heart"
        id={id}
        Icon={HeartIcon}
        label="Like article"
        activeClass="fill-[#e0245e]"
      />
      <IconToggle
        kind="bookmark"
        id={id}
        Icon={BookmarkIcon}
        label="Bookmark article"
        activeClass="fill-foreground"
      />
    </div>
  )
}
