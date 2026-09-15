import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/**/*": ["./downloads/**/*", "./public/downloads/**/*"],
  },
};

export default nextConfig;
