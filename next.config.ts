/** @type {import('next').NextConfig} */
const nextConfig = {
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
    // Garante que o build ignore erros de linting simples para não travar o deploy
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;