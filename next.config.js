"use strict";
module.exports = async (phase, { defaultConfig }) => {
	/**
	 * @type {import('next').NextConfig}
	 */
	var nextConfig = {
    /* config options here */
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:3000", "192.168.2.4:3000", "http://localhost:3000", "https://localhost:3000", "https://192.168.2.4:3000"],
        },
    },
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.scdn.co"
            },
            {
                protocol: "https",
                hostname: "mosaic.scdn.co"
            },
            {
                protocol: "https",
                hostname: "image-cdn-ak.spotifycdn.com"
            },
            {
                protocol: "https",
                hostname: "image-cdn-fa.spotifycdn.com"
            },
        ],
    },
	}
	return nextConfig;
}
