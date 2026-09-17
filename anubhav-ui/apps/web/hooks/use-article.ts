"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchArticle } from "@/lib/articles"

export function useArticle(id?: string) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticle(String(id)),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 2,
  })
}
