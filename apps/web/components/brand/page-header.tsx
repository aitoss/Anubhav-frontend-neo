import * as React from "react"

import { PagePlate } from "@/components/brand/page-plate"
import { Annotation, Rule } from "@/components/brand/section"
import { Reveal } from "@/components/reveal"

/**
 * How every page that is not the landing page opens.
 *
 * Catalogued rather than centred: the figure number and the page name sit on
 * one ruled line, the title hangs off the left margin under it. It is the same
 * structure as a plate caption, which is the point — a page is a plate, and it
 * should not open with the centred eyebrow every starter template ships.
 *
 * The plate behind it is held right back; the heading is the brand here, not
 * the texture.
 */
export function PageHeader({
  title,
  description,
  fig,
  variant = "left",
  children,
}: {
  title: string
  description?: string
  /** Short page code, e.g. "V" for videos. Rendered as FIG. V. */
  fig?: string
  variant?: "left" | "right"
  /** Filters, tabs, anything the page wants directly under its title. */
  children?: React.ReactNode
}) {
  return (
    <header className="border-border relative isolate overflow-hidden border-b px-4 pt-14 pb-12 sm:px-6 lg:px-8">
      <PagePlate
        variant={variant}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
      />

      <Reveal className="relative z-10 mx-auto flex w-full max-w-7xl flex-col">
        <div className="flex w-full items-center gap-4">
          <Annotation className="shrink-0">
            FIG. {fig ?? "00"}
            <span className="text-muted-foreground/60"> / {title}</span>
          </Annotation>
          <Rule className="shrink" />
        </div>

        <h1 className="font-heading mt-5 max-w-3xl text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>

        {description ? (
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7 text-pretty">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-8 w-full">{children}</div> : null}
      </Reveal>
    </header>
  )
}
