/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    allowMiddlewareResponseBody: true,
  },
  env: {
    API_URL: "https://mi-negocio-evom7sog1-drago-do.vercel.app/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
