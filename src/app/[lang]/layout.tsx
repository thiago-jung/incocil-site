import { Inter } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getDictionary } from "@/get-dictionaries";
import { Metadata } from "next";
import FloatingElements from "@/components/FloatingElements";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "700", "900"],
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
            googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
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
            <body className={`${inter.className} antialiased bg-white text-slate-900`}>
                {children}

                <Analytics />
                <SpeedInsights />

                {/*
                 * GA4 NÃO é carregado aqui.
                 * O CookieBanner (dentro de FloatingElements) injeta o script
                 * dinamicamente via enableAnalytics() apenas após o clique em
                 * "Aceitar todos". Antes disso: zero requests para o Google.
                 */}
                <FloatingElements lang={lang} />
            </body>
        </html>
    );
}
