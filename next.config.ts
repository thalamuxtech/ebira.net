import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export: every route prerenders, so Firebase Hosting
  // can serve the site from its CDN with no server runtime.
  output: "export",
};

export default nextConfig;
