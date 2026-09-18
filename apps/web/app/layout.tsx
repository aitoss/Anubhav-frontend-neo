import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ReactQueryProvider } from "@/components/react-query-provider"
import { cn } from "@workspace/ui/lib/utils"
import SearchShortcut from "@/components/search-shortcut"
import { SuperTokensProvider } from "@/components/supertokens-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site"


// Mirrors master's index.html head, with a title template so each route can
// set its own name without repeating the brand.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  // Master ships favicon.svg only; advertising a .ico we do not have just
  // produces a 404 (and the stock Next favicon.ico was the Vercel mark).
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
}

const inter = Inter({subsets:['latin'],axes:["opsz"], variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable,)}
    >
      <body>
        <SuperTokensProvider>
          <ThemeProvider>
            <ReactQueryProvider>
              <SearchShortcut />
              <Header />
              {children}
              <Footer />
            </ReactQueryProvider>
          </ThemeProvider>
        </SuperTokensProvider>
      </body>
    </html>
  )
}
