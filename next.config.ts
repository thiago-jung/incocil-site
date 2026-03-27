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
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://va.vercel-scripts.com https://api.qrserver.com",
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                            "font-src 'self' https://fonts.gstatic.com",
                            "img-src 'self' data: blob: https://www.google.com https://www.google.com.br https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://api.qrserver.com https://i.ytimg.com https://images.unsplash.com",
                            "connect-src 'self' https://www.google.com https://www.google.com.br https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://vitals.vercel-insights.com https://raw.githubusercontent.com https://raw.githack.com",
                            "frame-src https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com https://td.doubleclick.net",
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
        // ── qualities: adiciona 60 para eliminar o warning do About.tsx ───────
        // "Image with src banner-home-2.jpg is using quality 60 which is not
        //  configured in images.qualities [75]"
        qualities: [60, 75],
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
    serverExternalPackages: ['@sparticuz/chromium-min', 'puppeteer-core'],

};

module.exports = nextConfig;