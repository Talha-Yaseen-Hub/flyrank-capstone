/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allow production builds to successfully complete even if the project has ESLint errors.
    // This prevents warning lint checks in the playground/ or src/ folder from blocking the build.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore type errors during build.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
