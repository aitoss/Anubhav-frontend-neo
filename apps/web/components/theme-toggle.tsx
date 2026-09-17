"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { Button } from "@workspace/ui/components/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme === "dark" : false

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      onClick={() => {
        setTheme(isDark ? "light" : "dark")
      }}
      className="gap-2"
    >
      <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
      <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
    </Button>
  )
}