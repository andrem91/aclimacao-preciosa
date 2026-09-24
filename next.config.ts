import type { NextConfig } from "next";
const config: NextConfig = {
  redirects() {
    return [
      {
        source: "/estabelecimentos/:path*",
        destination: "/negocios/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
    ],
  },
};
export default config;
