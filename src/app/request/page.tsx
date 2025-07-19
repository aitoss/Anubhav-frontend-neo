"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BackgroundDots from "../../components/assets/Background";
import Spinner from "../../components/assets/Spinner";
import Footer from "../../components/Landing/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ErrorMessage from "../../components/notification/ErrorMessage";
import SuccessMessage from "../../components/notification/SuccessMessage";
import ButtonV5 from "../../components/ui/buttonv5";
import { apiService } from "../../lib/api";

const RequestArticle = () => {
  const initialState = {
    name: "",
    seniorName: "",
    email: "",
    link: "",
    company: "",
    note: "",
  };

  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<typeof initialState>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestSend, setRequestSend] = useState<string | null>(null);
  const [companySuggestions, setCompanySuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCompanySuggestions = async () => {
      try {
        const response = await apiService.getAllCompanies();
        setCompanySuggestions(response);
      } catch (error) {
        console.error("Error fetching company suggestions:", error);
      }
    };
    fetchCompanySuggestions();
  }, []);

  const addError = (message: any) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValue((prevValue: any) => ({ ...prevValue, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const lastRequestTime = parseInt(
      localStorage.getItem("lastRequestTime") || "0",
    );
    const currentTime = new Date().getTime();
    if (lastRequestTime && currentTime - lastRequestTime < 3 * 60 * 60 * 1000) {
      addError("You can only submit a request once every 3 hours.");
      return;
    }
    try {
      const requestData = {
        requesterName: value.name,
        requesteeName: value.seniorName,
        requesteeContact: value.link,
        company: value.company,
        note: value.note,
        requesterEmailId: value.email,
      };
      await apiService.createArticleRequest(requestData);
      setIsLoading(false);
      setRequestSend("Request Sent Successfully");
      localStorage.setItem("lastRequestTime", currentTime.toString());
      setValue(initialState);
    } catch (error) {
      addError("Internal server error");
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ErrorMessage error={error} />
      <SuccessMessage
        requestSend={requestSend}
        setRequestSend={setRequestSend}
      />
      <Navbar />
      <BackgroundDots
        dotSize={1.8}
        dotColor="#cbcbcc"
        backgroundColor=""
        gap={15}
        className="custom-class"
        fade={true}
      />
      <div className="flex h-screen flex-col items-center justify-start">
        <div
          className="mx-auto flex flex-col items-center justify-center gap-3 pt-32"
        // style={{ backgroundImage: `url(${background2})` }}
        >
          {/* basic info */}
          <div className="flex w-[100%] justify-center">
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex w-[650px] max-w-[1600px] flex-col gap-3 md:w-full md:gap-1 md:px-3"
            >
              <div className="w-full">
                <motion.div
                  initial={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 100 }}
                  transition={{ duration: 0.15, delay: 0.05 }}
                >
                  <h2 className="text-2xl font-[600] text-[#212121]">
                    Whose experience you wanna know?
                  </h2>
                </motion.div>
              </div>

              <div className="flex gap-4 md:flex-col">
                <div className="flex w-[100%] flex-col gap-3 md:w-full md:gap-2">
                  <div className="flex flex-col gap-3 md:gap-1">
                    <motion.div
                      initial={{ opacity: 0, translateY: 10 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      exit={{ opacity: 0, translateY: 100 }}
                      transition={{ duration: 0.15, delay: 0.07 }}
                    >
                      <h4 className="ml-2 text-gray-700">About You</h4>
                    </motion.div>

                    <div className="flex flex-col gap-2">
                      <div className="relative flex flex-col gap-2">
                        <motion.div
                          initial={{ opacity: 0, translateY: 10 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          exit={{ opacity: 0, translateY: 100 }}
                          transition={{ duration: 0.15, delay: 0.09 }}
                        >
                          <input
                            required
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={value.name}
                            onChange={handleChange}
                            className="text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
                          />
                        </motion.div>
                      </div>

                      <div className="relative flex flex-col gap-2">
                        <motion.div
                          initial={{ opacity: 0, translateY: 10 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          exit={{ opacity: 0, translateY: 100 }}
                          transition={{ duration: 0.15, delay: 0.11 }}
                        >
                          <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="College mail ID"
                            value={value.email}
                            onChange={handleChange}
                            className="text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:gap-1">
                    <motion.div
                      initial={{ opacity: 0, translateY: 10 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      exit={{ opacity: 0, translateY: 100 }}
                      transition={{ duration: 0.15, delay: 0.13 }}
                    >
                      <h4 className="ml-2 text-gray-700">About Senior</h4>
                    </motion.div>
                    <div className="flex flex-col gap-2">
                      <div className="relative flex flex-col gap-2">
                        <motion.div
                          initial={{ opacity: 0, translateY: 10 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          exit={{ opacity: 0, translateY: 100 }}
                          transition={{ duration: 0.15, delay: 0.15 }}
                        >
                          <input
                            required
                            type="text"
                            name="seniorName"
                            id="name"
                            placeholder="Senior’s name"
                            value={value.seniorName}
                            onChange={handleChange}
                            className="text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
                          />
                        </motion.div>
                      </div>

                      <div className="relative flex flex-col gap-2">
                        <motion.div
                          initial={{ opacity: 0, translateY: 10 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          exit={{ opacity: 0, translateY: 100 }}
                          transition={{ duration: 0.15, delay: 0.16 }}
                        >
                          <input
                            required
                            type="text"
                            name="link"
                            id="email"
                            placeholder="Senior’s any social media link"
                            value={value.link}
                            onChange={handleChange}
                            className="text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
                          />
                        </motion.div>
                      </div>
                      <div className="relative flex flex-col gap-2">
                        <motion.div
                          initial={{ opacity: 0, translateY: 10 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          exit={{ opacity: 0, translateY: 100 }}
                          transition={{ duration: 0.15, delay: 0.17 }}
                        >
                          <input
                            required
                            type="text"
                            name="company"
                            id="email"
                            placeholder="Company Name"
                            list="companySuggestions"
                            value={value.company}
                            onChange={handleChange}
                            className="text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
                          />
                        </motion.div>
                        {/* <datalist id="companySuggestions">
                          {companySuggestions.map((suggestion, index) => (
                            <option key={index} value={suggestion} />
                          ))}
                        </datalist> */}
                      </div>

                      <div className="relative flex flex-col gap-2">
                        <motion.div
                          initial={{ opacity: 0, translateY: 10 }}
                          animate={{ opacity: 1, translateY: 0 }}
                          exit={{ opacity: 0, translateY: 100 }}
                          transition={{ duration: 0.15, delay: 0.18 }}
                        >
                          <textarea
                            required
                            rows={4}
                            name="note"
                            id="email"
                            placeholder="Personal note"
                            value={value.note}
                            onChange={handleChange}
                            className="text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* submit button */}
              <motion.div
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 100 }}
                transition={{ duration: 0.15, delay: 0.2 }}
              >
                <div className="flex flex-col justify-center gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="p-0 font-[400] outline-none focus:outline-none"
                  >
                    <ButtonV5 icon={false}>
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-1">
                          &nbsp; Processing <Spinner />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          Send Request
                          {/* airplane svg */}
                          <div className="flex w-5 items-center justify-end">
                            <div className="w-5">
                              <svg
                                className={`h-5 w-5 translate-x-[0%] translate-y-[66%] text-[#ffffff80] opacity-0 transition-all duration-0 group-hover:translate-x-[100%] group-hover:translate-y-[0%] group-hover:text-[#ffffff] group-hover:opacity-100 group-hover:duration-300`}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.39993 6.31991L15.8899 3.48991C19.6999 2.21991 21.7699 4.29991 20.5099 8.10991L17.6799 16.5999C15.7799 22.3099 12.6599 22.3099 10.7599 16.5999L9.91993 14.0799L7.39993 13.2399C1.68993 11.3399 1.68993 8.22991 7.39993 6.31991Z"
                                  stroke="#f0f0f0"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div className="w-5">
                              <svg
                                className={`h-5 w-5 translate-x-[0%] translate-y-[0%] text-[#ffffff80] opacity-100 transition-all duration-0 group-hover:-translate-y-[66%] group-hover:translate-x-[100%] group-hover:text-[#ffffff] group-hover:opacity-0 group-hover:duration-300`}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.39993 6.31991L15.8899 3.48991C19.6999 2.21991 21.7699 4.29991 20.5099 8.10991L17.6799 16.5999C15.7799 22.3099 12.6599 22.3099 10.7599 16.5999L9.91993 14.0799L7.39993 13.2399C1.68993 11.3399 1.68993 8.22991 7.39993 6.31991Z"
                                  stroke="#f0f0f0"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10.1101 13.6501L13.6901 10.0601"
                                  stroke="#f0f0f0"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}
                    </ButtonV5>
                  </button>
                  <div className="h-16"></div>
                </div>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RequestArticle;
