"use client"

import { useInfiniteQuery } from "@tanstack/react-query"

import {
  EMPTY_FILTERS,
  fetchArticlesPage,
  type ArticleFilters,
  type ArticleSort,
} from "@/lib/articles"

type UseArticlesOptions = {
  query: string
  sortBy: ArticleSort
  filters?: ArticleFilters
}

export function useArticles({
  query,
  sortBy,
  filters = EMPTY_FILTERS,
}: UseArticlesOptions) {
  return useInfiniteQuery({
    queryKey: ["articles", query, sortBy, filters.roles, filters.years],
    queryFn: ({ pageParam = 1 }) =>
      fetchArticlesPage(query, sortBy, pageParam, filters),
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
