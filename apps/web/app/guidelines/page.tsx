import type { Metadata } from "next"


export const metadata: Metadata = {
  title: "Guidelines",
  description:
    "How to contribute an interview experience to Anubhav, and how the review process works.",
}

// ponytail: the Vite page wrapped every paragraph in its own framer-motion
// stagger. Dropped - it is static prose. Re-add if the entrance matters.
export default function GuidelinesPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-4 py-6">
        <h1 className="mb-8 text-center text-4xl font-semibold">Guidelines</h1>

        <p className="text-muted-foreground leading-7">
          Anubhav, the experience sharing platform, welcomes contributions from anyone at
          AIT to support others on their journey to the next interview. It offers a wealth
          of articles and resources specifically tailored to college placements and
          interview experiences.
        </p>

        <h2 className="mt-10 mb-4 text-2xl font-semibold">Reviewing Process</h2>
        <ul className="text-muted-foreground list-disc space-y-2 pl-6 leading-7">
          <li>Step 1: Share your interview experience in the write-article section.</li>
          <li>
            Step 2: Submit your article. After submission, it will go for verification.
            Verification is just a small process to filter out spam articles.
          </li>
          <li>Step 3: After verification, it will be available on our platform.</li>
        </ul>

        <h2 className="mt-10 mb-4 text-2xl font-semibold">How to write an article</h2>
        <p className="text-muted-foreground leading-7">
          We&apos;ve created a user-friendly and straightforward article writing section.
          To ensure a clear understanding of how to use it, please refer to the following
          points:
        </p>
        <ol className="text-muted-foreground mt-4 list-decimal space-y-2 pl-6 leading-7">
          <li>
            Enter basic information like your name, company name, offered position, and
            email address.
          </li>
          <li>
            Write the article in the editor which offers a variety of features to
            streamline the article writing process, including the ability to add headings,
            code blocks, format text, insert emojis, images, and more.
          </li>
          <li>Add relevant tags related to your company and field.</li>
          <li>
            Click the submit button to send your article for spam check (verification
            step).
          </li>
        </ol>
      </main>
    </>
  )
}
