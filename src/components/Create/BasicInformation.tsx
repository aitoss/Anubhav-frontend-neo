import React, { useRef } from "react";
import InputTag from "../InputTag/Usertag";

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
  errors
}: any) => {
  const inputRef = useRef();

  const handleChange = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const UserImage = () => {
    return (
      <>
        <div className="flex size-full flex-col">
          <h3 className="flex items-start justify-start text-[#212121]">
            Banner Image
          </h3>
          <div className="border-[rgba(0, 0, 0, 0.15)] flex h-[90%] w-full flex-col items-center justify-center gap-2 rounded-xl border-[2px] border-dashed bg-white md:w-full">
            <DragAndDropImageUpload
              file={file}
              setFile={setFile}
              setbannerImage={setbannerImage}
            />
          </div>
          {errors.file && (
            <p className="px-1 py-1.5 text-sm text-red-500">{errors.file}</p>
          )}
        </div>
      </>
    );
  };

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
            <div className="flex flex-col gap-3 md:gap-1">
              <div className="flex flex-col gap-2">
                <div className="relative flex flex-col">
                  <h4 className="text-[#212121]">Name</h4>
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
                  {errors.name && (
                    <p className="px-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="relative flex flex-col">
                  <h4 className="text-[#212121]">Email</h4>
                  <input
                    required
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={value.email}
                    onChange={handleChange}
                    className="text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
                  />
                  {errors.email && (
                    <p className="px-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-1">
              <div className="flex flex-col gap-2">
                <div className="relative flex flex-col">
                  <h4 className="text-[#212121]">Company Name</h4>
                  <input
                    required
                    type="text"
                    name="company"
                    id="name"
                    placeholder="Company's name"
                    value={value.company}
                    onChange={handleChange}
                    className="text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
                  />
                  {errors.company && (
                    <p className="px-1 text-sm text-red-500">
                      {errors.company}
                    </p>
                  )}
                </div>

                <div className="relative flex flex-col">
                  <h4 className="text-[#212121]">Position</h4>
                  <select
                    required
                    name="position"
                    id="position"
                    value={value.position}
                    onChange={handleChange}
                    className="text-md w-full rounded-lg border-[1px] border-[#78788033] bg-white p-3 text-[#3C3C43] ring ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 sm:text-[13px] md:w-full"
                  >
                    <option value="">Select Position</option>
                    <option value="Internship">Internship</option>
                    <option value="FullTime">Full Time</option>
                    <option value="Interview-experience">
                      Interview Experience
                    </option>
                  </select>
                  {errors.position && (
                    <p className="px-1 text-sm text-red-500">
                      {errors.position}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:gap-1">
              <div className="flex flex-col gap-2">
                <div className="relative flex flex-col gap-1">
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
                      <p className="px-1 text-sm text-red-500">
                        {errors.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full w-1/2 flex-col justify-between md:w-full">
            <UserImage />

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
