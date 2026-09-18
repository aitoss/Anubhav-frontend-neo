"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Skeleton } from "@workspace/ui/components/skeleton"

import { ArticleActions } from "@/components/article-actions"
import { formatArticleDate, readTime } from "@/components/article-card"
import { useArticle } from "@/hooks/use-article"
import { useSimilarArticles } from "@/hooks/use-similar-articles"
import { articleTagList, authorInitials, getAuthor } from "@/lib/articles"
import { buildArticlePath, extractArticleIdFromRoute } from "@/lib/article-url"
import { profilePath } from "@/lib/users"

function ArticleDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-11 w-3/4" />
      <div className="flex items-center gap-3">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-72 w-full rounded-xl" />
      <div className="flex flex-col gap-3">
        {["100%", "95%", "88%", "99%", "72%"].map((width, index) => (
          <Skeleton key={index} className="h-4" style={{ width }} />
        ))}
      </div>
    </div>
  )
}

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: slugParam } = React.use(params)
  const id = extractArticleIdFromRoute(slugParam)
  const router = useRouter()

  const { data: article, isLoading, error } = useArticle(id)
  const tags = articleTagList(article)
  const { data: similarArticles, isLoading: isSimilarLoading } = useSimilarArticles({
    q: article?.title,
    company: article?.companyName,
    tags,
  })

  const author = article ? getAuthor(article) : null

  return (
    <main className="bg-background text-foreground min-h-screen">

      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 -ml-2 inline-flex items-center gap-2"
          onClick={() => router.back()}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
          Back
        </Button>

        {isLoading ? (
          <ArticleDetailSkeleton />
        ) : error ? (
          <div className="border-destructive/40 bg-destructive/5 text-destructive rounded-xl border p-6">
            <p className="font-medium">Failed to load this article</p>
            <p className="mt-1 text-sm">{(error as any)?.message ?? String(error)}</p>
          </div>
        ) : !article ? (
          <div className="border-border text-muted-foreground rounded-xl border border-dashed p-10 text-center">
            No article found.
          </div>
        ) : (
          <article>
            {article.companyName ? (
              <p className="text-muted-foreground mb-3 text-sm font-semibold tracking-[0.15em] uppercase">
                {article.companyName}
              </p>
            ) : null}

            <h1 className="font-heading text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
              {article.title}
            </h1>

            <div className="border-border mt-6 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
              <div className="flex items-center gap-3">
                <Avatar className="size-9">
                  {author?.logoUrl ? (
                    <AvatarImage src={author.logoUrl} alt={author.name} />
                  ) : null}
                  <AvatarFallback className="text-xs">
                    {authorInitials(author?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  {author?._id ? (
                    <Link
                      href={profilePath({ _id: author._id, name: author.name })}
                      className="font-medium hover:underline"
                    >
                      {author.name}
                    </Link>
                  ) : (
                    <span className="font-medium">{author?.name}</span>
                  )}
                  <p className="text-muted-foreground text-xs">
                    {readTime(article.description)}
                    {article.createdAt ? ` • ${formatArticleDate(article.createdAt)}` : ""}
                  </p>
                </div>
              </div>

              <ArticleActions id={article._id} />
            </div>

            {article.imageUrl ? (
              <div className="border-border bg-muted mt-8 overflow-hidden rounded-xl border">
                <img
                  src={article.imageUrl}
                  alt={article.title || "Article image"}
                  className="h-64 w-full object-cover sm:h-80"
                />
              </div>
            ) : null}

            <div
              className="article-prose mt-8"
              dangerouslySetInnerHTML={{ __html: article.description ?? "" }}
            />

            {tags.length > 0 ? (
              <div className="mt-10 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link key={tag} href={`/article?query=${encodeURIComponent(tag)}`}>
                    <Badge variant="secondary" className="cursor-pointer">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            ) : null}

            <section className="border-border mt-12 border-t pt-8">
              <h2 className="font-heading mb-4 text-xl font-medium">Similar articles</h2>
              {isSimilarLoading ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-20 rounded-lg" />
                  ))}
                </div>
              ) : (similarArticles?.length ?? 0) === 0 ? (
                <p className="text-muted-foreground text-sm">No similar articles found.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {similarArticles
                    ?.filter((item) => item?._id && item._id !== article._id)
                    .slice(0, 6)
                    .map((item) => (
                      <Link
                        key={item._id}
                        href={buildArticlePath({ id: item._id, title: item.title })}
                        className="border-border hover:bg-muted/50 rounded-lg border p-4 transition-colors"
                      >
                        <div className="mb-2 line-clamp-2 font-medium">{item.title}</div>
                        <div className="text-muted-foreground text-xs">
                          {item.companyName || "Unknown company"}
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </section>
          </article>
        )}
      </div>

    </main>
  )
}
