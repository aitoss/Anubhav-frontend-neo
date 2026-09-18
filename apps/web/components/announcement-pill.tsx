import Link from "next/link"

/**
 * Hero announcement pill, ported from the Vite HomeScreen: a rotating
 * conic-gradient ring behind an opaque backdrop, with a nested "What's new"
 * chip whose arrow nudges on hover.
 */
export function AnnouncementPill() {
  return (
    <Link
      href="/videos"
      className="group border-border bg-background relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full border p-1 pl-2 transition-colors duration-200"
    >
      <span className="animate-spark-flip animate-spark-rotate absolute inset-0 h-full w-full overflow-hidden rounded-full [mask:linear-gradient(black,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,#00a6ed_360deg)] before:content-[''] before:[translate:0%_-15%]" />
      <span className="bg-background group-hover:bg-muted absolute inset-px rounded-full transition-colors duration-200" />
      <span className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-tr from-neutral-500/10 blur-md" />

      <span className="text-foreground z-10 flex items-center justify-center gap-1 py-0.5 text-sm font-medium">
        🎉 Video collection{" "}
        <span className="bg-muted group-hover:bg-accent flex h-full w-fit items-center justify-center rounded-full px-2 py-0.5 transition-all">
          What&apos;s new
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
            className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </Link>
  )
}
