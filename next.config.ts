import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages用の設定
  output: "export",
  basePath: process.env.GITHUB_PAGES === "true" ? "/movie-stream-platform" : "",
  trailingSlash: true,
  // 画像最適化の設定（静的エクスポートでは最適化を無効化）
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
