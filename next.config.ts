import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com", // ดึง api ภายนอกมาใช้ ค่อยลบ
        pathname: "/img/**",
      },
    ],
  },
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
};

export default nextConfig;
