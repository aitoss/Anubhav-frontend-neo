import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const SuccessMessage = ({
  requestSend,
  setRequestSend
}: any) => {
  const controls = useAnimation();

  useEffect(() => {
    if (requestSend) {
      // Start animation to move the timer line from right to left
      controls.start({
        x: "-100%", // Move the timer line to the left (100% of its container width)
        transition: { duration: 3, ease: "linear" }, // Duration of 3 seconds with linear easing
      });

      // Close the success message after 3 seconds
      const timer = setTimeout(() => {
        setRequestSend(false);
      }, 3000);

      // Clear the timer when the component unmounts or when the requestSend state changes
      return () => clearTimeout(timer);
    }
  }, [requestSend, setRequestSend, controls]);

  return (
    <>
      {requestSend && (
        <motion.div
          initial={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 100 }}
          transition={{ duration: 0.15, delay: 0.0 }}
        >
          <div className="z-50 fixed top-[60px] flex items-start overflow-hidden justify-center h-full w-full">
            <div
              id="toast-success"
              className="relative overflow-hidden z-50 w-full flex justify-center items-center flex-col border-[1px] max-w-xs p-3 text-gray-500 bg-white rounded-lg shadow-lg shadow-[rgba(0,0,0,0.05)] dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div className="flex flex-row justify-between w-full items-center">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  <span className="sr-only">Check icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">{requestSend}</div>
                <button
                  type="button"
                  className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={() => setRequestSend(false)}
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
      )}
    </>
  );
};

export default SuccessMessage;
