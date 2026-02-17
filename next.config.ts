import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Turbopack config for Next.js 16
  turbopack: {},
  // Production optimizations
  productionBrowserSourceMaps: false,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
}

export default nextConfig
