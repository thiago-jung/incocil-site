"use client";
import { useEffect, useRef } from "react";
import { useInView, motion, useSpring, useTransform } from "framer-motion";
import { Factory, Users, ShieldCheck, Award, Globe, TrendingUp } from "lucide-react";

const iconMap: Record<string, any> = {
    factory: Factory,
    shield: ShieldCheck,
    users: Users,
    award: Award,
    globe: Globe,
    trending: TrendingUp,
};

// Ícones de fallback usados quando há duplicatas no JSON
const FALLBACK_ORDER = ["factory", "shield", "award", "globe", "users", "trending"];

interface CounterProps {
    value: number;
    suffix?: string;
    lang: string;
}

function Counter({ value, suffix = "", lang }: CounterProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const springValue = useSpring(0, { stiffness: 40, damping: 20, restDelta: 0.001 });

    const displayValue = useTransform(springValue, (latest) =>
        Math.floor(latest).toLocaleString(lang === "pt" ? "pt-BR" : "en-US")
    );

    useEffect(() => {
        if (isInView) springValue.set(value);
    }, [isInView, springValue, value]);

    return (
        <span ref={ref} className="text-4xl md:text-5xl font-black text-white tabular-nums">
            <motion.span>{displayValue}</motion.span>{suffix}
        </span>
    );
}

interface StatsProps {
    dict: any[];
    lang: string;
}

export default function Stats({ dict, lang }: StatsProps) {
    if (!dict) return null;

    // Garante que nunca há dois ícones iguais — se o JSON tiver duplicatas,
    // substitui pelo próximo disponível na lista de fallback
    const usedKeys = new Set<string>();
    const resolvedIcons = dict.map((stat: any) => {
        let key: string = stat.iconKey;
        if (usedKeys.has(key)) {
            key = FALLBACK_ORDER.find((k) => !usedKeys.has(k)) ?? "award";
        }
        usedKeys.add(key);
        return iconMap[key] || Award;
    });

    return (
        <section className="py-20 bg-industrial-dark relative">
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
                    {dict.map((stat: any, i: number) => {
                        const Icon = resolvedIcons[i];

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="inline-flex p-3 rounded-xl bg-blue-600/20 text-blue-500 mb-4 border border-blue-500/20">
                                    <Icon size={28} />
                                </div>
                                <div className="block">
                                    <Counter value={stat.value} suffix={stat.suffix} lang={lang} />
                                </div>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">
                                    {stat.label}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}