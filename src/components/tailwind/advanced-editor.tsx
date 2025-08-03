"use client";
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  ImageResizer,
  type JSONContent,
  handleCommandNavigation,
  handleImageDrop,
  handleImagePaste,
} from "novel";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Separator } from "../ui/separator";
import { defaultExtensions } from "./extensions";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { MathSelector } from "./selectors/math-selector";
import { NodeSelector } from "./selectors/node-selector";

import { uploadFn } from "./image-upload";
import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";

const hljs = require("highlight.js");

// Type assertion to fix extension compatibility issues
const extensions = [...defaultExtensions, slashCommand] as any;

const defaultEditorContent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Start typing here... Try pressing '/' for commands!",
        },
      ],
    },
  ],
};

const TailwindAdvancedEditor = ({ article, setArticle }: { article?: string; setArticle?: (content: string) => void }) => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(null);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState();

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  const highlightCodeblocks = (content: string) => {
    const doc = new DOMParser().parseFromString(content, "text/html");
    doc.querySelectorAll("pre code").forEach((el) => {
      // @ts-ignore
      // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
      hljs.highlightElement(el);
    });
    return new XMLSerializer().serializeToString(doc);
  };

  const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
    const json = editor.getJSON();
    const htmlContent = highlightCodeblocks(editor.getHTML());

    setCharsCount(editor.storage.characterCount.words());

    // Update parent component with HTML content
    if (setArticle) {
      setArticle(htmlContent);
    }

    // Also save to localStorage for persistence (optional)
    window.localStorage.setItem("html-content", htmlContent);
    window.localStorage.setItem("novel-content", JSON.stringify(json));
    window.localStorage.setItem("markdown", editor.storage.markdown.getMarkdown());
    setSaveStatus("Saved");
  }, 500);

  useEffect(() => {
    // Priority: 1) article prop, 2) localStorage, 3) default content
    if (article && article.trim()) {
      // If article prop is provided and not empty, create content from HTML
      try {
        setInitialContent({
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: article.replace(/<[^>]*>/g, ''), // Strip HTML tags for initial text
                },
              ],
            },
          ],
        });
      } catch (error) {
        console.warn("Failed to parse article content:", error);
        setInitialContent(defaultEditorContent);
      }
    } else {
      // Fallback to localStorage or default
      const content = window.localStorage.getItem("novel-content");
      if (content) {
        try {
          setInitialContent(JSON.parse(content));
        } catch (error) {
          console.warn("Failed to parse localStorage content:", error);
          setInitialContent(defaultEditorContent);
        }
      } else {
        setInitialContent(defaultEditorContent);
      }
    }
  }, [article]);

  if (!initialContent) return null;

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">{saveStatus}</div>
        <div className={charsCount ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground" : "hidden"}>
          {charsCount} Words
        </div>
      </div>
      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          className="relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg pt-10"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                "prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-0 max-w-full",
            },
          }}
          onUpdate={({ editor }) => {
            debouncedUpdates(editor);
            setSaveStatus("Unsaved");
          }}
          slotAfter={<ImageResizer />}
        >
          <div className="not-prose absolute top-0 z-20 w-fit border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 py-2 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <NodeSelector open={openNode} onOpenChange={setOpenNode} />
              <Separator orientation="vertical" className="mx-1 h-6" />
              <LinkSelector open={openLink} onOpenChange={setOpenLink} />
              <Separator orientation="vertical" className="mx-1 h-6" />
              <MathSelector />
              <Separator orientation="vertical" className="mx-1 h-6" />
              <TextButtons />
              <Separator orientation="vertical" className="mx-1 h-6" />
              <ColorSelector open={openColor} onOpenChange={setOpenColor} />
            </div>
          </div>

          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-neutral-500 dark:text-neutral-400">No results</EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">{item.title}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default TailwindAdvancedEditor;
