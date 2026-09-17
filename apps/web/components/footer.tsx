"use client"

import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "./logo";

function SocialIcon({ href, icon: Icon }: { href: string; icon: React.ComponentType<{ className: string }> }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground transition-colors hover:text-foreground"
    >
      <Icon className="h-5 w-5" />
    </a>
  )
}

function LinkedInIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-sidebar/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-12 lg:gap-16">
          {/* Brand section */}
          <div className="md:col-span-1">
            <div className="flex items-baseline gap-2">
              <Link href="/" className="flex items-center gap-2">
                <Logo className="w-6 h-6 text-foreground" />
                <span className="text-2xl font-heading font-medium tracking-tight">anubhav</span>
              </Link>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Stories of success from the community
            </p>
          </div>

          {/* Products column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Products</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/stories" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Write Article
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/guidelines" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href="/request" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Request Article
                </Link>
              </li>
              <li>
                <a href="https://github.com/aitoss" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Learn More column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Learn More</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/story" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Dev Team
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">Follow</h3>
            <div className="mt-4 flex gap-4">
              <SocialIcon href="https://www.linkedin.com/company/open-source-software-club/" icon={LinkedInIcon} />
              <SocialIcon href="https://www.instagram.com/ossclub.ait/" icon={InstagramIcon} />
              <SocialIcon href="https://github.com/aitoss" icon={GitHubIcon} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-border" />

        {/* Bottom section */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Open Source Software Club. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="/legal/terms" className="transition-colors hover:text-foreground">
                Privacy
              </a>
              <a href="/legal/terms" className="transition-colors hover:text-foreground">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}