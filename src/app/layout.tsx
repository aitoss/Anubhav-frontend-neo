import { geistMono, inter } from "@/lib/fonts";
import type { Metadata, Viewport } from "next/types";
import "./globals.css";
import { QueryProvider } from '../providers';

export const metadata: Metadata = {
  title: "Anubhav",
  description:
    "Anubhav is a pioneering web platform that has been meticulously constructed to revolutionize the path to successful college placements. The entire website layout has been completely revamped to offer an engaging experience as you explore a wealth of information and tools. Your go-to resource for priceless insights, knowledgeable counsel, and practical interview experience is Anubhav.",
  keywords:
    "college placements, career advice, interview tips, internship success, Anubhav",
  openGraph: {
    type: "website",
    url: "https://anubhav.aitoss.club/",
    title: "Anubhav",
    description:
      "Anubhav is a pioneering web platform that has been meticulously constructed to revolutionize the path to successful college placements. The entire website layout has been completely revamped to offer an engaging experience as you explore a wealth of information and tools. Your go-to resource for priceless insights, knowledgeable counsel, and practical interview experience is Anubhav.",
    siteName: "Anubhav",
    images: [
      {
        url: "https://anubhav.aitoss.club/og-cover.png",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    title: "Anubhav",
    description:
      "Anubhav is a pioneering web platform that has been meticulously constructed to revolutionize the path to successful college placements. The entire website layout has been completely revamped to offer an engaging experience as you explore a wealth of information and tools. Your go-to resource for priceless insights, knowledgeable counsel, and practical interview experience is Anubhav.",
    images: ["https://anubhav.aitoss.club/og-cover.png"],
  },
  alternates: {
    canonical: "https://anubhav.aitoss.club/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
