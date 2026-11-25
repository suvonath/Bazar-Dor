import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Spec route names (/signin, /signup, /product/*, /category/*) map onto the
  // canonical routes so both URL shapes work after deployment.
  redirects: async () => [
    { source: "/signin", destination: "/sign-in", permanent: true },
    { source: "/signup", destination: "/sign-up", permanent: true },
    { source: "/product/:slug", destination: "/products/:slug", permanent: true },
    {
      source: "/category/:slug",
      destination: "/categories/:slug",
      permanent: true,
    },
  ],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
