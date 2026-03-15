"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Settings, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Decoração Industrial de Fundo */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black">
                    404
                </div>
            </div>

            <div className="max-w-md w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Ícone Animado */}
                    <div className="inline-flex p-6 bg-blue-600/10 rounded-3xl text-blue-600 mb-8">
                        <Settings size={64} className="animate-spin-slow" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter">
                        Component not found <br />
                        <span className="text-blue-600 text-2xl md:text-3xl uppercase">Componente não encontrado</span>
                    </h1>

                    <p className="text-slate-500 mb-12 text-lg leading-relaxed">
                        It seems the page you are looking for is offline or moved. <br />
                        <span className="text-sm italic">Parece que a página que você está procurando saiu de linha ou foi movida para outro setor.</span>
                    </p>

                    <div className="flex flex-col gap-4">
                        <Link
                            href="/"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
                        >
                            <Home size={20} /> Return to Home / Voltar ao Início
                        </Link>

                        <Link
                            href="/contato"
                            className="text-slate-500 hover:text-blue-600 font-bold flex items-center justify-center gap-2 transition-colors py-2"
                        >
                            <ArrowLeft size={18} /> Technical Support / Suporte Técnico
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* CSS inline para a animação lenta da engrenagem */}
            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    );
}