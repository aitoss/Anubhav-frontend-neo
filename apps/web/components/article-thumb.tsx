"use client"

import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

import { Logo } from "@/components/logo"

type ArticleThumbProps = {
  src?: string
  className?: string
  logoClassName?: string
}

// Shared so the list, the profile and the similar-articles grid all handle a
// missing or dead imageUrl the same way: fall back to the mark at 30% rather
// than a broken image.
export function ArticleThumb({ src, className, logoClassName }: ArticleThumbProps) {
  const [failed, setFailed] = React.useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <div className={cn("bg-muted relative overflow-hidden", className)}>
      {showImage ? (
        <>
          <img
            src={src}
            alt=""
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70" />
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Logo className={cn("text-foreground/30", logoClassName ?? "h-10 w-10")} />
        </div>
      )}
    </div>
  )
}
