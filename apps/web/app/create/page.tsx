"use client"

import { ArticleForm } from "@/components/create/article-form"
import { RequireSession } from "@/components/require-session"

export default function CreateArticlePage() {
  return (
    <RequireSession>
      <ArticleForm mode="create" />
    </RequireSession>
  )
}
