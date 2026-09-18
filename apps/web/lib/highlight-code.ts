import { common, createLowlight } from "lowlight"

const lowlight = createLowlight(common)

export const CODE_LANGUAGES = Object.keys(common).sort()

type HastNode = {
    type: string
    tagName?: string
    value?: string
    properties?: { className?: string[] | string }
    children?: HastNode[]
}

// Build the markup with DOM APIs rather than an HTML string: code text goes
// through createTextNode, so nothing inside a code block can inject markup.
function appendHast(node: HastNode, parent: Node, doc: Document) {
    if (node.type === "text") {
        parent.appendChild(doc.createTextNode(node.value ?? ""))
        return
    }

    if (node.type !== "element" || !node.tagName) return

    const element = doc.createElement(node.tagName)
    const className = node.properties?.className
    if (className) {
        element.className = Array.isArray(className) ? className.join(" ") : String(className)
    }
    for (const child of node.children ?? []) appendHast(child, element, doc)
    parent.appendChild(element)
}

function declaredLanguage(element: Element): string | undefined {
    const fromClass = Array.from(element.classList)
        .find((name) => name.startsWith("language-"))
        ?.slice("language-".length)

    return fromClass && lowlight.registered(fromClass) ? fromClass : undefined
}

/**
 * Adds hljs token spans to code blocks in an article's stored HTML.
 *
 * tiptap highlights the editor with ProseMirror decorations, which never reach
 * getHTML(), so saved articles hold plain code and are highlighted here at
 * render time.
 *
 * Only blocks with a declared `language-*` class are touched. Auto-detection
 * was measured against real articles and is not trustworthy — plain prose
 * scores as "vbnet" and an ASCII diagram as "sql", both above where real
 * JavaScript lands, so guessing mis-colours more than it helps.
 */
export function highlightCodeBlocks(html: string): string {
    if (!html || typeof window === "undefined") return html

    try {
        const doc = new DOMParser().parseFromString(html, "text/html")
        const blocks = Array.from(doc.querySelectorAll("pre"))
        if (blocks.length === 0) return html

        let changed = false

        for (const pre of blocks) {
            // Older articles store bare <pre>text</pre>; tiptap emits
            // <pre><code class="language-x">.
            const target = pre.querySelector("code") ?? pre
            const language = declaredLanguage(target) ?? declaredLanguage(pre)
            if (!language) continue

            const code = target.textContent ?? ""
            if (!code.trim()) continue

            const tree = lowlight.highlight(language, code)
            target.textContent = ""
            target.classList.add("hljs")
            for (const child of (tree.children ?? []) as HastNode[]) {
                appendHast(child, target, doc)
            }
            changed = true
        }

        return changed ? doc.body.innerHTML : html
    } catch {
        return html
    }
}
