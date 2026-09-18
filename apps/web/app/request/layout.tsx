import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Request an Article",
  description: "Ask a senior to share their interview experience on Anubhav.",
  alternates: { canonical: "/request" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
