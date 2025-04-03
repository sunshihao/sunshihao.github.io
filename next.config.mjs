import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出
  output: 'export',
  // basePath: '/blog',
  distDir: 'docs',
  // assetPrefix: 'https://blog-omega-five-74.vercel.app', // cdn 设置
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['github.com', 'dhc.ink'],
    unoptimized: true // 静态导出需要
  },
  webpack: (config) => {
    // if (isServer) {
    // 	require('./scripts/generate-sitemap'); // eslint-disable-line
    // 	require('./scripts/generate-rss'); // eslint-disable-line
    // }
    // generate(); // rss
    config.module.rules.push({
      test: /locales\/.*\.json$/,
      loader: '@formatjs/intl-localematcher'
    });
    return config;
  }
};

export default withContentlayer(nextConfig);
