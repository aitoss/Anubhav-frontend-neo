"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

import { tagColor } from "@/components/tag-badge"

type Props = {
  tags: string[]
  setTags: (tags: string[]) => void
  error?: string
}

export function TagInput({ tags, setTags, error }: Props) {
  const [tag, setTag] = React.useState("")
  const [duplicate, setDuplicate] = React.useState("")

  function addTag() {
    const trimmed = tag.trim()
    if (!trimmed) return
    if (tags.includes(trimmed)) {
      setDuplicate("This tag is already added!")
      return
    }
    setTags([...tags, trimmed])
    setTag("")
    setDuplicate("")
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="tags">Tags</Label>
      <div className="flex gap-2">
        <Input
          id="tags"
          value={tag}
          placeholder="Write a tag and press enter"
          aria-invalid={Boolean(error)}
          onChange={(event) => {
            setTag(event.target.value)
            setDuplicate("")
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              addTag()
            }
          }}
        />
        <Button type="button" variant="outline" onClick={addTag}>
          Add
        </Button>
      </div>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((item) => (
            <span
              key={item}
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-sm font-medium ${tagColor(item)}`}
            >
              {item}
              <button
                type="button"
                aria-label={`Remove ${item}`}
                className="cursor-pointer opacity-60 hover:opacity-100"
                onClick={() => setTags(tags.filter((t) => t !== item))}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      ) : null}

      {duplicate ? <p className="text-destructive text-sm">{duplicate}</p> : null}
      {error ? <p className="text-destructive text-sm">{error}</p> : null}
    </div>
  )
}
