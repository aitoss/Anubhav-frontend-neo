"use client"

import * as React from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

type Props = {
  value: string
  onChange: (html: string) => void
}

// ponytail: StarterKit only. The Vite editor also had emoji/image plugins —
// add those extensions if authors ask for them.
export function RichEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[24rem] max-w-none px-4 py-3 focus:outline-none prose-headings:font-semibold [&_h1]:mb-2 [&_h1]:text-2xl [&_h2]:mb-2 [&_h2]:text-xl [&_h3]:mb-2 [&_h3]:text-lg [&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_pre]:rounded-md [&_pre]:bg-muted [&_pre]:p-3",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  })

  // Keep the editor in sync when a draft is restored or an article loads.
  React.useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML()) editor.commands.setContent(value || "", { emitUpdate: false })
  }, [editor, value])

  if (!editor) return <div className="border-border h-96 rounded-lg border" />

  const tools = [
    { label: "H1", isActive: () => editor.isActive("heading", { level: 1 }), run: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: "H2", isActive: () => editor.isActive("heading", { level: 2 }), run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "H3", isActive: () => editor.isActive("heading", { level: 3 }), run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: "Bold", isActive: () => editor.isActive("bold"), run: () => editor.chain().focus().toggleBold().run() },
    { label: "Italic", isActive: () => editor.isActive("italic"), run: () => editor.chain().focus().toggleItalic().run() },
    { label: "Bullets", isActive: () => editor.isActive("bulletList"), run: () => editor.chain().focus().toggleBulletList().run() },
    { label: "Numbered", isActive: () => editor.isActive("orderedList"), run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: "Quote", isActive: () => editor.isActive("blockquote"), run: () => editor.chain().focus().toggleBlockquote().run() },
    { label: "Code", isActive: () => editor.isActive("codeBlock"), run: () => editor.chain().focus().toggleCodeBlock().run() },
  ]

  return (
    <div className="border-border overflow-hidden rounded-lg border">
      <div className="border-border bg-muted/40 flex flex-wrap gap-1 border-b p-2">
        {tools.map((tool) => (
          <Button
            key={tool.label}
            type="button"
            size="sm"
            variant="ghost"
            className={cn("h-7 px-2 text-xs", tool.isActive() && "bg-accent")}
            onClick={tool.run}
          >
            {tool.label}
          </Button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}
