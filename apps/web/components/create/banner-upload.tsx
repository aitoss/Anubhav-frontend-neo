"use client"

import * as React from "react"

import { Label } from "@workspace/ui/components/label"
import { cn } from "@workspace/ui/lib/utils"

// The backend stores the banner inline as a base64 data URL, so the Vite app
// capped uploads at 73 KB. Same cap here or the API rejects the payload.
const MAX_BYTES = 73 * 1024

type Props = {
  value: string | null
  onChange: (dataUrl: string | null) => void
  error?: string
}

export function BannerUpload({ value, onChange, error }: Props) {
  const [dragging, setDragging] = React.useState(false)
  const [sizeError, setSizeError] = React.useState("")

  function readFile(file?: File | null) {
    if (!file) return
    if (file.size > MAX_BYTES) {
      setSizeError("File size exceeds 73 KB. Please upload a smaller image.")
      return
    }
    setSizeError("")
    const reader = new FileReader()
    reader.onload = () => onChange(typeof reader.result === "string" ? reader.result : null)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="banner">Banner image</Label>
      <label
        htmlFor="banner"
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          readFile(event.dataTransfer.files?.[0])
        }}
        className={cn(
          "border-border flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors",
          dragging && "border-primary bg-accent",
        )}
      >
        {value ? (
          <img src={value} alt="Banner preview" className="max-h-40 rounded-md object-cover" />
        ) : (
          <>
            <span className="text-sm font-medium">Drag and drop an image here</span>
            <span className="text-muted-foreground text-xs">or click to browse (max 73 KB)</span>
          </>
        )}
        <input
          id="banner"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => readFile(event.target.files?.[0])}
        />
      </label>

      {value ? (
        <button
          type="button"
          className="text-muted-foreground w-max cursor-pointer text-xs underline"
          onClick={() => onChange(null)}
        >
          Remove image
        </button>
      ) : null}

      {sizeError ? <p className="text-destructive text-sm">{sizeError}</p> : null}
      {error ? <p className="text-destructive text-sm">{error}</p> : null}
    </div>
  )
}
