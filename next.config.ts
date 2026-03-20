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
                            // Scripts: próprios + Google Tag Manager + Google Ads + inline (necessário pro Next.js)
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://va.vercel-scripts.com https://api.qrserver.com",

                            // Styles: próprios + inline (Tailwind/Next.js precisam)
                            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

                            // Fonts
                            "font-src 'self' https://fonts.gstatic.com",

                            // Imagens: próprias + Google + QR + YouTube thumbnails
                            "img-src 'self' data: blob: https://www.google.com https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://api.qrserver.com https://i.ytimg.com https://images.unsplash.com",

                            // Conexões: Analytics + Ads + Vercel
                            "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://vitals.vercel-insights.com",

                            // Iframes: YouTube (vídeos do blog)
                            "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://td.doubleclick.net",

                            // Workers
                            "worker-src 'self' blob:",

                            // Tudo mais: só do próprio site
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