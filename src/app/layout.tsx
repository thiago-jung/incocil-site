import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

// Usando a fonte Inter para aquele visual moderno e limpo
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    // Configuração de Título Dinâmico
    title: {
        default: "INCOCIL | Cilindros Hidráulicos e Pneumáticos em Porto Alegre",
        template: "%s | INCOCIL"
    },
    description: "Líder em fabricação, manutenção e brunimento de cilindros hidráulicos e pneumáticos. Precisão técnica e durabilidade para os setores agrícola e industrial desde Porto Alegre/RS.",
    keywords: ["cilindros hidráulicos", "pneumática", "Porto Alegre", "manutenção industrial", "brunimento de precisão", "Incocil"],

    // Metadados para Redes Sociais (WhatsApp, LinkedIn, Instagram)
    openGraph: {
        title: "INCOCIL | Soluções em Movimento Hidráulico",
        description: "Fabricação e manutenção de cilindros com rigor técnico e tecnologia de ponta.",
        url: "https://incocil.com", // Substitua pelo seu domínio oficial depois
        siteName: "Incocil",
        images: [
            {
                url: "/images/og-main.jpg", // Crie uma imagem de 1200x630px para o link
                width: 1200,
                height: 630,
                alt: "Fábrica Incocil - Cilindros Hidráulicos",
            },
        ],
        locale: "pt_BR",
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

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <body className={`${inter.className} antialiased bg-white text-slate-900`}>
                {children}
                <WhatsAppButton />
            </body>
        </html>
    );
}