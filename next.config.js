/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    allowMiddlewareResponseBody: true,
  },
  env: {
    API_URL: "http://localhost:3001/",
  },
};

module.exports = nextConfig;
