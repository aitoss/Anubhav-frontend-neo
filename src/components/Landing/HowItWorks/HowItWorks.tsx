// HowItWorks.js
import React from "react";
import { Link } from "react-router-dom";
import Editor from "../../../app/assets/images/Editor.png";
import Form from "../../../app/assets/images/Form.png";
import Publish from "../../../app/assets/images/Publish.png";
import MaskWrapper from "../../ui/maskWrapper";
import FadeWrapper from "../../ui/fadeWrapper";
import MaskText from "../../ui/maskText";
import BasicInformation from "../../Create/BasicInformation";

const Card = ({ title, description, imageURL }: any) => (
  <div className="group relative h-full w-full overflow-hidden rounded-2xl border shadow-md">
    <div className="z-40 h-full bg-[#fff5] p-3 backdrop-blur-[36px]">
      <div className="relative z-10 w-full overflow-hidden">
        <div className="absolute -bottom-[12px] left-0 z-20 h-[40px] w-[150%] bg-[#fcfcfc] blur-[8px]"></div>
        <img
          className="bottom-0 right-0 translate-y-[5%] scale-95 select-none rounded-xl border transition-all duration-300 group-hover:translate-y-[10%] md:scale-100"
          src={imageURL}
          alt={imageURL}
          draggable="false"
        />
      </div>
      <h3 className="z-50 mb-2 text-left text-xl font-[500] x-sm:text-lg">
        {title}
      </h3>
      <p className="z-50 text-left text-base text-[#5e5f6e] x-sm:text-sm">
        {description}
      </p>
    </div>
    <div className="absolute right-1 top-16 -z-40 -rotate-[25deg]">
      <div className="h-4 w-[300px] bg-[#212121] blur-2xl"></div>
    </div>
  </div>
);
const HowItWorks = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 pb-32 pt-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center text-center">
        <div className="flex flex-col">
          <h2 className="-mb-2 text-sm font-[500] text-[#212121]">
            <MaskText textPhrase={["How It Works"]} />
          </h2>
          <h1 className="text-[2.6rem] font-[500] text-[#212121] x-sm:text-4xl">
            <MaskText textPhrase={["Get Started with Our Platform"]} />
          </h1>
        </div>

        <div className="mb-8 w-[60%] text-[#5e5f6e] md:w-[90%]">
          <MaskWrapper>
            Go&nbsp;
            <Link className="underline" to="/create">
              here
            </Link>
            &nbsp; and follow these simple steps to create and publish your blog
            posts with ease. Our platform is designed to make the writing and
            publishing process as smooth as possible.
          </MaskWrapper>
        </div>
        <div className="grid h-full grid-cols-3 gap-4 md:grid-cols-1">
          <FadeWrapper>
            <Card
              title="Enter info about you"
              description="Enter basic information like your name, company name, offered position, and email address."
              imageURL={Form.src}
            />
          </FadeWrapper>
          <FadeWrapper delay={0.15}>
            <Card
              title="Write Your Article"
              description="Use our intuitive editor to craft your blog post. Add headings, format text, and include images or links to make your content engaging and informative."
              imageURL={Editor.src}
            />
          </FadeWrapper>
          <FadeWrapper delay={0.25}>
            <Card
              title="Preview and Publish"
              description="Once you&rsquo;re satisfied with your post, hit the publish button to make it live. Share it with your audience via social media or email newsletters."
              imageURL={Publish.src}
            />
          </FadeWrapper>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
