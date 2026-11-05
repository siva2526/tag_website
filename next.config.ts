import type { NextConfig } from "next";
import path from "path";

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // When building in GitHub Actions, use /tag_website as basePath unless overridden
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (isGithubActions ? '/tag_website' : ''),
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
