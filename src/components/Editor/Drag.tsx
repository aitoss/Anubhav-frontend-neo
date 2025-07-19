import { useState, useRef } from "react";
import Image from "next/image"; // Import the Image component
import uploadIcon from "../../assets/images/upload.svg"; // Renamed to avoid conflict with variable `upload`

const DragDropFiles = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("Files", file);
      });
    }
    console.log(formData.getAll("Files"));
    // fetch(
    //   "link", {
    //     method: "POST",
    //     body: formData
    //   }
    // )
  };

  return (
    <>
      <section className="lg:mb-8 lg:p-1 w-[70%] flex md:w-[90%] bg-white rounded-xl border-[1px] shadow-lg shadow-[rgba(0,0,0,0.03)]">
        <div
          // Added 'relative' here for the 'fill' prop on Image component
          // Added a fixed height 'h-[200px]' so 'fill' has a defined parent size.
          // You might adjust this height based on your design.
          className="dropzone relative p-8 w-full h-[200px] rounded-lg flex flex-col justify-center items-center border-dashed border-[2px] border-[rgba(0, 0, 0, 0.15)]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {files && files.length > 0 ? (
            <Image
              src={URL.createObjectURL(files[0])}
              alt="Uploaded file preview"
              fill // Image will fill the parent div
              className="object-contain" // Ensures the image fits within the bounds
              unoptimized={true} // Recommended for local file previews (blob/data URLs)
            />
          ) : (
            <Image
              onClick={() => inputRef.current && inputRef.current.click()}
              className="cursor-pointer"
              src={uploadIcon} // Use the renamed import
              alt="Upload icon"
              width={64} // Explicit width (adjust as needed for your SVG icon)
              height={64} // Explicit height (adjust as needed for your SVG icon)
            />
          )}

          <h1 className="text-[#414141] text-base pb-2 font-normal">
            Select an image or drag and drop here
          </h1>
          <h1 className="text-[#C3C3C3] text-xs pb-2 font-[300]">
            JPG, JPEG, PNG file size no more than 10MB
          </h1>
          <input
            type="file"
            multiple
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFiles(event.target.files)
            }
            hidden
            accept="image/png, image/jpeg"
            ref={inputRef}
          />
        </div>
      </section>
    </>
  );
};

export default DragDropFiles;