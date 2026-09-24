import protectedAxios from "./protectedAxios"
import type { Article } from "./articles"

export type CompanySuggestion = {
    _id: string
    company: string
    domain?: string | null
}

export type ArticlePayload = {
    title: string
    article: string
    role: string
    articleTags: string[]
    companyId?: string | null
    companyName?: string
    image?: string | null
}

export async function searchCompanies(q: string, limit = 10, signal?: AbortSignal) {
    return protectedAxios
        .get<{ success: boolean; data: CompanySuggestion[] }>("/api/anubhav/searchCompanies", {
            params: { q, limit },
            signal,
        })
        .then((res) => res.data?.data ?? [])
}

export async function fetchTagSuggestions() {
    return protectedAxios
        .get<string[]>("/api/anubhav/tags")
        .then((res) => (Array.isArray(res.data) ? res.data : []))
        .catch(() => [])
}

export async function createBlog(payload: ArticlePayload) {
    return protectedAxios
        .post<{ createArticle?: Article }>("/api/anubhav/blogs", payload)
        .then((res) => res.data)
}

export async function updateBlog(id: string, payload: ArticlePayload) {
    return protectedAxios
        .patch<{ article?: Article }>(`/api/anubhav/blogs/${id}`, payload)
        .then((res) => res.data)
}

export async function fetchBlog(id: string) {
    return protectedAxios
        .get<{ article?: Article } | Article>(`/api/anubhav/blog/${id}`)
        .then((res) => {
            const payload = res.data as any
            return (payload?.article ?? payload) as Article
        })
}

/**
 * Reads an article as its author. Unlike `fetchBlog` this also returns
 * articles still awaiting moderation, which is what the edit form needs.
 *
 * ponytail: the 404 fallback is only there for backends that predate the
 * owner route - drop it once every deployed backend has GET /blogs/:id. A 403
 * deliberately does not fall back: the public route would happily hand a
 * non-author the article to load into the edit form.
 */
export async function fetchOwnedBlog(id: string) {
    try {
        const res = await protectedAxios.get<{article: Article}>(
            `/api/anubhav/blogs/${id}`,
        )
        return res.data.article
    } catch (error) {
        if ((error as any)?.response?.status !== 404) throw error
        return fetchBlog(id)
    }
}

export async function deleteBlog(id: string) {
    return protectedAxios
        .delete<{message: string; articleId: string}>(`/api/anubhav/blogs/${id}`)
        .then((res) => res.data)
}
