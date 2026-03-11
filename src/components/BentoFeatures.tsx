"use client";
import { motion } from "framer-motion";
import { Gauge, Zap, Globe, PenTool, ShieldCheck } from "lucide-react";
import Image from "next/image";
interface BentoProps {
    dict: any;
}

export default function BentoFeatures({ dict }: BentoProps) {
    if (!dict) return null;

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">
                        {dict.title_start} <span className="text-blue-600">{dict.title_accent}</span>
                    </h2>
                    <p className="text-slate-500 mt-4 text-lg">{dict.subtitle}</p>
                </div>

                {/* Grid Principal */}
                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full md:h-[600px]">

                    {/* Card Grande - Destaque Principal */}
                    {/* Card Grande - Destaque Principal (Brunimento) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 md:row-span-2 bg-slate-950 rounded-3xl p-8 relative overflow-hidden group border border-slate-800"
                    >
                        {/* Imagem de Fundo - Usando a foto de Brunimento para alinhar com o conteúdo */}
                        <Image
                            src="/images/brunimento.jpg"
                            alt={dict.card_large.title}
                            fill
                            className="object-cover opacity-20 group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Overlay de Gradiente para garantir leitura do texto */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-transparent to-slate-950/50" />

                        {/* Ícone Decorativo - Gauge (Mantido com z-index para ficar sobre a imagem) */}
                        {/*<div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity z-10">*/}
                        {/*    <Gauge size={200} className="text-white" />*/}
                        {/*</div>*/}

                        {/* Conteúdo do Card */}
                        <div className="relative z-20 h-full flex flex-col justify-end">
                            {/*<div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">*/}
                                {/*<ShieldCheck className="text-white" />*/}
                            {/*</div>*/}
                            <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                                {dict.card_large.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed max-w-md">
                                {dict.card_large.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Card Médio - Engenharia */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 bg-white rounded-3xl p-8 flex flex-col justify-between group border border-slate-100 relative overflow-hidden shadow-sm"
                    >
                        {/* Imagem de Fundo Técnica - Sugestão: banner-home-2 ou uma nova de projeto */}
                        <Image
                            src="/images/1582053802156.jpg"
                            alt={dict.card_medium.title}
                            fill
                            className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 1000px) 100vw, 50vw"
                        />

                        {/* Overlay de suavização */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-0/90 to-transparent pointer-events-none" />

                        <div className="relative z-10 flex justify-between items-start">
                            {/*<div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-blue-50">*/}
                            {/*    <PenTool className="text-blue-600" />*/}
                            {/*</div>*/}
                            {/*<span className="text-blue-600/20 font-black text-5xl">01</span>*/}
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {dict.card_medium.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                                {dict.card_medium.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Card Pequeno 1 - Localização */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="relative bg-slate-900 rounded-3xl overflow-hidden group border border-slate-800"
                    >
                        {/* Imagem de Fundo do Robô */}
                        <Image
                            src="/images/RoboDeSolda3.jpg"
                            alt={dict.card_small_1.title}
                            fill
                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 1000px) 100vw, 50vw"
                        />

                        {/* Overlay para legibilidade */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                        <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                            <h3 className="text-white font-bold text-lg">{dict.card_small_1.title}</h3>
                            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                                {dict.card_small_1.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Card Pequeno 2 - Rapidez */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-blue-600 rounded-3xl p-6 flex flex-col items-center justify-center text-center group shadow-xl shadow-blue-600/20"
                    >
                        <Zap className="text-white mb-4 animate-pulse" size={32} />
                        <h3 className="text-white font-bold">{dict.card_small_2.title}</h3>
                        <p className="text-blue-100 text-xs mt-2">{dict.card_small_2.description}</p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}