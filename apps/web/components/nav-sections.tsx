import type * as React from "react"

export type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  children?: NavItem[]
}

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
    </svg>
  )
}

function ArticleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </svg>
  )
}

function VideoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h7A2.5 2.5 0 0 1 16 7.5v9A2.5 2.5 0 0 1 13.5 19h-7A2.5 2.5 0 0 1 4 16.5z" />
      <path d="m16 10 4-2v8l-4-2" />
    </svg>
  )
}

function TeamIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-1.5A3.5 3.5 0 0 0 13.5 16h-3A3.5 3.5 0 0 0 7 19.5V21" />
      <path d="M9 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" />
      <path d="M20 21v-1a2.5 2.5 0 0 0-2-2.45" />
      <path d="M16.5 5.2a2.75 2.75 0 0 1 0 5.6" />
      <path d="M4 21v-1a2.5 2.5 0 0 1 2-2.45" />
      <path d="M7.5 5.2a2.75 2.75 0 0 0 0 5.6" />
    </svg>
  )
}

function RequestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 4h10a2 2 0 0 1 2 2v10l-4 4H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
      <path d="M8 8h8" />
      <path d="M8 12h5" />
    </svg>
  )
}

export const sections: NavItem[] = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Stories", href: "/stories", icon: ArticleIcon },
  { label: "Videos", href: "/videos", icon: VideoIcon },
  { label: "Team", href: "/team", icon: TeamIcon },
  { label: "Request Article", href: "/request", icon: RequestIcon },
  { label: "Create Article", href: "/create", icon: ArticleIcon },
]
