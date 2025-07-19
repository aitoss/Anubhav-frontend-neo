import React, { useState } from "react";
import Image from "next/image"; // Import the Image component
import Tag from "../InputTag/Tag";

const YoutubeCard = ({ title, img, link, description, tags }: any) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Determine width and height for YouTube thumbnails.
  // Common sizes: medium (320x180), high (480x360), standard (640x480), maxres (1280x720).
  // Assuming a common aspect ratio like 16:9 for most YouTube videos.
  // For a responsive `w-full` within `w-[20rem]`, a base width of 320 or 480 is good.
  const thumbnailWidth = 480; // A good base width for quality and flexibility
  const thumbnailHeight = 270; // 16:9 aspect ratio (480 / 16 * 9)

  return (
    <>
      <div className="w-[20rem] rounded-2xl bg-white p-1 transition-all duration-300 x-sm:w-full">
        <a href={link} target="_blank" rel="noopener noreferrer"> {/* Added rel="noopener noreferrer" for security */}
          <div className="relative w-full" style={{ paddingBottom: `${(thumbnailHeight / thumbnailWidth) * 100}%` }}>
            {/* Using Image component */}
            <Image
              src={img}
              alt={title}
              fill // Use fill to make the image cover its parent div
              sizes="(max-width: 640px) 100vw, 20rem" // Define sizes for responsiveness
              className={`absolute inset-0 w-full rounded-[10px] object-cover transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              // `loading="lazy"` is default for next/image, no need to specify
              onLoad={() => setIsLoaded(true)} // Keep your opacity transition logic
            />
          </div>
        </a>
        <div className="p-2"> {/* Added some padding here for content */}
          <h2 className="truncate text-[20px] font-[500] text-[#212121]">
            {title}
          </h2>
          <div className="flex flex-wrap gap-2 pt-[3px]">
            {tags.map((tag: string, index: number) => { // Added type for tag
              return <Tag key={index} name={tag} />;
            })}
          </div>
          <p className="content-start pt-[3px] leading-5 text-gray-500">
            {description.substring(0, 70)}...
          </p>
        </div>
      </div>
    </>
  );
};

export default YoutubeCard;