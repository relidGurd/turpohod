import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "pohod-spb.ru",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "turpohod.local",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
