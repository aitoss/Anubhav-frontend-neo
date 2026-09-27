"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"

import { ButtonLink } from "@/components/button-link"
import { EmptyPlate } from "@/components/brand/empty-plate"

/**
 * The route-level error boundary.
 *
 * Next renders its own bare stack trace in development and a blank page in
 * production without this, so a failed fetch on any route used to drop the
 * brand entirely at the exact moment the reader needs a way out.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  React.useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <EmptyPlate className="w-full max-w-sm" />

          <p className="text-muted-foreground mt-6 font-mono text-sm tracking-[0.2em]">
            ERROR
          </p>
          <h1 className="font-heading mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
            That did not load
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-base leading-7 sm:text-lg">
            Something broke on our side. Trying again usually works; if it does not,
            the archive is still there.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={reset}>
              Try again
            </Button>
            <ButtonLink href="/article" variant="outline" size="lg">
              Browse stories
            </ButtonLink>
          </div>

          {/* The digest is the only thread back to the server log, so it is
              worth showing even though it means nothing to the reader. */}
          {error.digest ? (
            <p className="text-muted-foreground/70 mt-8 font-mono text-xs">
              ref {error.digest}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  )
}
