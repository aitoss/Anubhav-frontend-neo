import React from "react";
import TextEditor from "../Editor/TextEditor";

const WriteHere = ({
  article,
  setArticle,
  errors
}: any) => {
  return (
    <div className="flex w-full max-w-4xl mx-auto flex-col items-start justify-center gap-0 rounded-xl pt-4 md:w-full md:gap-1 md:px-0 px-5">
      <h1 className="text-left text-2xl font-[500] text-[#212121]">
        Write Here
      </h1>
      <div className="relative mx-auto flex w-full flex-col items-center justify-center text-[#212121]">
        <TextEditor article={article} setArticle={setArticle} />
        {errors.article && (
          <p className="px-1 text-sm text-red-500">{errors.article}</p>
        )}
      </div>
    </div>
  );
};

export default WriteHere;
