const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
});
/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  env: {
    API_URL: "https://mi-negocio-api.vercel.app/",
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
});

module.exports = nextConfig;
