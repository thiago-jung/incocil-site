"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
    const pathname = usePathname();

    const redirectedPathname = (locale: string) => {
        if (!pathname) return "/";
        const segments = pathname.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    const languages = [
        { code: "pt", label: "PT", flag: "🇧🇷" },
        { code: "en", label: "EN", flag: "🇺🇸" },
        { code: "es", label: "ES", flag: "🇪🇸" },
    ];

    return (
        <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 p-1.5 rounded-full backdrop-blur-md">
            {languages.map((lang) => {
                const isActive = currentLang === lang.code;
                return (
                    <Link
                        key={lang.code}
                        href={redirectedPathname(lang.code)}
                        onClick={() => {
                            if (!isActive) track.languageSwitch(currentLang, lang.code);
                        }}
                        className={`
                            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black transition-all duration-300
                            ${isActive
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                : "text-slate-200 hover:text-white hover:bg-white/10"
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