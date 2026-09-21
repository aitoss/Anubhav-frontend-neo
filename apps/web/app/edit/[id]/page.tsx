"use client"

import * as React from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

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

import { ArticleForm } from "@/components/create/article-form"
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"

import { RequireSession } from "@/components/require-session"
import { fetchOwnedBlog } from "@/lib/blogs"
import { extractArticleIdFromRoute } from "@/lib/article-url"

// Mirrors step 1 of ArticleForm so the page does not jump when the article
// lands.
function ArticleFormSkeleton() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 pt-32 pb-16">
      <div className="flex items-baseline justify-between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-20" />
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {[
          "h-10 w-full",
          "h-10 w-48",
          "h-10 w-full",
          "h-10 w-full",
        ].map((size, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className={size} />
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-36 w-full rounded-lg" />
        </div>

        <Skeleton className="h-10 w-20 self-end" />
      </div>
    </main>
  )
}

function EditArticle({ id }: { id: string }) {
  const { data: article, isLoading, isError, error } = useQuery({
    queryKey: ["owned-article", id],
    queryFn: () => fetchOwnedBlog(id),
    enabled: Boolean(id),
  })

  if (isLoading) return <ArticleFormSkeleton />

  // Rendering the blank form here would let a save wipe the real article, so
  // the failure has to stop before the form does.
  if (isError || !article) {
    const status = (error as any)?.response?.status
    return (
      <main className="mx-auto w-full max-w-2xl px-4 pt-32 pb-16">
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ExclamationTriangleIcon />
            </EmptyMedia>
            <EmptyTitle>Cannot open this article</EmptyTitle>
            <EmptyDescription>
              {status === 403
                ? "This article belongs to someone else."
                : status === 404
                  ? "This article no longer exists."
                  : "We could not load the article. Please try again."}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" render={<Link href="/profile/me" />}>
              Back to my articles
            </Button>
          </EmptyContent>
        </Empty>
      </main>
    )
  }

  return <ArticleForm mode="edit" articleId={id} initialArticle={article} />
}

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: routeId } = React.use(params)
  const id = extractArticleIdFromRoute(routeId)

  return (
    <RequireSession fallback={<ArticleFormSkeleton />}>
      <EditArticle id={id} />
    </RequireSession>
  )
}
