import Link from "next/link"

import { ButtonLink } from "@/components/button-link"
import { EmptyPlate } from "@/components/brand/empty-plate"
import { Reveal } from "@/components/reveal"

export default function NotFound() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <EmptyPlate className="w-full max-w-sm" />

          <p className="text-muted-foreground mt-6 font-mono text-sm tracking-[0.2em]">
            404
          </p>
          <h1 className="font-heading mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
            This one goes nowhere
          </h1>
          <p className="text-muted-foreground mt-4 max-w-xl text-base leading-7 sm:text-lg">
            The link is broken or the page has moved. Head back home, or pick up an
            interview experience from the archive instead.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/" size="lg">
              Go home
            </ButtonLink>
            <ButtonLink href="/article" variant="outline" size="lg">
              Browse stories
            </ButtonLink>
          </div>

          <div className="text-muted-foreground mt-10 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span>Need help?</span>
            <Link href="/request" className="text-foreground font-medium hover:underline">
              Request an article
            </Link>
            <span>or</span>
            <Link href="/team" className="text-foreground font-medium hover:underline">
              contact the team
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
