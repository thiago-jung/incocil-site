"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";
import { Factory, Users, ShieldCheck, Award } from "lucide-react";

// Sub-componente para o contador individual
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Animação "Spring" para parecer mais natural (física de mola)
    const springValue = useSpring(0, {
        stiffness: 40,
        damping: 20,
        restDelta: 0.001
    });

    const displayValue = useTransform(springValue, (latest) =>
        Math.floor(latest).toLocaleString('pt-BR')
    );

    useEffect(() => {
        if (isInView) {
            springValue.set(value);
        }
    }, [isInView, springValue, value]);

    return (
        <span ref={ref} className="text-4xl md:text-5xl font-black text-white tabular-nums">
            <motion.span>{displayValue}</motion.span>{suffix}
        </span>
    );
}

const STATS = [
    { label: "Anos de Experiência", value: 15, suffix: "+", icon: Factory },
    { label: "Cilindros Entregues", value: 12500, suffix: "+", icon: ShieldCheck },
    { label: "Clientes Atendidos", value: 850, suffix: "+", icon: Users },
    { label: "Capacidade (mm)", value: 500, suffix: "ø", icon: Award },
];

export default function Stats() {
    return (
        <section className="py-20 bg-industrial-dark relative">
            {/* Linhas decorativas de fundo (Grid técnico) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="inline-flex p-3 rounded-xl bg-blue-600/20 text-blue-500 mb-4 border border-blue-500/20">
                                <stat.icon size={28} />
                            </div>
                            <div className="block">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}