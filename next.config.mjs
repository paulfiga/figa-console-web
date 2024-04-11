/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src'], // Only run ESLint
  },
};

export default nextConfig;
