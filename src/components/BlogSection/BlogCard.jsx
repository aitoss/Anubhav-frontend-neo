import React from "react";
import { Link } from "react-router-dom";
import Author from "./_Child/Author";
import MinuteReadLikes from "../MinuteReadLikes/MinuteReadLikes";

const EditButton = ({ ownerEditPath }) => (
  <div className="group relative">
    <span className="pointer-events-none absolute right-0 bottom-full z-30 mb-1.5 whitespace-nowrap rounded-md bg-[#212121] px-2 py-1 text-xs font-[400] text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100">
      Edit article
    </span>
    <Link
    to={ownerEditPath}
    aria-label="Edit article"
    onClick={(e) => e.stopPropagation()}
    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e5e7eb] bg-white/90 text-[#212121] shadow-sm backdrop-blur transition-all hover:bg-white"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
        stroke="#212121"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.0399 3.02001L8.15988 10.9C7.85988 11.2 7.55988 11.79 7.49988 12.22L7.06988 15.23C6.90988 16.32 7.67988 17.08 8.76988 16.93L11.7799 16.5C12.1999 16.44 12.7899 16.14 13.0999 15.84L20.9799 7.96001C22.3399 6.60001 22.9799 5.02001 20.9799 3.02001C18.9799 1.02001 17.3999 1.66001 16.0399 3.02001Z"
        stroke="#212121"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9099 4.15002C15.5799 6.54002 17.4499 8.41002 19.8499 9.09002"
        stroke="#212121"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Link>
  </div>
);

const BlogCard = ({
  id,
  link,
  Title,
  imagesrc,
  author,
  authorId,
  authorLogoUrl,
  company,
  readingTime,
  date,
  ownerEditPath,
}) => {
  return (
    <div className="relative max-w-5xl border-b pb-2">
      {ownerEditPath && (
        <div className="absolute right-1 top-1 z-20">
          <EditButton ownerEditPath={ownerEditPath} />
        </div>
      )}
      <div className="flex h-full w-full items-center justify-center gap-4 p-1 md:flex-col md:gap-1">
        <Link
          className="container banner-image h-[180px] w-[280px] rounded-lg md:h-[280px] md:w-full x-sm:h-[180px]"
          to={link}
        >
          <div
            className="container banner-image h-[180px] w-[280px] rounded-lg md:h-[280px] md:w-full x-sm:h-[180px]"
            style={{ backgroundImage: `url(${imagesrc})` }}
          />
        </Link>
        <div className="data flex h-full w-full grow flex-col items-start justify-between p-1 md-2xl:w-min lg:justify-start lg:gap-2 sm:self-start x-sm:gap-0">
          <Link to={link}>
            <h1 className="text-[24px] font-[500] text-gray-700 hover:text-gray-800 sm:text-[20px] x-sm:text-[16px]">
              {Title}
            </h1>
          </Link>
          <Author
            person={{
              _id: authorId,
              name: author,
              company,
              logoUrl: authorLogoUrl,
            }}
          />
          <MinuteReadLikes id={id} readingTime={readingTime} timeStamp={date} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
