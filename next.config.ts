import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.pohod-spb.ru",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "cms.pohod-spb.ru",
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
