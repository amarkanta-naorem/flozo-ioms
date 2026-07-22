import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "globizs-whatsappclone-media.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
