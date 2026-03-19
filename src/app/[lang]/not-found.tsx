"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Settings, ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

// Detecta o idioma a partir do pathname (ex: /en/... → "en")
function detectLang(pathname: string | null): "pt" | "en" | "es" {
    if (!pathname) return "pt";
    const seg = pathname.split("/")[1];
    if (seg === "en") return "en";
    if (seg === "es") return "es";
    return "pt";
}

const content = {
    pt: {
        title: "Componente não encontrado",
        subtitle: "Parece que a página que você procura saiu de linha ou foi movida.",
        home: "Voltar ao Início",
        support: "Suporte Técnico",
        suggestTitle: "Talvez você esteja procurando:",
        products: [
            { label: "Cilindro Hidráulico Inox", slug: "stainless-steel-hydraulic-cylinder" },
            { label: "Cilindro Telescópico", slug: "telescopic-hydraulic-cylinder" },
            { label: "Manutenção de Cilindros", slug: "maintenance" },
            { label: "Serviços de Brunimento", slug: "honing-services" },
        ],
    },
    en: {
        title: "Page not found",
        subtitle: "The page you're looking for seems to be offline or moved.",
        home: "Back to Home",
        support: "Technical Support",
        suggestTitle: "You might be looking for:",
        products: [
            { label: "Stainless Steel Hydraulic Cylinder", slug: "stainless-steel-hydraulic-cylinder" },
            { label: "Telescopic Cylinder", slug: "telescopic-hydraulic-cylinder" },
            { label: "Cylinder Maintenance", slug: "maintenance" },
            { label: "Honing Services", slug: "honing-services" },
        ],
    },
    es: {
        title: "Página no encontrada",
        subtitle: "La página que buscas parece estar fuera de línea o fue movida.",
        home: "Volver al Inicio",
        support: "Soporte Técnico",
        suggestTitle: "Quizás estás buscando:",
        products: [
            { label: "Cilindro Hidráulico Inox", slug: "stainless-steel-hydraulic-cylinder" },
            { label: "Cilindro Telescópico", slug: "telescopic-hydraulic-cylinder" },
            { label: "Mantenimiento de Cilindros", slug: "maintenance" },
            { label: "Servicios de Bruñido", slug: "honing-services" },
        ],
    },
} as const;

export default function NotFound() {
    const pathname = usePathname();
    const lang = detectLang(pathname);
    const copy = content[lang];

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* 404 decorativo de fundo */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black">
                    404
                </div>
            </div>

            <div className="max-w-lg w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Ícone */}
                    <div className="inline-flex p-6 bg-blue-600/10 rounded-3xl text-blue-600 mb-8">
                        <Settings size={64} className="animate-spin-slow" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter">
                        {copy.title}
                    </h1>
                    <p className="text-slate-500 mb-10 text-lg leading-relaxed">
                        {copy.subtitle}
                    </p>

                    {/* Sugestões de produtos */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8 text-left">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                            {copy.suggestTitle}
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                            {copy.products.map((p) => (
                                <Link
                                    key={p.slug}
                                    href={`/${lang}/produtos/${p.slug}`}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-medium text-sm transition-all group"
                                >
                                    {p.label}
                                    <ArrowRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Botões de navegação */}
                    <div className="flex flex-col gap-3">
                        <Link
                            href={`/${lang}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
                        >
                            <Home size={20} /> {copy.home}
                        </Link>
                        <Link
                            href={`/${lang}/contato`}
                            className="text-slate-500 hover:text-blue-600 font-bold flex items-center justify-center gap-2 transition-colors py-2"
                        >
                            <ArrowLeft size={18} /> {copy.support}
                        </Link>
                    </div>
                </motion.div>
            </div>

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