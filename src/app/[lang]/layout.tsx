import { Inter, Montserrat } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getDictionary } from "@/get-dictionaries";
import { Metadata } from "next";
import FloatingElements from "@/components/FloatingElements";
import PageTransition from "@/components/PageTransition";
import GlobalSchema from "@/components/GlobalSchema";
import Navbar from "@/components/Navbar";
import Script from "next/script";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "700", "900"],
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
    // Busca o dicionário aqui para passar à Navbar (que precisa ser movida
    // para FORA do <PageTransition> — qualquer elemento com `transform` ativo
    // cria um novo "containing block" e sequestra o `position: fixed` da Navbar,
    // fazendo-a desaparecer ao rolar em páginas internas).
    const dict = await getDictionary(lang as "pt" | "en" | "es");

    return (
        <html lang={lang}>
            <head>
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

                {/*
                 * ── NAVBAR FORA DO PageTransition ────────────────────────────
                 * PageTransition usa a Web Animations API com `transform`, o que
                 * cria um novo "containing block" no CSS. Qualquer `position: fixed`
                 * dentro desse bloco para de ser relativo ao viewport e passa a ser
                 * relativo ao elemento animado — fazendo a Navbar sumir ao rolar.
                 *
                 * Solução: Navbar fica aqui, no layout, completamente fora da
                 * animação de transição de página. Os `page.tsx` individuais não
                 * precisam mais importar ou renderizar a Navbar.
                 */}
                <Navbar lang={lang} dict={dict.navbar} />

                <PageTransition>{children}</PageTransition>

                <Analytics />
                <SpeedInsights />
                <FloatingElements lang={lang} />

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