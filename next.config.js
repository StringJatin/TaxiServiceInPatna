/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['mixkit.imgix.net'], 
      domains : ['backend-taxi.onrender.com'],
      domains : ['res.cloudinary.com'],
       // Add the hostname(s) for your images
    },
    // Other Next.js configuration options, if needed
 
  
  experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
      config.experiments = {
          ...config.experiments,
          topLevelAwait: true,
      }
      return config
  }
};

module.exports = nextConfig