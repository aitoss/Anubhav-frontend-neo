"use client"

import Link from "next/link"

import { BrandFilters } from "@/components/brand/marks"
import { StepDetails, StepPublish, StepWrite } from "@/components/brand/step-art"
import { Reveal } from "@/components/reveal"

const STEPS = [
  {
    title: "Enter info about you",
    description:
      "Enter basic information like your name, company name, offered position, and email address.",
    Art: StepDetails,
  },
  {
    title: "Write Your Article",
    description:
      "Use our intuitive editor to craft your blog post. Add headings, format text, and include images or links to make your content engaging and informative.",
    Art: StepWrite,
  },
  {
    title: "Preview and Publish",
    description:
      "Once you’re satisfied with your post, hit the publish button to make it live. Share it with your audience via social media or email newsletters.",
    Art: StepPublish,
  },
]

// ponytail: the Vite version used MaskText/MaskWrapper/FadeWrapper (three
// bespoke animation wrappers). Reveal covers the same intent, and now covers
// the rest of the landing page too; add the character mask back only if that
// specific effect is wanted.
export function HowItWorks() {
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-20 pb-32">
      <BrandFilters />
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center">
        <Reveal className="flex flex-col items-center">
        <p className="text-muted-foreground text-sm font-semibold tracking-[0.2em] uppercase">
          How It Works
        </p>
        <h2 className="font-heading mt-3 text-3xl font-medium sm:text-4xl tracking-tight text-balance">
          Get Started with Our Platform
        </h2>
        <p className="text-muted-foreground mt-4 mb-10 max-w-2xl text-pretty">
          Go{" "}
          <Link className="underline underline-offset-4" href="/create">
            here
          </Link>{" "}
          and follow these simple steps to create and publish your blog posts with ease.
          Our platform is designed to make the writing and publishing process as smooth as
          possible.
        </p>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map(({ title, description, Art }, index) => (
            <Reveal
              key={title}
              delay={index * 0.1}
              className="group border-border bg-card relative h-full w-full overflow-hidden rounded-2xl border shadow-sm"
            >
              <div className="h-full p-3">
                <div className="border-border bg-muted/40 relative w-full overflow-hidden rounded-xl border">
                  <Art />
                </div>
                <h3 className="mt-3 mb-2 text-left text-xl font-medium">{title}</h3>
                <p className="text-muted-foreground text-left text-base">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
