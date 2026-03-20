/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admindttx.dhcongdoan.vn",
        pathname: "/**"
      }
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [384, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 70, 75, 80, 85, 90, 100],
    minimumCacheTTL: 0
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  logging: {
    fetches: {
      fullUrl: true
    }
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value:
              '<https://admindttx.dhcongdoan.vn>; rel="preconnect", <https://admindttx.dhcongdoan.vn>; rel="dns-prefetch"'
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ];
  },

  experimental: {
    optimizePackageImports: [
      "react-icons",
      "@apollo/client",
      "framer-motion",
      "swiper",
      "lucide-react",
      "@heroicons/react"
    ]
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"]
          }
        : false
  }
};

module.exports = nextConfig;
