import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ReactQueryProvider } from "@/components/react-query-provider"
import { cn } from "@workspace/ui/lib/utils"
import SearchShortcut from "@/components/search-shortcut"
import { SuperTokensProvider } from "@/components/supertokens-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"


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
