import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow opening the dev server via LAN IP (e.g. http://10.x.x.x:3000)
  allowedDevOrigins: ["10.226.139.76"],
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cyberlabs-india.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
    ],
  },
};

export default nextConfig;
