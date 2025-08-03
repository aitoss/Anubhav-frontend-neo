"use client";
import AuthorInfo from "@/components/Write/AuthorInfo";
import ContentDetails from "@/components/Write/ContentDetails";
import PreviewSubmit from "@/components/Write/PreviewSubmit";
import SubmissionSuccess from "@/components/Write/SubmissionSuccess";
import WriteArticle from "@/components/Write/WriteArticle";
import DragAndDropImageUpload from "@/components/Create/DragAndDropImageUpload";
import AnimateIcon from "@/components/ui/animate-icon";
import { NoButton } from "@/components/ui/no-button";
import useErrorToast from "@/hooks/useErrorToast";
import { apiService } from "@/lib/api";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "anubhav_write_form_data";

const WritePage = () => {
    const initialAuthorState = {
        authorName: "",
        authorEmail: "",
        authorLinkedIn: "",
        authorTwitter: "",
    };

    const initialContentState = {
        title: "",
        position: "",
        companyName: "",
    };

    const [authorData, setAuthorData] = useState(initialAuthorState);
    const [contentData, setContentData] = useState(initialContentState);
    const [tags, setTags] = useState<string[]>([]);
    const [article, setArticle] = useState("");
    const [file, setFile] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVisible] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDraftRecovered, setIsDraftRecovered] = useState(false);

    const showError = useErrorToast();

    type ErrorFields = {
        authorName?: string;
        authorEmail?: string;
        title?: string;
        position?: string;
        companyName?: string;
        tags?: string;
        file?: string;
        article?: string;
    };

    const [errors, setErrors] = useState<ErrorFields>({});

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                const hasData = parsed.authorData?.authorName || parsed.contentData?.title || parsed.article || parsed.tags?.length > 0;

                if (hasData) {
                    if (parsed.authorData) setAuthorData(parsed.authorData);
                    if (parsed.contentData) setContentData(parsed.contentData);
                    if (parsed.tags) setTags(parsed.tags);
                    if (parsed.article) setArticle(parsed.article);
                    if (parsed.step) setStep(parsed.step);
                    setIsDraftRecovered(true);

                    // Hide the recovery message after 5 seconds
                    setTimeout(() => {
                        setIsDraftRecovered(false);
                    }, 5000);
                }
            } catch (error) {
                console.error("Error loading saved data:", error);
            }
        }
    }, []);

    // Save data to localStorage whenever state changes
    useEffect(() => {
        const dataToSave = {
            authorData,
            contentData,
            tags,
            article,
            step,
            timestamp: Date.now()
            // Note: file and bannerImage are not saved to localStorage 
            // as they cannot be serialized. Users will need to re-upload files.
        };

        setIsSaving(true);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));

        // Show saving indicator briefly
        const timer = setTimeout(() => {
            setIsSaving(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [authorData, contentData, tags, article, step]);

    // Clear localStorage
    const clearSavedData = () => {
        localStorage.removeItem(STORAGE_KEY);
    };

    const handleClearDraft = () => {
        if (window.confirm("Are you sure you want to clear your draft? This action cannot be undone.")) {
            handleReset();
        }
    };

    const validateStep1 = () => {
        const newErrors: ErrorFields = {};

        if (!authorData.authorName.trim()) {
            newErrors.authorName = "Author name is required";
        }

        if (!authorData.authorEmail.trim()) {
            newErrors.authorEmail = "Email address is required";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(authorData.authorEmail)) {
                newErrors.authorEmail = "Please enter a valid email address";
            }
        }

        return newErrors;
    };

    const validateStep2 = () => {
        const newErrors: ErrorFields = {};

        if (!contentData.title.trim()) {
            newErrors.title = "Article title is required";
        }

        if (!contentData.position.trim()) {
            newErrors.position = "Your position is required";
        }

        if (!contentData.companyName.trim()) {
            newErrors.companyName = "Company name is required";
        }

        if (!file) {
            newErrors.file = "Please upload a banner image";
        }

        if (tags.length === 0) {
            newErrors.tags = "Please add at least one tag";
        }

        return newErrors;
    };

    const validateStep3 = () => {
        const newErrors: ErrorFields = {};

        if (!article.trim()) {
            newErrors.article = "Article content is required";
        } else if (article.trim().split(/\s+/).length < 100) {
            newErrors.article = "Article must be at least 100 words long";
        }

        return newErrors;
    };

    const handleNext = () => {
        let newErrors: ErrorFields = {};

        if (step === 1) {
            newErrors = validateStep1();
        } else if (step === 2) {
            newErrors = validateStep2();
        } else if (step === 3) {
            newErrors = validateStep3();
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
        setErrors({});
    };

    const handleSubmit = async () => {
        // Final validation
        const step1Errors = validateStep1();
        const step2Errors = validateStep2();
        const step3Errors = validateStep3();

        const allErrors = { ...step1Errors, ...step2Errors, ...step3Errors };

        if (Object.keys(allErrors).length > 0) {
            setErrors(allErrors);
            return;
        }

        setIsLoading(true);
        try {
            // Prepare the data for submission
            const submissionData = {
                title: contentData.title,
                authorName: authorData.authorName,
                authorEmailId: authorData.authorEmail,
                authorLinkedIn: authorData.authorLinkedIn,
                authorTwitter: authorData.authorTwitter,
                companyName: contentData.companyName,
                role: contentData.position,
                articleTags: tags,
                article: article,
                image: bannerImage,
            };

            await apiService.createBlog(submissionData);
            setIsSubmitted(true);
            clearSavedData(); // Clear localStorage on successful submission
        } catch (error: any) {
            console.error("Error submitting article:", error.response?.data);
            showError("Failed to submit the article. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setAuthorData(initialAuthorState);
        setContentData(initialContentState);
        setTags([]);
        setArticle("");
        setFile(null);
        setBannerImage(null);
        setStep(1);
        setIsSubmitted(false);
        setErrors({});
        clearSavedData(); // Clear localStorage on reset
    };

    // Calculate progress
    const progressPercentage = ((step - 1) / 3) * 100;

    return (
        <div className="relative flex flex-col items-center justify-start bg-[#f9f9f9] min-h-screen">
            {isSubmitted && <SubmissionSuccess onReset={handleReset} />}
            {isVisible && (
                <div className="relative flex w-full flex-col items-center justify-center bg-white/40 pb-1 pt-16">
                    <p className="flex items-center justify-center text-[#212121]">
                        Share your knowledge and experiences with the community. Please read our &nbsp;
                        <Link href="/guidelines" target="_blank" className="underline">
                            Writing Guidelines
                        </Link>
                        &nbsp; before submitting.
                    </p>
                    {isSaving && (
                        <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                            <span className="animate-pulse">💾</span> Draft saved automatically
                        </p>
                    )}
                    {isDraftRecovered && (
                        <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                            <span>📝</span> Draft recovered! You can continue where you left off.
                        </p>
                    )}
                </div>
            )}

            <div className="mx-auto flex max-w-7xl w-full flex-col items-center gap-3 pt-4">
                {/* Progress Bar */}
                <div className="relative z-0 mt-4 h-14 w-[90%] border border-[#d3ddeb] bg-[#f9f9f9] md:w-[90%] md:text-[14px] lg:w-[80%] xl:w-[60%]">
                    {/* Divider lines */}
                    <div className="absolute inset-0 left-1/4 z-[99] w-3">
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
                            />
                        </svg>
                    </div>
                    <div className="absolute inset-0 left-2/4 z-[99] w-3">
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
                            />
                        </svg>
                    </div>
                    <div className="absolute inset-0 left-3/4 z-[99] w-3">
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
                            />
                        </svg>
                    </div>

                    {/* Step sections */}
                    <div className={`absolute ${step >= 1 ? "bg-[#fff]" : ""} left-0 top-1/2 flex h-full w-1/4 -translate-y-1/2 translate-x-0 items-center justify-center text-[#212121] text-xs md:text-sm px-1`}>
                        1. Author Info
                    </div>
                    <div className={`absolute ${step >= 2 ? "bg-[#fff]" : ""} left-1/4 top-1/2 flex h-full w-1/4 -translate-y-1/2 translate-x-0 items-center justify-center text-[#212121] text-xs md:text-sm px-1`}>
                        2. Content Details
                    </div>
                    <div className={`absolute ${step >= 3 ? "bg-[#fff]" : ""} left-2/4 top-1/2 flex h-full w-1/4 -translate-y-1/2 translate-x-0 items-center justify-center text-[#212121] text-xs md:text-sm px-1`}>
                        3. Write Article
                    </div>
                    <div className={`absolute ${step >= 4 ? "bg-[#fff]" : ""} right-0 top-1/2 flex h-full w-1/4 -translate-y-1/2 translate-x-0 items-center justify-center text-[#212121] text-xs md:text-sm px-1`}>
                        4. Preview & Submit
                    </div>

                    <div
                        className="absolute bottom-0 z-[999] h-1 bg-[#212121] transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                {/* Step Content */}
                <div className="w-full max-w-4xl">
                    {step === 1 && (
                        <AuthorInfo
                            value={authorData}
                            setValue={setAuthorData}
                            errors={errors}
                        />
                    )}

                    {step === 2 && (
                        <ContentDetails
                            value={contentData}
                            setValue={setContentData}
                            tags={tags}
                            setTags={setTags}
                            file={file}
                            setFile={setFile}
                            setBannerImage={setBannerImage}
                            DragAndDropImageUpload={DragAndDropImageUpload}
                            errors={errors}
                        />
                    )}

                    {step === 3 && (
                        <WriteArticle
                            article={article}
                            setArticle={setArticle}
                            errors={errors}
                        />
                    )}

                    {step === 4 && (
                        <PreviewSubmit
                            authorData={authorData}
                            contentData={contentData}
                            tags={tags}
                            article={article}
                        />
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex w-[90%] max-w-4xl justify-between items-center gap-4 pb-8 pt-4">
                    <div className="flex gap-2">
                        {step > 1 && (
                            <NoButton
                                onClick={handleBack}
                                className="group px-2.5"
                                variant="outline"
                            >
                                <span className="flex items-center gap-2">
                                    <AnimateIcon><ChevronLeft className="h-4 w-4" /></AnimateIcon>
                                    Previous
                                </span>
                            </NoButton>
                        )}

                        {/* Clear Draft Button - only show if there's content */}
                        {(authorData.authorName || contentData.title || contentData.position || contentData.companyName || article || tags.length > 0 || file || bannerImage) && (
                            <NoButton
                                onClick={handleClearDraft}
                                variant="outline"
                                size="default"
                            >
                                Clear Draft
                            </NoButton>
                        )}
                    </div>

                    {step < 4 ? (
                        <NoButton
                            onClick={handleNext}
                            disabled={isLoading}
                            className="group px-4 py-2"
                        >
                            <span className="flex items-center gap-2">
                                Next
                                <AnimateIcon><ChevronRight className="h-4 w-4" /></AnimateIcon>
                            </span>
                        </NoButton>
                    ) : (
                        <NoButton
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="group px-4 py-2"
                        >
                            <span className="flex items-center gap-2">
                                {isLoading ? "Submitting..." : "Submit Article"}
                                <AnimateIcon><Send className="h-4 w-4" /></AnimateIcon>
                            </span>
                        </NoButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WritePage;