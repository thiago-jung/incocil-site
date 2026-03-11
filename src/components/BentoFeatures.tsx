"use client";
import { motion } from "framer-motion";
import { Gauge, Zap, Globe, PenTool, ShieldCheck } from "lucide-react";

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
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 md:row-span-2 bg-slate-950 rounded-3xl p-8 relative overflow-hidden group border border-slate-800"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Gauge size={200} className="text-white" />
                        </div>
                        <div className="relative z-10 h-full flex flex-col justify-end">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                                <ShieldCheck className="text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">{dict.card_large.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {dict.card_large.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Card Médio - Engenharia */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 bg-blue-50 rounded-3xl p-8 flex flex-col justify-between group border border-blue-100"
                    >
                        <div className="flex justify-between items-start">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <PenTool className="text-blue-600" />
                            </div>
                            <span className="text-blue-600/30 font-black text-4xl">01</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{dict.card_medium.title}</h3>
                            <p className="text-slate-600 text-sm">{dict.card_medium.description}</p>
                        </div>
                    </motion.div>

                    {/* Card Pequeno 1 - Localização */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-slate-900 rounded-3xl p-6 flex flex-col items-center justify-center text-center group border border-slate-800"
                    >
                        <Globe className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                        <h3 className="text-white font-bold">{dict.card_small_1.title}</h3>
                        <p className="text-slate-500 text-xs mt-2">{dict.card_small_1.description}</p>
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