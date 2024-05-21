const BLOG_URL  = "https://remox.io";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
        {
        source: "risk/aave",
        destination: `https://risk.remox.io/aave`,
      },
      {
        source: "/:path/*",
        destination: `/:path/*`,
      }
    ];
  },
};

module.exports = nextConfig;
