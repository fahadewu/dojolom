import type { NextConfig } from "next";

// The tutor (src/app/api/tutor) needs a server, so the site is no longer a static export; it runs on Vercel.
// NEXT_PUBLIC_BASE_PATH still mounts the app under a sub-path when one is needed.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/+$/, "") || undefined;

const nextConfig: NextConfig = {
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
