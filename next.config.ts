/** @type {import('next').NextConfig} */

const nextConfig = {

    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            // Scripts
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://va.vercel-scripts.com https://api.qrserver.com",

                            // Styles
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

                            // Fonts
                            "font-src 'self' https://fonts.gstatic.com",

                            // Imagens — google.com.br para remarketing do Ads
                            "img-src 'self' data: blob: https://www.google.com https://www.google.com.br https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://api.qrserver.com https://i.ytimg.com https://images.unsplash.com",

                            // Conexões — google.com (ccm/collect) + raw.githack.com (HDR modelo 3D)
                            "connect-src 'self' https://www.google.com https://www.google.com.br https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://vitals.vercel-insights.com https://raw.githubusercontent.com",

                            // Iframes — YouTube (blog) + doubleclick (remarketing)
                            "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://td.doubleclick.net",

                            // Workers
                            "worker-src 'self' blob:",

                            "default-src 'self'",
                        ].join('; '),
                    },
                ],
            },
        ];
    },

    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },

    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
};

module.exports = nextConfig;