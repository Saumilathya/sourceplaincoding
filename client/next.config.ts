import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "codewithharry.nyc3.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "https://dl.polyhaven.org",
      },
    ],
  },
};

export default nextConfig;
