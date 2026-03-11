"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BLOG_POSTS } from "@/constants/blog-data";
import VideoModal from "@/components/VideoModal";

interface BlogClientViewProps {
    dict: any;
    lang: string;
}

export default function BlogClientView({ dict, lang }: BlogClientViewProps) {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const blogDict = dict.blog;

    return (
        <>
            <header className="mb-16">
                <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">
                    {blogDict.title_start} <span className="text-blue-600">{blogDict.title_accent}</span>
                </h1>
                <p className="text-slate-500 text-lg">{blogDict.subtitle}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BLOG_POSTS.map((post, index) => (
                    <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                    >
                        {/* Thumbnail */}
                        <div className="relative h-56 overflow-hidden">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            {post.type === 'video' && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl">
                                        <Play fill="currentColor" size={24} />
                                    </div>
                                </div>
                            )}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase">
                                {post.category}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <span className="text-slate-400 text-xs font-medium">{post.date}</span>
                            <h2 className="text-xl font-bold text-slate-900 mt-2 mb-4 group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                {post.excerpt}
                            </p>

                            {post.type === 'video' ? (
                                <button
                                    onClick={() => setSelectedVideo(post.youtubeId ?? null)}
                                    className="flex items-center gap-2 font-bold text-blue-600 hover:gap-3 transition-all cursor-pointer"
                                >
                                    {blogDict.watch_video} <Play size={18} />
                                </button>
                            ) : (
                                <Link
                                    href={`/${lang}/blog/${post.slug}`}
                                    className="flex items-center gap-2 font-bold text-blue-600 hover:gap-3 transition-all"
                                >
                                    {blogDict.read_article} <ArrowRight size={18} />
                                </Link>
                            )}
                        </div>
                    </motion.article>
                ))}
            </div>

            <VideoModal
                isOpen={!!selectedVideo}
                onClose={() => setSelectedVideo(null)}
                videoId={selectedVideo || ""}
            />
        </>
    );
}