"use client"

import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"

import { buildArticlePath } from "@/lib/article-url"
import { authorInitials, getAuthor, type Article, type ArticleAuthor } from "@/lib/articles"

export function formatArticleDate(dateValue?: string) {
  if (!dateValue) return ""
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return ""
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${day}-${month}-${date.getFullYear()}`
}

// 180 wpm, same as the Vite ReadTime helper.
export function readTime(description?: string) {
  const words =
    description
      ?.replace(/<[^>]*>/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length ?? 0
  return `${Math.max(1, Math.ceil(words / 180))} mins read`
}

export function renderDescription(description?: string) {
  if (!description) return undefined
  return { __html: description }
}

// `author` overrides the embedded one: /users/:id/articles returns articles
// without a populated authorId, so the profile page supplies it.
export function ArticleCard({
  article,
  author: authorOverride,
}: {
  article: Article
  author?: ArticleAuthor
}) {
  const router = useRouter()
  const embedded = getAuthor(article)
  const author =
    authorOverride && embedded.name === "Anonymous" ? authorOverride : embedded
  const href = buildArticlePath({ id: article._id, title: article.title })

  return (
    <article
      className="group grid cursor-pointer space-x-2 overflow-hidden md:grid-cols-[280px_minmax(0,1fr)]"
      role="button"
      tabIndex={0}
      onClick={() => void router.push(href)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") void router.push(href)
      }}
    >
      <div className="bg-muted relative h-44 overflow-hidden rounded-lg md:aspect-auto md:min-h-fit">
        <img
          src={article.imageUrl || "/assets/images/VideoPage.png"}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-70" />
      </div>
      <div className="flex h-full flex-col gap-4">
        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5">
            <Avatar className="size-5">
              {author.logoUrl ? <AvatarImage src={author.logoUrl} alt={author.name} /> : null}
              <AvatarFallback className="text-[9px]">
                {authorInitials(author.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-foreground font-medium">{author.name}</span>
          </span>
          {article.companyName ? (
            <>
              <span aria-hidden>|</span>
              <span className="text-foreground font-medium">{article.companyName}</span>
            </>
          ) : null}
          <span aria-hidden>&bull;</span>
          <span>{readTime(article.description)}</span>
          {article.createdAt ? (
            <>
              <span aria-hidden>&bull;</span>
              <span>{formatArticleDate(article.createdAt)}</span>
            </>
          ) : null}
        </div>
        <h2 className="font-heading max-w-3xl text-2xl leading-tight font-medium tracking-tight sm:text-[1.7rem]">
          {article.title}
        </h2>
        <div
          className="text-muted-foreground line-clamp-2 max-w-4xl space-y-3 text-sm leading-7 [&_br]:hidden [&_h1]:mb-2 [&_h1]:text-base [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p]:m-0 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
          dangerouslySetInnerHTML={renderDescription(article.description)}
        />
      </div>
    </article>
  )
}
