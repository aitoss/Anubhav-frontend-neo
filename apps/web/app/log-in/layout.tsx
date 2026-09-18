import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to your Anubhav account to write and manage articles.",
  alternates: { canonical: "/log-in" },
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
