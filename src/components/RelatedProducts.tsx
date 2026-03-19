"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/blur-placeholder";

interface RelatedItem {
    slug: string;
    title: string;
    description: string;
    image?: string;
}

interface RelatedProductsProps {
    items: RelatedItem[];
    lang: string;
    viewDetailsLabel?: string;
    /** Título da seção — já vem do dicionário */
    title?: string;
}

/**
 * RelatedProducts — 3 produtos sugeridos no final da página de produto
 *
 * Como integrar em /produtos/[slug]/page.tsx:
 *
 *   const related = dict.services
 *     .filter((s: any) => s.slug !== slug)
 *     .slice(0, 3);
 *
 *   <RelatedProducts
 *     items={related}
 *     lang={lang}
 *     viewDetailsLabel={dict.ui.view_details}
 *     title={lang === 'pt' ? 'Produtos Relacionados' : lang === 'en' ? 'Related Products' : 'Productos Relacionados'}
 *   />
 */
export default function RelatedProducts({
    items,
    lang,
    viewDetailsLabel,
    title,
}: RelatedProductsProps) {
    if (!items || items.length === 0) return null;

    const btnLabel = viewDetailsLabel || (lang === "en" ? "View details" : lang === "es" ? "Ver detalles" : "Ver detalhes");
    const sectionTitle = title || (lang === "en" ? "Related Products" : lang === "es" ? "Productos Relacionados" : "Produtos Relacionados");

    return (
        <section className="py-20 bg-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">
                    {sectionTitle}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.slug}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                        >
                            <Link
                                href={`/${lang}/produtos/${item.slug}`}
                                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all block h-full"
                            >
                                {item.image && (
                                    <div className="relative h-44 overflow-hidden bg-slate-100">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            placeholder="blur"
                                            blurDataURL={BLUR_DATA_URL}
                                        />
                                    </div>
                                )}
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                        {item.description}
                                    </p>
                                    <span className="inline-flex items-center gap-1.5 text-blue-600 font-bold text-sm group-hover:gap-2.5 transition-all">
                                        {btnLabel} <ArrowRight size={15} />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}