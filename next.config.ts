import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize package imports for tree-shaking
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Strip console logs in production (keep error/warn)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },
};

export default nextConfig;
