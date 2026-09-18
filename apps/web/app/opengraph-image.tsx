import { ImageResponse } from "next/og"

import { SITE_NAME } from "@/lib/site"

export const alt = "Anubhav — interview experiences from AIT students"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Generated rather than a committed PNG: the old public/og-cover.png showed the
// pre-redesign UI and went stale. This tracks the current brand automatically.
export default function Image() {
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
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="46" viewBox="0 0 45 40" fill="#18181b">
            <path d="M22.0122 0.5L10.9529 18.6788L12.6481 19.2122L0.000740229 40.0009L0 40.0021H5.2L22.0122 12.3086L38.8244 40.0021H44.0244L22.0122 0.5Z" />
          </svg>
          <span style={{ fontSize: 52, fontWeight: 600, color: "#18181b", letterSpacing: -1 }}>
            {SITE_NAME}
          </span>
        </div>

        <div
          style={{
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
    size,
  )
}
