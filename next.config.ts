import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_API_HOSTNAME || 'work-test-web-2024-eze6j4scpq-lz.a.run.app',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
