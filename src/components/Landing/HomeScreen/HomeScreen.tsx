"use client";
import { AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BackgroundDots from "../../../app/assets/Background";
import SearchModal from "../../Search/SearchModal";
import ShortcutIcon from "../../Search/ShortcutIcon";
import Slider from "../../Slider/Slider";
import { AnimatedTooltip } from "../../Tooltip/tooltip";
import FadeWrapper from "../../ui/fadeWrapper";
import MaskWrapper from "../../ui/maskWrapper";

export default function HomeScreen() {
  const [OpenSearchModal, setOpenSearchModal] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const people = [
    {
      id: 1,
      name: "Google",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    },
    {
      id: 2,
      name: "Microsoft",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      id: 3,
      name: "Amazon",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
  ];

  const handleClick = () => {
    setOpenSearchModal(true);
  };

  useEffect(() => {
    if (OpenSearchModal) {
    }
  }, [OpenSearchModal]);

  const closeSearchModal = () => {
    setOpenSearchModal(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      // Check if Cmd key is pressed on Mac or Ctrl key on other platforms
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        // Focus on the input field when the shortcut is activated
        // inputRef.current.focus();
        setOpenSearchModal(true);
      }
    };

    // const handleClickOutside = (event) => {
    //   if (
    //     inputRef.current &&
    //     !inputRef.current.contains(event.target) &&
    //     !event.target.closest('.recent-searches')
    //   ) {
    //     setIsExpanded(false);
    //   }
    // };

    document.addEventListener("keydown", handleKeyDown);
    // document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const DummySearch = () => {
    return (
      <>
        <div className="search flex items-center justify-center gap-1 rounded-xl border-[1.5px] border-[#27272a] bg-[#121212] px-[4px] py-[1px] shadow-md shadow-[rgba(48,50,51,0.3)]">
          <div className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-[#27272a] bg-[#212121] p-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 28.6509C22.8289 28.6509 28.5 22.9798 28.5 15.9842C28.5 8.9886 22.8289 3.31754 15.8333 3.31754C8.83769 3.31754 3.16663 8.9886 3.16663 15.9842C3.16663 22.9798 8.83769 28.6509 15.8333 28.6509Z"
                stroke="#b9b9b9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M29.8333 29.9842L27.1666 27.3175"
                stroke="#b9b9b9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            ref={inputRef}
            onClick={handleClick}
            className="search h-[2.5rem] w-[350px] border-none bg-[#121212] px-3 font-[300] text-[#ffffffcc] outline-none placeholder:font-[300] placeholder:text-[rgba(255,255,255,0.6)] focus:outline-none placeholder:focus:border-none placeholder:focus:text-[rgba(255,255,255,0.8)] placeholder:focus:outline-none md:w-[280px] lg:w-[400px]"
            type=""
            placeholder="Search for your Dreams.."
          />
          <div
            className={`flex h-[32px] items-center justify-center rounded-md border-[1.5px] border-[#27272a] bg-[#212121] p-1 px-0.5 font-[400] text-[#b9b9b9]`}
          >
            <ShortcutIcon />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <AnimatePresence>
        {OpenSearchModal && (
          <SearchModal closeSearchModal={closeSearchModal} focus={1} full={1} />
        )}
      </AnimatePresence>
      {/* <div className="h-16 w-screen md:h-8 pt-20"></div> */}
      <main
        className="relative flex w-full flex-col items-center justify-center pt-20 lg:pb-20"
        style={
          {
            // backgroundImage: `url(${background2})`,
            // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
          }
        }
      >
        <BackgroundDots
          dotSize={1.8}
          dotColor="#cbcbcc"
          backgroundColor=""
          gap={15}
          className="custom-class"
          fade={true}
        />
        <section className="flex flex-col items-center justify-center gap-4 py-12">
          <FadeWrapper>
            <Link
              href="/videos"
              className="overflowhidden group relative flex cursor-pointer items-center justify-center rounded-full border border-[#ddd] bg-white p-1 pl-2 transition-colors duration-200"
            >
              <span className="spark mask-gradient overflowhidden absolute inset-0 h-[100%] w-[100%] animate-flip rounded-full [mask:linear-gradient(black,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,#00a6ed_360deg)] before:content-[''] before:[translate:0%_-15%]" />
              <span className="backdrop absolute inset-[1px] rounded-full bg-white transition-colors duration-200 group-hover:bg-neutral-50" />
              <span className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-tr from-neutral-500/10 blur-md"></span>
              <span className="z-10 flex items-center justify-center gap-1 py-0.5 text-sm font-[500] text-[#212121]">
                🎉 Video collection{" "}
                <span className="flex size-full h-full w-fit items-center justify-center rounded-full bg-neutral-200/50 px-2 py-0.5 transition-all group-hover:bg-neutral-200">
                  What's new
                  <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </span>
              </span>
            </Link>
          </FadeWrapper>
          <h1 className="flex justify-center text-6xl font-[600] tracking-tighter text-[#212121] sm:text-[3rem] lg:text-7xl">
            <FadeWrapper delay={0.05}>Success Stories</FadeWrapper>
          </h1>
          <p className="flex justify-center text-lg font-[500] text-[#444] lg:text-xl">
            <FadeWrapper delay={0.1}>
              Discover Inspiring Interview Experiences
            </FadeWrapper>
          </p>
          <FadeWrapper delay={0.15}>
            <div className="flex items-center gap-4">
              <div className="flex">
                <AnimatedTooltip items={people} />
                <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-white p-4 text-sm font-[500] text-[#444] shadow-lg shadow-[#0000001d]">
                  200+
                </div>
              </div>
              <p className="text-xl font-[500] text-[#444]">Articles written</p>
            </div>
          </FadeWrapper>
          <FadeWrapper delay={0.2}>
            <DummySearch />
          </FadeWrapper>
          <FadeWrapper delay={0.25}>
            <Link href="/search">
              <h3 className="group flex items-center justify-center border-b border-[#f9f9f9] pt-4 leading-3 hover:border-[#777]">
                Read Articles{" "}
                <div className="relative flex h-4 w-4 items-center">
                  <svg
                    className="absolute h-4 w-4 transition-all group-hover:translate-x-1 group-hover:opacity-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#212121"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
                    ></path>
                  </svg>
                  <svg
                    className="absolute h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#212121"
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.22 2.97a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06l2.97-2.97H3.75a.75.75 0 010-1.5h7.44L8.22 4.03a.75.75 0 010-1.06z"
                    ></path>
                  </svg>
                </div>{" "}
              </h3>
            </Link>
          </FadeWrapper>
        </section>
        <section className="flex w-full flex-col items-center pt-16">
          <MaskWrapper>
            <h1 className="text-[30px] text-black x-sm:text-[20px]">
              Exploring <span className="font-[500]">The Interview Safari</span>
            </h1>
          </MaskWrapper>
          <MaskWrapper>
            <Slider />
          </MaskWrapper>
        </section>
      </main>
    </>
  );
}
