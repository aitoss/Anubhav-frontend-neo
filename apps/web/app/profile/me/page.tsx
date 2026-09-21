"use client"

import * as React from "react"

import { ProfileShell, ProfileSkeleton, ProfileView } from "@/components/profile-view"
import { RequireSession } from "@/components/require-session"
import { useMe, useProfileArticles } from "@/hooks/use-profile"

// Renders your profile in place rather than bouncing to /u/:id/:slug. The old
// hand-off meant a spinner, a client-side redirect, then the destination's own
// loading pass — three states to reach your own page.
function MyProfile() {
  const [page, setPage] = React.useState(1)
  const { data: me, isLoading } = useMe()
  const { data: articleData, isLoading: isLoadingArticles } = useProfileArticles(
    me?._id,
    page,
    true,
  )

  if (isLoading || !me) {
    return (
      <ProfileShell>
        <ProfileSkeleton />
      </ProfileShell>
    )
  }

  return (
    <ProfileView
      profile={me}
      articles={articleData?.articles ?? []}
      total={articleData?.total ?? 0}
      page={page}
      onPageChange={setPage}
      isOwner
      isLoadingArticles={isLoadingArticles}
    />
  )
}

export default function MyProfilePage() {
  return (
    <RequireSession
      fallback={
        <ProfileShell>
          <ProfileSkeleton />
        </ProfileShell>
      }
    >
      <MyProfile />
    </RequireSession>
  )
}
