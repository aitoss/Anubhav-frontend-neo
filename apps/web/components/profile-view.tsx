"use client"

import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"

import { Footer } from "@/components/footer"
import { BackgroundDots } from "@/components/background-dots"
import { ArticleCard, formatArticleDate } from "@/components/article-card"
import { authorInitials } from "@/lib/articles"
import { PROFILE_PAGE_SIZE, type Profile } from "@/lib/users"
import type { Article } from "@/lib/articles"

function CollegeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
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
      <Footer />
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
      <div className="border-border bg-card/60 relative mx-auto flex max-w-5xl flex-col items-start gap-6 overflow-hidden rounded-3xl border p-6 md:flex-row md:items-center md:p-8">
        <div className="flex w-full justify-between">
          <Avatar className="size-26">
            {profile.logoUrl ? <AvatarImage src={profile.logoUrl} alt={profile.name} /> : null}
            <AvatarFallback className="text-3xl">{authorInitials(profile.name)}</AvatarFallback>
          </Avatar>
          {isOwner ? (
            <Button variant="outline" render={<Link href="/profile/edit" />}>
              Edit Profile
            </Button>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <h1 className="text-4xl font-medium tracking-tight">
            {profile.name || "Unnamed user"}
          </h1>

          <div className="text-muted-foreground flex items-center gap-1.5 pt-1 text-sm">
            <CollegeIcon />
            <span>{profile.college || "Army Institute Of Technology, Pune"}</span>
          </div>

          {profile.linkedinUrl ? (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex w-max items-center gap-1.5 text-sm text-[#0a66c2] hover:underline"
            >
              LinkedIn
            </a>
          ) : null}

          {profile.createdAt ? (
            <p className="text-muted-foreground pt-2 text-xs">
              Joined {formatArticleDate(profile.createdAt)}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-5xl pt-8">
        <h2 className="px-1 pb-4 text-2xl font-medium tracking-tight">
          {isOwner ? "My Articles" : "Articles"}
          <span className="text-muted-foreground ml-2 text-sm font-normal">({total})</span>
        </h2>

        <div className="bg-card flex flex-col gap-5 rounded-2xl p-4 shadow-lg md:p-6">
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
            <div className="flex flex-col gap-6">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} author={profile} />
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
