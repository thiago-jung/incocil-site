import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/constants/blog-data";
import { notFound } from "next/navigation";
import { Calendar, Tag, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function BlogPostPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) notFound();

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white pt-32 pb-20">
                <article className="container mx-auto px-6 max-w-4xl">

                    <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 font-bold mb-8 hover:-translate-x-2 transition-transform">
                        <ChevronLeft size={20} /> Voltar ao Blog
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
                        {/* Conteúdo Simulado - Aqui você colocaria o texto real do blog */}
                        <p className="text-xl text-slate-900 font-medium mb-8">
                            {post.excerpt}
                        </p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4 uppercase tracking-tight">Análise Técnica</h3>
                        <p>
                            A engenharia por trás da fabricação de cilindros na <strong>Incocil</strong> segue normas rigorosas de tolerância.
                            Neste artigo, exploramos como o brunimento impacta a vida útil das vedações...
                        </p>
                        {/* Adicione mais seções conforme necessário */}
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}