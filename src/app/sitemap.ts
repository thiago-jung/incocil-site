import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/constants/blog-data';
import { SITE_CONTENT } from '@/constants/content';

export default function sitemap(): MetadataRoute.Sitemap {
    // Troque pelo seu domínio final quando fizer o deploy
    const baseUrl = 'https://incocil.com';

    // 1. Rotas Estáticas
    const staticRoutes = ['', '/empresa', '/blog', '/contato'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Rotas Dinâmicas de Produtos (Baseado no seu SITE_CONTENT)
    const productRoutes = SITE_CONTENT.services.map((service) => {
        // Mesma lógica de slug que usamos nos componentes
        const slug = service.title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ /g, '-');

        return {
            url: `${baseUrl}/produtos/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        };
    });

    // 3. Rotas Dinâmicas do Blog
    const blogRoutes = BLOG_POSTS.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...productRoutes, ...blogRoutes];
}