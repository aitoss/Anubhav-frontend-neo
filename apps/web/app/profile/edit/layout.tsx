import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Update your Anubhav profile details.",
  alternates: { canonical: "/profile/edit" },
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
