const withEnv = require(`./nextPlugins/withEnv.js`);
const withSentry = require(`./nextPlugins/withSentry.js`);
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  output: "standalone",
  reactStrictMode: true,
  compress: false,
  transpilePackages: ["@rayo/fetch-client", "@rayo/localisation", "@rayo/ui"],
  eslint: { dirs: ["."] },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.bauerradio.com",
      },
      {
        protocol: "https",
        hostname: "assets.planetradio.co.uk",
      },
      {
        protocol: "https",
        hostname: "bauer-radio-helix-public.s3.eu-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "media.bauerradio.com",
      },
    ],
  },
  cacheHandler:
    process.env.NODE_ENV === "production" &&
    process.env.ENABLE_REDIS_CACHE === "true"
      ? require.resolve("./nextPlugins/cacheHandler.js")
      : undefined,
  cacheMaxMemorySize:
    process.env.NODE_ENV === "production" &&
    process.env.ENABLE_REDIS_CACHE === "true"
      ? 0
      : 51200,
  experimental: {
    instrumentationHook: true,
    swrDelta: 31536000,
  },
  webpack: (config, { buildId, webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.NEXTJS_BUILD_ID": JSON.stringify(buildId),
      }),
    );

    return config;
  },
  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "cache-control",
            value: "public, immutable, max-age=31536000",
          },
        ],
      },
      {
        source: "/static-assets/:path*",
        headers: [
          {
            key: "cache-control",
            value: "public, immutable, max-age=31536000",
          },
        ],
      },
    ];
  },
};

const plugins = [withEnv, withBundleAnalyzer];

module.exports = withSentry(
  plugins.reduce((config, plugin) => plugin(config), {
    ...nextConfig,
  }),
);
