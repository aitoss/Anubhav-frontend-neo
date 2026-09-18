import Image from "next/image"
import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Anubhav grew from a conversation in Dec 2020 into the experience-sharing platform it is today.",
}

const MILESTONES = [
  {
    date: "Dec 2020",
    heading: "The Beginning",
    body: "The project originated from a random conversation between Arpit and Akshay sir. After that with the formation of the team with Satya sir and few club juniors, they started the development. The first version was designed by Rishabh sir.",
  },
  {
    date: "Jan 2021",
    heading: "The Launch",
    body: "By this time the basic portal was ready as per the expected design. Anubhav was launched by director sir and then shared with all through AIT Alumni page. The project received lots of compliments from everyone.",
    image: "/dev/story1.png",
  },
  {
    date: "July 2021",
    heading: "Anubhav Video Interview Series",
    body: "Due to pandemic juniors were unable to properly connect with seniors to seek guidance. So Arpit sir along with Abhishek sir started the Anubhav-video Interview series. In which seniors shared their college life, tech-non tech journey, along with tips for juniors. All the videos are available on OSS YouTube channel.",
    image: "/dev/story2.png",
  },
  {
    date: "Aug 2021",
    heading: "Product Ownership Transfer",
    body: "With the start of the new academic session, the product ownership is transferred to Akshay, Satya, Rishabh, and Palak.",
  },
  {
    date: "Oct 2023",
    heading: "Revamping Anubhav",
    body: "With the evolution of technology and the need for a better user experience, the new gen team began revamping Anubhav. The focus was on improving the interface, adding new features, and ensuring a seamless user journey for the students and alumni.",
  },
  {
    date: "Jan 2024",
    heading: "Brand New Anubhav",
    body: "The brand-new version of Anubhav has been released, featuring a sleek design, enhanced functionality, and several new features to support students and alumni in networking, learning, and sharing their experiences. The launch marked a new milestone for the platform and its users.",
    image: "/dev/Anubhav2024.png",
  },
  {
    date: "Mar 2024",
    heading: "Search Arrives",
    body: "Browsing alone stopped scaling as the archive grew, so search landed \u2014 letting juniors look up a company or a role directly instead of scrolling the full list of experiences.",
  },
  {
    date: "Jun 2024",
    heading: "Conversations on Every Article",
    body: "Reading someone's experience often raises follow-up questions. Comments were added so juniors could ask them on the article itself, turning one-way write-ups into a conversation with the author.",
  },
  {
    date: "July 2025",
    heading: "Accounts for Everyone",
    body: "Until now articles were submitted without an identity attached. Authentication landed, giving every contributor their own account \u2014 so experiences are tied to the person who lived them, and authors can come back to their own work.",
  },
  {
    date: "May 2026",
    heading: "Profiles and Smarter Sorting",
    body: "Accounts grew into full profiles that collect everything you have written and can be edited by their owner, and the article list learned to sort by relevance as well as by date.",
  },
  {
    date: "Sep 2026",
    heading: "Migrated to Next.js",
    body: "Anubhav moved off Vite and onto the Next.js App Router, rebuilt in TypeScript on a shared component library. Pages now render on the server for faster first loads and proper link previews, with the whole interface redesigned along the way.",
  },
]

export default function StoryPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-4xl px-4 py-6">
        <h1 className="py-6 text-center text-3xl font-semibold sm:text-4xl lg:py-8">Our Story</h1>

        <div className="border-border relative flex flex-col gap-12 border-l pl-6 sm:pl-10">
          {MILESTONES.map((milestone) => (
            <section key={milestone.date} className="relative">
              <span
                aria-hidden
                className="bg-foreground absolute top-2 -left-[1.6rem] size-2.5 rounded-full sm:-left-[2.85rem]"
              />
              <p className="text-muted-foreground text-sm font-medium tracking-[0.15em] uppercase">
                {milestone.date}
              </p>
              <h2 className="mt-1 text-2xl font-medium tracking-tight">{milestone.heading}</h2>
              <p className="text-muted-foreground mt-3 text-sm leading-7">{milestone.body}</p>
              {milestone.image ? (
                <Image
                  src={milestone.image}
                  alt={milestone.heading}
                  width={900}
                  height={540}
                  className="border-border mt-5 h-auto w-full rounded-lg border object-cover shadow-sm"
                />
              ) : null}
            </section>
          ))}
        </div>
      </main>
    </>
  )
}
