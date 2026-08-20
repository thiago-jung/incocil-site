/**
 * ProductSchema — JSON-LD para páginas de produto
 *
 * NOTA: aggregateRating e offers removidos — dados fictícios (nota falsa,
 * preço "0") são penalizados/ignorados pelo Google (Search Console
 * reportou "Especifique offers, review ou aggregateRating" porque um
 * preço 0 não conta como oferta válida). Esses produtos são sob
 * orçamento técnico, sem preço fixo real — só reintegre offers com um
 * preço real, ou aggregateRating/review com dados reais de avaliação.
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
        // offers e aggregateRating removidos — só reintegre com preço real
        // ou dados reais de avaliação (ver nota no topo do arquivo)
    };

    return (
        <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
    );
}