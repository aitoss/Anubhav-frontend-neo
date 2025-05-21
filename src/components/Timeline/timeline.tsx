"use client";
import { useMotionValueEvent, useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({
  data
}: any) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent dark:bg-neutral-950"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl w-full mx-auto lg:pb-20">
        {data.map((item: any, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center md:justify-start pt-6 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div>
              </div>
              <div className="h-10 absolute  w-10 rounded-full bg-transparent dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full lg:block hidden bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
            </div>
            <div className="relative pl-10 md:pl-4 w-full">
              <div className="flex items-center justify-start">
                <h3 className="text-xl font-[500] text-[#212121]">
                  {item.title}
                </h3>
                <h1 className="text-[#212121] dark:text-neutral-200 font-[500] text-base">&nbsp; - {item.heading}</h1>
              </div>
              {item.content}&nbsp;
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute  top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-[#777] via-[#212121] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
