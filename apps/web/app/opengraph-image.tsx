import { ImageResponse } from "next/og"

import { LOGO_PATH, loadOgFonts } from "@/lib/og-fonts"
import { SITE_NAME } from "@/lib/site"

export const alt = "Anubhav — interview experiences from AIT students"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Generated rather than a committed PNG: the old public/og-cover.png showed the
// pre-redesign UI and went stale. This tracks the current brand automatically.
export default async function Image() {
  const fonts = await loadOgFonts()

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #e4e4e7 1px, transparent 0)",
          backgroundSize: "24px 24px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 80 80" fill="#18181b">
            <path d={LOGO_PATH} />
          </svg>
          <span style={{ fontFamily: "Aeonik Pro", fontSize: 52, fontWeight: 600, color: "#18181b", letterSpacing: -1 }}>
            {SITE_NAME}
          </span>
        </div>

        <div
          style={{
            fontFamily: "Aeonik Pro",
            fontSize: 74,
            fontWeight: 600,
            color: "#09090b",
            letterSpacing: -2.5,
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: 940,
          }}
        >
          Stories of success from the community
        </div>

        <div
          style={{
            fontSize: 30,
            color: "#52525b",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Interview experiences across placements, internships and career journeys, shared
          by AIT students.
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {[
            ["#dbeafe", "#1e40af", "Placements"],
            ["#dcfce7", "#166534", "Internships"],
            ["#ede9fe", "#5b21b6", "Interview prep"],
          ].map(([bg, fg, label]) => (
            <span
              key={label}
              style={{
                background: bg,
                color: fg,
                fontSize: 24,
                fontWeight: 500,
                padding: "10px 22px",
                borderRadius: 999,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  )
}
