import { LinkButton } from "@/components/ui/link-button";
import { StarIcon } from "lucide-react";
import FadeWrapper from "../../ui/fadeWrapper";
import Background from "./background";

const AnubhavIsOS = () => {
  return (
    <>
      <section className="relative z-50 mb-24 flex flex-col items-center gap-8 bg-[#f9f9f9] py-16">
        <Background />
        <FadeWrapper>
          <h2 className="text-4xl tracking-tight font-medium text-center text-[#212121] sm:text-3xl lg:text-6xl">
            Anubhav is Open Source
          </h2>
        </FadeWrapper>
        <FadeWrapper>
          <img
            src="/assets/Anubhav.svg"
            className="select-none"
            draggable={false}
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
          <LinkButton href="https://github.com/aitoss/Anubhav-frontend-23/issues" variant="outline">
            Contribute Now
          </LinkButton>
          <LinkButton href="https://github.com/aitoss/Anubhav-frontend-23" variant="default" icon={<StarIcon />}>
            Star On Github
          </LinkButton>
        </FadeWrapper>
      </section>
    </>
  );
};

export default AnubhavIsOS;
