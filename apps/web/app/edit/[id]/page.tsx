"use client"

import * as React from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@workspace/ui/components/button"

import { ArticleForm } from "@/components/create/article-form"
import { ArticleFormSkeleton } from "@/components/create/article-form-skeleton"
import { ErrorState } from "@/components/error-state"
import { RequireSession } from "@/components/require-session"
import { fetchOwnedBlog } from "@/lib/blogs"
import { extractArticleIdFromRoute } from "@/lib/article-url"

const LOAD_FAILURE: Record<number, string> = {
  403: "This article belongs to someone else.",
  404: "This article no longer exists.",
}

function EditArticle({ id }: { id: string }) {
  const {
    data: article,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["owned-article", id],
    queryFn: () => fetchOwnedBlog(id),
    enabled: Boolean(id),
  })

  if (isLoading) return <ArticleFormSkeleton />

  // Rendering the blank form here would let a save wipe the real article, so
  // the failure has to stop before the form does.
  if (isError || !article) {
    return (
      <main className="mx-auto w-full max-w-2xl px-4 pt-32 pb-16">
        <ErrorState
          title="Cannot open this article"
          description={
            LOAD_FAILURE[(error as any)?.response?.status] ??
            "We could not load the article. Please try again."
          }
          action={
            <Button variant="outline" render={<Link href="/profile/me" />}>
              Back to my articles
            </Button>
          }
        />
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
