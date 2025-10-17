import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: false,
  },
  images: {
    // 외부 이미지 최적화 완전 비활성화 (Vercel 유료 기능 회피)
    unoptimized: true,
    domains: [
      'team2-app-s3-bucket.s3.ap-northeast-2.amazonaws.com',
      'team2-app-s3-bucket.s3.amazonaws.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.thecocktaildb.com',
      },
    ],
  },
  env: {
    NPUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // webpack 설정
  webpack: (config) => {
    // @ts-expect-error 타입 에러 무시
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              ext: 'tsx',
            },
          },
        ],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
