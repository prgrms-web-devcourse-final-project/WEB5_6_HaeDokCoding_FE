import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'export',
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  turbopack: {
    rules: {
      '.svg': {
        loaders: ['@svgr/webpack'],
        as: '.js',
      },
    },
  },
};

export default nextConfig;