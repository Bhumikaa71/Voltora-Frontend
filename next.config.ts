import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",          // change if your backend runs on another port
        pathname: "/uploads/**",
      },
      // Add your production domain later, e.g.:
      // {
      //   protocol: "https",
      //   hostname: "api.yourdomain.com",
      //   pathname: "/uploads/**",
      // },
    ],
  },
};

export default nextConfig;