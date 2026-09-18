import Link from "next/link"

import { cn } from "@workspace/ui/lib/utils"

// Full class strings on purpose: Tailwind v4 only generates utilities it can
// see literally in source, so `bg-${color}-100` would emit nothing.
// Gray is left out so every tag gets an actual colour.
const TAG_COLORS = [
  "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
  "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  "bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300",
  "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300",
  "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300",
  "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300",
  "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
  "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300",
  "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
  "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-300",
  "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300",
  "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
]

// Stable per-label colour: the same tag keeps its colour across pages and
// reloads, rather than shifting with list order.
export function tagColor(label: string) {
  // djb2: spread the current tag set over 12 of the 16 colours, vs 10 for a
  // plain char sum. Keep the full 32-bit value — an intermediate modulo throws
  // away entropy and bunches tags onto the same colour.
  let hash = 5381
  for (let index = 0; index < label.length; index += 1) {
    hash = (Math.imul(hash, 33) ^ label.charCodeAt(index)) | 0
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length]!
}

const BASE = "inline-flex items-center rounded-md px-2 py-0.5 text-sm font-medium"

export function TagBadge({ label, className }: { label: string; className?: string }) {
  return <span className={cn(BASE, tagColor(label), className)}>{label}</span>
}

export function TagBadgeLink({ label, className }: { label: string; className?: string }) {
  return (
    <Link
      href={`/article?query=${encodeURIComponent(label)}`}
      className={cn(BASE, tagColor(label), "transition-opacity hover:opacity-80", className)}
    >
      {label}
    </Link>
  )
}
