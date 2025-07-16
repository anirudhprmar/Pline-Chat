import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [{
      source:'/chat/:path*',
      destination:'/'
    }]
  },
};

export default nextConfig;
