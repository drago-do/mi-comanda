/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // HOST = "https://mi-comanda.vercel.app",
    //API_URL: "https://mi-negocio-api.vercel.app/",
    HOST_ULR: "http://127.0.0.1:3000",
    API_URL: "http://192.168.1.236:3001/",
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
