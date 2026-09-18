import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dev Team",
  description: "The students who build and maintain Anubhav, past and present.",
  alternates: { canonical: "/team" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
