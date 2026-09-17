"use client"

import * as React from "react"

import { HugeiconsIcon } from "@hugeicons/react"
import { SearchIcon } from "@hugeicons/core-free-icons"

import { SearchDialog } from "@/components/search-dialog"
import { Kbd } from "@workspace/ui/components/kbd"

export function SearchTrigger() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    function onOpen() {
      setOpen(true)
    }
    window.addEventListener("open-search", onOpen)
    return () => window.removeEventListener("open-search", onOpen)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-19 w-full mx-auto max-w-lg items-center gap-3 rounded-lg border border-border bg-sidebar/80 px-0.5 text-left shadow-xs active:shadow-none transition hover:bg-sidebar/30 sm:h-9.5"
      >
        <span className="flex size-8 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
          <HugeiconsIcon icon={SearchIcon} strokeWidth={2} className="size-4" />
        </span>
        <span className="flex-1 truncate text-sm text-muted-foreground/80 sm:text-base">
          Search for your Dreams..
        </span>
        <span className="hidden sm:inline-flex mr-1">
          <Kbd>⌘K</Kbd>
        </span>
      </button>

      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
