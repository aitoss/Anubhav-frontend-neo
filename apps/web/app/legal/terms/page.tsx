import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Terms of Service | Anubhav",
}

// ponytail: the Vite page was a heading and nothing else - there is no terms
// copy anywhere in the repo to port. Kept so footer links resolve instead of
// 404ing. Replace the placeholder below once legal copy exists.
export default function TermsOfServicePage() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-3xl flex-col px-4 pt-28 pb-16">
        <h1 className="text-4xl font-semibold">Terms of Service</h1>
        <p className="text-muted-foreground mt-6 leading-7">
          Our terms of service are being prepared and will be published here.
        </p>
      </main>
    </>
  )
}
