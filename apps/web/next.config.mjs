/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // ponytail: /stories and /search hit the same /blogs endpoint with the same
  // pagination as /article, so they redirect instead of duplicating that page.
  // Query strings are forwarded by Next automatically.
  async redirects() {
    return [
      // /auth was a SuperTokens prebuilt-UI route that crashed during SSR
      // (init is client-only). /log-in is the app's real auth page and reads
      // the same redirectToPath param.
      { source: "/auth", destination: "/log-in", permanent: true },
      { source: "/auth/:path*", destination: "/log-in", permanent: true },
      { source: "/stories", destination: "/article", permanent: true },
      { source: "/search", destination: "/article", permanent: true },
      { source: "/blog/:id", destination: "/article/:id", permanent: true },
      { source: "/profile", destination: "/profile/me", permanent: true },
      { source: "/my-posts", destination: "/profile/me", permanent: true },
      // `me` and `edit` are real pages, so they must not match this catch-all.
      {
        source: "/profile/:userId((?!me$|edit$).*)",
        destination: "/u/:userId",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
