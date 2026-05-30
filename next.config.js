/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['mdbcdn.b-cdn.net'], // Add the domain(s) from your external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mdbcdn.b-cdn.net',
        port: '',
        pathname: '**',
      },
      // Add other remote patterns if needed for other external image sources
    ],
  },
}

module.exports = nextConfig


