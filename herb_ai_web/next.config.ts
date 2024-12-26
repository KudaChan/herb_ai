import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.html': {
          loaders: ['raw-loader'],
          as: '*.html',
        },
      },
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader',
    });
    if (!config.externals) {
      config.externals = [];
    }
    if (Array.isArray(config.externals)) {
      config.externals.push({
        '@mapbox/node-pre-gyp': 'commonjs @mapbox/node-pre-gyp',
      });
    } else if (typeof config.externals === 'object') {
      config.externals['@mapbox/node-pre-gyp'] = 'commonjs @mapbox/node-pre-gyp';
    }
    return config;
  },
};

export default nextConfig;
