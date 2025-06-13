/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: '/dashboard',
  assetPrefix: '/dashboard/',
  images: {
    domains: ['localhost'],
    unoptimized: true
  }
}

export default nextConfig
