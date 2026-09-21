"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSessionContext } from "supertokens-auth-react/recipe/session"

import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/solid"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@workspace/ui/components/alert-dialog"
import { cn } from "@workspace/ui/lib/utils"

import { fetchMyReactions, setReaction, type MyReactions, type ReactionKind } from "@/lib/reactions"

const REACTIONS_KEY = ["my-reactions"]

/**
 * One query holds every like and save the viewer has, so a list of cards costs
 * a single request instead of one per card.
 */
function useMyReactions(enabled: boolean) {
  return useQuery({
    queryKey: REACTIONS_KEY,
    queryFn: fetchMyReactions,
    enabled,
    staleTime: 60_000,
  })
}

function useReactionToggle(articleId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ kind, value }: { kind: ReactionKind; value: boolean }) =>
      setReaction(articleId, kind, value),

    // A tap has to feel instant, so paint it first and roll back if the write
    // fails.
    onMutate: async ({ kind, value }) => {
      await queryClient.cancelQueries({ queryKey: REACTIONS_KEY })
      const previous = queryClient.getQueryData<MyReactions>(REACTIONS_KEY)
      if (!previous) return { previous }

      const field = kind === "like" ? "liked" : "saved"
      const next = new Set(previous[field])
      if (value) next.add(articleId)
      else next.delete(articleId)

      queryClient.setQueryData<MyReactions>(REACTIONS_KEY, { ...previous, [field]: next })
      return { previous }
    },

    onError: (_error, _variables, context) => {
      if (context?.previous) queryClient.setQueryData(REACTIONS_KEY, context.previous)
    },
  })
}

function IconToggle({
  on,
  pending,
  onToggle,
  Icon,
  label,
  activeClass,
}: {
  on: boolean
  pending: boolean
  onToggle: () => void
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  activeClass: string
}) {
  const [pulsing, setPulsing] = React.useState(false)

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={on}
      title={label}
      disabled={pending}
      // The card itself is clickable, so keep the toggle from navigating.
      onClick={(event) => {
        event.stopPropagation()
        event.preventDefault()
        setPulsing(true)
        setTimeout(() => setPulsing(false), 175)
        onToggle()
      }}
      onKeyDown={(event) => event.stopPropagation()}
      className="cursor-pointer p-0.5 disabled:cursor-default"
    >
      <Icon
        aria-hidden
        className={cn(
          "size-5 transition-transform duration-[175ms] ease-in-out",
          pulsing && "scale-120",
          on ? activeClass : "fill-muted-foreground/35",
        )}
      />
    </button>
  )
}

export function ArticleActions({ id, className }: { id: string; className?: string }) {
  const pathname = usePathname()
  const session = useSessionContext()
  const signedIn = session.loading ? false : session.doesSessionExist

  const [promptOpen, setPromptOpen] = React.useState(false)
  const { data: reactions } = useMyReactions(signedIn)
  const toggle = useReactionToggle(id)

  const act = (kind: ReactionKind, on: boolean) => {
    if (!signedIn) {
      setPromptOpen(true)
      return
    }
    toggle.mutate({ kind, value: !on })
  }

  const liked = reactions?.liked.has(id) ?? false
  const saved = reactions?.saved.has(id) ?? false

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <IconToggle
        on={liked}
        pending={session.loading}
        onToggle={() => act("like", liked)}
        Icon={HeartIcon}
        label={liked ? "Unlike article" : "Like article"}
        activeClass="fill-[#e0245e]"
      />
      <IconToggle
        on={saved}
        pending={session.loading}
        onToggle={() => act("save", saved)}
        Icon={BookmarkIcon}
        label={saved ? "Remove bookmark" : "Bookmark article"}
        activeClass="fill-foreground"
      />

      <AlertDialog open={promptOpen} onOpenChange={setPromptOpen}>
        {/* The dialog is portalled out of the card in the DOM, but React still
            bubbles its clicks up to the card's router.push. Without this,
            "Log in" opens the article instead. */}
        <AlertDialogContent onClick={(event) => event.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <HeartIcon className="fill-[#e0245e]" />
            </AlertDialogMedia>
            <AlertDialogTitle>Log in to save this</AlertDialogTitle>
            <AlertDialogDescription>
              Likes and bookmarks live on your account, so they follow you to any
              device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Not now</AlertDialogCancel>
            <AlertDialogAction
              render={
                <Link href={`/log-in?redirectToPath=${encodeURIComponent(pathname)}`} />
              }
            >
              Log in
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
