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
  date
}: any) => {
  return (
    <>
      <div className="pb-2 border-b max-w-5xl">
        <div className="flex flex-row md:flex-col md:gap-1 w-full h-full justify-center items-center gap-4 p-1 ">
          <Link
            className="container md:w-full md:h-[280px] x-sm:h-[180px] w-[280px] h-[180px] rounded-lg banner-image"
            to={link}
          >
            <div
              className="container md:w-full md:h-[280px] x-sm:h-[180px] w-[280px] h-[180px] rounded-lg banner-image "
              style={{ backgroundImage: `url(${imagesrc})` }}
            ></div>
          </Link>
          <div
            className="md-2xl:w-min w-full data flex items-start lg:justify-start justify-between h-full flex-col grow lg:gap-2 x-sm:gap-0 p-1 sm:self-start"
          >
            <Link
              to={link}
            >
              <h1 className="text-[24px] sm:text-[20px] font-[500] x-sm:text-[16px] text-gray-700 hover:text-gray-800 ">
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