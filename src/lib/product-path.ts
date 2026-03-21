/**
 * src/lib/product-path.ts
 *
 * Helper centralizado para URLs de produto por idioma.
 *
 * PT  → /pt/produtos/[slug]
 * EN  → /en/products/[slug]
 * ES  → /es/productos/[slug]
 *
 * Usar em todos os <Link>, generateMetadata e proxy.ts para garantir
 * que a URL canônica seja sempre consistente.
 */

export function productBase(lang: string): string {
    if (lang === "en") return "products";
    if (lang === "es") return "productos";
    return "produtos";
}

export function productPath(lang: string, slug: string): string {
    return `/${lang}/${productBase(lang)}/${slug}`;
}