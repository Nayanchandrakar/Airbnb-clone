/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["files.edgestore.dev", "img.clerk.com"],
  },
}

module.exports = nextConfig
