"use client"

import Link from "next/link"

import { AcademicCapIcon, DocumentTextIcon, PencilSquareIcon } from "@heroicons/react/24/solid"

import { Button } from "@workspace/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { Skeleton } from "@workspace/ui/components/skeleton"

import { BackgroundDots } from "@/components/background-dots"
import { ArticleCard, formatArticleDate } from "@/components/article-card"
import { UserAvatar } from "@/components/user-avatar"
import { PROFILE_PAGE_SIZE, type Profile } from "@/lib/users"
import type { Article } from "@/lib/articles"

// Mirrors the real header and list so the page does not jump when data lands.
export function ProfileSkeleton() {
  return (
    <>
      <div className="border-border bg-card/60 mx-auto max-w-5xl overflow-hidden rounded-3xl border p-6 md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-center gap-5">
            <Skeleton className="size-20 shrink-0 rounded-full sm:size-24" />
            <div className="flex min-w-0 flex-col gap-2.5">
              <Skeleton className="h-9 w-48" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-9 w-28 shrink-0 self-start rounded-md" />
        </div>
      </div>

      <div className="mx-auto max-w-5xl pt-8">
        <Skeleton className="mb-6 h-7 w-40" />
        <div className="divide-border flex flex-col divide-y">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="grid gap-4 py-6 first:pt-0 last:pb-0 md:grid-cols-[280px_minmax(0,1fr)]"
            >
              <Skeleton className="h-44 rounded-lg" />
              <div className="flex flex-col gap-3">
                <Skeleton className="h-7 w-4/5" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export function ProfileShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <BackgroundDots dotSize={1.8} gap={15} fade /> */}
      <main className="relative mx-auto h-full w-full max-w-[1440px] px-4 pt-24 pb-16 md:px-6 lg:px-14">
        {children}
      </main>
    </>
  )
}

type ProfileViewProps = {
  profile: Profile
  articles: Article[]
  total: number
  page: number
  onPageChange: (page: number) => void
  isOwner: boolean
  isLoadingArticles?: boolean
}

export function ProfileView({
  profile,
  articles,
  total,
  page,
  onPageChange,
  isOwner,
  isLoadingArticles,
}: ProfileViewProps) {
  const totalPages = Math.max(1, Math.ceil(total / PROFILE_PAGE_SIZE))

  return (
    <ProfileShell>
      <div className="border-border bg-card/60 mx-auto max-w-5xl overflow-hidden rounded-3xl border p-6 md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-center gap-5">
<UserAvatar
              name={profile.name}
              src={profile.logoUrl}
              size={96}
              className="size-20 sm:size-24"
            />

            <div className="flex min-w-0 flex-col gap-1.5">
              <h1 className="truncate text-3xl font-medium tracking-tight sm:text-4xl">
                {profile.name || "Unnamed user"}
              </h1>

              <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <AcademicCapIcon className="size-4 shrink-0" />
                <span className="truncate">
                  {profile.college || "Army Institute Of Technology, Pune"}
                </span>
              </p>

              <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                {profile.linkedinUrl ? (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground font-medium hover:underline"
                  >
                    LinkedIn
                  </a>
                ) : null}
                {profile.createdAt ? (
                  <span>Joined {formatArticleDate(profile.createdAt)}</span>
                ) : null}
              </div>
            </div>
          </div>

          {isOwner ? (
            <Button
              variant="outline"
              className="shrink-0 self-start"
              render={<Link href="/profile/edit" />}
            >
              Edit Profile
            </Button>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-5xl pt-8">
        <h2 className="flex items-baseline gap-2 px-1 pb-4 text-2xl font-medium tracking-tight">
          {isOwner ? "My Articles" : "Articles"}
          <span className="text-muted-foreground text-base font-normal">{total}</span>
        </h2>

        <div className="flex flex-col gap-5">
          {isLoadingArticles ? (
            <div className="flex flex-col gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-44 w-full rounded-lg" />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <DocumentTextIcon />
                </EmptyMedia>
                <EmptyTitle>
                  {isOwner ? "You haven't published anything yet" : "No articles yet"}
                </EmptyTitle>
                <EmptyDescription>
                  {isOwner
                    ? "Share an interview experience to help juniors preparing for the same rounds."
                    : "This author hasn't published any articles so far."}
                </EmptyDescription>
              </EmptyHeader>
              {isOwner ? (
                <EmptyContent>
                  <Button render={<Link href="/create" />}>
                    <PencilSquareIcon className="size-4" />
                    Write your first article
                  </Button>
                </EmptyContent>
              ) : null}
            </Empty>
          ) : (
            <div className="divide-border flex flex-col divide-y">
              {articles.map((article) => (
                <div key={article._id} className="py-6 first:pt-0 last:pb-0">
                  <ArticleCard article={article} author={profile} />
                </div>
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 ? (
          <div className="flex items-center justify-center gap-3 pt-6">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              Previous
            </Button>
            <span className="text-muted-foreground text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        ) : null}
      </div>
    </ProfileShell>
  )
}
