/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          fallback: {
            loader: "file-loader",
            options: {
              publicPath: "/_next/static/images",
              outputPath: "static/images",
            },
          },
        },
      },
    });
    config.resolve.alias["@masters"] = path.resolve(__dirname, "../masters");
    return config;
  },
};

module.exports = nextConfig;
