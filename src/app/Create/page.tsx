"use client";
import AnimateIcon from "@/components/ui/animate-icon";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ChevronLeft, ChevronRight, Plane } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BasicInformation from "../../components/Create/BasicInformation";
import DragAndDropImageUpload from "../../components/Create/DragAndDropImageUpload";
import PreviewPage from "../../components/Create/PreviewPage";
import SubmittedCard from "../../components/Create/SubmittedCard";
import WriteHere from "../../components/Create/WriteHere";
import Footer from "../../components/Landing/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import BackgroundDots from "../../components/assets/Background";
import SuccessMessage from "../../components/notification/SuccessMessage";
import { BACKEND_URL } from "../../constants";
import useErrorToast from "../../hooks/useErrorToast";

const Create = () => {
  const initialState = {
    name: "",
    email: "",
    company: "",
    position: "",
    title: "",
  };

  const [file, setFile] = useState(null);
  const [bannerImage, setbannerImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState("");
  const [value, setValue] = useState(initialState);
  const [requestSend, setRequestSend] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const showError = useErrorToast();
  type ErrorFields = {
    name?: string;
    email?: string;
    company?: string;
    position?: string;
    title?: string;
    file?: string;
    tags?: string;
    article?: string;
  };

  const [errors, setErrors] = useState<ErrorFields>({});

  const publishPost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(BACKEND_URL + "/blogs", {
        title: value.title,
        authorName: value.name,
        authorEmailId: value.email,
        companyName: value.company,
        role: value.position,
        articleTags: tags,
        article: article,
        image: bannerImage,
      });
      setIsLoading(false);
      setValue(initialState);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error submitting post:", error.response?.data);
      showError("Failed to submit the article. Please try again.");
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    const newErrors: ErrorFields = {};

    if (step === 1) {
      if (!value.name) newErrors.name = "Name cannot be empty";
      if (!value.email) {
        newErrors.email = "Email cannot be empty";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.email)) {
          newErrors.email = "Please enter a valid email address";
        }
      }
      if (!value.company) newErrors.company = "Company cannot be empty";
      if (!value.position) newErrors.position = "Position cannot be empty";
      if (!value.title) newErrors.title = "Title cannot be empty";
      if (!file) newErrors.file = "Please upload a banner image";
      if (tags.length === 0)
        newErrors.tags = "Write a tag and press enter to add it";
    }

    if (step === 2 && article === "") {
      newErrors.article = "Please write your article before proceeding";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  // Calculate progress
  const progressPercentage = ((step - 1) / 3) * 100;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between bg-[#f9f9f9]">
      <BackgroundDots
        dotSize={1.8}
        dotColor="#cbcbcc"
        backgroundColor=""
        gap={15}
        className="custom-class"
        fade={true}
        style={undefined}
      />
      {isSubmitted && <SubmittedCard />}
      {isVisible && (
        <p className="relative flex w-full items-center justify-center bg-white/40 pb-1 pt-16 text-[#212121]">
          Before writing an article, please read the &nbsp;
          <Link href="/guidelines" target="_blank" className="underline">
            Guidelines
          </Link>
          .
        </p>
      )}

      <div className="mx-auto flex max-w-7xl w-full flex-col items-center gap-3 pt-4">
        {/* Progress Bar */}
        <div className="relative z-0 mt-4 h-12 w-[90%] border border-[#d3ddeb] bg-[#f9f9f9] md:w-[90%] md:text-[14px] lg:w-[70%] xl:w-[50%]">
          <div className="absolute inset-0 left-1/3 z-[99] w-3">
            <svg
              className="h-full w-full text-slate-300"
              viewBox="0 0 12 82"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 0V31L10.5 41L0.5 51V82"
                stroke="currentcolor"
                vectorEffect="non-scaling-stroke"
              ></path>
            </svg>
          </div>
          <div className="absolute inset-0 left-2/3 z-[99] w-3">
            <svg
              className="h-full w-full text-slate-300"
              viewBox="0 0 12 82"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0.5 0V31L10.5 41L0.5 51V82"
                stroke="currentcolor"
                vectorEffect="non-scaling-stroke"
              ></path>
            </svg>
          </div>
          <div
            className={`-50 absolute ${step >= 1 ? "bg-[#fff]" : ""} left-0 top-1/2 flex h-full w-1/3 -translate-y-1/2 translate-x-0 items-center justify-center text-[#212121]`}
          >
            1. Basic Info <span className="md:hidden">rmation</span>
          </div>
          <div
            className={`-50 absolute ${step >= 2 ? "bg-[#fff]" : ""} left-1/3 top-1/2 flex h-full w-1/3 -translate-y-1/2 translate-x-0 items-center justify-center text-[#212121]`}
          >
            2. Write Here
          </div>
          <div
            className={`-50 absolute ${step >= 3 ? "bg-[#fff]" : ""} right-0 top-1/2 flex h-full w-1/3 -translate-y-1/2 translate-x-0 items-center justify-center text-[#212121]`}
          >
            3. Preview <span className="md:hidden">&nbsp;& Publish</span>
          </div>
          <div
            className="absolute bottom-0 z-[999] h-1 bg-[#212121] transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        {step === 1 && (
          <BasicInformation
            value={value}
            setValue={setValue}
            tags={tags}
            setTags={setTags}
            file={file}
            setFile={setFile}
            bannerImage={bannerImage}
            setbannerImage={setbannerImage}
            DragAndDropImageUpload={DragAndDropImageUpload}
            errors={errors}
          />
        )}
        {step === 2 && (
          <WriteHere
            article={article}
            setArticle={setArticle}
            errors={errors}
          />
        )}
        {step === 3 && (
          <PreviewPage
            value={value}
            article={article}
            bannerImage={bannerImage}
            tags={tags}
          />
        )}
        <div className="flex w-[90%] justify-between gap-4 pb-4 lg:w-[70%]">
          {step > 1 && (
            <Button
              onClick={handleBack}
              className="group px-2.5"
              variant="outline"
              asChild
            >
              <span className="flex items-center">
                Previous
                <AnimateIcon><ChevronLeft /></AnimateIcon>
              </span>
            </Button>
          )}

          {step < 3 ? (
            <Button
              onClick={handleNext}
              className="group px-2.5"
              asChild
            >
              <span className="flex items-center">
                Next
                <AnimateIcon><ChevronRight /></AnimateIcon>
              </span>
            </Button>
          ) : (
            <Button
              onClick={publishPost}
              disabled={isLoading}
              className="group px-2.5"
              asChild
            >
              <span className="flex items-center">
                Publish
                <AnimateIcon><Plane /></AnimateIcon>
              </span>
            </Button>
          )}
        </div>

        {requestSend && (
          <SuccessMessage
            requestSend={requestSend}
            setRequestSend={setRequestSend}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Create;
