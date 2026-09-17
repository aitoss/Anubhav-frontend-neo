"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Spinner } from "@workspace/ui/components/spinner"

import { ProfileShell } from "@/components/profile-view"
import { useMe } from "@/hooks/use-profile"
import { profilePath } from "@/lib/users"

// /profile/me only resolves who "me" is, then hands off to the canonical
// /u/:id/:slug page — same behaviour as the Vite route.
export default function MyProfilePage() {
  const router = useRouter()
  const { data: me, isLoading, isError } = useMe()

  React.useEffect(() => {
    if (isLoading) return
    if (me?._id) router.replace(profilePath(me))
    else if (isError || !me) router.replace("/auth?redirectToPath=%2Fprofile%2Fme")
  }, [me, isLoading, isError, router])

  return (
    <ProfileShell>
      <div className="flex h-[40vh] items-center justify-center">
        <Spinner />
      </div>
    </ProfileShell>
  )
}
