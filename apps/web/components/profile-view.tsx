"use client"

import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"

import { BackgroundDots } from "@/components/background-dots"
import { ArticleCard, formatArticleDate } from "@/components/article-card"
import { authorInitials } from "@/lib/articles"
import { PROFILE_PAGE_SIZE, type Profile } from "@/lib/users"
import type { Article } from "@/lib/articles"

function CollegeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="size-4 shrink-0">
      <path d="M22 9 12 4 2 9l10 5 10-5Z" strokeLinejoin="round" />
      <path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" strokeLinejoin="round" />
      <path d="M22 9v6" strokeLinecap="round" />
    </svg>
  )
}

export function ProfileShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackgroundDots dotSize={1.8} gap={15} fade />
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
            <Avatar className="size-20 shrink-0 sm:size-24">
              {profile.logoUrl ? <AvatarImage src={profile.logoUrl} alt={profile.name} /> : null}
              <AvatarFallback className="text-2xl">{authorInitials(profile.name)}</AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-col gap-1.5">
              <h1 className="truncate text-3xl font-medium tracking-tight sm:text-4xl">
                {profile.name || "Unnamed user"}
              </h1>

              <p className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <CollegeIcon />
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
            <div className="border-border flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-12 text-center">
              <p className="text-muted-foreground">
                {isOwner
                  ? "You haven't published any articles yet."
                  : "No articles published yet."}
              </p>
              {isOwner ? (
                <Button render={<Link href="/create" />}>Write your first article</Button>
              ) : null}
            </div>
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
