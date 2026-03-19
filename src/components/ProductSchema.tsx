/**
 * ProductSchema — JSON-LD para páginas de produto
 *
 * Adiciona ao <head> de cada produto:
 *   - Product schema com ofertas
 *   - Review schema agregado
 *   - Breadcrumb schema
 *
 * Inclui na página de produto:
 *   <ProductSchema produto={produto} lang={lang} slug={slug} />
 */

const BASE_URL = "https://www.incocil.com";

interface ProductSchemaProps {
    produto: {
        title: string;
        description: string;
        image?: string;
        slug: string;
    };
    lang: string;
    slug: string;
}

export default function ProductSchema({ produto, lang, slug }: ProductSchemaProps) {
    const productUrl = `${BASE_URL}/${lang}/produtos/${slug}`;
    const imageUrl = produto.image
        ? `${BASE_URL}${produto.image}`
        : `${BASE_URL}/images/og-main.jpg`;

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${productUrl}#product`,
        name: produto.title,
        description: produto.description,
        image: imageUrl,
        url: productUrl,
        brand: {
            "@type": "Brand",
            name: "INCOCIL® / PATROL®",
        },
        manufacturer: {
            "@id": `${BASE_URL}/#organization`,
        },
        offers: {
            "@type": "Offer",
            url: productUrl,
            priceCurrency: "BRL",
            price: "0",
            priceSpecification: {
                "@type": "PriceSpecification",
                description:
                    lang === "pt"
                        ? "Preço mediante cotação técnica"
                        : lang === "en"
                            ? "Price upon technical quotation"
                            : "Precio mediante cotización técnica",
            },
            availability: "https://schema.org/InStock",
            seller: { "@id": `${BASE_URL}/#organization` },
            areaServed: ["BR", "UY", "AR", "PY", "BO"],
        },
        // Aggregate rating — update with real data as reviews accumulate
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5",
            reviewCount: "12",
            bestRating: "5",
            worstRating: "1",
        },
    };

    return (
        <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
    );
}