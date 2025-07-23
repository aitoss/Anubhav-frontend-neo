import { LinkButton } from "@/components/ui/link-button";
import { Pen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import Emoji1 from "public/assets/images/Emoji-1.png";
import Emoji2 from "public/assets/images/Emoji-2.png";
import Emoji from "public/assets/images/Emoji.png";
import FadeText from "../../ui/fadeText";
import FadeWrapper from "../../ui/fadeWrapper";
import MaskText from "../../ui/maskText";
import MaskWrapper from "../../ui/maskWrapper";

type CardProps = {
  title: string;
  description: string;
};

const Card = ({ title, description }: CardProps) => (
  <div className="relative w-full overflow-hidden rounded-2xl bg-background border shadow-sm p-4">
    <div className="z-10 flex w-full items-center justify-between p-0">
      <div className="flex flex-1 flex-col">
        <h3 className="z-50 mb-2 text-xl font-[500]">{title}</h3>
        <p className="z-50 text-[#5e5f6e]">{description}</p>
      </div>
      <LinkButton href="/create" variant="default" icon={<Pen />}>
        Write Article
      </LinkButton>
    </div>
    <div className="absolute right-1 top-16 -z-10 -rotate-[25deg] blur-[32px]">
      <div className="h-4 w-[300px] bg-[#212121]"></div>
    </div>
  </div>
);

type Card2Props = Record<string, never>;

const Card2: React.FC<Card2Props> = () => (
  <div className="relative h-[450px] w-full overflow-hidden rounded-2xl border bg-white shadow-sm">
    <div className="absolute left-1/2 top-[120%] z-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#212121]/5"></div>
    <div className="absolute left-1/2 top-[120%] z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#212121]/5"></div>
    <p className="absolute left-[5%] top-12 inline-flex -rotate-12 rounded-md border bg-[#f9f9f9] px-2 py-1">
      Fresh Stories
    </p>
    <p className="absolute right-12 top-12 inline-flex rotate-12 rounded-md border bg-[#f9f9f9] px-2 py-1">
      Latest Insights
    </p>
    <Image
      className="absolute left-[30%] top-[20%] scale-[33%] select-none object-cover"
      src={Emoji}
      alt="Emoji"
      draggable="false"
      width={190}
      height={190}
      priority
    />
    <Image
      className="absolute -bottom-8 left-[1%] scale-[33%] select-none object-cover"
      src={Emoji1}
      alt="Emoji 1"
      draggable="false"
      width={190}
      height={190}
    />
    <Image
      className="absolute bottom-0 right-[4%] scale-[33%] select-none object-cover"
      src={Emoji2}
      alt="Emoji 2"
      draggable="false"
      width={190}
      height={190}
    />
    <div className="absolute bottom-[-2%] left-[20%] z-[100] inline-flex rotate-6 select-none flex-col x-sm:bottom-[-5%] x-sm:left-[10%]">
      <Link
        href="/blog/6482c7f31efe8f6914eefe2e"
        className="-mb-2 inline-flex cursor-pointer flex-col rounded-lg border border-[#d2d2d6] bg-[#f9f9f9] p-2 text-[#212121] shadow-md backdrop-blur-[12px] transition-all duration-200 hover:z-[999] hover:scale-105 hover:bg-[#fcfcfc]"
      >
        <p className="font-[400] text-[#212121]/60">
          11 mins read • 09-06-2023
        </p>
        <h3>CRED Interview Experience ( On Campus SDE - Backend )</h3>
      </Link>
      <Link
        href="/blog/63a30bd3fa72a20c75f513e3"
        className="z-[99] -mb-2 inline-flex scale-[102%] cursor-pointer flex-col rounded-lg border border-[#d2d2d6] bg-[#f9f9f9] p-2 text-[#212121] shadow-md backdrop-blur-[12px] transition-all duration-200 hover:scale-105 hover:bg-[#fcfcfc]"
      >
        <p className="font-[400] text-[#212121]/60">5 mins read • 21-12-2022</p>
        <h3>Google STEP Internship Decoded</h3>
      </Link>
      <Link
        href="/blog/639f77bcfa72a20c75f5106a"
        className="z-[20] -mb-2 inline-flex cursor-pointer flex-col rounded-lg border border-[#d2d2d6] bg-[#f9f9f9] p-2 text-[#212121] shadow-md backdrop-blur-[12px] transition-all duration-200 hover:z-[99] hover:scale-105 hover:bg-[#fcfcfc]"
      >
        <p className="font-[400] text-[#212121]/60">5 mins read • 19-12-2022</p>
        <h3>Deutsche bank: Internship | Summer Intern 2023</h3>
      </Link>
      <Link
        href="/blog/61e1433251a2879b50add90e"
        className="z-[10] inline-flex cursor-pointer flex-col rounded-lg border border-[#d2d2d6] bg-[#f9f9f9] p-2 text-[#212121] shadow-md backdrop-blur-[12px] transition-all duration-200 hover:z-[99] hover:scale-105 hover:bg-[#fcfcfc]"
      >
        <p className="font-[400] text-[#212121]/60">
          15 mins read • 14-01-2022
        </p>
        <h3>Microsoft FTE Interview Experience from Engage 2021 [FTE]</h3>
      </Link>
    </div>
  </div>
);

const WhatIsAnubhav = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 pb-32 pt-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center text-left">
        <div className="mx-auto flex w-full flex-col items-center justify-center gap-8 lg:flex-row">
          <div className="flex w-full flex-col justify-between lg:h-[450px] lg:w-1/2">
            <div className="flex flex-col">
              <h2 className="-mb-2 text-sm font-[500] text-[#212121]">
                <MaskText textPhrase={["What is Anubhav?"]} />
              </h2>
              <h1 className="text-[2.6rem] font-[500] text-[#212121] x-sm:text-4xl">
                <MaskText textPhrase={["Discover Anubhav"]} />
              </h1>
            </div>
            <div className="mb-8 w-full text-[#5e5f6e] md:w-[90%]">
              <FadeText
                textPhrase={[
                  "Anubhav connects you with real placement experiences from AIT students who've successfully landed roles at top companies. Get insider tips, interview strategies, and salary insights that matter."
                ]}
              />
              <br />
              <FadeText
                textPhrase={[
                  "From coding interviews to HR rounds, find detailed breakdowns of what actually happens during the placement process."
                ]}
              />
              <MaskWrapper>
                <Link className="underline" href="/search">
                  Dive into Stories
                </Link>
              </MaskWrapper>
            </div>
            <div className="">
              <FadeWrapper>
                <Card
                  title="Share Your Journey"
                  description="Contribute your own success story to inspire others and help build a community of successful AIT students."
                />
              </FadeWrapper>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <FadeWrapper>
              <Card2 />
            </FadeWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsAnubhav;