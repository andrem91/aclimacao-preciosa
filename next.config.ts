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
};
export default config;
