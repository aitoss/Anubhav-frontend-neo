import React from "react";
import { Input } from "../ui/input";
import InputTag from "../InputTag/Usertag";

interface ContentDetailsProps {
  value: {
    title: string;
    position: string;
    companyName: string;
  };
  setValue: (value: any) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  file: any;
  setFile: (file: any) => void;
  setBannerImage: (bannerImage: any) => void;
  DragAndDropImageUpload: React.ComponentType<any>;
  errors: {
    title?: string;
    position?: string;
    companyName?: string;
    tags?: string;
    file?: string;
  };
}

const ContentDetails: React.FC<ContentDetailsProps> = ({ 
  value, 
  setValue, 
  tags, 
  setTags, 
  file,
  setFile,
  setBannerImage,
  DragAndDropImageUpload,
  errors 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const BannerImageUpload = () => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-[#212121]">
          Banner Image <span className="text-red-500">*</span>
        </label>
        <div className="border-[rgba(0, 0, 0, 0.15)] flex h-48 w-full flex-col items-center justify-center gap-2 rounded-xl border-[2px] border-dashed bg-white">
          <DragAndDropImageUpload
            file={file}
            setFile={setFile}
            setbannerImage={setBannerImage}
          />
        </div>
        {errors.file && (
          <p className="text-sm text-red-500">{errors.file}</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex w-full justify-center pt-4">
      <div className="relative flex flex-col gap-6 rounded-xl pb-4 md:w-full md:gap-4">
        <div className="w-full">
          <h2 className="text-2xl font-[500] text-[#212121] mb-2">
            Content Details
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Provide information about your article content
          </p>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#212121]">
            Article Title <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="title"
            value={value.title}
            onChange={handleChange}
            placeholder="Enter a compelling title for your article"
            className={`h-12 ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title}</p>
          )}
          <p className="text-xs text-gray-500">
            {value.title.length}/100 characters
          </p>
        </div>

        {/* Banner Image */}
        <BannerImageUpload />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Position */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#212121]">
              Your Position <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="position"
              value={value.position}
              onChange={handleChange}
              placeholder="e.g., Software Engineer, Product Manager"
              className={`h-12 ${errors.position ? 'border-red-500' : ''}`}
            />
            {errors.position && (
              <p className="text-sm text-red-500">{errors.position}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#212121]">
              Company Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="companyName"
              value={value.companyName}
              onChange={handleChange}
              placeholder="e.g., Google, Microsoft, Startup Inc."
              className={`h-12 ${errors.companyName ? 'border-red-500' : ''}`}
            />
            {errors.companyName && (
              <p className="text-sm text-red-500">{errors.companyName}</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[#212121]">
            Tags <span className="text-red-500">*</span>
          </label>
          <div className="bg-white rounded-md border border-gray-300 p-2">
            <InputTag tags={tags} setTags={setTags} />
          </div>
          {errors.tags && (
            <p className="text-sm text-red-500">{errors.tags}</p>
          )}
          <p className="text-xs text-gray-500">
            Add relevant tags to help readers find your article. Press Enter after each tag.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
