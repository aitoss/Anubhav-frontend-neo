"use client"

import Link from "next/link"

import { StepDetails, StepPublish, StepWrite } from "@/components/brand/step-art"
import { Reveal } from "@/components/reveal"
import { PlateCard, SectionHeading } from "@/components/brand/section"

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
    <section className="px-4 pt-20 pb-28 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <SectionHeading
          fig="03"
          eyebrow="How it works"
          title="Three steps from an interview you sat to an article someone else reads."
          description={
            <>
              Go{" "}
              <Link className="underline underline-offset-4" href="/create">
                here
              </Link>{" "}
              and follow these. The editor does the formatting; you supply what
              actually happened in the room.
            </>
          }
        />

        <div className="mt-12 grid w-full grid-cols-1 gap-px md:grid-cols-3">
          {STEPS.map(({ title, description, Art }, index) => (
            <Reveal key={title} delay={index * 0.1} className="h-full">
              <PlateCard
                fig={String(index + 1).padStart(2, "0")}
                title={title}
                description={description}
              >
                <Art />
              </PlateCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
