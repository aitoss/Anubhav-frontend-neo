"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const STEPS = [
  {
    title: "Enter info about you",
    description:
      "Enter basic information like your name, company name, offered position, and email address.",
    image: "/assets/images/Form.png",
  },
  {
    title: "Write Your Article",
    description:
      "Use our intuitive editor to craft your blog post. Add headings, format text, and include images or links to make your content engaging and informative.",
    image: "/assets/images/Editor.png",
  },
  {
    title: "Preview and Publish",
    description:
      "Once you’re satisfied with your post, hit the publish button to make it live. Share it with your audience via social media or email newsletters.",
    image: "/assets/images/Publish.png",
  },
]

// ponytail: the Vite version used MaskText/MaskWrapper/FadeWrapper (three
// bespoke animation wrappers). One whileInView fade-and-rise covers the same
// intent; add the character mask back only if that specific effect is wanted.
export function HowItWorks() {
  return (
    <section className="flex flex-col items-center justify-center px-4 pt-20 pb-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-center">
        <p className="text-muted-foreground text-sm font-semibold tracking-[0.2em] uppercase">
          How It Works
        </p>
        <h2 className="font-heading mt-3 text-4xl font-medium tracking-tight text-balance">
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

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.12, ease: [0.33, 1, 0.68, 1] }}
              className="group border-border bg-card relative h-full w-full overflow-hidden rounded-2xl border shadow-sm"
            >
              <div className="h-full p-3">
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={600}
                    height={360}
                    className="border-border w-full translate-y-[5%] scale-95 rounded-xl border transition-transform duration-300 select-none group-hover:translate-y-[10%] md:scale-100"
                    draggable={false}
                  />
                </div>
                <h3 className="mt-3 mb-2 text-left text-xl font-medium">{step.title}</h3>
                <p className="text-muted-foreground text-left text-base">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
