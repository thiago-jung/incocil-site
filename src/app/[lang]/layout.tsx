import { Inter, Montserrat } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getDictionary } from "@/get-dictionaries";
import { Metadata } from "next";
import FloatingElements from "@/components/FloatingElements";
import PageTransition from "@/components/PageTransition";

/**
 * Inter — corpo do texto (weights 400, 500, 700, 900)
 * Montserrat — títulos (weights 700, 800, 900)
 *   → Aplicada via CSS variable --font-montserrat no globals.css
 *   → O par Inter/Montserrat é muito mais distinto e premium do que
 *     usar Inter pura (padrão de todo site feito com IA)
 */
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

    return {
        title: { default: `INCOCIL | ${dict.hero.title}`, template: "%s | INCOCIL" },
        description: dict.hero.description,  // ← já traduzido
        keywords: dict.keywords,
        metadataBase: new URL("https://www.incocil.com"),
        alternates: {
            canonical: `/${lang}`,
            languages: { "pt-BR": "/pt", "en-US": "/en", "es-ES": "/es" },
        },
        openGraph: {
            title: `INCOCIL | ${dict.hero.title}`,           // ← usa dict
            description: dict.hero.description,              // ← usa dict
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
                {/* Consent Mode v2 — carrega sempre, bloqueado por padrão */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('consent', 'default', {
                                analytics_storage: 'denied',
                                ad_storage: 'denied',
                                wait_for_update: 500
                            });
                            gtag('config', 'AW-771734941');
                            gtag('config', 'G-EEQ1CRS307');
                        `,
                    }}
                />
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=AW-771734941"
                />
            </head>
            <body className={`${inter.className} ${montserrat.variable} antialiased bg-white text-slate-900`}>
                <PageTransition>{children}</PageTransition>
                <Analytics />
                <SpeedInsights />
                <FloatingElements lang={lang} />
            </body>
        </html>
    );
}