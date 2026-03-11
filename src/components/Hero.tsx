"use client";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
    dict: any;
    lang: string;
}

export default function Hero({ dict, lang }: HeroProps) {
    const scrollToServices = () => {
        document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-screen flex items-center bg-industrial-dark pt-20 overflow-hidden">
            {/* Background Decorativo */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full -mr-20 -mt-20" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Badge Traduzido */}
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-600/30">
                        {dict.subtitle}
                    </span>

                    {/* Título com Gradient - Note que aqui usamos o título do dict */}
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
                        {dict.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            {dict.title.split(" ").pop()}
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed font-light">
                        {dict.description}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={scrollToServices}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
                        >
                            {dict.cta_main} <ArrowRight size={20} />
                        </button>

                        {/* Link ajustado com o prefixo do idioma */}
                        <Link href={`/${lang}/contato`}>
                            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all">
                                {dict.cta_secondary} <MessageSquare size={20} />
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Elemento Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative hidden lg:block"
                >
                    {/* Elemento Visual - Hero */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative aspect-video rounded-3xl rotate-2 overflow-hidden shadow-2xl border-4 border-white/10 group bg-slate-800">
                            <Image
                                src="/images/image_2026-03-08_153643541.png" // Use o nome final da foto
                                alt={lang === "pt" ? "Fachada da Fábrica Incocil" : "Incocil Factory Building"}
                                fill // Preenche o container aspect-video
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority // Crítico para SEO/Performance
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}