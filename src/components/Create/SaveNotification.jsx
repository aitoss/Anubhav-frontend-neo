import React, { useEffect } from 'react';
import { motion, useAnimation } from "framer-motion";

const SaveNotification = ({ isVisible, onClose }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      // Start animation to move the timer line from right to left
      controls.start({
        x: "-100%", // Move the timer line to the left (100% of its container width)
        transition: { duration: 2, ease: "linear" }, // Duration of 2 seconds with linear easing
      });

      // Close the notification after 2 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, controls]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 100 }}
      transition={{ duration: 0.15, delay: 0.0 }}
    >
      <div className="z-50 fixed top-[60px] flex items-start overflow-hidden justify-center h-full w-full">
        <div
          className="relative overflow-hidden z-50 w-full flex justify-center items-center flex-col border-[1px] max-w-xs p-3 text-gray-500 bg-white rounded-lg shadow-lg shadow-[rgba(0,0,0,0.05)]"
          role="alert"
        >
          <div className="flex flex-row justify-between w-full items-center">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              <span className="sr-only">Save icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">Draft saved successfully!</div>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
              onClick={onClose}
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <motion.div
            className="z-50 h-[2.5px] w-full bottom-0 absolute bg-[#a1a1a1] rounded-b-lg"
            initial={{ x: 0 }} // Initially, the timer line is at the rightmost position
            animate={controls} // Animate the movement of the timer line
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SaveNotification; 