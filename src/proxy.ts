import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

let locales = ['pt', 'en', 'es'];
let defaultLocale = 'pt';

// ─────────────────────────────────────────────────────────────────
// REDIRECIONAMENTOS LEGADOS (site antigo → site novo)
// 301 permanente para preservar o SEO acumulado
// ─────────────────────────────────────────────────────────────────

/**
 * Mapa de páginas estáticas antigas → novas (sem prefixo de idioma).
 * O prefixo (/pt, /en, /es) é adicionado dinamicamente abaixo.
 */
const STATIC_REDIRECTS: Record<string, string> = {
    '/a-incocil':   '/empresa',
    '/clientes':    '/empresa',
    '/sobre':       '/empresa',
    '/about':       '/empresa',
    '/servicos':    '/#servicos',
    '/services':    '/#servicos',
    '/contatos':    '/contato',
    // Listagem de produtos do WooCommerce (não existe no site novo)
    '/produtos':    '/#servicos',
    '/products':    '/#servicos',
};

/**
 * Mapa de slugs de produto antigos → slugs novos.
 * Cobre variantes parciais (startsWith) — ver lógica abaixo.
 */
const PRODUCT_SLUG_MAP: Array<[string, string]> = [
    // Manutenção
    ['manutencao',                        'maintenance'],
    ['maintenance',                        'maintenance'],  // já em inglês mas na rota /produto/

    // Inox
    ['cilindro-hidraulico-inox',          'stainless-steel-hydraulic-cylinder'],
    ['cilindro-inox',                     'stainless-steel-hydraulic-cylinder'],
    ['inox',                              'stainless-steel-hydraulic-cylinder'],

    // Telescópico
    ['cilindro-telescopico',              'telescopic-hydraulic-cylinder'],
    ['cilindro-hid-telescopico',          'telescopic-hydraulic-cylinder'],
    ['telescopico',                       'telescopic-hydraulic-cylinder'],

    // Mestre-Escravo
    ['cilindro-mestre-escravo',           'master-slave-cylinder'],
    ['mestre-escravo',                    'master-slave-cylinder'],

    // Simples e Dupla Ação
    ['cilindro-simples-e-dupla',          'single-and-double-acting-cylinder'],
    ['cilindro-hid-simples-e-dupla-acao', 'single-and-double-acting-cylinder'],
    ['simples-e-dupla',                   'single-and-double-acting-cylinder'],
    ['dupla-acao',                        'single-and-double-acting-cylinder'],

    // Cilindros Hidráulicos (genérico)
    ['cilindros-hidraulicos',             'hydraulic-cylinders'],
    ['cilindro-hidraulico',               'hydraulic-cylinders'],

    // Amortecimento
    ['cilindro-amortecimento',            'cushioned-hydraulic-cylinder'],
    ['amortecimento',                     'cushioned-hydraulic-cylinder'],
    ['cushioned',                         'cushioned-hydraulic-cylinder'],

    // Pneumáticos
    ['cilindros-pneumaticos',             'pneumatic-cylinders'],
    ['cilindro-pneumatico',               'pneumatic-cylinders'],
    ['pneumatico',                        'pneumatic-cylinders'],

    // Brunimento
    ['brunimento',                        'honing-services'],
    ['servicos-de-brunimento',            'honing-services'],

    // Solda robotizada
    ['solda-robotizada',                  'robotic-welding-service'],
    ['servico-de-solda',                  'robotic-welding-service'],

    // Customizados
    ['cilindros-customizados',            'custom-cylinders'],
    ['cilindro-customizado',              'custom-cylinders'],
    ['custom',                            'custom-cylinders'],

    // Mestre-escravo (variante)
    ['master-slave',                      'master-slave-cylinder'],
];

/**
 * Prefixos de rota de produto usados no site antigo.
 * Ex: /produto/, /products/, /pt/produto/, /en/products/ etc.
 */
const OLD_PRODUCT_PREFIXES = [
    '/produto/',
    '/products/',
    '/product/',
    '/servico/',
    '/service/',
    '/categoria-produto/',   // taxonomia do WooCommerce
    '/product-category/',    // versão em inglês do WooCommerce
];

/**
 * Slugs de categoria do WooCommerce que não correspondem a um produto específico.
 * Esses vão para /#servicos em vez de tentar casar com um produto.
 */
const CATEGORY_FALLBACKS = new Set([
    'servicos',
    'services',
    'hidraulicos',
    'hidraulico',
    'hydraulic',
    'pneumaticos',  // categoria genérica — o produto específico está no PRODUCT_SLUG_MAP
    'todos',
    'all',
    'uncategorized',
]);

