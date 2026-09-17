import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

import { Badge } from "@workspace/ui/components/badge"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundDots } from "@/components/background-dots"
import videoData from "../../public/VideoData.json"

export const metadata: Metadata = {
  title: "Videos | Anubhav",
  description:
    "The Anubhav video interview series — seniors share their college life, tech and non-tech journeys, and tips for juniors.",
}

// ponytail: VideoData.json is a static file, so it is imported rather than fetched.
// Move to the API only when videos become editable from the dashboard.
const TAGS = ["Google", "Zeta", "UBS", "Microsoft", "Deutsche-Bank", "Cred"]

// The JSON stores local images as "./assets/x.png"; the public dir serves them from the root.
function imageSrc(img: string) {
  return img.replace(/^\.\//, "/")
}

export default function VideosPage() {
  const videos = [...videoData].reverse()

  return (
    <>
      <Header />
      <BackgroundDots dotSize={1.8} gap={15} fade />
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pt-24">
        <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-6 text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight">Videos</h1>
          <div className="flex w-full flex-wrap justify-center gap-2">
            {TAGS.map((tag) => (
              <Link key={tag} href={`/article?query=${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 rounded-2xl p-1 transition-opacity hover:opacity-90"
            >
              <Image
                src={imageSrc(video.img)}
                alt={video.title}
                width={480}
                height={270}
                className="aspect-video w-full rounded-[10px] object-cover"
              />
              <h2 className="truncate text-xl font-medium">{video.title}</h2>
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-5">
                {video.description}
              </p>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
