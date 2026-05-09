import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Author from "./_Child/Author";
import MinuteReadLikes from "../MinuteReadLikes/MinuteReadLikes";

const KebabMenu = ({ ownerEditPath }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        aria-label="Article actions"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent bg-white/0 text-[#666] transition-all hover:border-[#e5e7eb] hover:bg-white hover:text-[#212121]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-1 w-32 overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-lg">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false);
              navigate(ownerEditPath);
            }}
            className="block w-full bg-white px-3 py-2 text-left text-sm text-[#212121] hover:bg-[#f5f5f5]"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

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
          <KebabMenu ownerEditPath={ownerEditPath} />
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
