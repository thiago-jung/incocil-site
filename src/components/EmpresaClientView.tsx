"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Users } from "lucide-react";

interface EmpresaClientViewProps {
    dict: any;
}

export default function EmpresaClientView({ dict }: EmpresaClientViewProps) {
    const content = dict.about_page;

    // Ícones mapeados para os pilares
    const pillarIcons = [
        { icon: ShieldCheck, color: "text-blue-600" },
        { icon: Target, color: "text-amber-500" },
        { icon: Users, color: "text-green-600" },
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero da Página */}
            <section className="pt-40 pb-20 bg-industrial-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-black text-white mb-6"
                    >
                        {content.hero_title_start} <span className="text-blue-500">{content.hero_title_accent}</span>
                    </motion.h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        {content.hero_subtitle}
                    </p>
                </div>
            </section>

            {/* História */}
            <section className="py-24">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black text-slate-900 leading-tight">
                            {content.history_title_start} <span className="text-blue-600">{content.history_title_accent}</span> {content.history_title_end}
                        </h2>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {content.history_description}
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div className="border-l-4 border-blue-600 pl-4">
                                <span className="block text-3xl font-black text-slate-900">100%</span>
                                <span className="text-sm text-slate-500 uppercase font-bold">{content.stat_nacional_label}</span>
                            </div>
                            <div className="border-l-4 border-blue-600 pl-4">
                                <span className="block text-3xl font-black text-slate-900">+500mm</span>
                                <span className="text-sm text-slate-500 uppercase font-bold">{content.stat_honing_label}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-100 rounded-3xl h-[450px] overflow-hidden relative shadow-2xl group border-4 border-white/10">
                        {/* Gradiente para dar profundidade e contraste com o texto ao redor */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10 transition-opacity group-hover:opacity-40" />

                        <img
                            src="/images/incocil-predio.png"
                            alt={dict.lang === "pt" ? "Fachada da Fábrica Incocil" : "Incocil Factory Building"}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Overlay sutil em azul para manter a identidade visual da marca */}
                        <div className="absolute inset-0 bg-blue-600/5 mix-blend-multiply pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* Pilares */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900">{content.pillars_title}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {content.pillars.map((pillar: any, i: number) => {
                            const Icon = pillarIcons[i].icon;
                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -10 }}
                                    className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 text-center"
                                >
                                    <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-6 ${pillarIcons[i].color}`}>
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">{pillar.title}</h3>
                                    <p className="text-slate-600">{pillar.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-blue-600 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-8">{content.cta_title}</h2>
                    <a href={`/${dict.lang}/contato`} className="bg-white text-blue-600 px-10 py-4 rounded-xl font-black text-lg hover:bg-slate-100 transition-all inline-block shadow-xl">
                        {content.cta_button}
                    </a>
                </div>
            </section>
        </main>
    );
}