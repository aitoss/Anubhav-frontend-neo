"use client"

import * as React from "react"

import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"

import { searchCompanies, type CompanySuggestion } from "@/lib/blogs"

type Props = {
  value: string
  onSelect: (company: string, companyId: string | null) => void
  error?: string
}

export function CompanyAutocomplete({ value, onSelect, error }: Props) {
  const [suggestions, setSuggestions] = React.useState<CompanySuggestion[]>([])
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (!value.trim()) {
      setSuggestions([])
      return
    }
    const controller = new AbortController()
    const timer = setTimeout(() => {
      searchCompanies(value, 10, controller.signal)
        .then(setSuggestions)
        .catch(() => setSuggestions([]))
    }, 250)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [value])

  return (
    <div className="relative flex flex-col gap-2">
      <Label htmlFor="company">Company</Label>
      <Input
        id="company"
        autoComplete="off"
        value={value}
        placeholder="Company name"
        aria-invalid={Boolean(error)}
        onChange={(event) => {
          onSelect(event.target.value, null)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {error ? <p className="text-destructive text-sm">{error}</p> : null}

      {open && suggestions.length > 0 ? (
        <ul className="border-border bg-popover absolute top-full right-0 left-0 z-50 mt-1 max-h-60 overflow-y-auto rounded-lg border shadow-lg">
          {suggestions.map((item) => (
            <li key={item._id}>
              <button
                type="button"
                className="hover:bg-accent flex w-full items-center gap-2 px-3 py-2 text-left text-sm"
                onMouseDown={(event) => {
                  event.preventDefault()
                  onSelect(item.company, item._id)
                  setOpen(false)
                }}
              >
                {item.company}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
