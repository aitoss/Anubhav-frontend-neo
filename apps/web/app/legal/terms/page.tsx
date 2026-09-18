import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Anubhav",
}

// Copied as-is from master's src/pages/TermsService.jsx, which is a heading
// centred in a full-height container and nothing else — there is no terms copy
// anywhere in the repo. Needs real legal text before launch.
export default function TermsOfServicePage() {
  return (
    <main className="flex h-screen w-full flex-col place-items-center justify-center">
      <div className="h-[10vh]" />
      <h1 className="text-2xl">Terms of Service</h1>
    </main>
  )
}
