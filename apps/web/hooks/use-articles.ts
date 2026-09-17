"use client"

import { useInfiniteQuery } from "@tanstack/react-query"

import {
  fetchArticlesPage,
  type ArticleSort,
} from "@/lib/articles"

type UseArticlesOptions = {
  query: string
  sortBy: ArticleSort
}

export function useArticles({ query, sortBy }: UseArticlesOptions) {
  return useInfiniteQuery({
    queryKey: ["articles", query, sortBy],
    queryFn: ({ pageParam = 1 }) => fetchArticlesPage(query, sortBy, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMore) {
        return allPages.length + 1
      }

      if (lastPage.articles.length === 10) {
        return allPages.length + 1
      }

      return undefined
    },
    initialPageParam: 1,
  })
}
