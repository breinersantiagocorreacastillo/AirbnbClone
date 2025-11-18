import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false, 
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Opcional: puedes ser más específico con pathname
        // pathname: '/your-cloud-name/**',
      },
    ],
  },
  
  env: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  },
};

export default nextConfig;
