import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Transpile @mysten packages to ensure compatibility
  transpilePackages: ['@mysten/dapp-kit', '@mysten/sui'],

  // Webpack configuration for polyfills if needed
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },

  // Turbopack configuration (required in Next.js 16 when webpack config exists)
  turbopack: {},
};

export default nextConfig;
