import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/constants/blog-data";
import { getDictionary } from "@/get-dictionaries";
import { notFound } from "next/navigation";
import { Calendar, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function BlogPostPage({
    params
}: {
    params: Promise<{ lang: 'pt' | 'en', slug: string }>
}) {
    // 1. Resolvemos os parâmetros e buscamos o dicionário
    const { lang, slug } = await params;
    const dict = await getDictionary(lang);

    // 2. Buscamos o post (Dica: se tiver posts diferentes por idioma, você pode filtrar aqui)
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) notFound();

    return (
        <>
            {/* Passamos as props necessárias para a Navbar */}
            <Navbar lang={lang} dict={dict.navbar} />

            <main className="min-h-screen bg-white pt-32 pb-20">
                <article className="container mx-auto px-6 max-w-4xl">

                    {/* Link com prefixo de idioma */}
                    <Link
                        href={`/${lang}/blog`}
                        className="inline-flex items-center gap-2 text-blue-600 font-bold mb-8 hover:-translate-x-2 transition-transform"
                    >
                        <ChevronLeft size={20} /> {dict.ui?.back_to_blog || (lang === 'pt' ? "Voltar ao Blog" : "Back to Blog")}
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
                            <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
                        </div>
                    </header>

                    <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                        <p className="text-xl text-slate-900 font-medium mb-8">
                            {post.excerpt}
                        </p>

                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4 uppercase tracking-tight">
                            {lang === 'pt' ? "Análise Técnica" : "Technical Analysis"}
                        </h3>

                        <div className="mt-6">
                            {/* Aqui você renderizaria o conteúdo real do post */}
                            {post.content || (
                                <p>
                                    {lang === 'pt'
                                        ? "A engenharia por trás da fabricação de cilindros na Incocil segue normas rigorosas de tolerância..."
                                        : "The engineering behind cylinder manufacturing at Incocil follows strict tolerance standards..."}
                                </p>
                            )}
                        </div>
                    </div>
                </article>
            </main>

            {/* O Footer agora recebe o dicionário e o idioma, evitando o erro de undefined */}
            <Footer dict={dict} lang={lang} />
        </>
    );
}