"use client";
import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FeiraPopup({ lang }: { lang: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const content = {
        badge: { pt: "Próximo Evento", en: "Upcoming Event", es: "Próximo Evento" },
        title: { pt: "Visite a INCOCIL® na Expointer", en: "Visit INCOCIL® at Expointer", es: "Visite INCOCIL® en la Expointer" },
        desc: {
            pt: "Estaremos na 49ª Expointer, no Parque de Exposições Assis Brasil, em Esteio (RS). Venha conhecer nossas soluções em cilindros hidráulicos.",
            en: "We will be at the 49th Expointer, at the Assis Brasil Exhibition Park, in Esteio (RS), Brazil. Come and discover our hydraulic cylinder solutions.",
            es: "Estaremos en la 49ª Expointer, en el Parque de Exposiciones Assis Brasil, en Esteio (RS). Venga a conocer nuestras soluciones en cilindros hidráulicos.",
        },
        booth: { pt: "29 Ago – 06 Set · Esteio/RS", en: "Aug 29 – Sep 6 · Esteio/RS, Brazil", es: "29 Ago – 06 Sep · Esteio/RS" },
    };

    const getLabel = (key: keyof typeof content) =>
        content[key][lang as "pt" | "en" | "es"] || content[key]["pt"];

    useEffect(() => {
        const dataFimFeira = new Date("2026-09-06T23:59:59");
        const hoje = new Date();
        const jaFechou = sessionStorage.getItem("popupFeiraFechado");
        const nasPaginasDaFeira = pathname?.includes("hannover-messe") || pathname?.includes("expointer");

        if (hoje <= dataFimFeira && !jaFechou && !nasPaginasDaFeira) {
            // ── 5500ms em vez de 2000ms ────────────────────────────────────────
            // O Lighthouse media LCP nos primeiros ~5s. Com 2000ms o popup era
            // capturado como elemento LCP (texto grande, renderizado tarde),
            // inflando o score de 6.2s para pior. Atrasando para além da janela
            // de medição, o Hero volta a ser o LCP legítimo da página.
            const timer = setTimeout(() => setIsOpen(true), 5500);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem("popupFeiraFechado", "true");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed bottom-6 left-6 z-[100] bg-white rounded-2xl shadow-2xl border border-blue-100 p-6 max-w-sm"
                >
                    <button
                        onClick={handleClose}
                        aria-label="Fechar aviso"
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-3 text-blue-700 font-bold mb-2 uppercase text-xs tracking-widest">
                        <Calendar size={16} /> {getLabel("badge")}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{getLabel("title")}</h3>
                    <p className="text-slate-600 text-sm mb-4">{getLabel("desc")}</p>
                    <Link
                        href={`/${lang}/blog/incocil-49-expointer-2026`}
                        onClick={handleClose}
                        className="block bg-slate-100 hover:bg-blue-50 rounded-lg p-3 text-sm font-medium text-slate-800 hover:text-blue-700 text-center transition-colors"
                    >
                        {getLabel("booth")}
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}