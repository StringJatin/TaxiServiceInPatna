/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['mixkit.imgix.net'], 
      domains : ['backend-taxi.onrender.com'],
       // Add the hostname(s) for your images
    },
    // Other Next.js configuration options, if needed
 
  
  experimental: {
      appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
      remotePatterns: [
          { hostname: 'res.cloudinary.com', protocol: 'https', port: '' }
      ]
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