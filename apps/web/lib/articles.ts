import protectedAxios from "./protectedAxios"
import {
    decodeArticleId,
    encodeArticleId,
} from "./article-url"

export type ArticleAuthor = {
    _id?: string
    name?: string
    email?: string
    contact?: string
    logoUrl?: string
    linkedinUrl?: string
}

export type Article = {
    _id: string
    authorId?: ArticleAuthor | string
    author?: ArticleAuthor
    showName?: boolean
    title: string
    description?: string
    companyName?: string
    // The API field is articleTags; `tags` is kept for callers that pass one in.
    articleTags?: string[]
    tags?: string[]
    typeOfArticle?: string
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

const ANONYMOUS = "Anonymous"

// Mirrors the Vite getAuthor helper: authorId arrives either populated or as a
// bare id with the details on `author`.
export function getAuthor(article: Article): ArticleAuthor {
    const { authorId, author } = article

    if (authorId && typeof authorId === "object") {
        return { ...authorId, name: authorId.name || ANONYMOUS }
    }

    if (typeof authorId === "string") {
        return { ...author, _id: authorId, name: author?.name || ANONYMOUS }
    }

    return { ...author, name: author?.name || ANONYMOUS }
}

export function authorInitials(name?: string) {
    if (!name) return "?"
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
}

export function articleTagList(article?: Article | null) {
    return article?.articleTags ?? article?.tags ?? []
}
