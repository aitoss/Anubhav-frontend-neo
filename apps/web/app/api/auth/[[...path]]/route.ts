import { NextRequest } from "next/server"

import { BACKEND_ORIGIN } from "@/lib/backend"

// SuperTokens' own API, proxied so auth is same-origin with the rest of the app.
// Without this, sign-in happens against the backend origin and the session
// cookie is set there - a cookie our origin can never send back, so every
// authenticated call came back "unauthorised".
const UPSTREAM_AUTH_BASE = `${BACKEND_ORIGIN}/auth`

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
  "content-encoding",
])

// Upstream scopes cookies to its own host, and it marks them Secure because it
// is served over https. Drop Domain so the browser accepts them for our origin,
// and drop Secure on http so they are not discarded in local dev.
function rewriteSetCookie(value: string, isSecureRequest: boolean) {
  let cookie = value.replace(/;\s*Domain=[^;]*/gi, "")
  if (!isSecureRequest) {
    cookie = cookie.replace(/;\s*Secure/gi, "")
    cookie = cookie.replace(/;\s*SameSite=None/gi, "; SameSite=Lax")
  }
  return cookie
}

async function proxyAuth(request: NextRequest, pathSegments: string[] = []) {
  const path = pathSegments.join("/")
  const upstreamUrl = new URL(path ? `${UPSTREAM_AUTH_BASE}/${path}` : UPSTREAM_AUTH_BASE)
  upstreamUrl.search = request.nextUrl.search

  const headers = new Headers(request.headers)
  for (const headerName of HOP_BY_HOP_HEADERS) {
    headers.delete(headerName)
  }
  // This hop is server-to-server. Forwarding the browser's Origin makes the
  // upstream run its CORS allowlist against our dev port and reject the call;
  // with no Origin it treats us as a non-browser client.
  headers.delete("origin")
  headers.delete("referer")
  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer()
  }

  const upstreamResponse = await fetch(upstreamUrl, init)

  const responseHeaders = new Headers()
  const isSecureRequest = request.nextUrl.protocol === "https:"

  upstreamResponse.headers.forEach((value, key) => {
    const lower = key.toLowerCase()
    if (HOP_BY_HOP_HEADERS.has(lower)) return
    // Same-origin now, so upstream's CORS headers are meaningless and its
    // allow-origin value would be wrong for us.
    if (lower.startsWith("access-control-")) return
    if (lower === "set-cookie") return
    responseHeaders.set(key, value)
  })

  for (const cookie of upstreamResponse.headers.getSetCookie()) {
    responseHeaders.append("set-cookie", rewriteSetCookie(cookie, isSecureRequest))
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders,
  })
}

type Context = { params: Promise<{ path?: string[] }> }

export async function GET(request: NextRequest, context: Context) {
  return proxyAuth(request, (await context.params).path ?? [])
}

export async function POST(request: NextRequest, context: Context) {
  return proxyAuth(request, (await context.params).path ?? [])
}

export async function PUT(request: NextRequest, context: Context) {
  return proxyAuth(request, (await context.params).path ?? [])
}

export async function PATCH(request: NextRequest, context: Context) {
  return proxyAuth(request, (await context.params).path ?? [])
}

export async function DELETE(request: NextRequest, context: Context) {
  return proxyAuth(request, (await context.params).path ?? [])
}

export async function OPTIONS(request: NextRequest, context: Context) {
  return proxyAuth(request, (await context.params).path ?? [])
}
