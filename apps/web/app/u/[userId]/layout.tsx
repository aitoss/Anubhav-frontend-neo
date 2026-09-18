import type { Metadata } from "next"

import { BACKEND_URL } from "@/lib/backend"
import { SITE_NAME } from "@/lib/site"
import type { Profile } from "@/lib/users"

type Props = { params: Promise<{ userId: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params

  try {
    const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
      next: { revalidate: 3600 },
    })
    if (response.ok) {
      const { user } = (await response.json()) as { user?: Profile }
      if (user?.name) {
        const description = `Interview and internship experiences shared by ${user.name} on ${SITE_NAME}.`
        return {
          title: user.name,
          description,
          openGraph: { type: "profile", title: user.name, description },
        }
      }
    }
  } catch {
    // fall through to the generic title
  }

  return { title: "Profile" }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
