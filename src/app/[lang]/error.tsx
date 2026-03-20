"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { usePathname } from "next/navigation";

function detectLang(pathname: string | null): "pt" | "en" | "es" {
    if (!pathname) return "pt";
    const seg = pathname.split("/")[1];
    if (seg === "en") return "en";
    if (seg === "es") return "es";
    return "pt";
}

const content = {
    pt: {
        title: "Algo deu errado",
        subtitle: "Ocorreu um erro inesperado. Tente recarregar a página ou volte ao início.",
        retry: "Tentar novamente",
        home: "Voltar ao Início",
    },
    en: {
        title: "Something went wrong",
        subtitle: "An unexpected error occurred. Try reloading the page or go back to the homepage.",
        retry: "Try again",
        home: "Back to Home",
    },
    es: {
        title: "Algo salió mal",
        subtitle: "Ocurrió un error inesperado. Intente recargar la página o vuelva al inicio.",
        retry: "Intentar de nuevo",
        home: "Volver al Inicio",
    },
} as const;

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const pathname = usePathname();
    const lang = detectLang(pathname);
    const copy = content[lang];

    useEffect(() => {
        console.error("App error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-slate-900">
                    500
                </div>
            </div>

            <div className="max-w-md w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="inline-flex p-6 bg-red-500/10 rounded-3xl text-red-500 mb-8">
                        <AlertTriangle size={56} />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter">
                        {copy.title}
                    </h1>
                    <p className="text-slate-500 mb-10 text-lg leading-relaxed">
                        {copy.subtitle}
                    </p>

                    {error.digest && (
                        <p className="text-xs text-slate-400 font-mono mb-8 bg-slate-100 rounded-lg px-4 py-2 inline-block">
                            Error ID: {error.digest}
                        </p>
                    )}

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={reset}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
                        >
                            <RefreshCw size={20} /> {copy.retry}
                        </button>
                        <a
                            href={`/${lang}`}
                            className="text-slate-500 hover:text-blue-600 font-bold flex items-center justify-center gap-2 transition-colors py-2"
                        >
                            <Home size={18} /> {copy.home}
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}