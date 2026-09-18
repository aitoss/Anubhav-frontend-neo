import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Article",
  description: "Edit one of your published articles.",
  alternates: { canonical: "/edit/[id]" },
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
