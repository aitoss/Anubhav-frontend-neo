import Image from "next/image"

const CARDS = [
  { meta: "11 mins read • 09-06-2023", title: "CRED Interview Experience ( On Campus SDE - Backend )", rotate: "rotate-2", hoverLift: "group-hover/stack:-translate-y-2" },
  { meta: "5 mins read • 21-12-2022", title: "Google STEP Internship Decoded", rotate: "-rotate-1", hoverLift: "group-hover/stack:-translate-y-1" },
  { meta: "5 mins read • 19-12-2022", title: "Deutsche bank: Internship | Summer Intern 2023", rotate: "rotate-1", hoverLift: "group-hover/stack:translate-y-1" },
  { meta: "15 mins read • 14-01-2022", title: "Microsoft FTE Interview Experience from Engage 2021 [FTE]", rotate: "-rotate-2", hoverLift: "group-hover/stack:translate-y-2" },
]

const AVATARS = [
  { src: "/assets/images/Emoji.png", className: "left-6 top-28 size-14" },
  { src: "/assets/images/Emoji-1.png", className: "left-2 top-44 size-12" },
  { src: "/assets/images/Emoji-2.png", className: "left-16 top-12 size-11" },
]

export function StoryStack() {
  return (
    <div className="group/stack border-border bg-card relative h-96 overflow-hidden rounded-2xl border shadow-sm">
      {/* soft riser behind the stack, so the cards read as sitting on something */}
      <div className="bg-muted absolute -bottom-40 left-1/2 h-[340px] w-[88%] -translate-x-1/2 rounded-t-full" />

      <span className="border-border bg-background text-muted-foreground absolute top-6 left-6 -rotate-6 rounded-md border px-3 py-1 text-sm shadow-sm transition-transform duration-500 group-hover/stack:-rotate-12">
        Fresh Stories
      </span>
      <span className="border-border bg-background text-muted-foreground absolute top-6 right-6 rotate-6 rounded-md border px-3 py-1 text-sm shadow-sm transition-transform duration-500 group-hover/stack:rotate-12">
        Latest Insights
      </span>

      {AVATARS.map((avatar) => (
        <Image
          key={avatar.src}
          src={avatar.src}
          alt=""
          width={72}
          height={72}
          aria-hidden
          className={`ring-background absolute rounded-full object-cover ring-4 transition-transform duration-500 group-hover/stack:scale-105 ${avatar.className}`}
        />
      ))}

      {/* Fanned stack: each card pulls up over the previous one, straightens and
          lifts above its siblings on hover. */}
      <div className="absolute top-16 -right-4 left-24 flex flex-col">
        {CARDS.map((card, index) => (
          <article
            key={card.title}
            style={{ zIndex: index + 1 }}
            className={`border-border bg-background relative -mt-2 rounded-lg border p-3 shadow-md transition-all duration-300 first:mt-0 hover:z-50 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl ${card.rotate} ${card.hoverLift} hover:rotate-0`}
          >
            <p className="text-muted-foreground text-xs">{card.meta}</p>
            <p className="mt-1.5 font-semibold text-pretty">{card.title}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
