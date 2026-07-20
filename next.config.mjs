/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      // NOTE: www <-> non-www canonicalization is handled by Vercel's domain
      // settings, NOT here. Doing it in code caused a redirect loop with
      // Vercel's own redirect. Keep domain redirects in the Vercel dashboard.

      // Legacy URLs from the previous website (old /post/ blog structure).
      // 301 each to the closest current page so value + old links transfer.
      {
        source: "/post/affordable-and-stylish-laminate-flooring-options-in-toronto",
        destination: "/laminate",
        permanent: true,
      },
      {
        source: "/post/the-advantages-of-laminate-flooring-a-smart-choice-for-your-home",
        destination: "/laminate",
        permanent: true,
      },
      {
        source: "/post/luxury-vinyl-flooring-for-modern-canadian-homes",
        destination: "/vinyl",
        permanent: true,
      },
      {
        source: "/post/finding-reliable-floor-installation-toronto",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/refinishing-solutions",
        destination: "/refinishing",
        permanent: true,
      },
      // Catch-all: any other leftover /post/* URL from the old site -> blog.
      {
        source: "/post/:slug*",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
