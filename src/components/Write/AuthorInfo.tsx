import React from "react";
import { Input } from "../ui/input";

interface AuthorInfoProps {
  value: {
    authorName: string;
    authorEmail: string;
    authorLinkedIn?: string;
    authorTwitter?: string;
  };
  setValue: (value: any) => void;
  errors: {
    authorName?: string;
    authorEmail?: string;
  };
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ value, setValue, errors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex w-full justify-center pt-4">
      <div className="relative flex flex-col gap-6 rounded-xl pb-4 md:w-full md:gap-4">
        <div className="w-full">
          <h2 className="text-2xl font-[500] text-[#212121] mb-2">
            Author Information
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Tell us about yourself as the author of this piece
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Author Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#212121]">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="authorName"
              value={value.authorName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`h-12 ${errors.authorName ? 'border-red-500' : ''}`}
            />
            {errors.authorName && (
              <p className="text-sm text-red-500">{errors.authorName}</p>
            )}
          </div>

          {/* Author Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#212121]">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              name="authorEmail"
              value={value.authorEmail}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={`h-12 ${errors.authorEmail ? 'border-red-500' : ''}`}
            />
            {errors.authorEmail && (
              <p className="text-sm text-red-500">{errors.authorEmail}</p>
            )}
          </div>
        </div>

        {/* Social Links (Optional) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#212121]">
              LinkedIn Profile (Optional)
            </label>
            <Input
              type="url"
              name="authorLinkedIn"
              value={value.authorLinkedIn || ''}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
              className="h-12"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#212121]">
              Twitter/X Profile (Optional)
            </label>
            <Input
              type="url"
              name="authorTwitter"
              value={value.authorTwitter || ''}
              onChange={handleChange}
              placeholder="https://twitter.com/yourhandle"
              className="h-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
