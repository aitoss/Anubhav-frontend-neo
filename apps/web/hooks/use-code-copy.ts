"use client"

import * as React from "react"

const COPY_LABEL = "Copy"
const COPIED_LABEL = "Copied"

/**
 * Puts a copy button on every code block in the rendered article.
 *
 * The body is injected as HTML, so the buttons are added to the DOM directly
 * rather than rendered by React; they are removed again when the body changes
 * so a second pass cannot stack them.
 */
export function useCodeCopy(
    containerRef: React.RefObject<HTMLElement | null>,
    body: string,
) {
    React.useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const timers: ReturnType<typeof setTimeout>[] = []
        const added: HTMLElement[] = []

        for (const pre of Array.from(container.querySelectorAll("pre"))) {
            const code = pre.querySelector("code") ?? pre
            const text = code.textContent ?? ""
            if (!text.trim()) continue

            // The button is positioned against the block, and <pre> is static
            // by default.
            pre.classList.add("relative", "group/code")

            const button = document.createElement("button")
            button.type = "button"
            button.textContent = COPY_LABEL
            button.className =
                "border-border bg-background/80 text-muted-foreground hover:text-foreground absolute top-2 right-2 rounded-md border px-2 py-1 text-xs opacity-0 backdrop-blur transition-opacity focus-visible:opacity-100 group-hover/code:opacity-100"

            button.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(text)
                    button.textContent = COPIED_LABEL
                } catch {
                    // Clipboard access can be refused outright, and a button
                    // that silently does nothing reads as broken.
                    button.textContent = "Press Ctrl+C"
                }
                timers.push(
                    setTimeout(() => {
                        button.textContent = COPY_LABEL
                    }, 1500),
                )
            })

            pre.appendChild(button)
            added.push(button)
        }

        return () => {
            for (const timer of timers) clearTimeout(timer)
            for (const button of added) button.remove()
        }
    }, [containerRef, body])
}
