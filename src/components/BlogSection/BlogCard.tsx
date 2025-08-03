"use client";

import Image from "next/image";
import Link from "next/link";
import MinuteReadLikes from "../MinuteReadLikes/MinuteReadLikes";
import Author from "./_Child/Author";

interface BlogCardProps {
  id: string;
  link: string;
  Title: string;
  imagesrc: string | { src: string };
  author: string;
  company: string;
  description?: string;
  readingTime: number;
  date: string;
}

const BlogCard = ({
  id,
  link,
  Title,
  imagesrc,
  author,
  company,
  // description,
  readingTime,
  date,
}: BlogCardProps) => {
  const imageSrc =
    typeof imagesrc === "string"
      ? imagesrc
      : imagesrc?.src || "/placeholder-image.png";

  return (
    <div className="max-w-5xl border-b pb-2">
      <div className="flex flex-col items-center justify-center gap-1 p-1 md:flex-row md:gap-4">
        <Link
          href={link}
          className="h-[280px] w-full overflow-hidden rounded-lg md:h-[110px] md:w-[220px]"
        >
          <Image
            src={imageSrc}
            alt={Title}
            width={280}
            height={180}
            className="h-full w-full rounded-lg object-cover"
          />
        </Link>

        <div className="flex h-full w-full grow flex-col items-start justify-between p-1 sm:self-start lg:justify-start lg:gap-2 x-sm:gap-0">
          <Link href={link}>
            <h1 className="text-[24px] font-medium text-foreground sm:text-[20px] x-sm:text-[16px]">
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
            id={id}
            readingTime={readingTime}
            timeStamp={date}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
