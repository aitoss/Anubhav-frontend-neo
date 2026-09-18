import type { Metadata } from "next"

import { SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: { default: "Articles", template: `%s | ${SITE_NAME}` },
  description: "Browse interview and internship experiences shared by AIT students, filtered by company.",
  alternates: { canonical: "/article" },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
