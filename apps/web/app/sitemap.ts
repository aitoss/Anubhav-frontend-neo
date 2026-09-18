import type { MetadataRoute } from "next"

import { buildArticlePath } from "@/lib/article-url"
import { BACKEND_URL } from "@/lib/backend"
import { SITE_URL } from "@/lib/site"
import type { Article } from "@/lib/articles"

export const revalidate = 3600

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/article", priority: 0.9, changeFrequency: "daily" },
  { path: "/videos", priority: 0.7, changeFrequency: "monthly" },
  { path: "/story", priority: 0.6, changeFrequency: "yearly" },
  { path: "/team", priority: 0.5, changeFrequency: "monthly" },
  { path: "/guidelines", priority: 0.5, changeFrequency: "yearly" },
  { path: "/request", priority: 0.4, changeFrequency: "yearly" },
  { path: "/legal/terms", priority: 0.2, changeFrequency: "yearly" },
]

// Walk the paginated list rather than guessing a total; capped so a backend
// that always reports hasMore cannot spin forever.
async function fetchAllArticles(): Promise<Article[]> {
  const articles: Article[] = []
  const MAX_PAGES = 40

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const response = await fetch(`${BACKEND_URL}/blogs?page=${page}&sort=date`, {
      next: { revalidate: 3600 },
    })
    if (!response.ok) break

    const payload = (await response.json()) as { articles?: Article[]; hasMore?: boolean }
    const batch = payload.articles ?? []
    articles.push(...batch)

    if (batch.length === 0 || !payload.hasMore) break
  }

  return articles
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  let articleEntries: MetadataRoute.Sitemap = []
  try {
    const articles = await fetchAllArticles()
    articleEntries = articles
      .filter((article) => article._id && article.title)
      .map((article) => ({
        url: `${SITE_URL}${buildArticlePath({ id: article._id, title: article.title })}`,
        lastModified: article.createdAt ? new Date(article.createdAt) : now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
  } catch {
    // A backend hiccup should still leave a valid sitemap of the static routes.
  }

  return [...staticEntries, ...articleEntries]
}
