"use client"

import BoringAvatar from "boring-avatars"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { cn } from "@workspace/ui/lib/utils"

// Deterministic per name, so the same author gets the same avatar everywhere.
const PALETTE = ["#2E90FA", "#7A5AF8", "#F63D68", "#FB6514", "#12B76A"]

type UserAvatarProps = {
  /** Seeds the generated avatar; also the alt text. */
  name?: string
  /** A real picture wins over the generated one. */
  src?: string
  /** Pixel size handed to boring-avatars; match it to `className`. */
  size: number
  className?: string
}

export function UserAvatar({ name, src, size, className }: UserAvatarProps) {
  const seed = name?.trim() || "Anonymous"

  return (
    <Avatar className={cn("shrink-0", className)}>
      {src ? <AvatarImage src={src} alt={seed} /> : null}
      <AvatarFallback className="bg-transparent">
        <BoringAvatar name={seed} variant="beam" size={size} colors={PALETTE} />
      </AvatarFallback>
    </Avatar>
  )
}
