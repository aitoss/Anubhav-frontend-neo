import protectedAxios from "./protectedAxios"

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
