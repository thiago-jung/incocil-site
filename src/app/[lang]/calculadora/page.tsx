import { getDictionary } from "@/get-dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CylCalculator from "@/components/CylCalculator";
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
            title: "Calculadora de Cilindros Hidráulicos | INCOCIL",
            description:
                "Calcule força, volume e vazão do seu cilindro hidráulico online. Insira diâmetro, pressão e curso — obtenha o dimensionamento completo em segundos.",
        },
        en: {
            title: "Hydraulic Cylinder Calculator | INCOCIL",
            description:
                "Calculate hydraulic cylinder force, volume, and flow rate online. Enter bore, pressure, and stroke — get complete sizing results in seconds.",
        },
        es: {
            title: "Calculadora de Cilindros Hidráulicos | INCOCIL",
            description:
                "Calcule fuerza, volumen y caudal de su cilindro hidráulico online. Ingrese diámetro, presión y carrera — obtenga el dimensionamiento completo en segundos.",
        },
    };

    const m = meta[lang] ?? meta.pt;

    return {
        title: m.title,
        description: m.description,
        alternates: {
            canonical: `${BASE_URL}/${lang}/calculadora`,
            languages: {
                "pt-BR": `${BASE_URL}/pt/calculadora`,
                "en-US": `${BASE_URL}/en/calculadora`,
                "es-ES": `${BASE_URL}/es/calculadora`,
            },
        },
        openGraph: {
            title: m.title,
            description: m.description,
            url: `${BASE_URL}/${lang}/calculadora`,
        },
    };
}

const pageContent = {
    pt: {
        badge: "Ferramenta Gratuita",
        heading: "Calculadora de Cilindros",
        intro:
            "Insira as especificações da sua aplicação e calcule instantaneamente a força de extensão e retração, volume de óleo e vazão necessária. O resultado já prepara uma mensagem completa para o WhatsApp.",
    },
    en: {
        badge: "Free Tool",
        heading: "Cylinder Calculator",
        intro:
            "Enter your application specifications and instantly calculate extension and retraction force, oil volume, and required flow rate. The result prepares a complete WhatsApp message for our team.",
    },
    es: {
        badge: "Herramienta Gratuita",
        heading: "Calculadora de Cilindros",
        intro:
            "Ingrese las especificaciones de su aplicación y calcule instantáneamente la fuerza de extensión y retracción, volumen de aceite y caudal necesario.",
    },
} as const;

export default async function CalculadoraPage({
    params,
}: {
    params: Promise<{ lang: "pt" | "en" | "es" }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const copy = pageContent[lang] ?? pageContent.pt;

    // JSON-LD SoftwareApplication schema
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "INCOCIL Hydraulic Cylinder Calculator",
        applicationCategory: "EngineeringApplication",
        operatingSystem: "Web",
        url: `${BASE_URL}/${lang}/calculadora`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
        description: copy.intro,
        author: { "@id": `${BASE_URL}/#organization` },
    };

    return (
        <>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <Navbar lang={lang} dict={dict.navbar} />

            <main className="min-h-screen bg-slate-50 pt-32 pb-24">
                <div className="container mx-auto px-6">

                    {/* Cabeçalho */}
                    <div className="mb-12 max-w-2xl">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full mb-4">
                            {copy.badge}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                            {copy.heading}
                        </h1>
                        <p className="text-lg text-slate-500 leading-relaxed">
                            {copy.intro}
                        </p>
                    </div>

                    {/* Calculadora */}
                    <CylCalculator lang={lang} />
                </div>
            </main>

            <Footer dict={dict} lang={lang} />
        </>
    );
}