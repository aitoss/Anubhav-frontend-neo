"use client";
import { Camera } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { formatDate, ReadTime } from "../../services/date";
import Author from "../BlogSection/_Child/Author";
import Tag from "../InputTag/Tag";
import MinuteReadLikes from "../MinuteReadLikes/MinuteReadLikes";

const PreviewPage = ({ value, article, bannerImage, tags }: any) => {
  const MemoizedAuthor = useMemo(() => {
    return (
      <Author
        person={{
          name: value.name,
          company: value.company,
        }}
      />
    );
  }, [value.name, value.company]);

  const currentTimestamp = new Date().toISOString();

  const readingTime = useMemo(() => {
    const textContent = article.replace(/<[^>]+>/g, "");
    return ReadTime(textContent);
  }, [article]);

  const MemoizedMinuteReadLikes = useMemo(() => {
    return (
      <MinuteReadLikes
        readingTime={readingTime}
        timeStamp={formatDate(currentTimestamp)}
      />
    );
  }, [readingTime, currentTimestamp]);

  // Ref to handle scroll locking
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Prevent body from scrolling when mouse is over scrollable div
  useEffect(() => {
    const handleScrollLock = (e: any) => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer && scrollContainer.contains(e.target)) {
        e.stopPropagation();
      }
    };

    document.addEventListener("wheel", handleScrollLock, { passive: true });
    return () => {
      document.removeEventListener("wheel", handleScrollLock);
    };
  }, []);

  return (
    <>
      <div className="max-w-4xl w-full mx-auto pt-4">
        <h1 className="text-left text-2xl font-[500] text-[#212121]">
          Preview Your Article
        </h1>
        <div className="flex flex-col items-center justify-center">
          <div className="laptop-mockup h-[360px] w-[620px] rounded-t-xl border-2 bg-[#121212] p-3 md:h-[500px] md:w-full md:rounded-xl md:p-2 lg:h-[500px] lg:w-[920px] xs:rounded-3xl xs:p-1">
            <div
              className="laptop-screen flex h-full flex-col gap-2 overflow-y-auto bg-white p-2 px-12 md:rounded-md md:px-4 lg:px-32 xs:rounded-[20px]"
              ref={scrollContainerRef} // Attach the ref here
            >
              <h1 className="text-3xl font-bold">{value.title}</h1>
              {MemoizedAuthor}
              <div className="pointer-events-auto flex flex-wrap gap-2">
                {tags.map((tag: any, index: number) => (
                  <Tag key={index} name={tag} />
                ))}
              </div>
              <div className="pointer-events-auto">
                {MemoizedMinuteReadLikes}
              </div>
              {bannerImage ? (
                <img
                  src={bannerImage}
                  alt="Banner"
                  className="mb-4 h-40 w-full rounded-lg border object-cover"
                />
              ) : (
                <div className="mb-4 flex h-40 w-full items-center justify-center rounded-lg bg-gray-300">
                  <Camera size={48} className="text-gray-400" />
                </div>
              )}
              <div className="lorem-container flex flex-col items-center justify-center py-3 text-foreground">
                <div className="w-full rounded-lg bg-white text-[18px] shadow-none prose prose-lg max-w-none">
                  <div
                    dangerouslySetInnerHTML={{ __html: article }}
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-[5%] top-[40%] md:hidden h-16 w-[5px] rounded-e-sm bg-[#121212] block"></div>
          <div className="absolute right-[5%] top-[52%] md:hidden h-8 w-[5px] rounded-e-sm bg-[#121212] block"></div>
          <div className="laptop-base -mt-3 h-2 w-[620px] border-x-2 bg-[#212121] hidden md:block md:w-full lg:w-[920px]"></div>
          <div className="laptop-base -mx-8 h-4 w-[680px] rounded-b-xl border bg-[#121212] hidden md:block md:w-full lg:w-[980px]"></div>
        </div>
      </div>
    </>
  );
};

export default PreviewPage;
