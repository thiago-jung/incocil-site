import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionaries";
import EmpresaClientView from "@/components/EmpresaClientView";
import { Metadata } from "next";

const BASE_URL = "https://www.incocil.com";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: "pt" | "en" | "es" }>;
}): Promise<Metadata> {
    const { lang } = await params;

    const meta = {
        pt: {
            title: "A Empresa | INCOCIL — Cilindros Hidráulicos Porto Alegre",
            description:
                "Conheça a INCOCIL: mais de 45 anos fabricando cilindros hidráulicos e pneumáticos em Porto Alegre. Marca PATROL®, brunimento até ø500mm e exportação para a América Latina.",
        },
        en: {
            title: "About Us | INCOCIL — Hydraulic Cylinders Brazil",
            description:
                "INCOCIL: 45+ years manufacturing hydraulic and pneumatic cylinders in Porto Alegre, Brazil. PATROL® brand, honing up to ø500mm, serving Latin America and worldwide.",
        },
        es: {
            title: "La Empresa | INCOCIL — Cilindros Hidráulicos Brasil",
            description:
                "INCOCIL: más de 45 años fabricando cilindros hidráulicos y neumáticos en Porto Alegre, Brasil. Marca PATROL®, bruñido hasta ø500mm, exportación a América Latina.",
        },
    };

    const m = meta[lang] ?? meta.pt;

    return {
        title: m.title,
        description: m.description,
        alternates: {
            canonical: `${BASE_URL}/${lang}/empresa`,
            languages: {
                "pt-BR": `${BASE_URL}/pt/empresa`,
                "en-US": `${BASE_URL}/en/empresa`,
                "es-ES": `${BASE_URL}/es/empresa`,
            },
        },
        openGraph: {
            title: m.title,
            description: m.description,
            url: `${BASE_URL}/${lang}/empresa`,
            images: [{ url: `${BASE_URL}/images/incocil-predio.png`, alt: "Fábrica INCOCIL Porto Alegre" }],
        },
    };
}

export default async function EmpresaPage({
    params,
}: {
    params: Promise<{ lang: "pt" | "en" | "es" }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as "pt" | "en" | "es");
    const dictWithLang = { ...dict, lang };

    return (
        <>
            {/* Navbar foi movida para layout.tsx (fora do PageTransition) */}
            <EmpresaClientView dict={dictWithLang} />
            <Footer dict={dict} lang={lang} />
        </>
    );
}