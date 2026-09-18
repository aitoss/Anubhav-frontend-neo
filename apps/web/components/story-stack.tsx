"use client"

import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import { formatArticleDate, readTime } from "@/components/article-card"
import { buildArticlePath } from "@/lib/article-url"
import { fetchArticlesPage } from "@/lib/articles"

type StackCard = { href: string; meta: string; title: string }

// Shown while the request is in flight and if it fails. These are real
// articles, so the panel never renders empty or shifts its layout.
const FALLBACK: StackCard[] = [
  {
    href: "/article/6482c7f31efe8f6914eefe2e",
    meta: "11 mins read • 09-06-2023",
    title: "CRED Interview Experience ( On Campus SDE - Backend )",
  },
  {
    href: "/article/63a30bd3fa72a20c75f513e3",
    meta: "5 mins read • 21-12-2022",
    title: "Google STEP Internship Decoded",
  },
  {
    href: "/article/639f77bcfa72a20c75f5106a",
    meta: "5 mins read • 19-12-2022",
    title: "Deutsche bank: Internship | Summer Intern 2023",
  },
  {
    href: "/article/61e1433251a2879b50add90e",
    meta: "15 mins read • 14-01-2022",
    title: "Microsoft FTE Interview Experience from Engage 2021 [FTE]",
  },
]

// Per-position styling from the Vite Card2: the z-index ladder and -mb-2
// overlap belong to the slot, not to whichever article lands in it.
const SLOTS = [
  "-mb-2 hover:z-[999]",
  "z-[99] -mb-2 scale-[102%]",
  "z-[20] -mb-2 hover:z-[99]",
  "z-[10] hover:z-[99]",
]

const EMOJI = [
  { src: "/assets/images/Emoji.png", className: "top-[20%] left-[30%]" },
  { src: "/assets/images/Emoji-1.png", className: "-bottom-8 left-[1%]" },
  { src: "/assets/images/Emoji-2.png", className: "right-[4%] bottom-0" },
]

export function StoryStack() {
  const { data } = useQuery({
    queryKey: ["recent-articles", 4],
    queryFn: () => fetchArticlesPage("", "date", 1),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })

  const fetched = (data?.articles ?? []).slice(0, 4).map<StackCard>((article) => ({
    href: buildArticlePath({ id: article._id, title: article.title }),
    meta: `${readTime(article.description)}${
      article.createdAt ? ` • ${formatArticleDate(article.createdAt)}` : ""
    }`,
    title: article.title,
  }))

  const cards = fetched.length > 0 ? fetched : FALLBACK

  return (
    <div className="border-border bg-card relative isolate h-[450px] w-full overflow-hidden rounded-2xl border shadow-md">
      <div className="bg-foreground/5 absolute top-[120%] left-1/2 z-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="bg-foreground/5 absolute top-[120%] left-1/2 z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <p className="border-border bg-muted absolute top-12 left-[5%] inline-flex -rotate-12 rounded-md border px-2 py-1">
        Fresh Stories
      </p>
      <p className="border-border bg-muted absolute top-12 right-12 inline-flex rotate-12 rounded-md border px-2 py-1">
        Latest Insights
      </p>

      {EMOJI.map((emoji) => (
        <Image
          key={emoji.src}
          src={emoji.src}
          alt=""
          width={63}
          height={63}
          aria-hidden
          draggable={false}
          className={`absolute z-20 select-none object-cover ${emoji.className}`}
        />
      ))}

      <div className="absolute bottom-[-2%] left-[20%] z-[100] inline-flex rotate-6 flex-col select-none">
        {cards.map((card, index) => (
          <Link
            key={card.href}
            href={card.href}
            className={`border-border bg-muted hover:bg-card inline-flex max-w-[23rem] cursor-pointer flex-col rounded-lg border p-2 shadow-md backdrop-blur-[12px] transition-all duration-200 hover:scale-105 ${SLOTS[index] ?? ""}`}
          >
            <p className="text-muted-foreground font-normal">{card.meta}</p>
            <h3 className="clamp-2">{card.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
