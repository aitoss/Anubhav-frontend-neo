import Image from "next/image"
import Link from "next/link"

import { ButtonLink } from "@/components/button-link"
import { Header } from "@/components/header"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <div className="w-full max-w-xs">
            <Image
              src="/assets/images/404Illustration.png"
              alt="404 illustration"
              width={900}
              height={700}
              priority
              className="h-auto w-full select-none object-contain"
            />
          </div>
          <p className="text-sm font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            404
          </p>
          <h1 className="mt-3 text-4xl font-heading font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Page not found
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Oops! Looks like you followed a broken link or the page has moved.
            Head back home or explore the latest stories in the community.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/" size="lg">
              Go Home
            </ButtonLink>
            <ButtonLink href="/stories" variant="outline" size="lg">
              Browse Stories
            </ButtonLink>
          </div>


          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Need help?</span>
            <Link href="/request" className="font-medium text-foreground transition-colors hover:underline">
              Request an article
            </Link>
            <span>or</span>
            <Link href="/team" className="font-medium text-foreground transition-colors hover:underline">
              contact the team
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
