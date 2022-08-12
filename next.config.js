/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      net: false,
      child_process: false,
      readline: false,
     };

    return config;
  },
  swcMinify: true,
  images: {
    domains: [
      "pbs.twimg.com",
      "ipfs.infura.io",
      "statics-polygon-lens-staging.s3.eu-west-1.amazonaws.com",
      "s3-us-west-2.amazonaws.com",
    ],
  },


};

module.exports = nextConfig;
