"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Users, Factory, Award, TrendingUp } from "lucide-react";

const VALORES = [
    { icon: ShieldCheck, title: "Qualidade", desc: "Rigor técnico em cada vedação e acabamento.", color: "text-blue-600" },
    { icon: Target, title: "Precisão", desc: "Desenvolvimento sob medida para demandas complexas.", color: "text-amber-500" },
    { icon: Users, title: "Parceria", desc: "Foco no sucesso da operação de nossos clientes.", color: "text-green-600" },
];

export default function EmpresaPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white">

                {/* Hero da Página - Industrial Dark */}
                <section className="pt-40 pb-20 bg-industrial-dark relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-black text-white mb-6"
                        >
                            Tradição e <span className="text-blue-500">Tecnologia</span>
                        </motion.h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Desde Porto Alegre, transformando aço e precisão em soluções hidráulicas para todo o território nacional.
                        </p>
                    </div>
                </section>

                {/* Seção de História/Diferencial */}
                <section className="py-24">
                    <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-slate-900 leading-tight">
                                Mais do que fabricar, nós <span className="text-blue-600">desenvolvemos</span> o seu projeto.
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                A INCOCIL® nasceu da necessidade de entregar cilindros que suportem as condições severas do setor agrícola e industrial brasileiro. Localizada estrategicamente no Distrito Industrial da Restinga, nossa planta conta com processos de brunimento e montagem de alta precisão.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="border-l-4 border-blue-600 pl-4">
                                    <span className="block text-3xl font-black text-slate-900">100%</span>
                                    <span className="text-sm text-slate-500 uppercase font-bold">Nacional</span>
                                </div>
                                <div className="border-l-4 border-blue-600 pl-4">
                                    <span className="block text-3xl font-black text-slate-900">+500mm</span>
                                    <span className="text-sm text-slate-500 uppercase font-bold">Capacidade de Brunimento</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-100 rounded-3xl h-[450px] overflow-hidden relative shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark/60 to-transparent" />
                            {/* Imagem de Contexto Industrial */}
                            <img
                                src="https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=2070&auto=format&fit=crop"
                                alt="Fábrica Incocil"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Valores - Aqui quebramos o "monocromático" */}
                <section className="py-24 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-slate-900">Nossos Pilares</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {VALORES.map((v, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 text-center"
                                >
                                    <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-6 ${v.color}`}>
                                        <v.icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">{v.title}</h3>
                                    <p className="text-slate-600">{v.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-blue-600 text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-8">Pronto para elevar o nível da sua operação?</h2>
                        <a href="/contato" className="bg-white text-blue-600 px-10 py-4 rounded-xl font-black text-lg hover:bg-slate-100 transition-all inline-block shadow-xl">
                            Solicitar Orçamento Técnico
                        </a>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}