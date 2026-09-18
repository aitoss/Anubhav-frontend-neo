"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Spinner } from "@workspace/ui/components/spinner"

import { ProfileShell } from "@/components/profile-view"
import { RequireSession } from "@/components/require-session"
import { useMe } from "@/hooks/use-profile"
import { profilePath } from "@/lib/users"

// Resolves who "me" is, then hands off to the canonical /u/:id/:slug page.
function MyProfileRedirect() {
  const router = useRouter()
  const { data: me, isLoading } = useMe()

  React.useEffect(() => {
    if (!isLoading && me?._id) router.replace(profilePath(me))
  }, [me, isLoading, router])

  return (
    <ProfileShell>
      <div className="flex h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    </ProfileShell>
  )
}

export default function MyProfilePage() {
  return (
    <RequireSession>
      <MyProfileRedirect />
    </RequireSession>
  )
}
