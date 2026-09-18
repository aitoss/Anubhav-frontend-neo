"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import { Spinner } from "@workspace/ui/components/spinner"

import { ArticleForm } from "@/components/create/article-form"
import { RequireSession } from "@/components/require-session"
import { fetchBlog } from "@/lib/blogs"
import { extractArticleIdFromRoute } from "@/lib/article-url"

function EditArticle({ id }: { id: string }) {
  const { data: article, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchBlog(id),
    enabled: Boolean(id),
  })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return <ArticleForm mode="edit" articleId={id} initialArticle={article ?? null} />
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
