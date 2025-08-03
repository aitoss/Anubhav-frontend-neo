"use client";
import TailwindAdvancedEditor from "../tailwind/advanced-editor";
import "./Index.css";

const TextEditor = ({ article, setArticle }: any) => {

  return (
    <div className="relative w-full text-foreground">
      <div className="row flex w-full flex-col items-center justify-center gap-10 lg:gap-3 x-sm:gap-16">
        <div className="editor relative flex h-[65vh] max-h-[80vh] w-full items-center justify-center">
          <div className="w-full h-full border border-gray-300 rounded-xl bg-white shadow-lg overflow-hidden novel-editor">
            <TailwindAdvancedEditor article={article} setArticle={setArticle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
