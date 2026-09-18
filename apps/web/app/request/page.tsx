"use client"

import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundDots } from "@/components/background-dots"
import protectedAxios from "@/lib/protectedAxios"

const RATE_LIMIT_MS = 3 * 60 * 60 * 1000
const RATE_LIMIT_KEY = "lastRequestTime"

const EMPTY = { name: "", seniorName: "", email: "", link: "", company: "", note: "" }

export default function RequestArticlePage() {
  const [value, setValue] = React.useState(EMPTY)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value: fieldValue } = event.target
    setValue((previous) => ({ ...previous, [name]: fieldValue }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    if (!value.name.trim() || !value.email.trim() || !value.seniorName.trim()) {
      setError("Please fill in your name, email, and the senior's name.")
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(value.email.trim())) {
      setError("Please enter a valid email address.")
      return
    }

    // Same client-side throttle the Vite page used: one request per 3 hours.
    try {
      const last = Number(localStorage.getItem(RATE_LIMIT_KEY))
      if (last && Date.now() - last < RATE_LIMIT_MS) {
        setError("You can only submit a request once every 3 hours.")
        return
      }
    } catch {
      // storage unavailable; let the request through
    }

    setIsLoading(true)
    try {
      await protectedAxios.post("/api/anubhav/reqarticle", {
        requesterName: value.name,
        requesteeName: value.seniorName,
        requesteeContact: value.link,
        company: value.company,
        note: value.note,
        requesterEmailId: value.email,
      })
      setSuccess("Request Sent Successfully")
      setValue(EMPTY)
      try {
        localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()))
      } catch {
        // ignore
      }
    } catch {
      setError("Internal server error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <BackgroundDots dotSize={1.8} gap={15} fade />
      <main className="relative mx-auto w-full max-w-2xl px-4 pt-24 pb-16">
        <h1 className="text-3xl font-medium tracking-tight">Request an article</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Ask a senior to share their interview experience. We&apos;ll reach out on your
          behalf.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Your name</Label>
            <Input id="name" name="name" value={value.name} onChange={handleChange} placeholder="Name" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Your email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={value.email}
              onChange={handleChange}
              placeholder="College mail ID"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="seniorName">Senior&apos;s name</Label>
            <Input
              id="seniorName"
              name="seniorName"
              value={value.seniorName}
              onChange={handleChange}
              placeholder="Senior's name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="link">Senior&apos;s social link</Label>
            <Input
              id="link"
              name="link"
              value={value.link}
              onChange={handleChange}
              placeholder="Senior's any social media link"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              value={value.company}
              onChange={handleChange}
              placeholder="Company Name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="note">Personal note</Label>
            <Textarea
              id="note"
              name="note"
              value={value.note}
              onChange={handleChange}
              placeholder="Personal note"
              rows={4}
            />
          </div>

          {error ? <p className="text-destructive text-sm">{error}</p> : null}
          {success ? <p className="text-sm text-green-600">{success}</p> : null}

          <div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send request"}
            </Button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}
