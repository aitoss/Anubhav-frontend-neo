// Run: node --experimental-strip-types apps/web/lib/article-form-validation.test.ts
import assert from "node:assert/strict"

import {
  pruneSatisfiedErrors,
  validateArticleStep,
  type ArticleFormValues,
} from "./article-form-validation.ts"

const empty: ArticleFormValues = {
  company: "",
  position: "",
  title: "",
  tags: [],
  banner: null,
  articleHtml: "",
}

const filled: ArticleFormValues = {
  company: "Test",
  position: "Internship",
  title: "First job",
  tags: ["ntohing", "sure"],
  banner: "data:image/png;base64,xxx",
  articleHtml: "<p>hello</p>",
}

// step 1 flags every empty field
assert.deepEqual(Object.keys(validateArticleStep(1, empty, false)).sort(), [
  "banner",
  "company",
  "position",
  "tags",
  "title",
])

// a filled step 1 is clean
assert.deepEqual(validateArticleStep(1, filled, false), {})

// edit mode does not demand a new banner
assert.ok(!("banner" in validateArticleStep(1, { ...filled, banner: null }, true)))

// step 2 needs real text, not just the editor's empty-paragraph markup
assert.ok("article" in validateArticleStep(2, { ...filled, articleHtml: "<p><br></p>" }, false))
assert.deepEqual(validateArticleStep(2, filled, false), {})

// the reported bug: stale errors clear once the fields are filled
const stale = validateArticleStep(1, empty, false)
assert.deepEqual(pruneSatisfiedErrors(stale, filled), {})

// partially filled keeps only what is still missing
assert.deepEqual(
  Object.keys(pruneSatisfiedErrors(stale, { ...empty, company: "Test", title: "x" })).sort(),
  ["banner", "position", "tags"],
)

// identity preserved when nothing changed, so React bails out of the re-render
assert.equal(pruneSatisfiedErrors(stale, empty), stale)

console.log("article-form-validation: all assertions passed")
