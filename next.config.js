/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    allowMiddlewareResponseBody: true,
  },
  env: {
    API_URL: "http://192.168.1.70:3001/",
  },
};

module.exports = nextConfig;
