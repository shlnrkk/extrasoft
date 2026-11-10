/** @type {import('next').NextConfig} */
const isGithubPages = process.env.EXTRASOFT_PAGES === 'true';
const nextConfig = {
  ...(isGithubPages ? { output: 'export', trailingSlash: true, basePath: process.env.NEXT_PUBLIC_BASE_PATH || '' } : {}),
  webpack(config) {
    config.resolve.alias = { ...config.resolve.alias, canvas: false };
    return config;
  }
};
export default nextConfig;
