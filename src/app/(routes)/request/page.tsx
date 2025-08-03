"use client";
import AnimateIcon from "@/components/ui/animate-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import BackgroundDots from "../../../components/assets/Background";
import Navbar from "../../../components/Navbar/Navbar";
import ErrorMessage from "../../../components/notification/ErrorMessage";
import SuccessMessage from "../../../components/notification/SuccessMessage";
import { apiService } from "../../../lib/api";

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
  // const [companySuggestions, setCompanySuggestions] = useState<string[]>([]);

  // useEffect(() => {
  //   const fetchCompanySuggestions = async () => {
  //     try {
  //       const response = await apiService.getAllCompanies();
  //       setCompanySuggestions(response);
  //     } catch (error) {
  //       console.error("Error fetching company suggestions:", error);
  //     }
  //   };
  //   fetchCompanySuggestions();
  // }, []);

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
      <div className="flex h-screen w-full flex-col items-center justify-start">
        <div
          className="mx-auto flex w-full flex-col items-center justify-center gap-3 pt-32"
        // style={{ backgroundImage: `url(${background2})` }}
        >
          {/* basic info */}
          <div className="flex w-full justify-center">
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex w-full max-w-2xl flex-col gap-3 md:w-full md:gap-1 px-4 md:px-3"
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
                <div className="flex w-full flex-col gap-3 md:w-full md:gap-2">
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
                          <Input
                            required
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={value.name}
                            onChange={handleChange}
                            className="w-full bg-white p-3 text-[#3C3C43] placeholder:text-[#3C3C4399] focus:placeholder:text-[#3c3c4350] md:w-full"
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
                          <Input
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="College mail ID"
                            value={value.email}
                            onChange={handleChange}
                            className="w-full bg-white p-3 text-[#3C3C43] placeholder:text-[#3C3C4399] focus:placeholder:text-[#3c3c4350] md:w-full"
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
                          <Input
                            required
                            type="text"
                            name="seniorName"
                            id="name"
                            placeholder="Senior’s name"
                            value={value.seniorName}
                            onChange={handleChange}
                            className="w-full bg-white p-3 text-[#3C3C43] placeholder:text-[#3C3C4399] focus:placeholder:text-[#3c3c4350] md:w-full"
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
                          <Input
                            required
                            type="text"
                            name="link"
                            id="email"
                            placeholder="Senior’s any social media link"
                            value={value.link}
                            onChange={handleChange}
                            className="w-full bg-white p-3 text-[#3C3C43] placeholder:text-[#3C3C4399] focus:placeholder:text-[#3c3c4350] md:w-full"
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
                          <Input
                            required
                            type="text"
                            name="company"
                            id="email"
                            placeholder="Company Name"
                            list="companySuggestions"
                            value={value.company}
                            onChange={handleChange}
                            className="w-full bg-white p-3 text-[#3C3C43] placeholder:text-[#3C3C4399] focus:placeholder:text-[#3c3c4350] md:w-full"
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
                          <Textarea
                            required
                            rows={4}
                            name="note"
                            id="email"
                            placeholder="Personal note"
                            value={value.note}
                            onChange={handleChange}
                            className="w-full bg-white p-3 text-[#3C3C43] placeholder:text-[#3C3C4399] focus:placeholder:text-[#3c3c4350] md:w-full"
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
                <div className="flex flex-col justify-center gap-3 mt-4">
                  <Button
                    type="submit"
                    className="group px-2.5"
                    disabled={isLoading}
                    asChild
                  >
                    <span className="flex items-center">
                      Next
                      <AnimateIcon><ChevronRight /></AnimateIcon>
                    </span>
                  </Button>
                </div>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestArticle;
