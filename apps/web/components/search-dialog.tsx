"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { ChevronRightIcon, DocumentTextIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"

import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogTitle,
} from "@workspace/ui/components/dialog"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { cn } from "@workspace/ui/lib/utils"

import { useQuery } from "@tanstack/react-query"

import { sections } from "@/components/nav-sections"
import { ArticleThumb } from "@/components/article-thumb"
import { buildArticlePath } from "@/lib/article-url"
import { fetchArticlesPage } from "@/lib/articles"

type SearchItem = {
  label: string
  href: string
  group: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  // Article rows show a 16:9 thumbnail instead of the icon. Set (possibly
  // empty) for articles, left undefined for page and "see all" rows so they
  // keep the icon.
  thumbnail?: string
}

const ALL_ITEMS: SearchItem[] = [
  ...sections
    .filter((section) => !section.children?.length)
    .map<SearchItem>((section) => ({
      label: section.label,
      href: section.href,
      group: "Pages",
      icon: section.icon,
    })),
  ...sections
    .filter((section) => section.children?.length)
    .flatMap((section) =>
      section.children!.map<SearchItem>((child) => ({
        label: child.label,
        href: child.href,
        group: section.label,
        icon: child.icon,
      })),
    ),
]

function filterItems(query: string): SearchItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return ALL_ITEMS
  return ALL_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q),
  )
}

type SearchDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}


export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [highlight, setHighlight] = React.useState(0)
  const listRef = React.useRef<HTMLUListElement>(null)
  // The dialog only matched a static list of nav pages, so any real search
  // term came back empty. Query the article search API too.
  const [debounced, setDebounced] = React.useState("")

  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(query.trim()), 250)
    return () => clearTimeout(timer)
  }, [query])

  const { data: articleResults, isFetching } = useQuery({
    queryKey: ["search-dialog", debounced],
    queryFn: () => fetchArticlesPage(debounced, "relevance", 1),
    enabled: debounced.length >= 2,
    staleTime: 60_000,
  })

  const items = React.useMemo(() => {
    const pages = filterItems(query)
    if (debounced.length < 2) return pages

    const articles = (articleResults?.articles ?? []).slice(0, 6).map<SearchItem>(
      (article) => ({
        label: article.title,
        href: buildArticlePath({ id: article._id, title: article.title }),
        group: "Articles",
        icon: DocumentTextIcon,
        thumbnail: article.imageUrl ?? "",
      }),
    )

    const seeAll: SearchItem = {
      label: `See all results for \u201c${debounced}\u201d`,
      href: `/article?query=${encodeURIComponent(debounced)}`,
      group: "Articles",
      icon: DocumentTextIcon,
    }

    // Only offer "see all" when there is actually something to see — otherwise
    // it reads as a result and hides the empty state.
    return articles.length > 0 ? [...pages, ...articles, seeAll] : pages
  }, [query, debounced, articleResults])

  React.useEffect(() => {
    setHighlight(0)
  }, [query])

  React.useEffect(() => {
    const el = listRef.current?.querySelector<HTMLLIElement>(
      `[data-index="${highlight}"]`,
    )
    el?.scrollIntoView({ block: "nearest" })
  }, [highlight])

  function handleOpenChange(next: boolean) {
    if (!next) {
      setQuery("")
      setHighlight(0)
    }
    onOpenChange(next)
  }

  function navigate(item: SearchItem) {
    router.push(item.href)
    handleOpenChange(false)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlight((current) => (items.length === 0 ? 0 : (current + 1) % items.length))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlight((current) =>
        items.length === 0 ? 0 : (current - 1 + items.length) % items.length,
      )
    } else if (e.key === "Enter") {
      const item = items[highlight]
      if (item) {
        e.preventDefault()
        navigate(item)
      }
    }
  }

  let lastGroup = ""

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="overflow-hidden border border-border bg-popover p-0 shadow-2xl sm:max-w-lg"
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">
          Search pages and sections.
        </DialogDescription>

        <div className="flex h-14 items-center gap-3 border-b border-border px-4">
          <MagnifyingGlassIcon className="size-4 shrink-0 text-muted-foreground/70" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search for your Dreams.."
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/64"
          />
          <span className="hidden rounded-md border border-border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
            ⌘K
          </span>
        </div>

        <ScrollArea scrollFade className="max-h-80">
          <ul ref={listRef} role="listbox" className="p-1">
            {items.length === 0 ? (
              <li className="text-muted-foreground flex flex-col items-center gap-2 py-8 text-sm">
                <MagnifyingGlassIcon className="size-5 opacity-60" />
                {isFetching ? "Searching\u2026" : "No results found."}
              </li>
            ) : (
              items.map((item, index) => {
                const showHeader = item.group !== lastGroup
                lastGroup = item.group
                const Icon = item.icon
                const selected = index === highlight

                return (
                  <React.Fragment key={`${item.group}-${item.href}`}>
                    {showHeader ? (
                      <li
                        aria-hidden
                        className="px-2 pb-1 pt-2 font-mono text-xs font-medium uppercase text-muted-foreground"
                      >
                        {item.group}
                      </li>
                    ) : null}
                    <li
                      data-index={index}
                      role="option"
                      aria-selected={selected}
                      onMouseMove={() => setHighlight(index)}
                      onClick={() => navigate(item)}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        selected
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-muted/60",
                      )}
                    >
                      {item.thumbnail === undefined ? (
                        <Icon className="size-4 shrink-0 text-muted-foreground" />
                      ) : (
                        <ArticleThumb
                          src={item.thumbnail || undefined}
                          className="aspect-video w-16 shrink-0 rounded"
                          logoClassName="size-4"
                        />
                      )}
                      <span className="truncate">{item.label}</span>
                      {selected ? (
                        <ChevronRightIcon className="ms-auto size-4 text-muted-foreground" />
                      ) : null}
                    </li>
                  </React.Fragment>
                )
              })
            )}
            {items.length > 0 && isFetching ? (
              <li className="text-muted-foreground px-3 py-2 text-xs">Searching\u2026</li>
            ) : null}
          </ul>
        </ScrollArea>

        <div className="flex h-10 items-center gap-3 border-t border-border bg-muted/40 px-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <KbdGroup>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
            </KbdGroup>
            Navigate
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Kbd>↵</Kbd>
            Go
          </span>
          <span className="ms-auto inline-flex items-center gap-1.5">
            <Kbd>esc</Kbd>
            Close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
