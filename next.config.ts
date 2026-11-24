import type { NextConfig } from "next";

// GitHub Pages serve il sito sotto /minuteria-facchini: il basePath arriva
// dalla pipeline di deploy, in locale resta vuoto.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
