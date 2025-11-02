import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ganpanjib-public-images.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
};
module.exports = nextConfig;