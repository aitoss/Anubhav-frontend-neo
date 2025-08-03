"use client";
import Giscus from "@giscus/react";
import { useMemo, useRef, useState, useCallback } from "react";
import { useBlogById } from "../../hooks/useBlogs";
import { useSimilarBlogs } from "../../hooks/useSearch";
import { formatDate, ReadTime } from "../../services/date";
import MinuteReadLikes from "../MinuteReadLikes/MinuteReadLikes";
import Author from "./_Child/Author";
import Tags from "./_Child/Tags";
import Articles from "./Articles";
import BlogLoading from "./BlogLoading";

const LazyLoad = ({ children }: any) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback((entries: any) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  const observer = useMemo(() => new IntersectionObserver(handleIntersection, { threshold: 0.1 }), [handleIntersection]);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (ref.current) {
      observer.unobserve(ref.current);
    }
    if (node) {
      observer.observe(node);
    }
    ref.current = node;
  }, [observer]);

  return <div ref={setRef}>{isVisible ? children : null}</div>;
};

const Blog = ({ id }: { id: string }) => {
  const { data: blogData, isLoading, error } = useBlogById(id);

  // Memoize processed blog data
  const processedBlogData = useMemo(() => {
    if (!blogData) return null;
    
    return {
      ...blogData,
      timeStamp: formatDate(blogData.createdAt),
      readingTime: ReadTime(blogData.description),
    };
  }, [blogData]);

  // Memoize similar blogs query
  const similarBlogsQuery = useMemo(() => {
    if (!processedBlogData) return null;
    
    const params = {
      q: processedBlogData.title,
      company: processedBlogData.companyName,
      tags: processedBlogData.articleTags?.join(","),
    };
    
    return params;
  }, [processedBlogData]);

  const { data: similarArticles } = useSimilarBlogs(similarBlogsQuery || undefined);

  // Memoize filtered similar articles
  const filteredSimilarArticles = useMemo(() => {
    if (!similarArticles || !processedBlogData) return null;
    return similarArticles.filter((item: any) => item._id !== processedBlogData._id);
  }, [similarArticles, processedBlogData]);

  // Memoize Author component
  const MemoizedAuthor = useMemo(() => {
    if (!processedBlogData) return null;
    return (
      <Author
        person={{
          name: processedBlogData.author?.name,
          company: processedBlogData.companyName,
        }}
      />
    );
  }, [processedBlogData]);

  // Memoize Tags component
  const MemoizedTags = useMemo(() => {
    if (!processedBlogData) return null;
    return <Tags data={processedBlogData.articleTags} />;
  }, [processedBlogData]);

  // Memoize MinuteReadLikes component
  const MemoizedMinuteReadLikes = useMemo(() => {
    if (!processedBlogData) return null;
    return (
      <MinuteReadLikes
        id={id}
        readingTime={processedBlogData.readingTime}
        timeStamp={processedBlogData.timeStamp}
      />
    );
  }, [id, processedBlogData]);

  if (isLoading) {
    return <BlogLoading />;
  }

  if (error || !processedBlogData) {
    return (
      <div className="max-w-7xl mx-auto items-center bg-white p-5 lg:mx-auto lg:w-[65%] lg:p-6 lg:px-20">
        <div className="text-center text-red-500">
          Failed to load blog. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto items-center bg-white px-5 lg:mx-auto lg:w-[65%] lg:px-6">
        <div className="data w- flex-col items-start justify-center space-y-2 md:mt-0 lg:justify-start lg:p-4">
          <div className="heading">
            <a className="text-4xl font-bold tracking-tighter text-[#212121] lg:text-5xl x-sm:text-3xl">
              {processedBlogData.title}
            </a>
          </div>
          {MemoizedAuthor}
          {MemoizedTags}
          {MemoizedMinuteReadLikes}
          {processedBlogData.imageUrl !== "your_image_url_here" && (
            <div className="relative h-[250px] w-full overflow-hidden rounded-xl border lg:h-[300px] x-sm:h-[200px]">
              <img
                src={processedBlogData.imageUrl}
                className="absolute inset-0 h-full w-full object-cover"
                alt=""
                loading="lazy"
              />
            </div>
          )}
          <div className="lorem-container flex flex-col items-center justify-center py-3 text-black">
            <div className="w-full rounded-lg bg-white text-[18px] shadow-none prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ __html: processedBlogData.description || "" }}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
        <h1 className="items-center justify-center text-center text-4xl font-medium text-slate-900 lg:ml-10 lg:text-left lg:text-4xl">
          Comments
        </h1>
        <Giscus
          repo="aitoss/Anubhav-frontend-23"
          repoId="R_kgDOKijwFQ"
          category="General"
          categoryId="DIC_kwDOKijwFc4CeLfX"
          mapping="pathname"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="light"
          lang="en"
        />
        <LazyLoad>
          {filteredSimilarArticles && filteredSimilarArticles.length > 0 && (
            <Articles similarArticles={filteredSimilarArticles} />
          )}
        </LazyLoad>
      </div>
    </>
  );
};

export default Blog;
