const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "seeklogo.com",
      "b-f57-zpg-r.zdn.vn",
      "f50-zpg-r.zdn.vn",
      "givenow.vn",
    ],
  },
  // webpack: (config, options) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     react: path.resolve(__dirname, ".", "node_modules", "react"),
  //     "react-dom": path.resolve(__dirname, ".", "node_modules", "react-dom"),
  //   };

  //   return config;
  // },
};

module.exports = nextConfig;
