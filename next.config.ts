import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'standalone',
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;
