import React from "react";
import EnhancedTextEditor from "../Editor/EnhancedTextEditor";

interface WriteArticleProps {
  article: string;
  setArticle: (article: string) => void;
  errors: {
    article?: string;
  };
}

const WriteArticle: React.FC<WriteArticleProps> = ({ article, setArticle, errors }) => {
  return (
    <div className="flex w-full justify-center pt-4">
      <div className="relative flex flex-col gap-6 rounded-xl pb-4 md:w-full md:gap-4 md:p-5 xs:p-0">
        <div className="w-full">
          <h2 className="text-2xl font-[500] text-[#212121] mb-2">
            Write Your Article
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Share your knowledge, experiences, and insights with the community
          </p>
        </div>

        {/* Text Editor */}
        <div className="relative w-full">
          <EnhancedTextEditor 
            article={article} 
            setArticle={setArticle}
            placeholder="Start writing your article..."
          />
          {errors.article && (
            <p className="text-sm text-red-500 mt-2">{errors.article}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
