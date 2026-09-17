import { ButtonLink } from "@/components/button-link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchTrigger } from "@/components/search-trigger"
import PartnersMarquee from "@/components/partners-marquee"
import { BackgroundDots } from "@/components/background-dots"
import { SendArrowIcon } from "@/components/send-arrow-icon"
import { FeatureCardWithIcon } from "@/components/feature-card-with-icon"
import { CommentBubble } from "@/components/comment-bubble"
import { AvatarStack, type Avatar } from "@/components/avatar-stack"
import { Comment01Icon, Video01Icon } from "@hugeicons/core-free-icons"


const steps = [
  {
    title: "Enter your details",
    description:
      "Share your name, company, role, and the interview context before writing.",
  },
  {
    title: "Write the story",
    description:
      "Use the editor to draft a clear, helpful experience with useful takeaways.",
  },
  {
    title: "Preview and publish",
    description:
      "Review the post and publish it so other students can learn from it.",
  },
]

const features = [
  {
    title: "Collaborate with writers",
    description:
      "Comment, discuss, and improve stories together across the community.",
  },
  {
    title: "Video collection",
    description:
      "Prefer watching? Explore curated videos that complement the written stories.",
  },
  {
    title: "Open source",
    description:
      "The platform stays community-driven and easy to extend with new ideas.",
  },
]

interface Comment {
  position: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  iconColor: string
  borderColor: string
  backgroundColor: string
  name: string
}

const comments: Comment[] = [
  {
    position: { top: "16%", left: "18%" },
    iconColor: "#313131",
    borderColor: "#121212",
    backgroundColor: "#313131",
    name: "Lokendra Kushwah",
  },
  {
    position: { bottom: "22%", left: "14%" },
    iconColor: "#2E90FA",
    borderColor: "#1570EF",
    backgroundColor: "#2E90FA",
    name: "Nikhil Dhariwal",
  },
  {
    position: { top: "10%", right: "18%" },
    iconColor: "#FF479F",
    borderColor: "#B11C64",
    backgroundColor: "#FF479F",
    name: "Harshal patil",
  },
]

const avatars: Avatar[] = [
  {
    src: "https://avatars.githubusercontent.com/u/83774380",
    alt: "Nikhil Dhariwal",
    borderColor: "#2E90FA",
  },
  {
    src: "https://avatars.githubusercontent.com/u/118094744",
    alt: "Lokendra Kushwah",
    borderColor: "#313131",
  },
  {
    src: "https://avatars.githubusercontent.com/u/91362856",
    alt: "Harshal patil",
    borderColor: "#FF479F",
  },
]

