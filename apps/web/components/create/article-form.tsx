"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

import { BackgroundDots } from "@/components/background-dots"
import { BannerUpload } from "@/components/create/banner-upload"
import { CompanyAutocomplete } from "@/components/create/company-autocomplete"
import { RichEditor } from "@/components/create/rich-editor"
import { TagInput } from "@/components/create/tag-input"
import { buildArticlePath } from "@/lib/article-url"
import { highlightCodeBlocks } from "@/lib/highlight-code"
import { createBlog, updateBlog, type ArticlePayload } from "@/lib/blogs"
import {
  pruneSatisfiedErrors,
  validateArticleStep,
  type ArticleFormValues,
} from "@/lib/article-form-validation"
import type { Article } from "@/lib/articles"

const POSITIONS = [
  { value: "Internship", label: "Internship" },
  { value: "FullTime", label: "Full Time" },
]

const DRAFT_KEY = "anubhav:create-draft"

type Props = { mode?: "create" | "edit"; articleId?: string; initialArticle?: Article | null }

export function ArticleForm({ mode = "create", articleId, initialArticle }: Props) {
  const isEdit = mode === "edit"
  const router = useRouter()

  const [step, setStep] = React.useState(1)
  const [company, setCompany] = React.useState(initialArticle?.companyName ?? "")
  const [companyId, setCompanyId] = React.useState<string | null>(null)
  const [position, setPosition] = React.useState((initialArticle as any)?.typeOfArticle ?? "")
  const [title, setTitle] = React.useState(initialArticle?.title ?? "")
  const [tags, setTags] = React.useState<string[]>(
    initialArticle?.articleTags ?? initialArticle?.tags ?? [],
  )
  const [banner, setBanner] = React.useState<string | null>(initialArticle?.imageUrl ?? null)
  const [articleHtml, setArticleHtml] = React.useState(initialArticle?.description ?? "")
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [submitting, setSubmitting] = React.useState(false)
  const [savedAt, setSavedAt] = React.useState<string | null>(null)
  const [submitted, setSubmitted] = React.useState(false)

  React.useEffect(() => {
    if (!initialArticle) return
    setCompany(initialArticle.companyName ?? "")
    setTitle(initialArticle.title ?? "")
    setTags(initialArticle.articleTags ?? initialArticle.tags ?? [])
    setBanner(initialArticle.imageUrl ?? null)
    setArticleHtml(initialArticle.description ?? "")
    setPosition((initialArticle as any)?.typeOfArticle ?? "")
  }, [initialArticle])

  // Autosave drafts for new articles only, same as the Vite useAutoSave hook.
  const draft = React.useMemo(
    () => ({ company, companyId, position, title, tags, banner, articleHtml, step }),
    [company, companyId, position, title, tags, banner, articleHtml, step],
  )

  React.useEffect(() => {
    if (isEdit) return
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
        setSavedAt(new Date().toLocaleTimeString())
      } catch {
        // storage can be unavailable (private mode); drafts are a convenience
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [draft, isEdit])

  React.useEffect(() => {
    if (isEdit) return
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (!raw) return
      const saved = JSON.parse(raw)
      setCompany(saved.company ?? "")
      setCompanyId(saved.companyId ?? null)
      setPosition(saved.position ?? "")
      setTitle(saved.title ?? "")
      setTags(saved.tags ?? [])
      setBanner(saved.banner ?? null)
      setArticleHtml(saved.articleHtml ?? "")
    } catch {
      // ignore malformed drafts
    }
  }, [isEdit])

  const values: ArticleFormValues = React.useMemo(
    () => ({ company, position, title, tags, banner, articleHtml }),
    [company, position, title, tags, banner, articleHtml],
  )

  // Clear an error as soon as its field is satisfied. Without this the errors
  // set on Next stayed on screen even once the form was fully filled in.
  React.useEffect(() => {
    setErrors((previous) => pruneSatisfiedErrors(previous, values))
  }, [values])

  function validateStep() {
    const next = validateArticleStep(step, values, isEdit)
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const highlightedPreview = React.useMemo(
    () => (step === 3 ? highlightCodeBlocks(articleHtml) : ""),
    [step, articleHtml],
  )

  function buildPayload(): ArticlePayload {
    const payload: ArticlePayload = { title, article: articleHtml, role: position, articleTags: tags }
    if (companyId) payload.companyId = companyId
    else if (company) payload.companyName = company
    if (!isEdit) payload.image = banner
    else if (banner && banner !== initialArticle?.imageUrl) payload.image = banner
    return payload
  }

  async function publish() {
    setSubmitting(true)
    try {
      if (isEdit && articleId) {
        const res = await updateBlog(articleId, buildPayload())
        router.push(buildArticlePath({ id: res.article?._id ?? articleId, title }))
      } else {
        await createBlog(buildPayload())
        try {
          localStorage.removeItem(DRAFT_KEY)
        } catch {
          // ignore
        }
        // Do not link to the article: it stays non-public until a reviewer
        // marks it authentic, so the detail page would 403.
        setSubmitted(true)
      }
    } catch (error: any) {
      const status = error?.response?.status
      if (status === 401) {
        router.push(`/log-in?redirectToPath=${encodeURIComponent(location.pathname)}`)
      } else if (status === 403 || status === 404) {
        setErrors({ submit: status === 403 ? "You are not the author of this article." : "Article not found." })
      } else {
        setErrors({
          submit: error?.response?.data?.message || "Failed to submit the article. Please try again.",
        })
      }
    } finally {
      setSubmitting(false)
    }
  }

  // A new article is not public until a reviewer marks it authentic, so we
  // confirm here instead of linking to a page that would 403.
  if (submitted) {
    return (
      <main className="relative mx-auto w-full max-w-2xl px-4 py-6">
        <div className="border-border bg-card flex flex-col items-center gap-4 rounded-2xl border p-10 text-center">
          <h1 className="text-2xl font-medium tracking-tight">
            Your article has been submitted
          </h1>
          <p className="text-muted-foreground max-w-md text-sm leading-6">
            It will go live once a reviewer has checked it over. You can find it under your
            profile in the meantime.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button render={<Link href="/profile/me" />}>View my articles</Button>
            <Button variant="outline" render={<Link href="/article" />}>
              Browse articles
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      {/* <BackgroundDots dotSize={1.8} gap={15} fade /> */}
      <main className="relative mx-auto w-full max-w-3xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
            {isEdit ? "Edit article" : "Write an article"}
          </h1>
          <span className="text-muted-foreground text-sm">Step {step} of 3</span>
        </div>

        {step === 1 ? (
          <div className="flex flex-col gap-5">
            <CompanyAutocomplete
              value={company}
              error={errors.company}
              onSelect={(name, id) => {
                setCompany(name)
                setCompanyId(id)
              }}
            />

            <div className="flex flex-col gap-2">
              <Label>Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger aria-invalid={Boolean(errors.position)}>
                  <SelectValue placeholder="Select Position" />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.position ? <p className="text-destructive text-sm">{errors.position}</p> : null}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                placeholder="Blog Title"
                aria-invalid={Boolean(errors.title)}
                onChange={(event) => setTitle(event.target.value)}
              />
              {errors.title ? <p className="text-destructive text-sm">{errors.title}</p> : null}
            </div>

            <TagInput tags={tags} setTags={setTags} error={errors.tags} />
            <BannerUpload value={banner} onChange={setBanner} error={errors.banner} />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="flex flex-col gap-2">
            <RichEditor value={articleHtml} onChange={setArticleHtml} />
            {errors.article ? <p className="text-destructive text-sm">{errors.article}</p> : null}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="flex flex-col gap-4">
            {banner ? (
              <img src={banner} alt={title} className="max-h-72 w-full rounded-lg object-cover" />
            ) : null}
            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
              <span className="text-foreground font-medium">{company}</span>
              <span aria-hidden>&bull;</span>
              <span>{POSITIONS.find((p) => p.value === position)?.label ?? position}</span>
            </div>
            <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">{title}</h2>
            <div
              className="article-prose"
              dangerouslySetInnerHTML={{ __html: highlightedPreview }}
            />
          </div>
        ) : null}

        {errors.submit ? <p className="text-destructive pt-4 text-sm">{errors.submit}</p> : null}

        <div className="flex items-center justify-between pt-8">
          <div className="text-muted-foreground text-xs">
            {!isEdit && savedAt ? `Draft saved at ${savedAt}` : null}
          </div>
          <div className="flex gap-3">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : null}
            {step < 3 ? (
              <Button
                type="button"
                onClick={() => {
                  if (validateStep()) setStep(step + 1)
                }}
              >
                Next
              </Button>
            ) : (
              <Button type="button" disabled={submitting} onClick={() => void publish()}>
                {submitting ? "Publishing..." : isEdit ? "Update article" : "Publish"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
