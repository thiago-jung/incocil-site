import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/constants/blog-data';
import ptDict from '@/dictionaries/pt.json';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.incocil.com';
    const locales = ['pt', 'en', 'es'];

    // 1. Rotas Estáticas
    const staticPages = ['', '/empresa', '/blog', '/contato', '/calculadora'];
    const staticRoutes = locales.flatMap((lang) =>
        staticPages.map((page) => ({
            url: `${baseUrl}/${lang}${page}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: page === '' ? 1 : 0.8,
        }))
    );

    // 2. Política de privacidade (indexada com noindex, mas no sitemap para consistência)
    const privacyRoutes = locales.map((lang) => ({
        url: `${baseUrl}/${lang}/privacidade`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.2,
    }));

    // 3. Hannover Messe 2026
    const hannoverRoute = {
        url: `${baseUrl}/en/hannover-messe-2026`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    };

    // 4. Produtos
    const productRoutes = locales.flatMap((lang) =>
        ptDict.services.map((service) => ({
            url: `${baseUrl}/${lang}/produtos/${service.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    );

    // 5. Blog
    const blogRoutes = locales.flatMap((lang) =>
        BLOG_POSTS.map((post) => ({
            url: `${baseUrl}/${lang}/blog/${post.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
        }))
    );

    return [...staticRoutes, ...privacyRoutes, hannoverRoute, ...productRoutes, ...blogRoutes];
}