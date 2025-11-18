
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Mantener para ver errores reales
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Configuración para Vercel
  output: 'standalone', 
}

module.exports = nextConfig
