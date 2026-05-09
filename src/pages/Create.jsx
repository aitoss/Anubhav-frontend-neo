import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Landing/Footer/Footer";
import SuccessMessage from "../components/notification/SuccessMessage";
import ButtonV5 from "../components/ui/buttonv5";
import Spinner from "../components/ui/Spinner";
import BasicInformation from "../components/Create/BasicInformation";
import WriteHere from "../components/Create/WriteHere";
import SubmittedCard from "../components/Create/SubmittedCard";
import PreviewPage from "../components/Create/PreviewPage";
import useErrorToast from "../hooks/useErrorToast";
import DragAndDropImageUpload from "../components/Create/DragAndDropImageUpload";
import BackgroundDots from "../assets/Background";
import { useAutoSave } from "../hooks/useAutoSave";
import RestorePrompt from "../components/Create/RestorePrompt";
import SaveNotification from "../components/Create/SaveNotification";
import { useUser } from "../context/UserContext";
import { createBlog, updateBlog } from "../api/blogs";

const Create = ({ mode = "create", articleId = null, initialArticle = null }) => {
  const isEdit = mode === "edit";
  const navigate = useNavigate();
  const { user } = useUser();

  const initialState = useMemo(
    () => ({
      company: initialArticle?.companyName || "",
      companyId:
        typeof initialArticle?.companyId === "string"
          ? initialArticle.companyId
          : initialArticle?.companyId?._id || null,
      position: initialArticle?.typeOfArticle || "",
      title: initialArticle?.title || "",
    }),
    [initialArticle],
  );

  const [file, setFile] = useState(null);
  const [bannerImage, setbannerImage] = useState(initialArticle?.imageUrl || null);
  const [tags, setTags] = useState(initialArticle?.articleTags || []);
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState(initialArticle?.description || "");
  const [value, setValue] = useState(initialState);
  const [requestSend, setRequestSend] = useState(null);
  const [isVisible] = useState(true);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const showError = useErrorToast();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialArticle) {
      setValue(initialState);
      setArticle(initialArticle.description || "");
      setTags(initialArticle.articleTags || []);
      setbannerImage(initialArticle.imageUrl || null);
    }
  }, [initialArticle, initialState]);

  const formDataWithTags = { ...value, tags };
  const {
    hasUnsavedChanges,
    showRestorePrompt,
    setShowRestorePrompt,
    lastSaved,
    saveDraft,
    restoreDraft,
    clearDraft,
  } = useAutoSave(
    formDataWithTags,
    article,
    step,
    bannerImage,
    /* enabled */ !isEdit,
  );

  const handleRestoreDraft = () => {
    const savedDraft = restoreDraft();
    if (savedDraft) {
      setValue(savedDraft.formData || initialState);
      setArticle(savedDraft.articleContent || "");
      setTags(savedDraft.tags || []);
      if (savedDraft.bannerImage) setbannerImage(savedDraft.bannerImage);
      const restoredStep = savedDraft.step || 1;
      if (restoredStep >= 2 && !savedDraft.bannerImage && !file) {
        setStep(1);
      } else {
        setStep(restoredStep);
      }
      setShowRestorePrompt(false);
    }
  };

  const handleDeclineRestore = () => {
    clearDraft();
    setShowRestorePrompt(false);
  };

  const handleManualSave = () => {
    if (hasUnsavedChanges) {
      saveDraft();
      setShowSaveNotification(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleManualSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasUnsavedChanges, handleManualSave]);

  const buildPayload = () => {
    const base = {
      title: value.title,
      article,
      role: value.position,
      articleTags: tags,
    };
    if (value.companyId) {
      base.companyId = value.companyId;
    } else if (value.company) {
      base.companyName = value.company;
    }
    if (!isEdit) {
      base.image = bannerImage;
    } else if (bannerImage && bannerImage !== initialArticle?.imageUrl) {
      // Edit mode: only send image if it's been changed locally.
      base.image = bannerImage;
    }
    return base;
  };

  const publishPost = async () => {
    setIsLoading(true);
    try {
      if (isEdit) {
        const res = await updateBlog(articleId, buildPayload());
        setRequestSend("Article updated successfully");
        navigate(`/blog/${res.article?._id || articleId}`);
      } else {
        const res = await createBlog(buildPayload());
        setRequestSend("Article submitted successfully");
        setValue(initialState);
        setArticle("");
        setTags([]);
        setStep(1);
        setIsSubmitted(true);
        clearDraft();
        const newId = res.createArticle?._id;
        if (newId) navigate(`/blog/${newId}`);
      }
    } catch (error) {
      const status = error?.response?.status;
      const msg = error?.response?.data?.message;
      console.error("Error submitting post:", error?.response?.data || error);
      if (status === 401) {
        showError("Please log in again to continue.");
        navigate(`/auth?redirectToPath=${encodeURIComponent(window.location.pathname)}`);
      } else if (status === 403) {
        showError("You are not the author of this article.");
        navigate("/my-posts");
      } else if (status === 404) {
        showError("Article not found.");
        navigate("/my-posts");
      } else {
        showError(msg || "Failed to submit the article. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    const newErrors = {};

    if (step === 1) {
      if (!value.company) newErrors.company = "Company cannot be empty";
      if (!value.position) newErrors.position = "Position cannot be empty";
      if (!value.title) newErrors.title = "Title cannot be empty";
      if (!isEdit && !file && !bannerImage)
        newErrors.file = "Please upload a banner image";
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

  const handleBack = () => setStep(step - 1);

  const progressPercentage = ((step - 1) / 3) * 100;

  const previewAuthor = {
    name: user?.name || "",
    email: user?.email || "",
  };

  return (
    <>
      <Navbar />
      <BackgroundDots
        dotSize={1.8}
        dotColor="#cbcbcc"
        backgroundColor=""
        gap={15}
        className="custom-class"
        fade={true}
      />
      {isSubmitted && <SubmittedCard />}
      {isVisible && (
        <p className="relative flex w-full items-center justify-center bg-white/40 pb-1 pt-16 text-[#212121] x-sm:text-sm">
          {isEdit ? (
            <>Editing your article.</>
          ) : (
            <>
              Before writing an article, please read the &nbsp;
              <Link to="/guidelines" target="_blank" className="underline">
                Guidelines
              </Link>
              .
            </>
          )}
        </p>
      )}

      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-3 pt-4">
        <div className="relative z-0 mt-4 h-12 w-[90%] border border-[#d3ddeb] bg-[#f9f9f9] md:w-[90%] md:text-[14px] lg:w-[70%] xl:w-[50%]">
          <div className="absolute inset-0 left-1/3 z-[99] w-3">
            <svg className="h-full w-full text-slate-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
              <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="absolute inset-0 left-2/3 z-[99] w-3">
            <svg className="h-full w-full text-slate-300" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
              <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className={`-50 absolute ${step >= 1 ? "bg-[#fff]" : ""} left-0 top-1/2 flex h-full w-1/3 -translate-y-1/2 translate-x-0 items-center justify-center text-[#212121]`}>
            1. Basic Info <span className="md:hidden">rmation</span>
          </div>
          <div className={`-50 absolute ${step >= 2 ? "bg-[#fff]" : ""} left-1/3 top-1/2 flex h-full w-1/3 -translate-y-1/2 translate-x-0 items-center justify-center text-[#212121]`}>
            2. Write Here
          </div>
          <div className={`-50 absolute ${step >= 3 ? "bg-[#fff]" : ""} right-0 top-1/2 flex h-full w-1/3 -translate-y-1/2 translate-x-0 items-center justify-center text-[#212121]`}>
            3. Preview <span className="md:hidden">&nbsp;& Publish</span>
          </div>
          <div
            className="absolute bottom-0 z-[999] h-1 bg-[#212121] transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
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
            user={user}
          />
        )}
        {step === 2 && (
          <WriteHere article={article} setArticle={setArticle} errors={errors} />
        )}
        {step === 3 && (
          <PreviewPage
            value={{ ...value, ...previewAuthor }}
            article={article}
            bannerImage={bannerImage}
            tags={tags}
          />
        )}

        <div className="flex w-[90%] justify-between gap-4 pb-4 lg:w-[70%]">
          {step > 1 && (
            <div onClick={handleBack} className="w-full p-0 font-[400] outline-none focus:outline-none">
              <ButtonV5 className="w-full" icon={false} color="#f8f8f8">
                <h5 className="flex w-full gap-1 text-[16px] font-[500] -tracking-[0.2px] text-[#212121]">
                  Previous
                </h5>
              </ButtonV5>
            </div>
          )}

          {!isEdit && (
            <div className="flex-shrink-0">
              <ButtonV5
                onClick={handleManualSave}
                disabled={!hasUnsavedChanges}
                color={hasUnsavedChanges ? "#212121" : "#e5e7eb"}
                textColor={hasUnsavedChanges ? "#f0f0f0" : "#9ca3af"}
                icon={false}
              >
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  <span className="text-[16px] font-[500] -tracking-[0.2px]">Save Draft</span>
                </div>
              </ButtonV5>
            </div>
          )}

          {step < 3 ? (
            <button onClick={handleNext} className="ml-auto w-full p-0 font-[400] outline-none focus:outline-none">
              <ButtonV5 className="w-full" icon={true}>
                Next
              </ButtonV5>
            </button>
          ) : (
            <button onClick={publishPost} disabled={isLoading} className="ml-auto w-full p-0 font-[400] outline-none focus:outline-none">
              <ButtonV5 className="w-full" disabled={isLoading} icon={false}>
                {isLoading ? (
                  <div className="flex items-center justify-center gap-1 font-[300]">
                    &nbsp; Processing <Spinner color="#fff" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-1">
                    {isEdit ? "Save Changes" : "Publish"}
                  </div>
                )}
              </ButtonV5>
            </button>
          )}
        </div>

        <SuccessMessage requestSend={requestSend} setRequestSend={setRequestSend} />
      </div>

      <SaveNotification
        isVisible={showSaveNotification}
        onClose={() => setShowSaveNotification(false)}
      />

      {!isEdit && showRestorePrompt && (
        <RestorePrompt
          onRestore={handleRestoreDraft}
          onDecline={handleDeclineRestore}
          lastSaved={lastSaved}
        />
      )}

      <Footer />
    </>
  );
};

export default Create;
