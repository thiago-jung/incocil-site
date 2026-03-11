"use client";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    const scrollToServices = () => {
        document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
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
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-600/30">
                        Tecnologia Hidráulica & Pneumática
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-6 leading-tight">
                        Precisão em <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                            Movimento.
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed font-light">
                        Desenvolvimento e fabricação com rigor técnico em Porto Alegre para os setores mais exigentes do Brasil.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={scrollToServices}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
                        >
                            Nossos Produtos <ArrowRight size={20} />
                        </button>
                        <Link href="/contato">
                            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all">
                                Falar com Especialista <MessageSquare size={20} />
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Elemento Visual - Simulando uma peça técnica */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative hidden lg:block"
                >
                    <div className="aspect-square bg-gradient-to-br from-blue-600 to-indigo-900 rounded-3xl rotate-3 flex items-center justify-center p-12 shadow-2xl">
                        <div className="w-full h-full border-2 border-white/20 rounded-2xl border-dashed flex items-center justify-center">
                            <span className="text-white/20 font-black text-8xl uppercase">Cilindro</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}