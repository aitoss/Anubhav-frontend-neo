"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Spinner } from "@workspace/ui/components/spinner"

import { ProfileShell } from "@/components/profile-view"
import { RequireSession } from "@/components/require-session"
import { useMe } from "@/hooks/use-profile"
import { profilePath, updateMe, type Profile } from "@/lib/users"

const LINKEDIN_RE = /^https?:\/\/(www\.)?linkedin\.com\/.+/i

function EditProfileForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: me, isLoading } = useMe()

  const [form, setForm] = React.useState({ name: "", contact: "", linkedinUrl: "" })
  const [errors, setErrors] = React.useState<Record<string, string | undefined>>({})
  const [saved, setSaved] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!me) return
    setForm({
      name: me.name ?? "",
      contact: me.contact ?? "",
      linkedinUrl: me.linkedinUrl ?? "",
    })
  }, [me])

  const mutation = useMutation({
    mutationFn: (payload: Partial<Profile>) => updateMe(payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(["me"], updated)
      setSaved("Profile updated successfully")
      setTimeout(() => router.push(profilePath(updated)), 900)
    },
    onError: (error: any) => {
      setErrors({ form: error?.response?.data?.message || "Failed to update profile." })
    },
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: undefined }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const linkedinUrl = form.linkedinUrl.trim()
    if (linkedinUrl && !LINKEDIN_RE.test(linkedinUrl)) {
      setErrors({
        linkedinUrl: "Enter a valid LinkedIn URL (e.g. https://linkedin.com/in/username)",
      })
      return
    }
    setErrors({})
    mutation.mutate({ ...form, linkedinUrl })
  }

  if (isLoading || !me) {
    return (
      <ProfileShell>
        <div className="flex h-[40vh] items-center justify-center">
          <Spinner />
        </div>
      </ProfileShell>
    )
  }

  return (
    <ProfileShell>
      <form
        onSubmit={handleSubmit}
        className="border-border bg-card/60 mx-auto flex max-w-2xl flex-col gap-5 rounded-3xl border p-6 md:p-8"
      >
        <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">Edit profile</h1>

        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact">Contact</Label>
          <Input
            id="contact"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Phone or alt email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="linkedinUrl">LinkedIn</Label>
          <Input
            id="linkedinUrl"
            name="linkedinUrl"
            value={form.linkedinUrl}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/your-handle"
            aria-invalid={Boolean(errors.linkedinUrl)}
          />
          {errors.linkedinUrl ? (
            <p className="text-destructive text-sm">{errors.linkedinUrl}</p>
          ) : null}
        </div>

        {errors.form ? <p className="text-destructive text-sm">{errors.form}</p> : null}
        {saved ? <p className="text-sm text-green-600">{saved}</p> : null}

        <div className="flex gap-3">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </ProfileShell>
  )
}

export default function EditProfilePage() {
  return (
    <RequireSession>
      <EditProfileForm />
    </RequireSession>
  )
}
