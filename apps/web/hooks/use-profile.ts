"use client"

import { useQuery } from "@tanstack/react-query"

import { fetchReactedArticles, type ReactionKind } from "@/lib/reactions"
import {
  fetchMe,
  fetchMyArticles,
  fetchUser,
  fetchUserArticles,
  PROFILE_PAGE_SIZE,
} from "@/lib/users"

export function useMe(enabled = true) {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled,
    retry: false,
    staleTime: 60_000,
  })
}

export function useProfile(userId?: string) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchUser(userId!),
    enabled: Boolean(userId),
  })
}

export function useProfileArticles(userId: string | undefined, page: number, isOwner: boolean) {
  return useQuery({
    queryKey: ["profile-articles", isOwner ? "me" : userId, page],
    queryFn: () =>
      isOwner
        ? fetchMyArticles(page, PROFILE_PAGE_SIZE)
        : fetchUserArticles(userId!, page, PROFILE_PAGE_SIZE),
    enabled: isOwner || Boolean(userId),
  })
}

/** Backs the Saved and Liked tabs; only ever enabled on your own profile. */
export function useReactedArticles(kind: ReactionKind, page: number, enabled: boolean) {
  return useQuery({
    queryKey: ["reacted-articles", kind, page],
    queryFn: () => fetchReactedArticles(kind, page, PROFILE_PAGE_SIZE),
    enabled,
  })
}
