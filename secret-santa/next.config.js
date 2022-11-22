/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects: async () => {
    return [
      {
        source: '/:path*',
        destination: '/index.html',
        permanent: true,
      },
    ];
  }
}

module.exports = nextConfig
