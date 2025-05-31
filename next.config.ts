// frontend/next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', 
    images: { 
    unoptimized: true, 
  },
  distDir: 'docs', 
};


export default nextConfig;