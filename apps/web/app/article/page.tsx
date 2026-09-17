"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { HugeiconsIcon } from "@hugeicons/react"
import { SearchIcon } from "@hugeicons/core-free-icons"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { cn } from "@workspace/ui/lib/utils"

import { Header } from "@/components/header"
import { useArticles } from "@/hooks/use-articles"
import { buildArticlePath } from "@/lib/article-url"
import { CompanyFilter } from "@/components/company-filter"

function formatDate(dateValue?: string) {
  if (!dateValue) return ""
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return ""
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

function readTime(description?: string) {
  const words = description
    ?.replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length ?? 0
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

function renderDescription(description?: string) {
  if (!description) return undefined

  return {
    __html: description,
  }
}

function ArticleListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="grid animate-pulse overflow-hidden md:grid-cols-[280px_minmax(0,1fr)] md:gap-2"
        >
          <div className="h-44 rounded-lg border border-border bg-muted/70" />
          <div className="flex flex-col gap-4 pt-3 md:pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="h-6 w-24 rounded-full bg-muted/70" />
              <div className="h-4 w-20 rounded bg-muted/70" />
              <div className="h-4 w-16 rounded bg-muted/70" />
            </div>
            <div className="h-8 w-4/5 rounded bg-muted/70" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted/70" />
              <div className="h-4 w-11/12 rounded bg-muted/70" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ArticleContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryFromUrl = searchParams.get("query") ?? ""
  const sortFromUrl = searchParams.get("sort") === "relevance" ? "relevance" : "date"

  const [searchValue, setSearchValue] = React.useState(queryFromUrl)
  const loadMoreRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    setSearchValue(queryFromUrl)
  }, [queryFromUrl])

  const sortBy = sortFromUrl

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
    refetch,
  } = useArticles({
    query: queryFromUrl,
    sortBy,
  })

  const articles = React.useMemo(
    () => data?.pages.flatMap((page) => page.articles) ?? [],
    [data?.pages],
  )
  const totalArticles = data?.pages[0]?.totalArticles ?? articles.length

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const nextQuery = searchValue.trim()
      const params = new URLSearchParams()

      if (nextQuery) {
        params.set("query", nextQuery)
      }

      if (sortBy) {
        params.set("sort", sortBy)
      }

      const nextUrl = params.toString() ? `/article?${params.toString()}` : "/article"
      router.push(nextUrl)
    },
    [router, searchValue, sortBy],
  )

  const handleSortChange = React.useCallback(
    (value: string | null) => {
      const nextSort = value === "relevance" ? "relevance" : "date"
      const params = new URLSearchParams()

      if (queryFromUrl) {
        params.set("query", queryFromUrl)
      }

      params.set("sort", nextSort)

      router.push(`/article?${params.toString()}`)
    },
    [queryFromUrl, router],
  )

  const handleLoadMore = React.useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return
    void fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  React.useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          handleLoadMore()
        }
      },
      { threshold: 1 },
    )

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [handleLoadMore, hasNextPage])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-2">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex w-full max-w-3xl gap-3">
            <div className="relative flex-1 max-w-sm">
              <HugeiconsIcon
                icon={SearchIcon}
                strokeWidth={2}
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search articles..."
                className="h-9 pl-9"
              />
            </div>
            <Button type="submit" size="lg">
              Search
            </Button>
          </form>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by</span>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="h-9 w-[180px]">
                  <SelectValue placeholder="Sort articles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="relevance">Relevance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="ml-auto text-sm text-muted-foreground">
              {queryFromUrl ? `${totalArticles} articles found` : "Latest articles"}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
          {isError ? (
            <div className="rounded-3xl border border-red-300 bg-red-50 p-6 text-center text-red-700">
              <div className="mb-2 font-semibold">Failed to load articles</div>
              <div className="text-sm mb-4">{String((error as any)?.message ?? error)}</div>
              <div>
                <button
                  onClick={() => void refetch()}
                  className="inline-flex items-center rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : isLoading && articles.length === 0 ? (
            <ArticleListSkeleton />
          ) : articles.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
              No articles found.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {articles.map((article) => (
                <article
                  key={article._id}
                  className="group grid overflow-hidden md:grid-cols-[280px_minmax(0,1fr)] space-x-2 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    void router.push(buildArticlePath({ id: article._id, title: article.title }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      void router.push(buildArticlePath({ id: article._id, title: article.title }))
                    }
                  }}
                >
                  <div className="relative h-44 rounded-lg overflow-hidden bg-muted md:aspect-auto md:min-h-fit">
                    <img
                      src={article.imageUrl || "/assets/images/VideoPage.png"}
                      alt={article.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70" />
                  </div>
                  <div className="flex h-full flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {article.companyName ? (
                        <span className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-medium text-foreground">
                          {article.companyName}
                        </span>
                      ) : null}
                      {article.createdAt ? <span>{formatDate(article.createdAt)}</span> : null}
                      <span>{readTime(article.description)}</span>
                    </div>
                    <h2 className="max-w-3xl text-2xl font-medium font-heading leading-tight tracking-tight sm:text-[1.7rem]">
                      {article.title}
                    </h2>
                    <div className="max-w-4xl line-clamp-2 space-y-3 text-sm leading-7 text-muted-foreground [&_br]:hidden [&_h1]:mb-2 [&_h1]:text-base [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_p]:m-0 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5"
                      dangerouslySetInnerHTML={renderDescription(article.description)}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}

          {hasNextPage && articles.length > 0 ? (
            <div ref={loadMoreRef} className="py-10 text-center text-sm text-muted-foreground">
              {isFetchingNextPage ? "Loading more articles..." : "Scroll to load more"}
            </div>
          ) : null}
          </div>

          <div className="hidden lg:block">
            <CompanyFilter
              activeCompany={queryFromUrl}
              onSelect={(company) => {
                const params = new URLSearchParams()
                params.set("query", company)
                if (sortFromUrl !== "date") params.set("sort", sortFromUrl)
                router.push(`/article?${params.toString()}`)
              }}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default function ArticlePage() {
  return (
    <React.Suspense fallback={<ArticleListSkeleton />}>
      <ArticleContent />
    </React.Suspense>
  )
}
