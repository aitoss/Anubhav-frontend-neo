"use client"

import * as React from "react"
import Link from "next/link"

import {
  AcademicCapIcon,
  BookmarkIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/solid"

import { Button } from "@workspace/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs"

import { ArticleCard, formatArticleDate } from "@/components/article-card"
import { LinkedInIcon } from "@/components/footer"
import { ArticleOwnerActions } from "@/components/article-owner-actions"
import { UserAvatar } from "@/components/user-avatar"
import { useReactedArticles } from "@/hooks/use-profile"
import { PROFILE_PAGE_SIZE, type Profile } from "@/lib/users"
import type { Article } from "@/lib/articles"

// Mirrors the real header and list so the page does not jump when data lands.
export function ProfileSkeleton() {
  return (
    <>
      <header className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-start sm:gap-14">
        <Skeleton className="size-24 shrink-0 rounded-full sm:size-40" />

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <Skeleton className="h-8 w-52" />
          <div className="flex gap-8">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-9 w-full rounded-lg sm:w-40" />
        </div>
      </header>

      <div className="border-border mx-auto mt-10 max-w-5xl border-t pt-8">
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
      <main className="relative mx-auto h-full w-full max-w-[1440px] px-4 pt-24 pb-16 md:px-6 lg:px-14">
        {children}
      </main>
    </>
  )
}

type Tab = "mine" | "save" | "like"

const EMPTY_COPY: Record<
  Tab,
  { title: (isOwner: boolean) => string; description: (isOwner: boolean) => string }
> = {
  mine: {
    title: (isOwner) =>
      isOwner ? "You haven't published anything yet" : "No articles yet",
    description: (isOwner) =>
      isOwner
        ? "Share an interview experience to help juniors preparing for the same rounds."
        : "This author hasn't published any articles so far.",
  },
  save: {
    title: () => "Nothing saved yet",
    description: () =>
      "Bookmark an article and it will wait for you here, on any device.",
  },
  like: {
    title: () => "Nothing liked yet",
    description: () => "Articles you like are collected here.",
  },
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
  const [tab, setTab] = React.useState<Tab>("mine")
  const [reactionPage, setReactionPage] = React.useState(1)

  // Saved and liked are private, so they are only ever fetched for yourself.
  const reacted = useReactedArticles(
    tab === "like" ? "like" : "save",
    reactionPage,
    isOwner && tab !== "mine",
  )

  const onMine = tab === "mine"
  const shownArticles = onMine ? articles : (reacted.data?.articles ?? [])
  const shownTotal = onMine ? total : (reacted.data?.total ?? 0)
  const shownPage = onMine ? page : reactionPage
  const setShownPage = onMine ? onPageChange : setReactionPage
  const isLoadingList = onMine ? Boolean(isLoadingArticles) : reacted.isLoading

  const totalPages = Math.max(1, Math.ceil(shownTotal / PROFILE_PAGE_SIZE))

  return (
    <ProfileShell>
      <header className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-start sm:gap-14">
        <UserAvatar
          name={profile.name}
          src={profile.logoUrl}
          size={160}
          className="size-24 shrink-0 sm:size-40"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <div className="flex items-start justify-between gap-3">
            <h1 className="truncate text-2xl font-medium tracking-tight sm:text-3xl">
              {profile.name || "Unnamed user"}
            </h1>

            {isOwner ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Profile actions"
                      className="shrink-0"
                    />
                  }
                >
                  <EllipsisHorizontalIcon className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem render={<Link href="/profile/edit" />}>
                    <UserIcon className="size-4" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/create" />}>
                    <PencilSquareIcon className="size-4" />
                    Write Article
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>

          {/* No followers or following to count, so articles carries the row. */}
          <dl className="flex flex-wrap items-baseline gap-x-8 gap-y-2 text-sm">
            <div className="flex items-baseline gap-1.5">
              <dt className="sr-only">Articles</dt>
              <dd className="font-medium">{total}</dd>
              <span className="text-muted-foreground">
                {total === 1 ? "article" : "articles"}
              </span>
            </div>
            {profile.createdAt ? (
              <div className="flex items-baseline gap-1.5">
                <dt className="text-muted-foreground">Joined</dt>
                <dd className="font-medium">{formatArticleDate(profile.createdAt)}</dd>
              </div>
            ) : null}
          </dl>

          <div className="flex flex-col gap-1 text-sm">
            <p className="text-muted-foreground flex items-center gap-1.5">
              <AcademicCapIcon className="size-4 shrink-0" />
              <span className="truncate">
                {profile.college || "Army Institute Of Technology, Pune"}
              </span>
            </p>
            {profile.linkedinUrl ? (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-fit items-center gap-1.5 font-medium hover:underline"
              >
                <LinkedInIcon className="size-4 shrink-0" />
                <span className="truncate">LinkedIn</span>
              </a>
            ) : null}
          </div>

        </div>
      </header>

      <section className="border-border mx-auto mt-10 max-w-5xl border-t pt-6">
        {isOwner ? (
          <Tabs
            value={tab}
            onValueChange={(value) => {
              setTab(value as Tab)
              // Page numbers do not carry across lists of different lengths.
              setReactionPage(1)
              onPageChange(1)
            }}
            className="pb-4"
          >
            <TabsList variant="line">
              <TabsTrigger value="mine">My Articles</TabsTrigger>
              <TabsTrigger value="save">Saved</TabsTrigger>
              <TabsTrigger value="like">Liked</TabsTrigger>
            </TabsList>
          </Tabs>
        ) : (
          <h2 className="flex items-baseline gap-2 px-1 pb-4 text-2xl font-medium tracking-tight">
            Articles
            <span className="text-muted-foreground text-base font-normal">{total}</span>
          </h2>
        )}

        <div className="flex flex-col gap-5">
          {isLoadingList ? (
            <div className="flex flex-col gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-44 w-full rounded-lg" />
              ))}
            </div>
          ) : shownArticles.length === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  {tab === "save" ? (
                    <BookmarkIcon />
                  ) : tab === "like" ? (
                    <HeartIcon />
                  ) : (
                    <DocumentTextIcon />
                  )}
                </EmptyMedia>
                <EmptyTitle>{EMPTY_COPY[tab].title(isOwner)}</EmptyTitle>
                <EmptyDescription>
                  {EMPTY_COPY[tab].description(isOwner)}
                </EmptyDescription>
              </EmptyHeader>
              {isOwner && tab === "mine" ? (
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
              {shownArticles.map((article) => (
                <div key={article._id} className="py-6 first:pt-0 last:pb-0">
                  <div className="relative">
                    {/* Saved and liked articles carry their own author. */}
                    <ArticleCard
                      article={article}
                      author={tab === "mine" ? profile : undefined}
                    />
                    {isOwner && tab === "mine" ? (
                      <ArticleOwnerActions
                        articleId={article._id}
                        title={article.title}
                        className="absolute top-0 right-0"
                      />
                    ) : null}
                  </div>
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
              disabled={shownPage <= 1}
              onClick={() => setShownPage(shownPage - 1)}
            >
              Previous
            </Button>
            <span className="text-muted-foreground text-sm">
              Page {shownPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={shownPage >= totalPages}
              onClick={() => setShownPage(shownPage + 1)}
            >
              Next
            </Button>
          </div>
        ) : null}
      </section>
    </ProfileShell>
  )
}
