import React from "react";
import InputTag from "../InputTag/Usertag";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DragAndDropImageUpload from "./DragAndDropImageUpload";

const BasicInformation = ({
  value,
  setValue,
  tags,
  setTags,
  file,
  setFile,
  setbannerImage,
  errors
}: any) => {
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
          <div className="border-[rgba(0, 0, 0, 0.15)] flex h-[90%] w-full flex-col items-center justify-center gap-2 rounded-xl border-[2px] border-dashed bg-white">
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
    <div className="flex w-full justify-center pt-4 max-w-4xl mx-auto">
      <div className="relative flex flex-col gap-3 rounded-xl md:px-0 px-5 w-full md:gap-1">
        <div className="w-full">
          <h2 className="text-2xl font-[500] text-[#212121]">
            Basic Information
          </h2>
        </div>

        <div className="flex gap-2 md:flex-row flex-col">
          <div className="flex w-full flex-col gap-3 md:w-full md:gap-2">
            <div className="flex flex-col gap-3 md:gap-1">
              <div className="flex flex-col gap-2">
                <div className="relative flex flex-col">
                  <h4 className="text-[#212121]">Name</h4>
                  <Input
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
                  <Input
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
                  <Input
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
                  <Select
                    required
                    name="position"
                    value={value.position}
                    onValueChange={(selectedValue) =>
                      handleChange({
                        target: { name: "position", value: selectedValue },
                      })
                    }
                  >
                    <SelectTrigger className="text-sm! w-full rounded-lg bg-white! px-2! text-[#3C3C43]! outline outline-border shadow-sm ring-0! ring-transparent placeholder:text-[#3C3C4399] focus:outline-none focus:placeholder:text-[#3c3c4350] sm:p-2 md:w-full">
                      <SelectValue placeholder="Select Position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="FullTime">Full Time</SelectItem>
                      <SelectItem value="Interview-experience">
                        Interview Experience
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                    <Input
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

          <div className="flex h-full w-full flex-col justify-between">
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
