import { getDictionary } from "@/get-dictionaries";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductForm from "@/components/ProductForm";
import { CheckCircle2 } from "lucide-react";
import ProductDetailsAccordion from "@/components/ProductDetailsAccordion";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductViewTracker from "@/components/ProductViewTracker";
import { Metadata } from 'next';

const BASE_URL = 'https://www.incocil.com';

export async function generateMetadata({
    params
}: {
    params: Promise<{ lang: 'pt' | 'en' | 'es', slug: string }>
}): Promise<Metadata> {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang);
    const product = dict.services.find((s: any) => s.slug === slug);

    if (!product) {
        return { title: 'Produto não encontrado | INCOCIL' };
    }

    const ogImage = product.image
        ? `${BASE_URL}${product.image}`
        : `${BASE_URL}/images/og-main.jpg`;

    return {
        title: product.title,
        description: product.description,
        openGraph: {
            title: `${product.title} | INCOCIL`,
            description: product.description,
            images: [{ url: ogImage, alt: product.title }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.description,
            images: [ogImage],
        }
    };
}

export default async function PaginaProduto({
    params
}: {
    params: Promise<{ lang: 'pt' | 'en' | 'es', slug: string }>
}) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang);
    const produto = dict.services.find((s: any) => s.slug === slug);

    if (!produto) notFound();

    const nome = produto.title.toUpperCase();
    const productImages = [produto.image, ...(produto.gallery || [])].filter(Boolean);

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar lang={lang} dict={dict.navbar} />

            {/* Tracking invisível — dispara view_item no GA4 ao carregar a página */}
            <ProductViewTracker slug={slug} title={produto.title} />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <div>
                            <span className="inline-block py-1 px-3 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold uppercase mb-4">
                                {dict.ui?.industrial_line || "Linha Industrial Especializada"}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                                {nome}
                            </h1>

                            <ProductImageGallery images={productImages} alt={produto.title} />

                            <p className="text-xl text-slate-600 leading-relaxed">
                                {produto.longDescription || produto.description}
                            </p>
                        </div>

                        {produto.features && (
                            <div className="grid grid-cols-1 gap-3">
                                {produto.features.map((f: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <ProductDetailsAccordion
                            produto={produto}
                            label={dict.ui?.view_details || "Detalhes de Fabricação e Aplicações"}
                            appsLabel={dict.ui?.ideal_apps || "Aplicações Ideais"}
                            customLabel={dict.ui?.customizations || "Customizações"}
                        />
                    </div>

                    <div className="lg:sticky lg:top-32">
                        <ProductForm productName={nome} dict={dict.ui} />
                    </div>
                </div>
            </div>

            <Footer dict={dict} lang={lang} />
        </div>
    );
}