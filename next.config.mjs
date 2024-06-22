import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.tipsplay.gg',
        pathname: '/**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'd3n2w13ni1lm5q.cloudfront.net',
        pathname: '/**',
        port: '',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
