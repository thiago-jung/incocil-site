import { Inter } from "next/font/google";
import "../globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import FeiraPopup from "@/components/FeiraPopup";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { getDictionary } from "@/get-dictionaries";
import { Metadata } from "next";

// Usando a fonte Inter para aquele visual moderno e limpo
const inter = Inter({ subsets: ["latin"] });

// Geramos os parâmetros para o build estático
export async function generateStaticParams() {
    return [{ lang: 'pt' }, { lang: 'en' }, { lang: 'es' }];
}

// Geração dinâmica de metadados baseada no idioma
export async function generateMetadata({ params }: { params: Promise<{ lang: 'pt' | 'en' | 'es' }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    const localeMap = {
        pt: "pt_BR",
        en: "en_US",
        es: "es_ES" // Ou es_LA dependendo do seu público alvo principal
    };

    return {
        title: {
            default: `INCOCIL | ${dict.hero.title}`,
            template: "%s | INCOCIL"
        },
        description: dict.hero.subtitle,
        keywords: dict.keywords,
        metadataBase: new URL('https://incocil.com'),

        // Metadados para Redes Sociais
        openGraph: {
            title: "INCOCIL | Soluções em Movimento Hidráulico",
            description: "Fabricação e manutenção de cilindros com rigor técnico e tecnologia de ponta.",
            url: "https://incocil.com",
            siteName: "Incocil",
            images: [
                {
                    url: "/images/og-main.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Fábrica Incocil - Cilindros Hidráulicos",
                },
            ],
            locale: localeMap[lang] || "pt_BR",
            type: "website",
        },

        // Configuração para o Google Crawl
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        // Ícones (Favicon)
        icons: {
            icon: "/favicon.ico",
            shortcut: "/favicon-16x16.png",
            apple: "/apple-touch-icon.png",
        },
    };
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <html lang={lang}>
            <head>
                {/* Google Analytics 4 */}
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=G-EEQ1CRS307`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-EEQ1CRS307');
                    `}
                </Script>
            </head>
            <body className={`${inter.className} antialiased bg-white text-slate-900`}>
                {children}

                {/* Vercel Metrics */}
                <Analytics />
                <SpeedInsights />
                <FeiraPopup lang={lang} />
                <WhatsAppButton />
            </body>
        </html>
    );
}