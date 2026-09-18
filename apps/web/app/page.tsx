import Link from "next/link"
import { ButtonLink } from "@/components/button-link"
import { SearchTrigger } from "@/components/search-trigger"
import PartnersMarquee from "@/components/partners-marquee"
import { BackgroundDots } from "@/components/background-dots"
import { SendArrowIcon } from "@/components/send-arrow-icon"
import { FeatureCardWithIcon } from "@/components/feature-card-with-icon"
import { HowItWorks } from "@/components/how-it-works"
import { StoryStack } from "@/components/story-stack"
import { FeatureCards } from "@/components/feature-cards"
import { AnnouncementPill } from "@/components/announcement-pill"
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
          <AnnouncementPill />
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

          <StoryStack />
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
          <FeatureCards />
        </div>
      </section>

      <HowItWorks />

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

              <Link
                href="/videos"
                aria-label="Browse the video collection"
                className="absolute left-1/2 top-[86%] w-[360px] -translate-x-1/2 -translate-y-1/2 scale-100 select-none rounded-3xl lg:w-[800px] lg:scale-80 xl:w-[1050px]"
              >
                <img
                  src="/assets/images/VideoPage.png"
                  alt="VideoPage"
                  className="select-none"
                  draggable={false}
                />
              </Link>
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

      <section className="flex justify-center px-4 pb-12">
        <div className="border-border bg-card flex w-full max-w-7xl flex-col items-start justify-between gap-8 rounded-2xl border p-8 shadow-lg md:p-16 lg:flex-row lg:items-center">
          <div className="flex flex-col items-start gap-6">
            <h2 className="font-heading text-left text-[2.6rem] leading-[1.1] font-medium tracking-tight">
              Discover Our
              <br />
              Latest Insights
            </h2>
            <p className="text-muted-foreground max-w-xl text-left">
              Dive into our blog to explore a variety of topics, from industry trends to
              practical tips. Whether you&rsquo;re looking for inspiration or knowledge,
              we&rsquo;ve got something for everyone.{" "}
              <span className="text-foreground font-semibold">Explore now</span> and stay
              updated with our latest posts.
            </p>
            <ButtonLink href="/article" size="lg">
              Start Reading
            </ButtonLink>
          </div>
        </div>
      </section>

    </main>
  )
}
