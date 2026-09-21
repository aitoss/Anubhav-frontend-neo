import { NextRequest } from "next/server"

import { BACKEND_URL } from "@/lib/backend"

// Same origin as the auth proxy, so NEXT_PUBLIC_BACKEND_URL points both at a
// preview deployment in one go.
const UPSTREAM_BASE_URL = BACKEND_URL
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

async function proxyRequest(request: NextRequest, pathSegments: string[] = []) {
  const upstreamUrl = new URL(UPSTREAM_BASE_URL)
  const path = pathSegments.join("/")
  if (path) {
    upstreamUrl.pathname = `${upstreamUrl.pathname.replace(/\/$/, "")}/${path}`
  }
  upstreamUrl.search = request.nextUrl.search

  const headers = new Headers(request.headers)
  for (const headerName of HOP_BY_HOP_HEADERS) {
    headers.delete(headerName)
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "follow",
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer()
  }

  const upstreamResponse = await fetch(upstreamUrl, init)
  const responseHeaders = new Headers(upstreamResponse.headers)
  for (const headerName of HOP_BY_HOP_HEADERS) {
    responseHeaders.delete(headerName)
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders,
  })
}

export async function GET(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params
  return proxyRequest(request, params.path ?? [])
}

export async function POST(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params
  return proxyRequest(request, params.path ?? [])
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params
  return proxyRequest(request, params.path ?? [])
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params
  return proxyRequest(request, params.path ?? [])
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params
  return proxyRequest(request, params.path ?? [])
}

export async function HEAD(request: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params
  return proxyRequest(request, params.path ?? [])
}
