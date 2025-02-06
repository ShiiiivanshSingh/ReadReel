/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add these options to help with file system issues
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  experimental: {
    // Disable worker threads to prevent file locking
    workerThreads: false,
    cpus: 1,
    // Add these to stabilize the build
    serverActions: {
      bodySizeLimit: '2mb',
    },
    serverComponentsExternalPackages: [],
  },
  // Add these to prevent excessive reloading
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: ['**/.git/**', '**/node_modules/**', '**/.next/**']
    }
    return config
  },
  poweredByHeader: false,
  generateEtags: false,
  distDir: '.next',
  cleanDistDir: true,
  reactStrictMode: true,
};

export default nextConfig;
