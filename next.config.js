/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  experimental: {
    esmExternals: true,
  },
};

module.exports = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};
