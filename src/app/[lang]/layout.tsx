import { Inter } from "next/font/google";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { getDictionary } from "@/get-dictionaries";
import { Metadata } from "next";
import FloatingElements from "@/components/FloatingElements";

// Usando a fonte Inter para aquele visual moderno e limpo
const inter = Inter({
    subsets: ["latin"],
    display: 'swap', // Adicione esta linha! Faz o texto aparecer imediatamente, mesmo sem a fonte carregada.
    weight: ['400', '500', '700', '900'], // Limitamos aos pesos usados: Normal, Medium, Bold e Black
    adjustFontFallback: true
});

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

        metadataBase: new URL('https://www.incocil.com'),
        alternates: {
            canonical: `/${lang}`, // Isso define a página canônica explicitamente
            languages: {
                'pt-BR': '/pt',
                'en-US': '/en',
                'es-ES': '/es',
            },
        },
        //manifest: "/manifest.json",

        // Metadados para Redes Sociais
        openGraph: {
            title: "INCOCIL | Soluções em Movimento Hidráulico",
            description: "Fabricação e manutenção de cilindros com rigor técnico e tecnologia de ponta.",
            url: "https://www.incocil.com",
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

        //// Ícones (Favicon)
        //icons: {
        //    icon: "/favicon.ico",
        //    shortcut: "/favicon-16x16.png",
        //    apple: "/apple-touch-icon.png",
        //},
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
            <body className={`${inter.className} antialiased bg-white text-slate-900`}>
                {children}

                {/* Vercel Metrics */}
                <Analytics />
                <SpeedInsights />
                <FloatingElements lang={lang} />


                {/* Google Analytics 4 - Carregamento Ultra-Preguiçoso (Worker/AfterInteractive) */}
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        setTimeout(function() {
                            var gtagScript = document.createElement('script');
                            gtagScript.async = true;
                            gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-EEQ1CRS307';
                            document.head.appendChild(gtagScript);

                            window.dataLayer = window.dataLayer || [];
                            window.gtag = function(){window.dataLayer.push(arguments);}
                            window.gtag('js', new Date());
                            window.gtag('config', 'G-EEQ1CRS307');
                        }, 3500);
                    `}
                </Script>
            </body>
        </html>
    );
}
