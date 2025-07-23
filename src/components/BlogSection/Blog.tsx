"use client";
import Giscus from "@giscus/react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import { apiService } from "../../lib/api";
import { formatDate, ReadTime } from "../../services/date";
import MinuteReadLikes from "../MinuteReadLikes/MinuteReadLikes";
import Author from "./_Child/Author";
import Tags from "./_Child/Tags";
import Articles from "./Articles";
import BlogLoading from "./BlogLoading";
import Image from "next/image";

const LazyLoad = ({ children }: any) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: any) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current && observer) {
        observer.disconnect();
      }
    };
  }, []);

  return <div ref={ref}>{isVisible ? children : null}</div>;
};
const Blog = ({ id }: { id: string }) => {
  const [blogData, setBlogData] = useState<any>([]);
  const [similarArticles, setSimilarArticles] = useState<any>(null);
  const [timeStamp, setTimeStamp] = useState<string>("");
  const [readingTime, setReadingTime] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBlogData = async () => {
    try {
      const response = await apiService.getBlogById(id);
      setBlogData(response.data);
      setTimeStamp(formatDate(response.data.createdAt));
      const article = response.data;
      setReadingTime(ReadTime(article.description));
      await fetchSimilarBlogs(
        article.title,
        article.articleTags.join(","),
        article.companyName,
        article._id,
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setLoading(false);
    }
  };

  const fetchSimilarBlogs = async (
    title: any,
    articleTags: any,
    companyName: any,
    articleID: any,
  ) => {
    try {
      const params = { q: title, company: companyName, tags: articleTags };
      const response = await apiService.getSimilarBlogs(params);
      const filteredData = response.filter(
        (item: any) => item._id !== articleID,
      );
      setSimilarArticles(filteredData);
    } catch (error) {
      console.error("Error fetching similar blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
    window.scrollTo(0, 0);
  }, [id]);

  const MemoizedAuthor = useMemo(() => {
    return (
      <Author
        person={{
          name: blogData?.author?.name,
          company: blogData?.companyName,
        }}
      />
    );
  }, [blogData]);

  const MemoizedTags = useMemo(() => {
    return <Tags data={blogData?.articleTags} />;
  }, [blogData]);

  const MemoizedMinuteReadLikes = useMemo(() => {
    return (
      <MinuteReadLikes
        id={id}
        readingTime={readingTime}
        timeStamp={timeStamp}
      />
    );
  }, [id, readingTime, timeStamp]);

  return (
    <>
      {loading ? (
        <BlogLoading />
      ) : (
        <>
          <div className="max-w-7xl mx-auto items-center bg-white p-5 lg:mx-auto lg:w-[65%] lg:p-6 lg:px-20">
            <div className="h-10"></div>
            <div className="data w- flex-col items-start justify-center space-y-2 md:mt-0 lg:justify-start lg:p-4">
              <div className="heading">
                <a className="text-4xl font-bold tracking-tighter text-[#212121] lg:text-5xl x-sm:text-3xl">
                  {blogData?.title}
                </a>
              </div>
              {MemoizedAuthor}
              {MemoizedTags}
              {MemoizedMinuteReadLikes}
              {blogData.imageUrl !== "your_image_url_here" && (
                <div className="relative h-[250px] w-full overflow-hidden rounded-xl border lg:h-[300px] x-sm:h-[200px]">
                <Image
                  src={blogData?.imageUrl}
                  className="absolute inset-0 h-full w-full object-cover"
                  alt={blogData?.title || "Blog image"}
                  fill
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                </div>
              )}
              <div className="lorem-container flex flex-col items-center justify-center py-3 text-black">
                <div className="w-full rounded-lg bg-white text-[18px] shadow-none">
                  <ReactQuill
                    value={blogData?.description || ""} // Fallback to empty string
                    theme="bubble"
                    readOnly
                    className="h-full w-full"
                    modules={{
                      toolbar: false,
                    }}
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
              {similarArticles && similarArticles.length > 0 && (
                <Articles similarArticles={similarArticles} />
              )}
            </LazyLoad>
          </div>
        </>
      )}
    </>
  );
};

export default Blog;
