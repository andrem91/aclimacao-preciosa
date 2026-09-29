import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.onodera.com.br" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "colegiopaulodetarso.com.br" },
      { protocol: "https", hostname: "images.sympla.com.br" },
    ],
  },
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
