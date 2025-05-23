import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "react-quill-new/dist/quill.bubble.css";
import "../Editor/Index.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }], // remove formatting button
  ],
};

const TextEditor = ({ article, setArticle }: any) => {
  // create a reference for the Quill editor
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    // function to handle the scroll event
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
      <div className="row flex w-full flex-col items-center justify-center gap-10 lg:gap-3 x-sm:gap-16">
        <div className="editor relative mb-[5%] flex h-[65vh] max-h-[80vh] w-full items-center justify-center md:mb-[10%] md:w-[90vw] lg:mb-5 x-sm:mb-[20%]">
          <ReactQuill
            ref={quillRef}
            modules={modules}
            className="input h-[100%] w-[100%]"
            theme="snow"
            value={article}
            onChange={(content: any) => setArticle(content)}
          />
        </div>
        {/* <div className="preview mt-16 h-[60vh] max-h-[80vh] w-full overflow-auto rounded-xl border-[2px] bg-white text-black shadow-lg shadow-[rgba(0,0,0,0.03)] md:w-[90vw]">
          &nbsp;
          <ReactQuill
            value={article}
            theme="bubble"
            readOnly
            className="h-full w-full"
          />
        </div> */}
      </div>
    </div>
  );
};

export default TextEditor;
