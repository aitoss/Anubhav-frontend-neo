import React from "react";
import { Link } from "react-router-dom";
import Author from "./_Child/Author";
import MinuteReadLikes from "../MinuteReadLikes/MinuteReadLikes";

const BlogCard = ({
  id,
  link,
  Title,
  imagesrc,
  author,
  company,
  readingTime,
  date,
}: any) => {
  return (
    <>
      <div className="max-w-5xl border-b pb-2">
        <div className="flex h-full w-full flex-row items-center justify-center gap-4 p-1 md:flex-col md:gap-1">
          <Link
            className="banner-image container h-[180px] w-[280px] rounded-lg md:h-[280px] md:w-full x-sm:h-[180px]"
            to={link}
          >
            <div
              className="banner-image container h-[180px] w-[280px] rounded-lg md:h-[280px] md:w-full x-sm:h-[180px]"
              style={{
                backgroundImage: `url(${typeof imagesrc === "string" ? imagesrc : imagesrc?.src})`,
              }}
            ></div>
          </Link>
          <div className="data flex h-full w-full grow flex-col items-start justify-between p-1 sm:self-start lg:justify-start lg:gap-2 md-2xl:w-min x-sm:gap-0">
            <Link to={link}>
              <h1 className="text-[24px] font-[500] text-gray-700 hover:text-gray-800 sm:text-[20px] x-sm:text-[16px]">
                {Title}
              </h1>
            </Link>
            <Author
              person={{
                name: author,
                company: company,
              }}
            />
            <MinuteReadLikes
              id={id} // Pass the id to MinuteReadLikes
              readingTime={readingTime}
              timeStamp={date}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
