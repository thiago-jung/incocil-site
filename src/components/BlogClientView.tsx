"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, Search, X } from "lucide-react";
import Link from "next/link";
import { BLOG_POSTS } from "@/constants/blog-data";
import VideoModal from "@/components/VideoModal";
import Image from "next/image";
import { track } from "@/lib/analytics";

interface BlogClientViewProps {
    dict: any;
    lang: string;
}

// i18n search strings
const SEARCH_I18N = {
    pt: {
        placeholder: "Buscar artigos e vídeos...",
        noResults: "Nenhum resultado encontrado para",
        clearSearch: "Limpar busca",
        results: (n: number) => n === 1 ? "1 resultado" : `${n} resultados`,
    },
    en: {
        placeholder: "Search articles and videos...",
        noResults: "No results found for",
        clearSearch: "Clear search",
        results: (n: number) => n === 1 ? "1 result" : `${n} results`,
    },
    es: {
        placeholder: "Buscar artículos y vídeos...",
        noResults: "Sin resultados para",
        clearSearch: "Limpiar búsqueda",
        results: (n: number) => n === 1 ? "1 resultado" : `${n} resultados`,
    },
} as const;

export default function BlogClientView({ dict, lang }: BlogClientViewProps) {
    const [selectedVideo, setSelectedVideo] = useState<{ id: string; title: string } | null>(null);
    const [query, setQuery] = useState("");

    const blogDict = dict.blog;
    const s = SEARCH_I18N[lang as keyof typeof SEARCH_I18N] ?? SEARCH_I18N.pt;

    function openVideo(youtubeId: string, title: string) {
        track.videoPlay(youtubeId, title);
        setSelectedVideo({ id: youtubeId, title });
    }

    // Client-side search: title + excerpt + category
    const filteredPosts = useMemo(() => {
        if (!query.trim()) return BLOG_POSTS;
        const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return BLOG_POSTS.filter(post => {
            const haystack = `${post.title} ${post.excerpt} ${post.category}`
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            return haystack.includes(q);
        });
    }, [query]);

    const hasQuery = query.trim().length > 0;

    return (
        <>
            <header className="mb-12">
                <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">
                    {blogDict.title_start}{" "}
                    <span className="text-blue-600">{blogDict.title_accent}</span>
                </h1>
                <p className="text-slate-500 text-lg mb-8">{blogDict.subtitle}</p>

                {/* ── Search field ─────────────────────────────────────────── */}
                <div className="relative max-w-lg">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                        type="search"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={s.placeholder}
                        className="w-full bg-white border-2 border-slate-200 focus:border-blue-500 rounded-xl pl-11 pr-10 py-3 text-slate-900 text-sm font-medium outline-none transition-colors shadow-sm placeholder:text-slate-400"
                    />
                    {hasQuery && (
                        <button
                            onClick={() => setQuery("")}
                            aria-label={s.clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors rounded-full hover:bg-slate-100"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>

                {/* Result count */}
                {hasQuery && (
                    <p className="mt-3 text-sm text-slate-500">
                        {filteredPosts.length === 0
                            ? <><span className="font-semibold">{s.noResults}</span> "{query}"</>
                            : <>{s.results(filteredPosts.length)} {lang === "pt" ? "para" : lang === "es" ? "para" : "for"} "<span className="font-semibold text-slate-700">{query}</span>"</>
                        }
                    </p>
                )}
            </header>

            {/* No results state */}
            {filteredPosts.length === 0 && hasQuery && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <Search size={40} className="mb-4 opacity-30" />
                    <p className="text-lg font-semibold text-slate-500 mb-1">
                        {s.noResults} "{query}"
                    </p>
                    <button
                        onClick={() => setQuery("")}
                        className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        {s.clearSearch}
                    </button>
                </div>
            )}

            {/* ── Grid ────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => {
                    const isVideo = post.type === "video";

                    const cardInner = (
                        <>
                            {/* Thumbnail */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {isVideo && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                                            <Play fill="currentColor" size={24} />
                                        </div>
                                    </div>
                                )}
                                {/* Highlight matching query in category badge */}
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase">
                                    {post.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col flex-1">
                                <span className="text-slate-400 text-xs font-medium">{post.date}</span>
                                <h2 className="text-xl font-bold text-slate-900 mt-2 mb-4 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center gap-2 font-bold text-blue-600 text-sm group-hover:gap-3 transition-all pointer-events-none">
                                    {isVideo ? (
                                        <>{blogDict.watch_video} <Play size={18} /></>
                                    ) : (
                                        <>{blogDict.read_article} <ArrowRight size={18} /></>
                                    )}
                                </div>
                            </div>
                        </>
                    );

                    const cardClass =
                        "bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer w-full text-left";

                    return (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: Math.min(index * 0.07, 0.4) }}
                        >
                            {isVideo ? (
                                <button
                                    onClick={() => openVideo(post.youtubeId ?? "", post.title)}
                                    className={cardClass}
                                >
                                    {cardInner}
                                </button>
                            ) : (
                                <Link href={`/${lang}/blog/${post.slug}`} className={cardClass}>
                                    {cardInner}
                                </Link>
                            )}
                        </motion.article>
                    );
                })}
            </div>

            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                videoId={selectedVideo?.id || ""}
            />
        </>
    );
}