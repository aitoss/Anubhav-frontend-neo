"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@workspace/ui/components/button"

import { Header } from "@/components/header"
import { useArticle } from "@/hooks/use-article"
import { useSimilarArticles } from "@/hooks/use-similar-articles"
import { buildArticlePath, extractArticleIdFromRoute } from "@/lib/article-url"

function ArticleDetailSkeleton() {
    return (
        <article className="animate-pulse">
            <div className="mb-4 h-10 w-3/4 rounded bg-muted/70" />
            <div className="mb-6 flex items-center gap-2">
                <div className="h-4 w-24 rounded bg-muted/70" />
                <div className="h-4 w-32 rounded bg-muted/70" />
            </div>

            <div className="mb-6 h-64 w-full overflow-hidden rounded-xl border border-border bg-muted/70 sm:h-80" />

            <div className="space-y-3">
                <div className="h-4 w-full rounded bg-muted/70" />
                <div className="h-4 w-11/12 rounded bg-muted/70" />
                <div className="h-4 w-10/12 rounded bg-muted/70" />
                <div className="h-4 w-full rounded bg-muted/70" />
                <div className="h-4 w-9/12 rounded bg-muted/70" />
            </div>

            <section className="mt-12 border-t border-border pt-8">
                <div className="mb-4 h-7 w-40 rounded bg-muted/70" />
                <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="rounded-lg border border-border p-4">
                            <div className="mb-2 h-5 w-11/12 rounded bg-muted/70" />
                            <div className="h-4 w-1/2 rounded bg-muted/70" />
                        </div>
                    ))}
                </div>
            </section>
        </article>
    )
}

export default function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: slugParam } = React.use(params)
    const id = extractArticleIdFromRoute(slugParam)
    const router = useRouter()
    const { data: article, isLoading, error } = useArticle(id)
    const { data: similarArticles, isLoading: isSimilarLoading } = useSimilarArticles({
        q: article?.title,
        company: article?.companyName,
        tags: article?.tags,
    })

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Header />
            <div className="mx-auto relative max-w-4xl px-4 py-10">
                <Button
                    variant="ghost"
                    className="absolute -left-20 top-10 inline-flex items-center gap-2"
                    onClick={() => router.back()}
                >
                    <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
                    Back
                </Button>

                {isLoading ? (
                    <ArticleDetailSkeleton />
                ) : error ? (
                    <div className="text-red-600">Error: {(error as any)?.message ?? String(error)}</div>
                ) : !article ? (
                    <div>No article found.</div>
                ) : (
                    <article>
                        <h1 className="mb-4 text-3xl font-heading">{article.title}</h1>
                        <div className="mb-6 text-sm text-muted-foreground">
                            {article.companyName ? <span className="mr-2">{article.companyName}</span> : null}
                            {article.createdAt ? <span>{new Date(article.createdAt).toDateString()}</span> : null}
                        </div>
                        <div className="mb-6 overflow-hidden rounded-xl border border-border bg-muted">
                            <img
                                src={article.imageUrl || "/assets/images/VideoPage.png"}
                                alt={article.title || "Article image"}
                                className="h-64 w-full object-cover sm:h-80"
                            />
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: article.description ?? "" }} />

                        <section className="mt-12 border-t border-border pt-8">
                            <h2 className="mb-4 text-xl font-heading">Similar articles</h2>
                            {isSimilarLoading ? (
                                <div className="text-sm text-muted-foreground">Loading similar articles…</div>
                            ) : (similarArticles?.length ?? 0) === 0 ? (
                                <div className="text-sm text-muted-foreground">No similar articles found.</div>
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {similarArticles
                                        ?.filter((item) => item?._id && item._id !== article._id)
                                        .slice(0, 6)
                                        .map((item) => (
                                            <button
                                                key={item._id}
                                                type="button"
                                                onClick={() =>
                                                    void router.push(
                                                        buildArticlePath({ id: item._id, title: item.title }),
                                                    )
                                                }
                                                className="rounded-lg border border-border p-4 text-left hover:bg-muted/50"
                                            >
                                                <div className="mb-2 line-clamp-2 font-medium">{item.title}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {item.companyName || "Unknown company"}
                                                </div>
                                            </button>
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
