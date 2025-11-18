import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
        ignoreBuildErrors: false, 
    },

    images: {
    domains: ['res.cloudinary.com'],
   
  },
  env: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  },
};

export default nextConfig;
