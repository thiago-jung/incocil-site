"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const pathname = usePathname();

    // Função para gerar o link correto mantendo a rota atual
    // Ex: /pt/produtos/cilindro -> /en/produtos/cilindro
    const redirectedPathname = (locale: string) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    const languages = [
        { code: "pt", label: "PT", flag: "🇧🇷" },
        { code: "en", label: "EN", flag: "🇺🇸" },
    ];

    return (
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
            {languages.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                    <Link
                        key={lang.code}
                        href={redirectedPathname(lang.code)}
                        className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black transition-all duration-300
              ${isActive
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                            }
            `}
                    >
                        <span className="opacity-80">{lang.flag}</span>
                        {lang.label}
                    </Link>
                );
            })}
        </div>
    );
}