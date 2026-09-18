import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Write an Article",
  description: "Share your interview or internship experience with juniors at AIT.",
  alternates: { canonical: "/create" },
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
