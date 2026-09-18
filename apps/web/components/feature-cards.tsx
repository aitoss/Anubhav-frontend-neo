import Image from "next/image"

const CONTRIBUTORS = [
  "https://avatars.githubusercontent.com/u/83774380",
  "https://avatars.githubusercontent.com/u/118094744",
  "https://avatars.githubusercontent.com/u/91362856",
]

function CollaborateArt() {
  const thread = [
    { avatar: CONTRIBUTORS[0], text: "Which round was hardest?" },
    { avatar: CONTRIBUTORS[1], text: "System design, by far." },
    { avatar: CONTRIBUTORS[2], text: "This helped me a lot \u2014 thanks!" },
  ]

  return (
    <div className="flex h-32 flex-col justify-center gap-2 px-4">
      {thread.map((message) => (
        <div key={message.avatar} className="flex items-end gap-2">
          <img
            src={message.avatar}
            alt=""
            aria-hidden
            className="ring-card size-6 shrink-0 rounded-full object-cover ring-2"
          />
          <span className="border-border bg-background rounded-lg rounded-bl-sm border px-2.5 py-1 text-xs shadow-sm">
            {message.text}
          </span>
        </div>
      ))}
    </div>
  )
}

function VideoArt() {
  const thumbs = [
    { src: "/assets/youtube_image1.png", className: "-mr-7 -rotate-6" },
    { src: "/assets/youtube_image2.png", className: "z-10 rotate-2" },
    { src: "/assets/youtube_image3.png", className: "-ml-7 rotate-6" },
  ]

  return (
    // Centred fan: the thumbs overlap with negative margins rather than fixed
    // left offsets, which pinned them to one side and overflowed the card.
    <div className="relative flex h-32 items-center justify-center overflow-hidden">
      <div className="flex items-center">
        {thumbs.map((thumb) => (
          <Image
            key={thumb.src}
            src={thumb.src}
            alt=""
            width={160}
            height={90}
            aria-hidden
            className={`border-border w-24 shrink-0 rounded-md border object-cover shadow-md ${thumb.className}`}
          />
        ))}
      </div>
      <span className="absolute top-1/2 left-1/2 z-20 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 backdrop-blur-sm">
        <svg viewBox="0 0 24 24" className="size-4 translate-x-px fill-white" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </div>
  )
}

// A contribution grid reads as "open source" without needing an asset.
function OpenSourceArt() {
  const cells = Array.from(
    { length: 7 * 18 },
    (_, index) => Math.abs(Math.sin(index * 12.9898) * 43758.5453) % 1,
  )

  return (
    // Fixed 10px cells so they stay square (auto-cols-fr stretched them into
    // rectangles), sized to fill the card and centred in it.
    <div className="flex h-32 items-center justify-center overflow-hidden p-4">
      <div className="grid grid-flow-col grid-rows-7 gap-1">
        {cells.map((value, index) => (
          <span
            key={index}
            aria-hidden
            className="size-2.5 rounded-[3px]"
            style={{
              backgroundColor:
                value > 0.5 ? "var(--color-emerald-500)" : "var(--border)",
              opacity: value > 0.72 ? 1 : value > 0.5 ? 0.45 : 1,
            }}
          />
        ))}
      </div>
    </div>
  )
}

const FEATURES = [
  {
    title: "Collaborate with writers",
    description: "Comment, discuss, and improve stories together across the community.",
    art: CollaborateArt,
  },
  {
    title: "Video collection",
    description:
      "Prefer watching? Explore curated videos that complement the written stories.",
    art: VideoArt,
  },
  {
    title: "Open source",
    description: "The platform stays community-driven and easy to extend with new ideas.",
    art: OpenSourceArt,
  },
]

export function FeatureCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {FEATURES.map((feature) => {
        const Art = feature.art
        return (
          <article
            key={feature.title}
            className="border-border bg-card group overflow-hidden rounded-3xl border shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="bg-muted/40 border-border border-b">
              <Art />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-6">
                {feature.description}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
