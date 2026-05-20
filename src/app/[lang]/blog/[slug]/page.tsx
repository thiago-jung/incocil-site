import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/constants/blog-data";
import { getDictionary } from "@/get-dictionaries";
import { notFound } from "next/navigation";
import { Calendar, ChevronLeft } from "lucide-react";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";
import { Metadata } from "next";

const BASE_URL = "https://www.incocil.com";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; lang: "pt" | "en" | "es" }>;
}): Promise<Metadata> {
    const { slug, lang } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) return { title: "Artigo não encontrado | Blog INCOCIL" };

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: `${BASE_URL}/${lang}/blog/${slug}`,
            languages: {
                "pt-BR": `${BASE_URL}/pt/blog/${slug}`,
                "en-US": `${BASE_URL}/en/blog/${slug}`,
                "es-ES": `${BASE_URL}/es/blog/${slug}`,
            },
        },
        openGraph: {
            title: `${post.title} | Blog INCOCIL`,
            description: post.excerpt,
            images: [{ url: post.image, alt: post.title }],
            type: "article",
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ lang: "pt" | "en" | "es"; slug: string }>;
}) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang);
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) notFound();

    // Split content by double newlines to get paragraphs
    const paragraphs = post.content?.split("\n\n").filter(p => p.trim()) || [];

    return (
        <>
            {/* Navbar foi movida para layout.tsx (fora do PageTransition) */}
            <ReadingProgress />

            <main className="min-h-screen bg-white pt-32 pb-20">
                <article className="container mx-auto px-6 max-w-4xl">

                    <Link
                        href={`/${lang}/blog`}
                        className="inline-flex items-center gap-2 text-blue-600 font-bold mb-8 hover:-translate-x-2 transition-transform"
                    >
                        <ChevronLeft size={20} />
                        {dict.ui?.back_to_blog || (lang === "pt" ? "Voltar ao Blog" : lang === "es" ? "Volver al Blog" : "Back to Blog")}
                    </Link>

                    <header className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest">
                                {post.category}
                            </span>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <Calendar size={16} /> {post.date}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter mb-8">
                            {post.title}
                        </h1>

                        <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
                            <img
                                src={post.image}
                                className="w-full h-full object-cover"
                                alt={`${post.title} — INCOCIL Cilindros Hidráulicos Porto Alegre`}
                            />
                        </div>
                    </header>

                    <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                        <p className="text-xl text-slate-900 font-medium mb-8">
                            {post.excerpt}
                        </p>

                        {/* Render paragraphs */}
                        {paragraphs.length > 0 ? (
                            <div className="space-y-6 mt-8">
                                {paragraphs.map((paragraph, idx) => (
                                    <p key={idx} className="text-slate-700 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p>
                                {lang === "pt"
                                    ? "Conteúdo em breve..."
                                    : lang === "es"
                                        ? "Contenido próximamente..."
                                        : "Content coming soon..."}
                            </p>
                        )}
                    </div>

                    {/* Image Gallery */}
                    {post.images && post.images.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-slate-200">
                            <h3 className="text-2xl font-bold text-slate-900 mb-8">
                                {lang === "pt" ? "Galeria" : lang === "es" ? "Galería" : "Gallery"}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {post.images.map((img, idx) => (
                                    <div key={idx} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                        <img 
                                            src={img} 
                                            alt={`${post.title} - Imagem ${idx + 1}`}
                                            className="w-full h-[32rem] object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </article>
            </main>

            <Footer dict={dict} lang={lang} />
        </>
    );
}
