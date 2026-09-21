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
import { Spinner } from "@workspace/ui/components/spinner"

import { ArticleForm } from "@/components/create/article-form"
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"

import { RequireSession } from "@/components/require-session"
import { fetchOwnedBlog } from "@/lib/blogs"
import { extractArticleIdFromRoute } from "@/lib/article-url"

function EditArticle({ id }: { id: string }) {
  const { data: article, isLoading, isError, error } = useQuery({
    queryKey: ["owned-article", id],
    queryFn: () => fetchOwnedBlog(id),
    enabled: Boolean(id),
  })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

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
    <RequireSession>
      <EditArticle id={id} />
    </RequireSession>
  )
}
