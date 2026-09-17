function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)

  for (let index = 0; index < hex.length; index += 2) {
    bytes[index / 2] = Number.parseInt(hex.slice(index, index + 2), 16)
  }

  return bytes
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

function toBase64Url(value: string): string {
  const bytes = hexToBytes(value)
  let binary = ""

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "")
}

function fromBase64Url(token: string): string {
  const paddedToken = token.replace(/-/g, "+").replace(/_/g, "/")
  const padding = "=".repeat((4 - (paddedToken.length % 4)) % 4)
  const binary = atob(`${paddedToken}${padding}`)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return bytesToHex(bytes)
}

export function encodeArticleId(id: string): string {
  return toBase64Url(id)
}

export function decodeArticleId(token: string): string {
  const hex = fromBase64Url(token)
  if (!hex) return ""

  return hex.padStart(24, "0")
}

export function slugifyArticleTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function buildArticlePath(input: { id: string; title?: string }) {
  const title = input.title?.trim()
  if (!title) return `/article/${input.id}`

  const slug = slugifyArticleTitle(title)
  if (!slug) return `/article/${input.id}`

  return `/article/${slug}~${encodeArticleId(input.id)}`
}

export function extractArticleSlugFromRoute(slug: string): string {
  if (!slug) return ""

  const separatorIndex = slug.lastIndexOf("~")
  if (separatorIndex === -1) return ""

  return slug.slice(0, separatorIndex)
}

export function extractArticleTokenFromRoute(slug: string): string {
  if (!slug) return ""

  const separatorIndex = slug.lastIndexOf("~")
  if (separatorIndex === -1) return ""

  return slug.slice(separatorIndex + 1)
}

export function extractArticleIdFromRoute(slug: string): string {
  if (!slug) return ""

  const token = extractArticleTokenFromRoute(slug)
  if (!token) return slug

  const decodedId = decodeArticleId(token)
  return decodedId || slug
}
