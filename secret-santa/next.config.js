/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  redirects: async () => {
    return [
      {
        source: '/*',
        destination: '/index.html',
        status: 200,
      },
    ];
  }
}

module.exports = nextConfig
