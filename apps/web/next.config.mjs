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
      { source: "/stories", destination: "/article", permanent: true },
      { source: "/search", destination: "/article", permanent: true },
      { source: "/blog/:id", destination: "/article/:id", permanent: true },
      { source: "/profile", destination: "/profile/me", permanent: true },
      { source: "/my-posts", destination: "/profile/me", permanent: true },
      { source: "/profile/:userId", destination: "/u/:userId", permanent: true },
    ]
  },
}

export default nextConfig
