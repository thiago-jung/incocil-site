/**
 * GlobalSchema — JSON-LD para toda a aplicação
 *
 * Coloque este componente dentro do <body> no layout.tsx.
 * Ele injeta:
 *   - Organization  → Google Knowledge Panel, Rich Results
 *   - WebSite       → Sitelinks Search Box no Google
 *   - LocalBusiness → Pacote local (Maps, direções, horário)
 *
 * Resultado esperado (6-12 semanas):
 *   • Painel de Conhecimento da INCOCIL no Google
 *   • Stars/ratings em resultados de busca (com ReviewSchema futuro)
 *   • Aparição em "empresa" e buscas de marca
 */

export default function GlobalSchema() {
    const organization = {
        "@context": "https://schema.org",
        "@type": ["Organization", "LocalBusiness", "ManufacturingBusiness"],
        "@id": "https://www.incocil.com/#organization",
        name: "INCOCIL® - Cilindros Hidráulicos e Pneumáticos",
        alternateName: ["INCOCIL", "Incocil", "PATROL Cilindros"],
        url: "https://www.incocil.com",
        logo: {
            "@type": "ImageObject",
            url: "https://www.incocil.com/images/incocil.png",
            width: 240,
            height: 60,
        },
        image: "https://www.incocil.com/images/og-main.jpg",
        description:
            "Especialista na fabricação e manutenção de cilindros hidráulicos e pneumáticos desde Porto Alegre para o Brasil e o mundo. Capacidade de brunimento até ø 500mm. Marca PATROL® — 45 anos de tradição.",
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
                areaServed: ["BR", "UY", "AR", "PY", "BO"],
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
            name: "Linha de Cilindros Hidráulicos e Serviços",
            itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cilindro Hidráulico Inox" } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cilindro Telescópico Hidráulico" } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cilindro Mestre-Escravo" } },
                { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cilindro com Amortecimento" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Serviços de Brunimento" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Manutenção de Cilindros" } },
            ],
        },
        knowsAbout: [
            "Cilindros Hidráulicos",
            "Cilindros Pneumáticos",
            "Brunimento Industrial",
            "Solda Robotizada",
            "Manutenção Hidráulica",
            "Engenharia de Sistemas Hidráulicos",
        ],
        areaServed: {
            "@type": "GeoCircle",
            geoMidpoint: { "@type": "GeoCoordinates", latitude: -15, longitude: -55 },
            geoRadius: "5000000",
        },
        openingHoursSpecification: [
            {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                opens: "08:00",
                closes: "18:00",
            },
        ],
    };

    const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.incocil.com/#website",
        url: "https://www.incocil.com",
        name: "INCOCIL® Cilindros Hidráulicos",
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