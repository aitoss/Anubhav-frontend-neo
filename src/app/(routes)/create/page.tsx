"use client";
import BasicInformation from "@/components/Create/BasicInformation";
import PreviewPage from "@/components/Create/PreviewPage";
import SubmittedCard from "@/components/Create/SubmittedCard";
import WriteHere from "@/components/Create/WriteHere";
import BackgroundDots from "@/components/assets/Background";
import SuccessMessage from "@/components/notification/SuccessMessage";
import AnimateIcon from "@/components/ui/animate-icon";
import { Button } from "@/components/ui/button";
import useCreateForm from "@/hooks/form/useCreateForm";
import useErrorToast from "@/hooks/useErrorToast";
import { apiService } from "@/lib/api";
import { ChevronLeft, ChevronRight, Plane } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Create = () => {
  // Form management with persistent storage
  const {
    formData,
    step,
    errors,
    isLoading,
    updateFormData,
    setIsLoading,
    handleNext,
    handleBack,
    resetAfterSubmission,
  } = useCreateForm();

  // Local state for UI interactions
  const [bannerImage, setBannerImage] = useState<string | ArrayBuffer | null>(null);
  const [file, setFile] = useState(null);
  const [requestSend, setRequestSend] = useState<string | null>(null);
  const [isVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const showError = useErrorToast();

  const publishPost = async () => {
    setIsLoading(true);
    try {
      await apiService.createBlog({
        title: formData.title,
        authorName: formData.name,
        authorEmailId: formData.email,
        companyName: formData.company,
        role: formData.position,
        articleTags: formData.tags,
        article: formData.article,
        image: bannerImage,
      });

      // Clear localStorage after successful submission
      resetAfterSubmission();
      setIsSubmitted(true);
      setIsLoading(false);

    } catch (error: any) {
      console.error("Error submitting post:", error.response?.data);
      showError("Failed to submit the article. Please try again.");
      setIsLoading(false);
    }
  };

  // Calculate progress
  const progressPercentage = ((step - 1) / 3) * 100;

  return (
    <div className="relative flex flex-col items-center justify-between">
      <BackgroundDots
          dotSize={1.25}
          dotColor="#cbcbcb"
          backgroundColor=""
          gap={10}
          className="custom-class"
          fade={true}
        />
      {isSubmitted && <SubmittedCard />}
      {isVisible && (
        <p className="relative flex w-full items-center justify-center mt-2 bg-white/40 pb-1 text-[#212121]">
          Before writing an article, please read the &nbsp;
          <Link href="/guidelines" target="_blank" className="underline">
            Guidelines
          </Link>
          .
        </p>
      )}

      <div className="mx-auto flex max-w-7xl w-full flex-col items-center gap-3 mb-6">
        {/* Progress Bar */}
        <div className="relative z-0 mt-4 h-12 w-[90%] border border-[#d3ddeb] md:w-[90%] md:text-[14px] lg:w-[70%] xl:w-[50%]">
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

        {/* Form Steps */}
        {step === 1 && (
          <BasicInformation
            value={formData}
            setValue={(newValue: any) => updateFormData(newValue)}
            tags={formData.tags}
            setTags={(tags: string[]) => updateFormData({ tags })}
            file={file}
            setFile={setFile}
            bannerImage={bannerImage}
            setbannerImage={(image: string | ArrayBuffer | null) => {
              setBannerImage(image);
              // Also update form data for validation
              updateFormData({ bannerImageUrl: image as string });
            }}
            errors={errors}
          />
        )}

        {step === 2 && (
          <WriteHere
            article={formData.article}
            setArticle={(article: string) => updateFormData({ article })}
            errors={errors}
          />
        )}

        {step === 3 && (
          <PreviewPage
            value={formData}
            article={formData.article}
            bannerImage={bannerImage}
            tags={formData.tags}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex max-w-4xl justify-between md:px-0 px-5 w-full mx-auto">
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
              className="group px-2.5 md:w-fit w-full md:ml-auto"
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
    </div>
  );
};

export default Create;
