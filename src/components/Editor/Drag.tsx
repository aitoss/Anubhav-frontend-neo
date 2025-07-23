import { useState, useRef } from "react";
import upload from "../../assets/images/upload.svg";
import Image from "next/image";

const DragDropFiles = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
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

  // if (files) return (
  //   <div className="uploads">
  //     <ul>
  //       {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
  //     </ul>
  //     <div className="actions">
  //       <button onClick={() => setFiles(null)}>Cancel</button>
  //       <button onClick={handleUpload}>Upload</button>
  //     </div>
  //   </div>
  // )

  return (
    <>
      <section className="lg:mb-8 lg:p-1 w-[70%] flex md:w-[90%] bg-white rounded-xl border-[1px] shadow-lg shadow-[rgba(0,0,0,0.03)]">
        <div
          className="dropzone p-8 w-full h-full rounded-lg flex flex-col justify-center items-center border-dashed border-[2px] border-[rgba(0, 0, 0, 0.15)]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
           {files ? (
            <Image
              src={URL.createObjectURL(files[0])}
              alt="Uploaded file preview"
              // width={300}
              // height={200}
              className="rounded-lg object-cover"
            />
          ) : (
            <Image
              onClick={() => inputRef.current && inputRef.current.click()}
              className="cursor-pointer"
              src={upload}
              alt="Upload icon"
              // width={100}
              // height={100}
            />
          )}
          <h1 className="text-[#414141] text-base pb-2 font-normal">
            Select a image or drag and drop here
          </h1>
          <h1 className="text-[#C3C3C3] text-xs pb-2 font-[300]">
            JPG, JPEG, PNG file size no more than 10MB
          </h1>
          <input
            type="file"
            multiple
            onChange={(event: any) => setFiles(event.target.files)}
            hidden
            accept="image/png, image/jpeg"
            ref={inputRef}
          />
          {/* <button className="" onClick={() => inputRef.current.click()}>
      Select Files
    </button> */}
        </div>
      </section>
    </>
  );
};

export default DragDropFiles;
