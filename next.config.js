/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: ['i.ibb.co'],
  },
  transpilePackages: ['novel', '@tiptap/core', '@tiptap/pm', '@tiptap/starter-kit'],
}

export default nextConfig;
