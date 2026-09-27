import * as React from "react"

import { cn } from "@workspace/ui/lib/utils"

import { Reveal } from "@/components/reveal"

/**
 * The page furniture, in the brand's own language.
 *
 * The plates established a vocabulary — figures are numbered, annotations are
 * set in mono, rules are dashed, edges are hairlines — and then every section
 * on the site ignored it and used a centred uppercase eyebrow over a centred
 * title, which is the same heading every starter template ships with.
 *
 * These are the same parts rebuilt to match: a catalogued figure number, a
 * dashed rule, a left-aligned title. Brand is the section, not a texture
 * behind it.
 */

/** A dashed hairline. The site's divider, matching the runs on the plates. */
export function Rule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "border-border h-px w-full border-t border-dashed opacity-80",
        className,
      )}
    />
  )
}

/** The mono annotation used for figure numbers and metadata. */
export function Annotation({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase",
        className,
      )}
    >
      {children}
    </span>
  )
}

/**
 * A section's opening: figure number, rule, title, standfirst.
 *
 * Left-aligned on purpose. A plate is catalogued from its corner, and it is
 * also how a reader expects to enter a column of text.
 */
export function SectionHeading({
  fig,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  /** The plate number, e.g. "03". Rendered as FIG. 03. */
  fig: string
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  className?: string
}) {
  const centred = align === "center"

  return (
    <Reveal
      className={cn(
        "flex w-full flex-col",
        centred && "items-center text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full items-center gap-4",
          centred && "max-w-xl justify-center",
        )}
      >
        <Annotation className="shrink-0">
          FIG. {fig}
          {eyebrow ? <span className="text-muted-foreground/60"> / {eyebrow}</span> : null}
        </Annotation>
        <Rule className="shrink" />
      </div>

      <h2
        className={cn(
          "font-heading mt-5 text-3xl font-medium tracking-tight text-balance sm:text-4xl",
          centred ? "max-w-2xl" : "max-w-3xl",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "text-muted-foreground mt-4 text-base leading-7 text-pretty",
            centred ? "max-w-xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}

/**
 * A card as a printed plate: hairline edge, the figure in the corner, and a
 * caption ruled off from the image the way a plate captions its figure.
 */
export function PlateCard({
  fig,
  title,
  description,
  children,
  className,
}: {
  fig: string
  title: string
  description: React.ReactNode
  /** The figure itself. */
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "border-border bg-card group relative flex h-full flex-col overflow-hidden rounded-none border",
        className,
      )}
    >
      <div className="bg-muted/30 relative">
        <Annotation className="absolute top-3 left-4 z-10">FIG. {fig}</Annotation>
        {children}
      </div>

      {/* Ruled off, the way a caption is set under a plate. */}
      <div className="border-border border-t border-dashed p-5">
        <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        <p className="text-muted-foreground mt-2 text-sm leading-6">{description}</p>
      </div>
    </div>
  )
}
