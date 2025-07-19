"use client";
import React, { useState } from "react";
import Image from "next/image"; // Import Image component
import Upload from "public/assets/images/upload.svg"; // This is likely already an optimized SVG import

const MAX_FILE_SIZE = 73 * 1024;

interface DragAndDropImageUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  setbannerImage: (image: string | ArrayBuffer | null) => void;
}

const DragAndDropImageUpload: React.FC<DragAndDropImageUploadProps> = ({
  file,
  setFile,
  setbannerImage,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (!droppedFile.type.startsWith("image/")) {
        alert("Please drop an image file.");
        return;
      }
      if (droppedFile.size > MAX_FILE_SIZE) {
        alert("File size exceeds 73 KB. Please upload a smaller image.");
        return;
      }

      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setbannerImage(reader.result);
      };
      reader.readAsDataURL(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      if (selectedFile.size > MAX_FILE_SIZE) {
        alert("File size exceeds 73 KB. Please upload a smaller image.");
        return;
      }

      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setbannerImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-2 md:py-4"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex w-full items-center justify-center">
        <div className="relative flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg px-4 sm:h-24">
          {file ? (
            <Image // Use Next.js Image component
              src={URL.createObjectURL(file)}
              alt="Preview"
              fill // Image fills the parent container
              className="select-none rounded-lg border object-cover" // object-cover on Image
              // Since this is a local file preview, optimization might be limited
              // You can add unoptimized={true} if you encounter issues or warnings
              // unoptimized={true}
            />
          ) : (
            <Image // Use Next.js Image component for the SVG
              className="h-[150px] w-[150px] cursor-pointer select-none sm:h-24"
              src={Upload} // Direct import of SVG works here
              alt="Upload"
              width={150} // Explicit width for SVG
              height={150} // Explicit height for SVG
              onClick={(e) => {
                inputRef.current?.click();
                e.preventDefault();
              }}
            />
          )}
        </div>
      </div>
      <div className="text-gray-300">
        {file ? null : (
          <>
            <h1 className="text-center text-sm font-[400] text-[#777] selection:text-[#121212]">
              JPG, JPEG, PNG file size no more than 73KB
            </h1>
            {/* <h1 className="text-center text-xs font-[400] text-[#322e2e]">
              Keep the image ratio to 280x180 px
            </h1> */}
          </>
        )}
      </div>
      {file && (
        <div
          className="flex h-[20px] w-fit cursor-pointer items-center justify-center gap-1 border-b-2 border-white text-[#717171] transition duration-200 ease-in-out hover:border-[#777]"
          onClick={() => setFile(null)}
        >
          <span className="">Remove</span>
          <span className="text-[24px]">×</span>
        </div>
      )}

      <input
        type="file"
        ref={inputRef}
        name="upload"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default DragAndDropImageUpload;