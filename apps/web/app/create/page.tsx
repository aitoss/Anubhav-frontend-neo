"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Spinner } from "@workspace/ui/components/spinner"

import { ArticleForm } from "@/components/create/article-form"
import { useMe } from "@/hooks/use-profile"

export default function CreateArticlePage() {
  const router = useRouter()
  const { data: me, isLoading, isError } = useMe()

  React.useEffect(() => {
    if (!isLoading && (isError || !me)) {
      router.replace("/log-in?redirectToPath=%2Fcreate")
    }
  }, [isLoading, isError, me, router])

  if (isLoading || !me) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return <ArticleForm mode="create" />
}
