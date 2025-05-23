import React, { useState, useEffect } from "react";

const MinuteReadLikes = ({ id, readingTime, timeStamp }: any) => {
  const [heartColor, setHeartColor] = useState<string>("#d6d6d6");
  const [bookmarkColor, setBookmarkColor] = useState<string>("#d6d6d6");
  const [animateHeart, setAnimateHeart] = useState<boolean>(false);
  const [animateBookmark, setAnimateBookmark] = useState<boolean>(false);

  useEffect(() => {
    const heart = localStorage.getItem(`heart_${id}`);
    const bookmark = localStorage.getItem(`bookmark_${id}`);

    if (heart === "true") {
      setHeartColor("#e0245e");
    }

    if (bookmark === "true") {
      setBookmarkColor("#414141");
    }
  }, [id]);

  const heartClick = () => {
    const heart = localStorage.getItem(`heart_${id}`);
    if (heart === "true") {
      localStorage.setItem(`heart_${id}`, "false");
      setHeartColor("#d6d6d6");
    } else {
      localStorage.setItem(`heart_${id}`, "true");
      setHeartColor("#e0245e");
    }
    setAnimateHeart(true);
    setTimeout(() => setAnimateHeart(false), 400);
  };

  const bookmarkClick = () => {
    const bookmark = localStorage.getItem(`bookmark_${id}`);
    if (bookmark === "true") {
      localStorage.setItem(`bookmark_${id}`, "false");
      setBookmarkColor("#d6d6d6");
    } else {
      localStorage.setItem(`bookmark_${id}`, "true");
      setBookmarkColor("#414141");
    }
    setAnimateBookmark(true);
    setTimeout(() => setAnimateBookmark(false), 400);
  };

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <p className="text-[#8b8e93]">
          {readingTime} mins read • {timeStamp}
        </p>
        <div className="flex items-center justify-center gap-2">
          <svg
            style={{ fill: heartColor, stroke: "none" }}
            onClick={heartClick}
            className={`${animateHeart ? "ping-pong" : ""} cursor-pointer`}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.44 3.1001C14.63 3.1001 13.01 3.9801 12 5.3301C10.99 3.9801 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.6001 2 8.6901C2 9.8801 2.19 10.9801 2.52 12.0001C4.1 17.0001 8.97 19.9901 11.38 20.8101C11.72 20.9301 12.28 20.9301 12.62 20.8101C15.03 19.9901 19.9 17.0001 21.48 12.0001C21.81 10.9801 22 9.8801 22 8.6901C22 5.6001 19.51 3.1001 16.44 3.1001Z" />
          </svg>
          <svg
            style={{ fill: bookmarkColor, stroke: "none" }}
            onClick={bookmarkClick}
            className={`${animateBookmark ? "ping-pong" : ""} cursor-pointer`}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.82 2H7.18001C5.05001 2 3.32001 3.74 3.32001 5.86V19.95C3.32001 21.75 4.61001 22.51 6.19001 21.64L11.07 18.93C11.59 18.64 12.43 18.64 12.94 18.93L17.82 21.64C19.4 22.52 20.69 21.76 20.69 19.95V5.86C20.68 3.74 18.95 2 16.82 2Z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default MinuteReadLikes;
