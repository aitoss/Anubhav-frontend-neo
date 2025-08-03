"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "react-quill-new/dist/quill.bubble.css";
import "../Editor/Index.css";

// Enhanced modules with more formatting options
const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }, { header: 3 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }], // text alignment
    ["link", "image", "video"], // link, image, video
    ["clean"], // remove formatting button
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

// Enhanced formats
const formats = [
  "header", "font", "size",
  "bold", "italic", "underline", "strike", "blockquote",
  "list", "bullet", "indent",
  "link", "image", "video",
  "align", "color", "background",
  "script", "code-block"
];

interface EnhancedTextEditorProps {
  article: string;
  setArticle: (article: string) => void;
  placeholder?: string;
}

const EnhancedTextEditor: React.FC<EnhancedTextEditorProps> = ({ 
  article, 
  setArticle, 
  placeholder = "Start writing your article..." 
}) => {
  const quillRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleWheel = (e: any) => {
      if (!quillRef.current) return;
      const quill = quillRef.current.getEditor();
      const { scrollTop, scrollHeight, clientHeight } = quill.root;

      // define variable for pointer position for top or bottom of the Quill content
      const isAtTop = scrollTop === 0 && e.deltaY < 0;
      const isAtBottom =
        scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;

      // stop scroll action and event-propagation when we reach the top and bottom of the component
      if (!isAtTop && !isAtBottom) {
        quill.root.scrollTop = scrollTop + e.deltaY;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // getting quill root element to add event listener
    if (!quillRef.current) return;
    const quillRoot = quillRef.current.getEditor().root;
    // add event listener to the Quill root element
    quillRoot.addEventListener("wheel", handleWheel, { passive: false });

    // cleaning up the event listener
    return () => {
      quillRoot.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="relative w-full pb-10 text-black">
      {!isMounted ? (
        <div className="flex items-center justify-center h-[400px] border border-gray-300 rounded-lg bg-gray-50">
          <div className="text-gray-500">Loading editor...</div>
        </div>
      ) : (
        <div className="row flex w-full flex-col items-center justify-center gap-6 lg:gap-3 x-sm:gap-16">
          <div className="editor relative mb-[5%] flex min-h-[65vh] max-h-[80vh] w-full items-center justify-center md:mb-[10%] md:w-[90vw] lg:mb-5 x-sm:mb-[20%]">
            <ReactQuill
              ref={quillRef}
              modules={modules}
              formats={formats}
              className="input h-[100%] w-[100%]"
              theme="snow"
              value={article}
              onChange={(content: any) => setArticle(content)}
              placeholder={placeholder}
            />
          </div>
        
          {/* Enhanced Writing Tips */}
          <div className="w-full md:w-[90vw] bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">✍️</span>
              Writing Tips & Best Practices
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">📝 Structure</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Start with a compelling introduction</li>
                  <li>• Use headings (H1, H2, H3) to organize content</li>
                  <li>• Write in short, scannable paragraphs</li>
                  <li>• End with a clear conclusion or call-to-action</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">🎨 Formatting</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use <strong>bold</strong> and <em>italic</em> for emphasis</li>
                  <li>• Add bullet points and numbers for lists</li>
                  <li>• Include code blocks for technical content</li>
                  <li>• Use blockquotes for important information</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">🔗 Media</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Add relevant images to break up text</li>
                  <li>• Include links to external resources</li>
                  <li>• Embed videos for better engagement</li>
                  <li>• Use proper alt text for accessibility</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">✅ Quality</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Proofread for grammar and spelling</li>
                  <li>• Ensure all facts are accurate</li>
                  <li>• Test code examples before publishing</li>
                  <li>• Make content original and valuable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedTextEditor;
