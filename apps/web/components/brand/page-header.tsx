import * as React from "react"

import { PagePlate } from "@/components/brand/page-plate"
import { Reveal } from "@/components/reveal"

/**
 * How every page that is not the landing page opens.
 *
 * Each of these used to roll its own heading with its own spacing and its own
 * scattered dots, which is why `/videos` and `/team` looked like two different
 * products. One header, one plate behind it, one entrance.
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
  /** Figure caption, matching the plates elsewhere on the site. */
  fig?: string
  variant?: "left" | "right"
  /** Filters, tabs, anything the page wants directly under its title. */
  children?: React.ReactNode
}) {
  return (
    <header className="border-border relative isolate overflow-hidden border-b px-4 pt-12 pb-10 sm:px-6 lg:px-8">
      <PagePlate
        variant={variant}
        fig={fig}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <Reveal className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <h1 className="font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>

        {description ? (
          <p className="text-muted-foreground mt-3 max-w-xl text-base leading-7 text-pretty">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-6 w-full">{children}</div> : null}
      </Reveal>
    </header>
  )
}
