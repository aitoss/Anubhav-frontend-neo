import React from "react";
import InputTag from "../InputTag/Usertag";
import CompanyAutocomplete from "./CompanyAutocomplete";
import PositionSelect from "./PositionSelect";

const BasicInformation = ({
  value,
  setValue,
  tags,
  setTags,
  file,
  setFile,
  bannerImage,
  setbannerImage,
  DragAndDropImageUpload,
  errors,
  user,
  hideImageUpload = false,
}) => {
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = ({ companyName, companyId }) => {
    setValue({ ...value, company: companyName, companyId });
  };

  const UserImage = () => (
    <div className="flex size-full flex-col">
      <h3 className="flex items-start justify-start text-[#212121]">
        Banner Image
      </h3>
      <div className="border-[rgba(0, 0, 0, 0.15)] flex h-[90%] w-full flex-col items-center justify-center gap-2 rounded-xl border-[2px] border-dashed bg-white md:w-full">
        <DragAndDropImageUpload
          file={file}
          setFile={setFile}
          setbannerImage={setbannerImage}
          bannerImage={bannerImage}
        />
      </div>
      {errors.file && (
        <p className="px-1 py-1.5 text-sm text-red-500">{errors.file}</p>
      )}
    </div>
  );

  return (
    <div className="flex w-[100%] max-w-[100%] justify-center pt-4 md:h-[70%] md:w-[90%]">
      <div className="relative flex w-[90%] flex-col gap-3 rounded-xl pb-4 md:w-full md:gap-1 md:p-5 lg:w-[70%] x-sm:p-0">
        <div className="w-full">
          <h2 className="text-2xl font-[500] text-[#212121]">
            Basic Information
          </h2>
        </div>

        <div className="flex gap-2 md:flex-col">
          <div className="flex w-1/2 flex-col gap-3 md:w-full md:gap-2">
            {user && (
              <div className="rounded-lg border border-[#78788033] bg-[#f9f9f9] px-3 py-2 text-sm text-[#3C3C43]">
                Posting as{" "}
                <span className="font-[500]">
                  {user.name || "(no name set)"}
                </span>
                {user.email && (
                  <>
                    <span className="mx-1 text-[#888]">·</span>
                    <span className="text-[#666]">{user.email}</span>
                  </>
                )}
              </div>
            )}

            <CompanyAutocomplete
              value={value.company}
              companyId={value.companyId}
              onChange={handleCompanyChange}
              error={errors.company}
            />

            <PositionSelect
              value={value.position}
              onChange={handleChange}
              error={errors.position}
            />

            <div className="relative flex flex-col">
              <h4 className="text-[#212121]">Title</h4>
              <input
                required
                type="text"
                name="title"
                id="title"
                placeholder="Blog Title"
                value={value.title}
                onChange={handleChange}
                className="text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
              />
              {errors.title && (
                <p className="px-1 text-sm text-red-500">{errors.title}</p>
              )}
            </div>
          </div>

          <div className="flex h-full w-1/2 flex-col justify-between md:w-full">
            {!hideImageUpload && <UserImage />}

            <InputTag tags={tags} setTags={setTags} />
            {errors.tags && (
              <p className="px-1 text-sm text-red-500">{errors.tags}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
