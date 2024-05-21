const BLOG_URL  = "https://remox.io";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `/:path*`,
      },
      {
        source: "/aave",
        destination: `https://risk.remox.io/aave`,
      }
    ];
  },
};

module.exports = nextConfig;
