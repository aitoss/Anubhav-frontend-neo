"use client"

import * as React from "react"
import Link from "next/link"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  EllipsisHorizontalIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
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
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

import { cn } from "@workspace/ui/lib/utils"

import { deleteBlog } from "@/lib/blogs"

/** Edit + delete controls, rendered only on articles the viewer owns. */
export function ArticleOwnerActions({
  articleId,
  title,
  className,
}: {
  articleId: string
  title: string
  className?: string
}) {
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const queryClient = useQueryClient()

  const remove = useMutation({
    mutationFn: () => deleteBlog(articleId),
    onSuccess: () => {
      setConfirmOpen(false)
      void queryClient.invalidateQueries({ queryKey: ["profile-articles"] })
      void queryClient.invalidateQueries({ queryKey: ["articles"] })
    },
  })

  return (
    <div className={cn("flex items-center justify-end", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon" aria-label={`Actions for ${title}`} />}
        >
          <EllipsisHorizontalIcon className="size-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem render={<Link href={`/edit/${articleId}`} />}>
            <PencilSquareIcon className="size-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={() => setConfirmOpen(true)}>
            <TrashIcon className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="text-destructive">
              <ExclamationTriangleIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete this article?</AlertDialogTitle>
            <AlertDialogDescription>
              &ldquo;{title}&rdquo; will no longer appear on Anubhav. Ask an admin if you
              need it back.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {remove.isError ? (
            <p className="text-destructive text-sm">
              Could not delete the article. Please try again.
            </p>
          ) : null}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={remove.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={remove.isPending}
              onClick={() => remove.mutate()}
            >
              {remove.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
