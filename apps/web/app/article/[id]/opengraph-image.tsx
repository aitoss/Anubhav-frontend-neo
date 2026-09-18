import { ImageResponse } from "next/og"

import { extractArticleIdFromRoute } from "@/lib/article-url"
import { BACKEND_URL } from "@/lib/backend"
import { LOGO_PATH, loadOgFonts } from "@/lib/og-fonts"
import { SITE_NAME } from "@/lib/site"
import type { Article } from "@/lib/articles"

export const alt = "Anubhav article"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const revalidate = 3600

// Same 16-colour scale as the in-app tag badges, as literal values because
// ImageResponse renders with inline styles rather than Tailwind.
const TAG_COLORS = [
  ["#fee2e2", "#991b1b"], ["#ffedd5", "#9a3412"], ["#fef3c7", "#92400e"],
  ["#fef9c3", "#854d0e"], ["#ecfccb", "#3f6212"], ["#dcfce7", "#166534"],
  ["#d1fae5", "#065f46"], ["#ccfbf1", "#115e59"], ["#cffafe", "#155e75"],
  ["#dbeafe", "#1e40af"], ["#e0e7ff", "#3730a3"], ["#ede9fe", "#5b21b6"],
  ["#f3e8ff", "#6b21a8"], ["#fae8ff", "#86198f"], ["#fce7f3", "#9d174d"],
  ["#ffe4e6", "#9f1239"],
]

function tagColor(label: string): [string, string] {
  let hash = 5381
  for (let index = 0; index < label.length; index += 1) {
    hash = (Math.imul(hash, 33) ^ label.charCodeAt(index)) | 0
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length] as [string, string]
}

function plainText(html?: string, limit = 150) {
  if (!html) return ""
  const text = html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim()
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text
}

function readTime(html?: string) {
  const words = html?.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length ?? 0
  return `${Math.max(1, Math.ceil(words / 180))} mins read`
}

function formatDate(value?: string) {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const fonts = await loadOgFonts()

  let article: Article | null = null
  try {
    const response = await fetch(`${BACKEND_URL}/blog/${extractArticleIdFromRoute(id)}`, {
      next: { revalidate: 3600 },
    })
    if (response.ok) {
      const payload = (await response.json()) as { article?: Article } & Partial<Article>
      article = payload.article ?? (payload._id ? (payload as Article) : null)
    }
  } catch {
    // fall through to the generic card
  }

  const title = article?.title ?? SITE_NAME
  const company = article?.companyName
  const author =
    article?.authorId && typeof article.authorId === "object"
      ? article.authorId.name
      : undefined
  const tags = (article?.articleTags ?? article?.tags ?? []).slice(0, 4)
  const meta = [readTime(article?.description), formatDate(article?.createdAt)]
    .filter(Boolean)
    .join("  •  ")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #e4e4e7 1px, transparent 0)",
          backgroundSize: "24px 24px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="40" height="40" viewBox="0 0 80 80" fill="#18181b">
            <path d={LOGO_PATH} />
          </svg>
          <span style={{ fontFamily: "Aeonik Pro", fontSize: 30, fontWeight: 600, color: "#18181b" }}>
            anubhav
          </span>
          {company ? (
            <span style={{ fontSize: 24, color: "#71717a", marginLeft: 8 }}>
              / {company}
            </span>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontFamily: "Aeonik Pro",
              fontSize: title.length > 70 ? 54 : 66,
              fontWeight: 600,
              color: "#09090b",
              lineHeight: 1.12,
              letterSpacing: -1.5,
              display: "block",
              maxHeight: 250,
              overflow: "hidden",
            }}
          >
            {title}
          </div>

          {plainText(article?.description) ? (
            <div style={{ fontSize: 26, color: "#52525b", lineHeight: 1.4 }}>
              {plainText(article?.description)}
            </div>
          ) : null}

          {tags.length > 0 ? (
            <div style={{ display: "flex", gap: 10 }}>
              {tags.map((tag) => {
                const [bg, fg] = tagColor(tag)
                return (
                  <span
                    key={tag}
                    style={{
                      background: bg,
                      color: fg,
                      fontSize: 22,
                      fontWeight: 500,
                      padding: "8px 18px",
                      borderRadius: 10,
                    }}
                  >
                    {tag}
                  </span>
                )
              })}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e4e4e7",
            paddingTop: 24,
            fontSize: 24,
            color: "#52525b",
          }}
        >
          <span style={{ fontWeight: 600, color: "#18181b" }}>{author ?? SITE_NAME}</span>
          <span>{meta}</span>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  )
}
