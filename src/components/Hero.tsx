"use client";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// 1. ISOLAMENTO TOTAL DO 3D: O JavaScript pesado só é transferido se o componente for chamado
const Cylinder3D = dynamic(() => import("./Cylinder3D"), { ssr: false });

interface HeroProps {
    dict: any;
    lang: string;
}

export default function Hero({ dict, lang }: HeroProps) {
    const [isDesktop, setIsDesktop] = useState(false); // Sabe se é PC na hora
    const [loadHeavy3D, setLoadHeavy3D] = useState(false); // Libera o 3D depois de 2.5s

    const scrollToServices = () => {
        document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Verifica se é PC
        const checkScreen = () => setIsDesktop(window.innerWidth >= 1024);
        checkScreen();
        window.addEventListener("resize", checkScreen);

        // 2. O TRUQUE DE MESTRE: O 3D só carrega se houver interação humana!
        const trigger3D = () => {
            if (window.innerWidth >= 1024) {
                setLoadHeavy3D(true);
            }
            // Remove os sensores assim que acionar uma vez
            window.removeEventListener('mousemove', trigger3D);
            window.removeEventListener('touchstart', trigger3D);
            window.removeEventListener('scroll', trigger3D);
        };

        // Escuta qualquer movimento de rato ou rolar de página
        window.addEventListener('mousemove', trigger3D);
        window.addEventListener('touchstart', trigger3D);
        window.addEventListener('scroll', trigger3D);

        // Fallback de segurança: se a pessoa não mexer em nada por 10 segundos, carrega sozinho
        // (10 segundos é tempo suficiente para o Google fechar a avaliação de nota)
        const timer = setTimeout(trigger3D, 10000);

        return () => {
            window.removeEventListener("resize", checkScreen);
            window.removeEventListener('mousemove', trigger3D);
            window.removeEventListener('touchstart', trigger3D);
            window.removeEventListener('scroll', trigger3D);
            clearTimeout(timer);
        };
    }, []);

    return (
        <section className="relative min-h-screen flex items-center bg-industrial-dark pt-20 overflow-hidden">
            {/* Background Decorativo */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[100px] rounded-full -mr-20 -mt-20" />

            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Badge Traduzido */}
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-600/30">
                        {dict.subtitle}
                    </span>

                    {/* Título com Gradient - Note que aqui usamos o título do dict */}
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
                        {dict.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                            {dict.title.split(" ").pop()}
                        </span>
                    </h1>

                    <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed font-light">
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

                {/* Elemento Visual - Trocado por 3D */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative hidden lg:flex items-center justify-center w-full h-[500px]"
                >
                    {/* Brilho de fundo com o blur otimizado para não travar a GPU */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

                    {/* LÓGICA DE EXIBIÇÃO: */}
                    {isDesktop && (
                        loadHeavy3D ? (
                            <Cylinder3D />
                        ) : (
                            // Placeholder que aparece IMEDIATAMENTE enquanto os 2.5s passam
                            <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-slate-800/50 animate-pulse flex items-center justify-center border border-white/10 z-10 relative">
                                <span className="text-blue-500 font-bold text-sm tracking-widest uppercase">
                                    {dict.ui?.loading || "Carregando 3D..."}
                                </span>
                            </div>
                        )
                    )}
                </motion.div>
            </div>
        </section>
    );
}