import type { Metadata } from "next"

import { extractArticleIdFromRoute } from "@/lib/article-url"
import { BACKEND_URL } from "@/lib/backend"
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site"
import type { Article } from "@/lib/articles"

type Props = { params: Promise<{ id: string }> }

// Server-side so crawlers and link unfurlers get the real article details;
// the page itself is a client component and cannot export metadata.
export async function fetchArticleForMetadata(id: string): Promise<Article | null> {
  try {
    const response = await fetch(`${BACKEND_URL}/blog/${id}`, {
      next: { revalidate: 3600 },
    })
    if (!response.ok) return null
    const payload = (await response.json()) as { article?: Article } & Partial<Article>
    return payload.article ?? (payload._id ? (payload as Article) : null)
  } catch {
    return null
  }
}

function plainText(html?: string, limit = 200) {
  if (!html) return ""
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slugParam } = await params
  const article = await fetchArticleForMetadata(extractArticleIdFromRoute(slugParam))

  if (!article?.title) {
    return { title: "Article", description: SITE_DESCRIPTION }
  }

  const title = article.companyName
    ? `${article.title} · ${article.companyName}`
    : article.title
  const description = plainText(article.description) || SITE_DESCRIPTION
  const canonical = `/article/${slugParam}`

  return {
    title: article.title,
    description,
    keywords: article.articleTags ?? article.tags,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      publishedTime: article.createdAt,
      tags: article.articleTags ?? article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
