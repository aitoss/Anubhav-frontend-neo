import React from "react";
import TextEditor from "../Editor/TextEditor";

const WriteHere = ({
  article,
  setArticle,
  errors
}: any) => {
  return (
    <div className="flex w-[90%] lg:w-[70%] max-w-[1440px] flex-col items-start justify-center gap-0 rounded-xl pt-4 md:w-full md:gap-1 md:p-5 x-sm:p-0">
      <h1 className="ml-0 text-left text-2xl font-[500] text-[#212121] md:ml-5">
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
