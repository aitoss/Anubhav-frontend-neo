import protectedAxios from "./protectedAxios"
import type {Article} from "./articles"

export type ReactionKind = "like" | "save"

export type MyReactions = {
    liked: Set<string>
    saved: Set<string>
}

export async function fetchMyReactions(): Promise<MyReactions> {
    return protectedAxios
        .get<{liked: string[]; saved: string[]}>("/api/anubhav/me/reactions")
        .then((res) => ({
            liked: new Set(res.data.liked ?? []),
            saved: new Set(res.data.saved ?? []),
        }))
}

export async function setReaction(
    articleId: string,
    kind: ReactionKind,
    value: boolean,
) {
    return protectedAxios
        .put<{kind: ReactionKind; value: boolean; articleId: string}>(
            `/api/anubhav/blogs/${articleId}/reactions`,
            {kind, value},
        )
        .then((res) => res.data)
}

export type ReactedArticlesPage = {
    total: number
    page: number
    limit: number
    articles: Article[]
}

export async function fetchReactedArticles(
    kind: ReactionKind,
    page: number,
    limit: number,
) {
    const params = new URLSearchParams({kind, page: String(page), limit: String(limit)})
    return protectedAxios
        .get<ReactedArticlesPage>(`/api/anubhav/me/reactions/articles?${params}`)
        .then((res) => res.data)
}
