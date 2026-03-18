"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck, BarChart2, ChevronDown } from "lucide-react";
import {
    getConsent,
    setConsent,
    enableAnalytics,
    denyAnalytics,
    revokeConsent,
} from "@/lib/cookieConsent";

const GA_ID = "G-EEQ1CRS307";

// ─── Traduções ────────────────────────────────────────────────────────────────
const t = {
    pt: {
        title: "Este site usa cookies",
        description:
            "Usamos cookies para analisar o tráfego e melhorar a sua experiência. Nenhum dado pessoal é vendido a terceiros.",
        accept: "Aceitar todos",
        reject: "Apenas essenciais",
        details: "Detalhes",
        always_active: "sempre ativo",
        essential_title: "Essenciais",
        essential_desc: "Necessários para o funcionamento do site. Não podem ser desativados.",
        analytics_title: "Analytics (GA4)",
        analytics_desc: "Ajuda-nos a entender como os visitantes usam o site. Dados anónimos.",
        privacy: "Política de Privacidade",
        revoke: "Revogar consentimento",
        revoke_confirm: "Preferências limpas. Recarregue a página.",
    },
    en: {
        title: "This site uses cookies",
        description:
            "We use cookies to analyze traffic and improve your experience. No personal data is sold to third parties.",
        accept: "Accept all",
        reject: "Essential only",
        details: "Details",
        always_active: "always active",
        essential_title: "Essential",
        essential_desc: "Required for the site to function. Cannot be disabled.",
        analytics_title: "Analytics (GA4)",
        analytics_desc: "Helps us understand how visitors use the site. Anonymous data only.",
        privacy: "Privacy Policy",
        revoke: "Revoke consent",
        revoke_confirm: "Preferences cleared. Please reload the page.",
    },
    es: {
        title: "Este sitio usa cookies",
        description:
            "Usamos cookies para analizar el tráfico y mejorar su experiencia. Ningún dato personal se vende a terceros.",
        accept: "Aceptar todo",
        reject: "Solo esenciales",
        details: "Detalles",
        always_active: "siempre activo",
        essential_title: "Esenciales",
        essential_desc: "Necesarios para el funcionamiento del sitio. No se pueden desactivar.",
        analytics_title: "Analytics (GA4)",
        analytics_desc: "Nos ayuda a entender cómo los visitantes usan el sitio. Solo datos anónimos.",
        privacy: "Política de Privacidad",
        revoke: "Revocar consentimiento",
        revoke_confirm: "Preferencias borradas. Recargue la página.",
    },
} as const;

// ─── Component ────────────────────────────────────────────────────────────────
export default function CookieBanner({ lang }: { lang: string }) {
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [revokeMsg, setRevokeMsg] = useState(false);

    const locale = (["pt", "en", "es"].includes(lang) ? lang : "pt") as keyof typeof t;
    const copy = t[locale];

    // Mostra o banner apenas se não houver consentimento registado
    useEffect(() => {
        const consent = getConsent();
        if (!consent) {
            // Pequeno delay para não competir com o layout inicial
            const id = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(id);
        }
        // Já consentiu: aplica a decisão anterior ao GA4
        if (consent === "accepted") enableAnalytics();
        else denyAnalytics();
    }, []);

    function handleAccept() {
        setConsent("accepted");
        enableAnalytics();
        setVisible(false);
    }

    function handleReject() {
        setConsent("rejected");
        denyAnalytics();
        setVisible(false);
    }

    function handleRevoke() {
        revokeConsent();
        denyAnalytics();
        setRevokeMsg(true);
        setTimeout(() => setRevokeMsg(false), 4000);
    }

    return (
        <>
            {/* ── Banner principal ───────────────────────────────────────── */}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ y: 120, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 120, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 280, damping: 28 }}
                        role="dialog"
                        aria-live="polite"
                        aria-label={copy.title}
                        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] w-[calc(100%-2rem)] max-w-xl"
                    >
                        <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">

                            {/* Linha decorativa superior */}
                            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />

                            <div className="p-5 md:p-6">
                                {/* Cabeçalho */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="mt-0.5 p-2 rounded-lg bg-blue-600/20 border border-blue-500/30 shrink-0">
                                        <Cookie size={18} className="text-blue-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-white font-bold text-sm tracking-wide">
                                            {copy.title}
                                        </h2>
                                        <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                                            {copy.description}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleReject}
                                        aria-label="Fechar / Close"
                                        className="p-1 text-slate-600 hover:text-slate-300 transition-colors shrink-0"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                {/* Detalhes expansíveis */}
                                <AnimatePresence>
                                    {expanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-3 mb-4 space-y-2 border border-slate-700/60 rounded-xl p-3 bg-slate-800/50">
                                                {/* Essenciais — sempre ativo */}
                                                <div className="flex items-start gap-3">
                                                    <ShieldCheck size={15} className="text-green-500 mt-0.5 shrink-0" />
                                                    <div>
                                                        <p className="text-white text-xs font-semibold">
                                                            {copy.essential_title}
                                                            <span className="ml-2 text-[10px] font-normal text-slate-500 uppercase tracking-widest">
                                                                {copy.always_active}
                                                            </span>
                                                        </p>
                                                        <p className="text-slate-500 text-[11px] mt-0.5">
                                                            {copy.essential_desc}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="h-px bg-slate-700/40" />

                                                {/* Analytics */}
                                                <div className="flex items-start gap-3">
                                                    <BarChart2 size={15} className="text-blue-400 mt-0.5 shrink-0" />
                                                    <div>
                                                        <p className="text-white text-xs font-semibold">
                                                            {copy.analytics_title}
                                                        </p>
                                                        <p className="text-slate-500 text-[11px] mt-0.5">
                                                            {copy.analytics_desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Botões + link detalhes */}
                                <div className="flex flex-wrap items-center gap-2">
                                    {/* Aceitar */}
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 min-w-[120px] bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all"
                                    >
                                        {copy.accept}
                                    </button>

                                    {/* Recusar */}
                                    <button
                                        onClick={handleReject}
                                        className="flex-1 min-w-[120px] bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 text-xs font-semibold py-2.5 px-4 rounded-xl border border-slate-700 transition-all"
                                    >
                                        {copy.reject}
                                    </button>

                                    {/* Toggle detalhes */}
                                    <button
                                        onClick={() => setExpanded((v) => !v)}
                                        className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-xs transition-colors"
                                    >
                                        {copy.details}
                                        <ChevronDown
                                            size={13}
                                            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Toast de revogação ─────────────────────────────────────── */}
            <AnimatePresence>
                {revokeMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed bottom-6 right-6 z-[400] bg-slate-800 border border-slate-600 text-slate-200 text-xs font-medium px-4 py-3 rounded-xl shadow-xl"
                    >
                        ✓ {copy.revoke_confirm}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// ─── Botão de revogação (para colocar no footer) ──────────────────────────────
export function RevokeConsentButton({ lang }: { lang: string }) {
    const [msg, setMsg] = useState(false);
    const locale = (["pt", "en", "es"].includes(lang) ? lang : "pt") as keyof typeof t;
    const copy = t[locale];

    function handle() {
        revokeConsent();
        denyAnalytics();
        setMsg(true);
        setTimeout(() => setMsg(false), 3000);
        // Recarrega para re-exibir o banner
        setTimeout(() => window.location.reload(), 3500);
    }

    return (
        <button
            onClick={handle}
            className="text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2 transition-colors"
        >
            {msg ? `✓ ${copy.revoke_confirm}` : copy.revoke}
        </button>
    );
}
