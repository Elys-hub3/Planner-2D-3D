import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false, // Disable source maps for production
  webpack: (config, { dev }) => {
    // Disable source maps in production to avoid Bun compatibility issues
    if (!dev) {
      config.devtool = false;
    }

    // Ignore demo files during build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/public/planner/**',
        '**/demo/**'
      ]
    };
    return config;
  },
  turbopack: {}
};

export default nextConfig;
