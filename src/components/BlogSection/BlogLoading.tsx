import React from "react";
import { Skeleton, SVGSkeleton, SVGSkeletonWhite } from "./Skeleton";

const BlogLoading = () => {
  return (
    <>
      <div className="container mx-auto items-center p-5 lg:mx-auto lg:w-[65%] lg:p-6 lg:px-20">
        <br />
        <br />
        <br />
        <div className="w-full flex-col items-start justify-center space-y-2 md:mt-0 lg:justify-start lg:p-4">
          <SVGSkeleton className="h-[44px] w-3/4 rounded-[4px]" />
          <div className="flex items-center gap-2 py-2">
            <div className="flex h-6 w-6 items-center justify-center">
              <SVGSkeleton className="h-[17px] w-[17px] rounded-full" />
            </div>
            <a className="md-xl:w-24">
              <Skeleton className="w-[96px] max-w-full" />
            </a>
            <div className="h-4 w-[1px]"></div>
            <a className="md-xl:w-24">
              <Skeleton className="w-[64px] max-w-full" />
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2 py-1">
            <a className="rounded-full">
              <div className="flex items-center justify-center gap-1">
                <Skeleton className="w-[112px] max-w-full" />
              </div>
            </a>
            <a className="rounded-full">
              <div className="flex items-center justify-center gap-1 px-2">
                <Skeleton className="w-[40px] max-w-full" />
              </div>
            </a>
            <a className="rounded-full">
              <div className="flex items-center justify-center gap-1 px-2">
                <Skeleton className="w-[96px] max-w-full" />
              </div>
            </a>
            <a className="rounded-full">
              <div className="flex items-center justify-center gap-1 px-2">
                <Skeleton className="w-[56px] max-w-full" />
              </div>
            </a>
          </div>
          <div className="flex items-center pb-4 lg:gap-10">
            <p>
              <Skeleton className="w-[192px] max-w-full" />
            </p>
            <div className="ml-auto flex gap-3">
              <a>
                <SVGSkeleton className="h-[1rem] w-[1rem]" />
              </a>
              <a>
                <SVGSkeleton className="h-[1rem] w-[1rem]" />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-full flex-col items-center justify-center pb-4">
              <SVGSkeleton className="h-[400px] w-full rounded-lg object-cover md:h-[300px] lg:h-[300px] x-sm:h-[200px]" />
            </div>
            <div className="w-full shadow-none">
              <div className="wmde-markdown-color h-full w-full">
                <p>
                  <Skeleton className="w-[3376px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[1456px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[1304px] max-w-full" />
                </p>
                <pre>
                  <Skeleton className="w-[3376px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <p>
                  <Skeleton className="w-[2016px] max-w-full" />
                </p>
                <pre>
                  <Skeleton className="w-[4304px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <p>
                  <Skeleton className="w-[584px] max-w-full" />
                </p>
                <pre>
                  <Skeleton className="w-[4592px] max-w-full" />
                  <div>
                    <SVGSkeleton className="h-[12px] w-[120px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <pre>
                  <Skeleton className="w-[1464px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeleton className="h-[12px] w-full" />
                  </div>
                </pre>
                <pre>
                  <Skeleton className="w-[3688px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <p>
                  <Skeleton className="w-[448px] max-w-full" />
                </p>
                <pre>
                  <Skeleton className="w-[696px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <pre>
                  <Skeleton className="w-[3432px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <p>
                  <Skeleton className="w-[712px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[936px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[2096px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[1232px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[1056px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[3496px] max-w-full" />
                </p>
              </div>
            </div>
          </div>
          <div className="lorem-container flex flex-col items-center justify-center py-3">
            {/* <div className="lg:pb-10 w-full flex flex-col items-center justify-center">
                            <SVGSkeleton className="lg:h-[300px] lg:w-[750px] x-sm:h-[200px] md:h-[300px] object-cover rounded-lg w-full h-[400px]" />
                        </div> */}
            <div className="w-full shadow-none">
              <div className="wmde-markdown-color h-full w-full">
                <p>
                  <Skeleton className="w-[3376px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[1456px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[1304px] max-w-full" />
                </p>
                <pre>
                  <Skeleton className="w-[3376px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <p>
                  <Skeleton className="w-[2016px] max-w-full" />
                </p>
                <pre>
                  <Skeleton className="w-[4304px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <p>
                  <Skeleton className="w-[584px] max-w-full" />
                </p>
                <pre>
                  <Skeleton className="w-[4592px] max-w-full" />
                  <div>
                    <SVGSkeleton className="h-[12px] w-[120px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <pre>
                  <Skeleton className="w-[1464px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeleton className="h-[12px] w-full" />
                  </div>
                </pre>
                <pre>
                  <Skeleton className="w-[3688px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <p>
                  <Skeleton className="w-[448px] max-w-full" />
                </p>
                <pre>
                  <Skeleton className="w-[696px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <pre>
                  <Skeleton className="w-[3432px] max-w-full" />
                  <div>
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                    <SVGSkeletonWhite className="h-[12px] w-[12px]" />
                  </div>
                </pre>
                <p>
                  <Skeleton className="w-[712px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[936px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[2096px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[1232px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[1056px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[3496px] max-w-full" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogLoading;
