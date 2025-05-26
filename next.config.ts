import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    
  },
  
  
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'multi-vendor-marketplace-backend-6pue.onrender.com',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.*',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['res.cloudinary.com', 'localhost:5000/','multi-vendor-marketplace-backend-6pue.onrender.com'],
  },
};

export default nextConfig;
