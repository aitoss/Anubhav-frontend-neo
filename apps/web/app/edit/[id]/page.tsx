"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { Spinner } from "@workspace/ui/components/spinner"

import { ArticleForm } from "@/components/create/article-form"
import { useMe } from "@/hooks/use-profile"
import { fetchBlog } from "@/lib/blogs"
import { extractArticleIdFromRoute } from "@/lib/article-url"

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: routeId } = React.use(params)
  const id = extractArticleIdFromRoute(routeId)
  const router = useRouter()
  const { data: me, isLoading: loadingMe, isError: meError } = useMe()

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchBlog(id),
    enabled: Boolean(id),
  })

  React.useEffect(() => {
    if (!loadingMe && (meError || !me)) {
      router.replace(`/log-in?redirectToPath=${encodeURIComponent(`/edit/${routeId}`)}`)
    }
  }, [loadingMe, meError, me, router, routeId])

  if (loadingMe || isLoading || !me) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return <ArticleForm mode="edit" articleId={id} initialArticle={article ?? null} />
}
