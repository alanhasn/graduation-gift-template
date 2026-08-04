import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole site is client-rendered, so this builds to
  // a plain `out/` folder deployable anywhere (Netlify Drop, Vercel,
  // GitHub Pages, S3, ...) with zero server required.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
