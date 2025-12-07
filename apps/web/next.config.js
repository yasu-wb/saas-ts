/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
