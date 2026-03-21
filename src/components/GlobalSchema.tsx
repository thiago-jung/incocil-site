/**
 * GlobalSchema — JSON-LD multilíngue para toda a aplicação
 *
 * Recebe `lang` do layout.tsx para gerar os campos corretos por idioma.
 * O Google usa este schema para Knowledge Panel, Rich Results e Maps.
 *
 * Resultado esperado (6-12 semanas):
 *   • Painel de Conhecimento da INCOCIL no Google (PT/EN/ES)
 *   • Aparição em buscas internacionais de "hydraulic cylinder manufacturer Brazil"
 *   • Stars/ratings em resultados de busca (com ReviewSchema futuro)
 */

interface GlobalSchemaProps {
    lang?: "pt" | "en" | "es";
}

export default function GlobalSchema({ lang }: GlobalSchemaProps) {

    // Normaliza lang — rotas de assets (/android-chrome-*.png, /favicon.ico)
    // não passam pelo layout [lang] e chegam como undefined ou string inválida.
    const safeLang: "pt" | "en" | "es" =
        lang === "en" || lang === "es" ? lang : "pt";

    // ── Conteúdo multilíngue ──────────────────────────────────────────────────

    const descriptions = {
        pt: "Especialista na fabricação e manutenção de cilindros hidráulicos e pneumáticos desde Porto Alegre para o Brasil e o mundo. Capacidade de brunimento até ø 500mm. Marca PATROL® — 45 anos de tradição.",
        en: "Brazilian manufacturer of custom hydraulic and pneumatic cylinders. INCOCIL® has 45+ years supplying agriculture, heavy industry, and equipment sectors across South America and worldwide. PATROL® brand. Precision honing up to ø500mm.",
        es: "Fabricante brasileño de cilindros hidráulicos y neumáticos a medida. INCOCIL® cuenta con más de 45 años suministrando a los sectores agrícola, industrial y de equipos en América del Sur y el mundo. Marca PATROL®. Bruñido de precisión hasta ø500mm.",
    };

    const names = {
        pt: "INCOCIL® — Fabricante de Cilindros Hidráulicos e Pneumáticos",
        en: "INCOCIL® — Hydraulic & Pneumatic Cylinder Manufacturer Brazil",
        es: "INCOCIL® — Fabricante de Cilindros Hidráulicos y Neumáticos Brasil",
    };

    const knowsAbout = {
        pt: [
            "Cilindros Hidráulicos",
            "Cilindros Pneumáticos",
            "Brunimento Industrial",
            "Solda Robotizada",
            "Manutenção Hidráulica",
            "Engenharia de Sistemas Hidráulicos",
            "Cilindros Telescópicos",
            "Cilindros Inox Agrícolas",
        ],
        en: [
            "Hydraulic Cylinders",
            "Pneumatic Cylinders",
            "Industrial Honing",
            "Robotic Welding",
            "Hydraulic Maintenance",
            "Hydraulic Systems Engineering",
            "Telescopic Cylinders",
            "Stainless Steel Agricultural Cylinders",
            "Custom Cylinder Manufacturing",
            "Hydraulic Cylinder Repair Brazil",
        ],
        es: [
            "Cilindros Hidráulicos",
            "Cilindros Neumáticos",
            "Bruñido Industrial",
            "Soldadura Robotizada",
            "Mantenimiento Hidráulico",
            "Ingeniería de Sistemas Hidráulicos",
            "Cilindros Telescópicos",
            "Cilindros Inox Agrícolas",
        ],
    };

    const offerCatalogName = {
        pt: "Linha de Cilindros Hidráulicos e Serviços",
        en: "Hydraulic & Pneumatic Cylinder Product Line",
        es: "Línea de Productos de Cilindros Hidráulicos y Neumáticos",
    };

    const offerItems = {
        pt: [
            { type: "Product", name: "Cilindro Hidráulico Inox" },
            { type: "Product", name: "Cilindro Telescópico Hidráulico" },
            { type: "Product", name: "Cilindro Mestre-Escravo" },
            { type: "Product", name: "Cilindro com Amortecimento" },
            { type: "Service", name: "Serviços de Brunimento" },
            { type: "Service", name: "Manutenção de Cilindros" },
        ],
        en: [
            { type: "Product", name: "Stainless Steel Hydraulic Cylinder" },
            { type: "Product", name: "Telescopic Hydraulic Cylinder" },
            { type: "Product", name: "Master-Slave Hydraulic Cylinder" },
            { type: "Product", name: "Cushioned Hydraulic Cylinder" },
            { type: "Service", name: "Industrial Honing Services" },
            { type: "Service", name: "Hydraulic Cylinder Repair & Maintenance" },
        ],
        es: [
            { type: "Product", name: "Cilindro Hidráulico Inoxidable" },
            { type: "Product", name: "Cilindro Telescópico Hidráulico" },
            { type: "Product", name: "Cilindro Maestro-Esclavo" },
            { type: "Product", name: "Cilindro con Amortiguación" },
            { type: "Service", name: "Servicios de Bruñido Industrial" },
            { type: "Service", name: "Reparación y Mantenimiento de Cilindros" },
        ],
    };

    // ── Schema Organization ───────────────────────────────────────────────────

    const organization = {
        "@context": "https://schema.org",
        "@type": ["Organization", "LocalBusiness", "ManufacturingBusiness"],
        "@id": "https://www.incocil.com/#organization",
        name: names[safeLang],
        alternateName: [
            "INCOCIL",
            "Incocil",
            "PATROL Cilindros",
            "PATROL Hydraulic Cylinders",
            "Incocil Hydraulic",
            "INCOCIL Brazil",
        ],
        url: "https://www.incocil.com",
        logo: {
            "@type": "ImageObject",
            url: "https://www.incocil.com/images/incocil.png",
            width: 240,
            height: 60,
        },
        image: "https://www.incocil.com/images/og-main.jpg",
        description: descriptions[safeLang],
        foundingDate: "1979",
        numberOfEmployees: { "@type": "QuantitativeValue", value: 30 },
        address: {
            "@type": "PostalAddress",
            streetAddress: "Av. Ricardo Leônidas Ribas, 310",
            addressLocality: "Porto Alegre",
            addressRegion: "RS",
            postalCode: "91790-005",
            addressCountry: "BR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: -30.1531238,
            longitude: -51.1396883,
        },
        telephone: "+55-51-3261-2205",
        contactPoint: [
            {
                "@type": "ContactPoint",
                telephone: "+55-51-3261-2205",
                contactType: "sales",
                availableLanguage: ["Portuguese", "English", "Spanish"],
                areaServed: ["BR", "UY", "AR", "PY", "BO", "US", "DE"],
            },
            {
                "@type": "ContactPoint",
                telephone: "+55-51-98446-8231",
                contactType: "customer service",
                contactOption: "TollFree",
                availableLanguage: ["Portuguese", "English", "Spanish"],
            },
        ],
        email: "incocil@incocil.com.br",
        sameAs: [
            "https://www.instagram.com/_incocil/",
            "https://www.youtube.com/@incocil",
            "https://www.linkedin.com/company/incocil-ind-e-com-cilindros-ltda/",
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: offerCatalogName[safeLang],
            itemListElement: offerItems[safeLang].map((item) => ({
                "@type": "Offer",
                itemOffered: { "@type": item.type, name: item.name },
            })),
        },
        knowsAbout: knowsAbout[safeLang],
        areaServed: [
            { "@type": "Country", name: "Brazil" },
            { "@type": "Country", name: "Uruguay" },
            { "@type": "Country", name: "Argentina" },
            { "@type": "Country", name: "Paraguay" },
            { "@type": "Country", name: "Bolivia" },
            {
                "@type": "GeoCircle",
                geoMidpoint: { "@type": "GeoCoordinates", latitude: -15, longitude: -55 },
                geoRadius: "5000000",
            },
        ],
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "18:00",
            },
        ],
    };

    // ── Schema WebSite ────────────────────────────────────────────────────────

    const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.incocil.com/#website",
        url: "https://www.incocil.com",
        name: "INCOCIL® Hydraulic Cylinders",
        publisher: { "@id": "https://www.incocil.com/#organization" },
        inLanguage: ["pt-BR", "en-US", "es-ES"],
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: "https://www.incocil.com/pt/blog?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
            />
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
            />
        </>
    );
}