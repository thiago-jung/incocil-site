import { Inter, Montserrat } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getDictionary } from "@/get-dictionaries";
import { Metadata } from "next";
import FloatingElements from "@/components/FloatingElements";
import PageTransition from "@/components/PageTransition";
import GlobalSchema from "@/components/GlobalSchema";
import Script from "next/script";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "700", "900"],
    adjustFontFallback: true,
});

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    weight: ["700", "800", "900"],
    variable: "--font-montserrat",
    adjustFontFallback: true,
});

export async function generateStaticParams() {
    return [{ lang: "pt" }, { lang: "en" }, { lang: "es" }];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: "pt" | "en" | "es" }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const localeMap = { pt: "pt_BR", en: "en_US", es: "es_ES" };
    const defaultTitle = (dict as any).metaTitle ?? `INCOCIL | ${dict.hero.title}`;

    return {
        title: { default: defaultTitle, template: "%s | INCOCIL" },
        description: dict.hero.description,
        keywords: dict.keywords,
        metadataBase: new URL("https://www.incocil.com"),
        alternates: {
            canonical: `/${lang}`,
            languages: { "pt-BR": "/pt", "en-US": "/en", "es-ES": "/es" },
        },
        openGraph: {
            title: defaultTitle,
            description: dict.hero.description,
            url: "https://www.incocil.com",
            siteName: "INCOCIL",
            images: [{ url: "/images/og-main.jpg", width: 1200, height: 630, alt: dict.hero.title }],
            locale: localeMap[lang] || "pt_BR",
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <html lang={lang}>
            <head>
                {/*
                 * ── Preconnect ────────────────────────────────────────────────
                 * Estabelece conexão TCP+TLS antecipada para os domínios críticos.
                 * O Lighthouse apontou que nenhuma origem estava sendo pré-conectada.
                 * Ganho estimado: ~150ms no FCP.
                 */}
                <link rel="preconnect" href="https://www.googletagmanager.com" />
                <link rel="preconnect" href="https://www.google-analytics.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/*
                 * ── Consent Mode v2 (inline, síncrono — obrigatório antes do GTM) ──
                 * Este bloco DEVE ser síncrono: o Consent Mode precisa estar
                 * configurado antes de qualquer evento do GTM disparar.
                 * Mantemos apenas o código mínimo necessário aqui.
                 */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('consent', 'default', {
                                analytics_storage: 'denied',
                                ad_storage: 'denied',
                                wait_for_update: 500
                            });
                        `,
                    }}
                />
            </head>
            <body className={`${inter.className} ${montserrat.variable} antialiased bg-white text-slate-900`}>
                <GlobalSchema lang={lang as "pt" | "en" | "es"} />
                <PageTransition>{children}</PageTransition>
                <Analytics />
                <SpeedInsights />
                <FloatingElements lang={lang} />

                {/*
                 * ── Google Tag Manager — afterInteractive ─────────────────────
                 * Antes: dois <script async> no <head> bloqueavam 289 KiB e
                 * ocupavam 233ms da thread principal antes do LCP.
                 *
                 * Agora: strategy="afterInteractive" faz o Next.js injetar
                 * os scripts apenas depois que a página é interativa — o browser
                 * já renderizou o conteúdo visível antes de baixar o GTM.
                 *
                 * O Consent Mode já está configurado acima (síncrono no <head>),
                 * então nenhum dado é enviado antes do consentimento, mesmo com
                 * o script carregando depois.
                 */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=AW-771734941"
                    strategy="afterInteractive"
                />
                <Script id="gtag-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-771734941');
                        gtag('config', 'G-EEQ1CRS307');
                    `}
                </Script>
            </body>
        </html>
    );
}