/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias["@masters"] = path.resolve(__dirname, "../masters");
    return config;
  },
};

module.exports = nextConfig;
