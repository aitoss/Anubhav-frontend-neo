import protectedAxios from "./protectedAxios"
import {
    decodeArticleId,
    encodeArticleId,
} from "./article-url"

export type Article = {
    _id: string
    title: string
    description?: string
    companyName?: string
    tags?: string[]
    imageUrl?: string
    createdAt?: string
}

export type ArticlesResponse = {
    articles: Article[]
    totalArticles?: number
    hasMore?: boolean
}

export type ArticleSort = "relevance" | "date"

export async function fetchArticlesPage(query: string, sortBy: ArticleSort, page: number) {
    const params = new URLSearchParams()
    params.set("page", String(page))
    params.set("sort", sortBy)

    const endpoint = query
        ? `/api/anubhav/search?${params.toString()}&q=${encodeURIComponent(query)}`
        : `/api/anubhav/blogs?${params.toString()}`

    return protectedAxios.get<ArticlesResponse>(endpoint).then((res) => res.data)
}

export async function fetchArticle(id: string) {
    return protectedAxios.get<{ article: Article } | Article>(`/api/anubhav/blog/${id}`).then((res) => {
        const payload = res.data
        return "article" in payload ? payload.article : payload
    })
}

export function buildArticleShortId(id: string) {
    return encodeArticleId(id)
}

export function resolveArticleIdFromShortId(token: string) {
    return decodeArticleId(token)
}

type SimilarBlogsPayload =
    | Article[]
    | { similarBlogs?: Article[]; blogs?: Article[]; articles?: Article[]; data?: Article[] }

export async function fetchSimilarBlogs(input: { q: string; company?: string; tags?: string[] }) {
    const params = new URLSearchParams()
    params.set("q", input.q)
    if (input.company) {
        params.set("company", input.company)
    }
    if (input.tags && input.tags.length > 0) {
        params.set("tags", input.tags.join(","))
    }

    return protectedAxios
        .get<SimilarBlogsPayload>(`/api/anubhav/similarBlogs?${params.toString()}`)
        .then((res) => {
            const payload = res.data
            if (Array.isArray(payload)) return payload
            return payload.similarBlogs ?? payload.blogs ?? payload.articles ?? payload.data ?? []
        })
}
