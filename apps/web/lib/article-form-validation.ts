export type ArticleFormValues = {
    company: string
    position: string
    title: string
    tags: string[]
    banner: string | null
    articleHtml: string
}

export type ArticleFormErrors = Record<string, string>

function hasText(html: string) {
    return html.replace(/<[^>]*>/g, "").trim().length > 0
}

// One source of truth for the field rules, so validation and error-clearing
// cannot drift apart.
const RULES: { key: string; message: string; ok: (v: ArticleFormValues) => boolean }[] = [
    { key: "company", message: "Company cannot be empty", ok: (v) => Boolean(v.company) },
    { key: "position", message: "Position cannot be empty", ok: (v) => Boolean(v.position) },
    { key: "title", message: "Title cannot be empty", ok: (v) => Boolean(v.title) },
    { key: "tags", message: "Write a tag and press enter to add it", ok: (v) => v.tags.length > 0 },
    { key: "banner", message: "Please upload a banner image", ok: (v) => Boolean(v.banner) },
]

export function validateArticleStep(
    step: number,
    values: ArticleFormValues,
    isEdit: boolean,
): ArticleFormErrors {
    const errors: ArticleFormErrors = {}

    if (step === 1) {
        for (const rule of RULES) {
            // In edit mode the banner is already stored server-side.
            if (rule.key === "banner" && isEdit) continue
            if (!rule.ok(values)) errors[rule.key] = rule.message
        }
    }

    if (step === 2 && !hasText(values.articleHtml)) {
        errors.article = "Please write your article before proceeding"
    }

    return errors
}

// Drops errors whose field is now filled in. Returns the SAME object when
// nothing changed so React can bail out of the re-render.
export function pruneSatisfiedErrors(
    errors: ArticleFormErrors,
    values: ArticleFormValues,
): ArticleFormErrors {
    const keys = Object.keys(errors)
    if (keys.length === 0) return errors

    const next: ArticleFormErrors = { ...errors }
    for (const rule of RULES) {
        if (rule.ok(values)) delete next[rule.key]
    }
    if (hasText(values.articleHtml)) delete next.article

    return Object.keys(next).length === keys.length ? errors : next
}
