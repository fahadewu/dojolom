import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH=/repo-name when deploying as a GitHub project site (user.github.io/repo-name).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/+$/, "") || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