export default function Page() {
  return (
    <main
      className="min-h-screen bg-background text-foreground"
      style={{
        backgroundImage:
          "radial-gradient(circle at top, hsl(var(--primary) / 0.08), transparent 34%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)",
      }}
    >
      <Header />

      <section className="relative isolate overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
        <BackgroundDots
          dotSize={1.8}
          dotColor="#71717a"
          backgroundColor="transparent"
          gap={15}
          className="pointer-events-none opacity-50"
          fade
        />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
            🎉 Video collection now live
          </div>
          <h1 className="max-w-xl font-heading text-3xl sm:text-4xl lg:text-6xl font-medium tracking-tight text-foreground">
            Stories of success from the community
          </h1>
          <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Anubhav is a space for interview experiences, across placements, internships,
            and career journeys.
          </p>

          <div className="mt-8 w-full max-w-3xl">
            <SearchTrigger />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/article" size="lg">
              Start Reading
            </ButtonLink>
            <ButtonLink href="/create" variant="outline" size="lg">
              Share Your Story
            </ButtonLink>
          </div>
          {/* Partner logos bar */}
          <div className="mt-32 w-full">
            {/* Moving partner logos marquee */}
            <PartnersMarquee />
          </div>
        </div>
      </section>

      {/* Discover Anubhav section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              What is Anubhav?
            </p>
            <h2 className="mt-3 text-4xl font-heading font-medium tracking-tight text-foreground">
              Discover Anubhav
            </h2>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Anubhav is a dedicated platform where AIT students can share and explore success
              stories related to placements and internships. It's a space where you can find real-life
              experiences and practical advice from your peers who have navigated their career paths
              with success.
            </p>

            <div className="mt-6">
              <a href="/stories" className="text-sm underline text-foreground">Dive into Stories</a>
            </div>

            <div className="mt-8">
              <div className="rounded-2xl bg-card p-6 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Share Your Journey</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Contribute your own success story to inspire others and help build a community of successful AIT students.</p>
                </div>
                <div>
                  <ButtonLink href="/create" size="sm" variant="default">Write Article</ButtonLink>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="relative rounded-2xl bg-card p-6 lg:p-10 h-80 lg:h-96 shadow-sm overflow-hidden">
              {/* semicircle background */}
              <div className="absolute -bottom-36 left-1/2 -translate-x-1/2 w-[90%] h-[320px] rounded-t-full bg-muted/10" />

              {/* sticker pills */}
              <div className="absolute top-6 left-8 rotate-[-8deg]">
                <span className="inline-block rounded-md border border-border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">Fresh Stories</span>
              </div>
              <div className="absolute top-6 right-8 rotate-6">
                <span className="inline-block rounded-md border border-border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">Latest Insights</span>
              </div>

              {/* avatars */}
              <div className="absolute left-10 top-32">
                <div className="h-10 w-10 rounded-full bg-purple-200 ring-4 ring-white shadow-sm" />
              </div>
              <div className="absolute left-6 top-44">
                <div className="h-12 w-12 rounded-full bg-pink-200 ring-4 ring-white shadow-sm" />
              </div>

              {/* stacked cards */}
              <div className="absolute right-6 top-20 w-[340px]">
                <div className="transform rotate-2 origin-top-right">
                  <div className="bg-background rounded-md border border-border p-3 shadow-md">
                    <div className="text-xs text-muted-foreground">11 mins read • 09-06-2023</div>
                    <div className="mt-2 font-semibold">CRED Interview Experience ( On Campus SDE - Backend )</div>
                  </div>
                </div>

                <div className="-mt-3 transform rotate-1 origin-top-right">
                  <div className="bg-background rounded-md border border-border p-3 shadow-md">
                    <div className="text-xs text-muted-foreground">5 mins read • 21-12-2022</div>
                    <div className="mt-2 font-semibold">Google STEP Internship Decoded</div>
                  </div>
                </div>

                <div className="-mt-3 transform -rotate-2 origin-top-right">
                  <div className="bg-background rounded-md border border-border p-3 shadow-md">
                    <div className="text-xs text-muted-foreground">5 mins read • 19-12-2022</div>
                    <div className="mt-2 font-semibold">Deutsche bank: Internship | Summer Intern 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-heading font-medium tracking-tight text-foreground">
              Built for reading, writing, and sharing.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-sidebar/50 px-4 pb-32 pt-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-left">
          <div className="mx-auto flex h-auto w-full flex-col items-center justify-center border-b border-t lg:h-[500px] lg:flex-row">
            <div className="relative h-full w-full overflow-hidden lg:w-1/2">
              <FeatureCardWithIcon
                icon={Comment01Icon}
                title="Collaborate with other writers"
                boldedText="Sign in with GitHub on "
                description="our platform, and get started with commenting on blog posts to collaborate with others."
              />

              <div className="relative h-[260px] w-full lg:h-[360px]">
                {comments.map((comment, index) => (
                  <CommentBubble key={index} {...comment} />
                ))}

                <AvatarStack avatars={avatars} />

                <div className="absolute bottom-0 right-0 select-none opacity-60">
                  <img src="/assets/images/world.png" alt="" className="select-none" draggable={false} />
                </div>
              </div>
            </div>

            <div className="z-[60] h-px w-full bg-border lg:h-full lg:w-px" />

            <div className="relative h-full w-full overflow-hidden lg:w-1/2">
              <FeatureCardWithIcon
                icon={Video01Icon}
                title="Video Collection"
                boldedText="Prefer Videos Over Blogs? "
                description="No worries! We've got an exciting collection of videos that bring the same inspiring stories and useful insights right to your screen."
              />

              <div className="pointer-events-none absolute left-1/2 top-[86%] w-[360px] -translate-x-1/2 -translate-y-1/2 scale-100 select-none rounded-3xl lg:w-[800px] lg:scale-80 xl:w-[1050px]">
                <img
                  src="/assets/images/VideoPage.png"
                  alt="VideoPage"
                  className="select-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="relative isolate overflow-hidden px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <BackgroundDots
          dotSize={1.8}
          dotColor="#cbcbcc"
          backgroundColor="transparent"
          gap={15}
          className="pointer-events-none opacity-50"
          fade
        />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <p className="text-sm font-medium text-foreground/90 sm:text-base">
            What is Anubhav?
          </p>
          <h2 className="mt-2 text-4xl font-heading font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Anubhav is Open Source
          </h2>

          <div className="mt-12 flex justify-center">
            <img
              src="/assets/Anubhav.svg"
              alt="Anubhav logo"
              className="h-44 w-44 select-none object-contain opacity-70 sm:h-52 sm:w-52"
              draggable={false}
            />
          </div>

          <p className="mt-10 max-w-2xl text-2xl leading-tight text-muted-foreground sm:text-3xl">
            Join our journey to make Anubhav better!
            <br />
            Contribute to the project on GitHub and help
            <br />
            us create something extraordinary.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/create" variant="outline" size="lg">
              Contribute Now
            </ButtonLink>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:h-8"
            >
              Star On Github
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
