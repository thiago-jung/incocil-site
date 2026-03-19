/**
 * Breadcrumb — Navegação em Migalhas de Pão com JSON-LD
 *
 * 🎯 Benefícios SEO:
 *   • BreadcrumbList schema → Google mostra o caminho no resultado de busca
 *   • Melhora UX em páginas profundas (produto, blog post)
 *   • Reduz taxa de rejeição em mobile (usuário sabe onde está)
 *
 * USO:
 *   <Breadcrumb
 *     lang="pt"
 *     items={[
 *       { label: "Produtos", href: "/pt/#servicos" },
 *       { label: "Cilindro Telescópico" },
 *     ]}
 *   />
 */

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const BASE_URL = "https://www.incocil.com";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    lang: string;
}

export default function Breadcrumb({ items, lang }: BreadcrumbProps) {
    // Build the full list including Home
    const fullItems = [
        { label: lang === "en" ? "Home" : lang === "es" ? "Inicio" : "Início", href: `/${lang}` },
        ...items,
    ];

    // JSON-LD BreadcrumbList
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: fullItems.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.label,
            ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap"
            >
                {fullItems.map((item, i) => {
                    const isLast = i === fullItems.length - 1;
                    return (
                        <span key={i} className="flex items-center gap-1.5">
                            {i === 0 && <Home size={14} className="text-slate-400" aria-hidden />}

                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="hover:text-blue-600 transition-colors font-medium"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className={isLast ? "text-slate-900 font-bold" : "font-medium"}
                                    aria-current={isLast ? "page" : undefined}
                                >
                                    {item.label}
                                </span>
                            )}

                            {!isLast && (
                                <ChevronRight size={14} className="text-slate-300" aria-hidden />
                            )}
                        </span>
                    );
                })}
            </nav>
        </>
    );
}