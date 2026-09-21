"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { ProfileShell, ProfileView } from "@/components/profile-view"
import { UserCircleIcon } from "@heroicons/react/24/solid"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { Spinner } from "@workspace/ui/components/spinner"
import { useMe, useProfile, useProfileArticles } from "@/hooks/use-profile"
import { profilePath, slugifyName } from "@/lib/users"

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string; slug?: string[] }>
}) {
  const { userId, slug } = React.use(params)
  const router = useRouter()
  const [page, setPage] = React.useState(1)

  const { data: me } = useMe()
  const isOwner = Boolean(me?._id && me._id === userId)

  const { data: profile, isLoading, isError } = useProfile(userId)
  const { data: articleData, isLoading: isLoadingArticles } = useProfileArticles(
    userId,
    page,
    isOwner,
  )

  // Canonicalise the slug once the loaded profile actually matches the URL id,
  // otherwise a stale profile would bounce us back to the previous user.
  React.useEffect(() => {
    if (!profile?._id || profile._id !== userId || !profile.name) return
    const wanted = slugifyName(profile.name)
    if (wanted && slug?.[0] !== wanted) router.replace(profilePath(profile))
  }, [profile, userId, slug, router])

  if (isLoading) {
    return (
      <ProfileShell>
        <div className="flex h-[40vh] items-center justify-center">
          <Spinner />
        </div>
      </ProfileShell>
    )
  }

  if (isError || !profile) {
    return (
      <ProfileShell>
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UserCircleIcon />
            </EmptyMedia>
            <EmptyTitle>Profile not found</EmptyTitle>
            <EmptyDescription>
              This account may have been removed, or the link is wrong.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/" className="text-muted-foreground text-sm underline">
              Back to home
            </Link>
          </EmptyContent>
        </Empty>
      </ProfileShell>
    )
  }

  return (
    <ProfileView
      profile={profile}
      articles={articleData?.articles ?? []}
      total={articleData?.total ?? 0}
      page={page}
      onPageChange={setPage}
      isOwner={isOwner}
      isLoadingArticles={isLoadingArticles}
    />
  )
}
