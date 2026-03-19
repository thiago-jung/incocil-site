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
        description: dict.hero.subtitle,
        keywords: dict.keywords,
        metadataBase: new URL("https://www.incocil.com"),
        alternates: {
            canonical: `/${lang}`,
            languages: { "pt-BR": "/pt", "en-US": "/en", "es-ES": "/es" },
        },
        openGraph: {
            title: "INCOCIL | Soluções em Movimento Hidráulico",
            description: "Fabricação e manutenção de cilindros com rigor técnico e tecnologia de ponta.",
            url: "https://www.incocil.com",
            siteName: "Incocil",
            images: [{ url: "/images/og-main.jpg", width: 1200, height: 630, alt: "Fábrica Incocil - Cilindros Hidráulicos" }],
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
            {/*
             * montserrat.variable injeta --font-montserrat no :root
             * Usada no globals.css para aplicar Montserrat a todos os h1-h4
             */}
            <body className={`${inter.className} ${montserrat.variable} antialiased bg-white text-slate-900`}>
                {/*
                 * PageTransition envolve {children} e faz fade-in
                 * a cada troca de rota — sem alterar nenhuma página individual
                 */}
                <PageTransition>
                    {children}
                </PageTransition>

                <Analytics />
                <SpeedInsights />

                {/*
                 * GA4 NÃO é carregado aqui.
                 * O CookieBanner injeta o script via enableAnalytics()
                 * apenas após consentimento — zero requests para o Google antes disso.
                 */}
                <FloatingElements lang={lang} />
            </body>
        </html>
    );
}