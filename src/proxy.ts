import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

let locales = ['pt', 'en', 'es'];
let defaultLocale = 'pt';

// Atualize apenas esta função no seu src/proxy.ts
function getLocale(request: NextRequest) {
    try {
        const negotiatorHeaders: Record<string, string> = {};
        request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

        // PROTEÇÃO: Se o robô do Google não enviar o cabeçalho de idioma,
        // devolvemos o português automaticamente sem tentar adivinhar.
        if (!negotiatorHeaders['accept-language']) {
            return defaultLocale;
        }

        let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
        return match(languages, locales, defaultLocale);
    } catch (error) {
        // Se qualquer outra coisa falhar, não quebra o site (evita o Erro 500)
        return defaultLocale;
    }
}

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
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
        // Adicionamos o sitemap, o robots e o arquivo de verificação do Google para o middleware ignorar
        '/((?!api|_next/static|_next/image|images|models|favicon.ico|sitemap.xml|robots.txt|googlea90a43ed9185f126.html).*)',
    ],
};