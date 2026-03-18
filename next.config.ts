/** @type {import('next').NextConfig} */
const nextConfig = {

    async headers() {
        return [
            {
                // Aplica estes cabeçalhos a todas as rotas
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY', // Evita clickjacking (ninguém pode colocar o seu site num iframe)
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
                        value: 'max-age=31536000; includeSubDomains', // Força o uso de HTTPS (HSTS forte)
                    },
                ],
            },
        ];
    },

    // Ativa a otimização de imagens
    images: {
        formats: ['image/avif', 'image/webp'], // Converte automaticamente para formatos modernos e leves
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Tamanhos otimizados para cada ecrã
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com', // Permite as imagens do Unsplash que usamos temporariamente
            },
        ],
    },
    // Melhora a performance do compilador Rust (Turbopack/Webpack)
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
};

module.exports = nextConfig;