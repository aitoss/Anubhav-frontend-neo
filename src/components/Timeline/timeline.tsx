"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
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
      <div ref={ref} className="relative mx-auto w-full max-w-7xl lg:pb-20">
        {data.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center pt-6 md:justify-start md:gap-10"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div></div>
              <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-transparent dark:bg-black">
                <div className="hidden h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-800 lg:block" />
              </div>
            </div>
            <div className="relative w-full pl-10 md:pl-4">
              <div className="flex items-center justify-start">
                <h3 className="text-xl font-[500] text-[#212121]">
                  {item.title}
                </h3>
                <h1 className="text-base font-[500] text-[#212121] dark:text-neutral-200">
                  &nbsp; - {item.heading}
                </h1>
              </div>
              {item.content}&nbsp;
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-700"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[#777] from-[0%] via-[#212121] via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
