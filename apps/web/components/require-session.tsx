"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSessionContext } from "supertokens-auth-react/recipe/session"

import { Spinner } from "@workspace/ui/components/spinner"

// Gate on SuperTokens' own session state, not on a /me request. /me can 401
// transiently — most importantly during the refresh SuperTokens runs on load —
// and a gate that redirects on that kicks signed-in users out to log-in.
export function RequireSession({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const session = useSessionContext()

  const loading = session.loading
  const doesSessionExist = loading ? false : session.doesSessionExist

  React.useEffect(() => {
    if (loading || doesSessionExist) return
    // Read the query here rather than with useSearchParams: that hook opts the
    // whole page out of static prerendering unless it sits behind Suspense.
    const target = `${pathname}${window.location.search}`
    router.replace(`/log-in?redirectToPath=${encodeURIComponent(target)}`)
  }, [loading, doesSessionExist, pathname, router])

  if (loading || !doesSessionExist) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return <>{children}</>
}
