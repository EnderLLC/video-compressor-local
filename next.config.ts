import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.CAPACITOR_BUILD ? "export" : undefined,
  // Headers are only applied effectively when not in export mode, 
  // or must be handled by the serving platform.
  // We keep them here for the web deployment.
  async headers() {
    if (process.env.CAPACITOR_BUILD) return [];
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
