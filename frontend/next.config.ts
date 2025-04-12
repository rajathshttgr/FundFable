import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fundfable.onrender.com"], // if using next/image
  },
  reactStrictMode: true,
};

export default nextConfig;
