"use client"

import { useEffect } from "react"

export default function SearchShortcut() {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key?.toLowerCase?.()
      if (!key) return

      const isModifier = e.metaKey || e.ctrlKey
      if (isModifier && key === "k") {
        const target = e.target as HTMLElement | null
        const tag = target?.tagName?.toLowerCase?.()
        const isEditable = target?.isContentEditable
        if (tag === "input" || tag === "textarea" || tag === "select" || isEditable) return
        e.preventDefault()
        window.dispatchEvent(new CustomEvent("open-search"))
      }
    }

    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  return null
}
