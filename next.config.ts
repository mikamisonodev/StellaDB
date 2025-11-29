import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                pathname: "/AutumnVN/ssassets/refs/heads/main/export/*",
            },
        ],
    },
};

export default nextConfig;
