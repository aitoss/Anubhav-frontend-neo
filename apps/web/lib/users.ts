import protectedAxios from "./protectedAxios"
import type { Article } from "./articles"

export type Profile = {
    _id: string
    name?: string
    email?: string
    contact?: string
    college?: string
    logoUrl?: string
    linkedinUrl?: string
    createdAt?: string
}

export type UserArticles = {
    articles: Article[]
    total?: number
}

export const PROFILE_PAGE_SIZE = 10

export function slugifyName(value = "") {
    return String(value)
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60)
}

export function profilePath(user?: Pick<Profile, "_id" | "name">) {
    if (!user?._id) return "#"
    const slug = slugifyName(user.name ?? "")
    return slug ? `/u/${user._id}/${slug}` : `/u/${user._id}`
}

export async function fetchUser(id: string) {
    return protectedAxios
        .get<{ user: Profile }>(`/api/anubhav/users/${id}`)
        .then((res) => res.data.user)
}

export async function fetchUserArticles(id: string, page = 1, limit = PROFILE_PAGE_SIZE) {
    return protectedAxios
        .get<UserArticles>(`/api/anubhav/users/${id}/articles`, { params: { page, limit } })
        .then((res) => res.data)
}

export async function fetchMe() {
    return protectedAxios
        .get<{ user: Profile }>("/api/anubhav/me")
        .then((res) => res.data.user)
}

export async function updateMe(payload: Partial<Profile>) {
    return protectedAxios
        .patch<{ user: Profile }>("/api/anubhav/me", payload)
        .then((res) => res.data.user)
}

export async function fetchMyArticles(page = 1, limit = PROFILE_PAGE_SIZE) {
    return protectedAxios
        .get<UserArticles>("/api/anubhav/me/articles", { params: { page, limit } })
        .then((res) => res.data)
}
