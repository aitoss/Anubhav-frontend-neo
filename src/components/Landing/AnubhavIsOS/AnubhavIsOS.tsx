import { Github, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import ButtonV5 from "../../ui/buttonv5";
import FadeWrapper from "../../ui/fadeWrapper";
import Background from "./background";

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
          <Link
            to="https://github.com/aitoss/Anubhav-frontend-23/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonV5 icon={false} color="#f8f8f8" textColor="#212121">
              <div className="flex size-full items-center justify-center gap-2">
                Contribute Now
                <Github
                  size={20}
                  className="text-[#333] transition-all group-hover:text-[#222]"
                />
              </div>
            </ButtonV5>
          </Link>
          <Link
            to="https://github.com/aitoss/Anubhav-frontend-23"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonV5 icon={false}>
              <div className="flex items-center justify-center gap-1">
                <h5 className="flex gap-1 font-[400] -tracking-[0.2px]">
                  Star On Github
                </h5>
                {/* write svg */}
                <div className="flex w-5 items-center justify-end overflow-hidden">
                  <div className="w-5">
                    <div
                      className={`translate-x-[0%] opacity-0 transition-all duration-0 group-hover:translate-x-[100%] group-hover:text-[#ffffff] group-hover:opacity-100 group-hover:duration-300`}
                    >
                      <Star
                        size={20}
                        className="text-[#fffc] transition-all group-hover:text-white"
                      />
                    </div>
                  </div>
                  <div className="w-5">
                    <div
                      className={`translate-x-[0%] opacity-100 transition-all duration-0 group-hover:translate-x-[100%] group-hover:text-[#ffffff] group-hover:opacity-0 group-hover:duration-300`}
                    >
                      <Star
                        size={20}
                        className="text-[#fffc] transition-all group-hover:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ButtonV5>
          </Link>
        </FadeWrapper>
      </section>
    </>
  );
};

export default AnubhavIsOS;
