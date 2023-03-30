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
    // API_URL: "http://192.168.1.70:3001/",
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
