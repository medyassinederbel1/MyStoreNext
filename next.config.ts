import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.paypalobjects.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['react-slick'],
  },
}

export default nextConfig
