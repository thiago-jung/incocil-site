"use client";
import { motion } from "framer-motion";
import { Droplets, Wind, Settings2, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SITE_CONTENT } from "@/constants/content";

const iconMap: Record<string, any> = {
    Droplets, Wind, Settings2, Wrench
};

export default function Services() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden" id="servicos">
            {/* Decoração de fundo para quebrar o branco */}
            <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-200 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Nossa Expertise</h2>
                    <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SITE_CONTENT.services.map((service, index) => {
                        const Icon = iconMap[service.icon] || Settings2;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card-industrial group"
                            >
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                                    <Icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                <Link
                                    href={`/produtos/${service.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-')}`}
                                    className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
                                >
                                    Ver detalhes <ArrowRight size={16} />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}