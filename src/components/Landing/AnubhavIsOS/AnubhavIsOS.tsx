import { LinkButton } from "@/components/ui/link-button";
import { StarIcon } from "lucide-react";
import FadeWrapper from "../../ui/fadeWrapper";
import Background from "./background";
import Image from "next/image"; // Import the Image component

const AnubhavIsOS = () => {
  return (
    <>
      <section className="relative z-50 mb-24 flex flex-col items-center gap-8 bg-[#f9f9f9] py-16">
        <Background />
        <FadeWrapper>
          <h2 className="text-5xl font-semibold tracking-tighter text-[#212121] sm:text-3xl lg:text-6xl">
            Anubhav is Open Source
          </h2>
        </FadeWrapper>
        <FadeWrapper>
          <Image // Replaced <img> with Image
            src="/assets/Anubhav.svg"
            alt="Anubhav Logo" // Added meaningful alt text
            width={400} // Provide a suitable width for the SVG
            height={100} // Provide a suitable height for the SVG
            className="select-none"
            // draggable={false} is not a direct prop on next/image;
            // drag behavior is often handled by browser or CSS `user-drag` if needed.
            // For SVGs, it's generally not an issue as they are vectors.
          />
        </FadeWrapper>
        <FadeWrapper delay={0.1}>
          <p className="mt-4 max-w-2xl px-4 text-center text-2xl font-medium text-[#444] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_200%)] sm:text-xl lg:text-3xl">
            Join our journey to make Anubhav better! Contribute to the project
            on GitHub and help us create something extraordinary.
          </p>
        </FadeWrapper>
        <FadeWrapper
          className="flex items-center justify-center gap-2"
          delay={0.2}
        >
          <LinkButton
            href="https://github.com/aitoss/Anubhav-frontend-23/issues"
            variant="outline"
          >
            Contribute Now
          </LinkButton>
          <LinkButton
            href="https://github.com/aitoss/Anubhav-frontend-23"
            variant="default"
            icon={<StarIcon />}
          >
            Star On Github
          </LinkButton>
        </FadeWrapper>
      </section>
    </>
  );
};

export default AnubhavIsOS;