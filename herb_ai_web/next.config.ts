import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    }
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'html-loader',
    });
    return config;
  },
};

export default nextConfig;
