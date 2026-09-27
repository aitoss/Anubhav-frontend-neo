import Link from "next/link"
import { ButtonLink } from "@/components/button-link"
import { SearchTrigger } from "@/components/search-trigger"
import { BackgroundDots } from "@/components/background-dots"
import PartnersMarquee from "@/components/partners-marquee"
import { SendArrowIcon } from "@/components/send-arrow-icon"
import { FeatureCardWithIcon } from "@/components/feature-card-with-icon"
import { HowItWorks } from "@/components/how-it-works"
import { StoryStack } from "@/components/story-stack"
import { FeatureCards } from "@/components/feature-cards"
import { AnnouncementPill } from "@/components/announcement-pill"
import { BrandFilters } from "@/components/brand/marks"
import { HeroBackdrop } from "@/components/brand/hero-collage"
import { CommentBubble } from "@/components/comment-bubble"
import { AvatarStack, type Avatar } from "@/components/avatar-stack"
import { ChatBubbleOvalLeftIcon, VideoCameraIcon } from "@heroicons/react/24/solid"


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
    position: { top: "6%", left: "3%" },
    iconColor: "#313131",
    borderColor: "#121212",
    backgroundColor: "#313131",
    name: "Lokendra Kushwah",
  },
  {
    position: { bottom: "8%", left: "6%" },
    iconColor: "#2E90FA",
    borderColor: "#1570EF",
    backgroundColor: "#2E90FA",
    name: "Nikhil Dhariwal",
  },
  {
    position: { top: "34%", right: "3%" },
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
    <main className="bg-background text-foreground min-h-screen">
      <BrandFilters />

      <section className="relative isolate overflow-hidden px-4 pt-10 pb-28 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16 lg:pb-14">
        {/* One figure spread across the whole section, behind the type. Narrow
            screens crop hard, so they get the right-hand end of the climb,
            where the ridge is, rather than the faint middle. */}
        {/* Narrow screens get the whole figure rather than a crop of it, sat
            behind the type and run wider than the viewport so it still has
            some presence at that size. */}
        <HeroBackdrop
          idPrefix="n"
          fit="meet"
          className="pointer-events-none absolute bottom-0 left-1/2 w-[150%] -translate-x-[76%] translate-y-[16%] lg:hidden"
        />
        <HeroBackdrop
          idPrefix="w"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        />

        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 text-center">
          <AnnouncementPill />

          <h1 className="font-heading text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Stories of success <span className="text-brand">from the community</span>
          </h1>

          <p className="text-muted-foreground max-w-xl text-sm md:text-lg leading-8 text-balance">
            Anubhav is a space for interview experiences, across placements,
            internships, and career journeys.
          </p>

          <div className="w-full max-w-xl">
            <SearchTrigger />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="/article" size="lg">
              Start reading
            </ButtonLink>
            <ButtonLink href="/create" variant="outline" size="lg">
              Share your story
            </ButtonLink>
          </div>


        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          {/* Partner logos bar */}
          <div className="mt-16 w-full sm:mt-24 lg:mt-32">
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
            <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-medium tracking-tight text-foreground">
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
            <h2 className="mt-3 text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
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
                icon={ChatBubbleOvalLeftIcon}
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
                  <img
                    src="/assets/images/world.png"
                    alt=""
                    className="w-40 max-w-none select-none sm:w-auto"
                    draggable={false}
                  />
                </div>
              </div>
            </div>

            <div className="z-[60] h-px w-full bg-border lg:h-full lg:w-px" />

            <div className="relative h-full w-full overflow-hidden lg:w-1/2">
              <FeatureCardWithIcon
                icon={VideoCameraIcon}
                title="Video Collection"
                boldedText="Prefer Videos Over Blogs? "
                description="No worries! We've got an exciting collection of videos that bring the same inspiring stories and useful insights right to your screen."
              />

              {/* On phones this sat at top-86% translated -50%, so the tall
                  screenshot rode up over the description. Pin it to the bottom
                  as a cropped strip instead, and keep the original framing
                  from lg up. */}
              <Link
                href="/videos"
                aria-label="Browse the video collection"
                className="relative mt-5 block select-none rounded-3xl lg:absolute lg:mt-0 lg:left-1/2 lg:top-[86%] lg:w-[800px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:scale-80 xl:w-[1050px]"
              >
                <img
                  src="/assets/images/VideoPage.png"
                  alt=""
                  className="h-32 w-full rounded-t-xl border border-border object-cover object-top select-none sm:h-40 lg:h-auto lg:rounded-none lg:border-0"
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
          <h2 className="mt-2 text-3xl font-heading font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl">
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
            <h2 className="font-heading text-left text-3xl leading-[1.15] sm:text-[2.6rem] sm:leading-[1.1] font-medium tracking-tight">
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
