import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Profile",
  description: "Your Anubhav profile and published articles.",
  alternates: { canonical: "/profile/me" },
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
