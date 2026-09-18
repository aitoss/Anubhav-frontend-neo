"use client"

import { useQuery } from "@tanstack/react-query"

import { fetchSimilarBlogs } from "@/lib/articles"

type UseSimilarArticlesOptions = {
  q?: string
  company?: string
  tags?: string[]
}

export function useSimilarArticles({ q, company, tags }: UseSimilarArticlesOptions) {
  return useQuery({
    queryKey: ["similar-articles", q, company, (tags ?? []).join(",")],
    queryFn: () => fetchSimilarBlogs({ q: String(q), company, tags }),
    enabled: Boolean(q),
    staleTime: 1000 * 60 * 2,
  })
}
