/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "mixkit.imgix.net",
            "backend-taxi.onrender.com",
            "res.cloudinary.com",
            // Add other image domains here if needed
          ],},
    // Other Next.js configuration options, if needed
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true
      }
      
};

module.exports = nextConfig