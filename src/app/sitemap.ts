import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/constants/blog-data';
import ptDict from '@/dictionaries/pt.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://incocil.com';
    const locales = ['pt', 'en'];

    // 1. Rotas Estáticas (Início, Empresa, Blog, Contato)
    const staticPages = ['', '/empresa', '/blog', '/contato'];
    const staticRoutes = locales.flatMap((lang) =>
        staticPages.map((page) => ({
            url: `${baseUrl}/${lang}${page}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: page === '' ? 1 : 0.8,
        }))
    );

    // 2. Rotas Dinâmicas de Produtos
    // Usamos o ptDict.services como base pois os slugs foram sincronizados
    const productRoutes = locales.flatMap((lang) =>
        ptDict.services.map((service) => ({
            url: `${baseUrl}/${lang}/produtos/${service.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    );

    // 3. Rotas Dinâmicas do Blog
    const blogRoutes = locales.flatMap((lang) =>
        BLOG_POSTS.map((post) => ({
            url: `${baseUrl}/${lang}/blog/${post.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }))
    );

    return [...staticRoutes, ...productRoutes, ...blogRoutes];
}