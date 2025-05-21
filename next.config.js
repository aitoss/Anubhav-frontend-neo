/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  }
}

export default nextConfig;