function resolveNewProductSlug(oldSlug: string): string | null {
    const normalized = oldSlug.toLowerCase().trim();
    // Categoria genérica sem produto correspondente
    if (CATEGORY_FALLBACKS.has(normalized)) return null;
    for (const [pattern, newSlug] of PRODUCT_SLUG_MAP) {
        if (normalized === pattern || normalized.startsWith(pattern)) {
            return newSlug;
        }
    }
    return null;
}

/**
 * Retorna uma URL de redirecionamento se o pathname for legado, ou null.
 * `lang` é o idioma já detectado/extraído do pathname.
 */
function getLegacyRedirect(pathname: string, baseUrl: string): NextResponse | null {
    // Remove prefixo de idioma para trabalhar com o path "limpo"
    const langMatch = pathname.match(/^\/(pt|en|es)(\/.*|$)/);
    const lang = langMatch ? langMatch[1] : null;
    const pathWithoutLang = langMatch ? (langMatch[2] || '/') : pathname;
    const effectiveLang = lang || 'pt';

    // 1. Páginas estáticas legadas (match exato ou sub-rota, mas nunca /produtos/slug-valido do site novo)
    for (const [oldPath, newPath] of Object.entries(STATIC_REDIRECTS)) {
        const isExact = pathWithoutLang === oldPath;
        // Para /produtos e /products: só redireciona se for exato (sem slug).
        // /produtos/stainless-steel-hydraulic-cylinder já existe no site novo → deixa passar.
        const isSubRoute = pathWithoutLang.startsWith(oldPath + '/');
        const isProductsListing = oldPath === '/produtos' || oldPath === '/products';

        if (isExact || (isSubRoute && !isProductsListing)) {
            const dest = new URL(`/${effectiveLang}${newPath}`, baseUrl);
            return NextResponse.redirect(dest, { status: 301 });
        }
    }

    // 2. Rotas de produto legadas  (ex: /pt/produto/manutencao-de-cil)
    for (const prefix of OLD_PRODUCT_PREFIXES) {
        if (pathWithoutLang.startsWith(prefix)) {
            const oldSlug = pathWithoutLang.slice(prefix.length).split('/')[0];
            const newSlug = resolveNewProductSlug(oldSlug);

            if (newSlug) {
                const dest = new URL(`/${effectiveLang}/produtos/${newSlug}`, baseUrl);
                return NextResponse.redirect(dest, { status: 301 });
            }

            // Slug desconhecido → manda para a lista de produtos
            const dest = new URL(`/${effectiveLang}/#servicos`, baseUrl);
            return NextResponse.redirect(dest, { status: 301 });
        }
    }

    // 3. Rota /produtos/ (plural, site antigo em PT) sem prefixo de idioma
    //    Ex: /produtos/manutencao → /pt/produtos/maintenance
    if (!lang && pathname.startsWith('/produtos/')) {
        const oldSlug = pathname.slice('/produtos/'.length).split('/')[0];
        const newSlug = resolveNewProductSlug(oldSlug) || oldSlug;
        const dest = new URL(`/pt/produtos/${newSlug}`, baseUrl);
        return NextResponse.redirect(dest, { status: 301 });
    }

    return null;
}

// ─────────────────────────────────────────────────────────────────

function getLocale(request: NextRequest) {
    try {
        const negotiatorHeaders: Record<string, string> = {};
        request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

        if (!negotiatorHeaders['accept-language']) {
            return defaultLocale;
        }

        const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
        return match(languages, locales, defaultLocale);
    } catch {
        return defaultLocale;
    }
}

export function proxy(request: NextRequest) {
    const hostname = request.headers.get('host') || '';
    const pathname = request.nextUrl.pathname;
    const baseUrl = request.nextUrl.origin;

    // 1. Redirect .com.br → .com/pt
    if (hostname.includes('incocil.com.br')) {
        const pathSemIdioma = pathname.replace(/^\/(pt|en|es)/, '');
        return NextResponse.redirect(
            new URL(`/pt${pathSemIdioma}`, 'https://www.incocil.com'),
            308
        );
    }

    // 2. Redirecionamentos de URLs legadas (site antigo)
    const legacyRedirect = getLegacyRedirect(pathname, baseUrl);
    if (legacyRedirect) return legacyRedirect;

    // 3. Adiciona prefixo de idioma se ausente
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
        );
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|manifest.json|apple-touch-icon.png|favicon-16x16.png|favicon-32x32.png|android-chrome-192x192.png|android-chrome-512x512.png|models|favicon.ico|sitemap.xml|robots.txt|googlea90a43ed9185f126.html).*)',
    ],
};
