"use client";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

const DARK_HERO_PAGES = [
    /^\/[a-z]{2}$/,
];

// Rotas onde a Navbar não deve aparecer de forma alguma
const HIDDEN_PAGES = [
    /^\/[a-z]{2}\/hannover-messe/,
    /^\/[a-z]{2}\/business-card/,
];

function hasDarkHero(pathname: string | null): boolean {
    if (!pathname) return false;
    return DARK_HERO_PAGES.some((re) => re.test(pathname));
}

function isHiddenPage(pathname: string | null): boolean {
    if (!pathname) return false;
    return HIDDEN_PAGES.some((re) => re.test(pathname));
}

export default function Navbar({ lang, dict }: { lang: string; dict: any }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const hidden = isHiddenPage(pathname);
    const darkHero = hasDarkHero(pathname);
    const forceLight = !darkHero;
    const showLight = isScrolled || isOpen || forceLight;

    const isActive = (href: string): boolean => {
        if (href.includes("#")) return false;
        if (href === `/${lang}`) return pathname === `/${lang}`;
        return pathname.startsWith(href);
    };

    const linkClass = (href: string) => {
        const active = isActive(href);
        const base = "transition-colors font-medium relative text-sm whitespace-nowrap";
        if (active) {
            return `${base} text-blue-600 font-bold after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:rounded-full`;
        }
        if (showLight) return `${base} text-slate-600 hover:text-blue-500`;
        return `${base} text-slate-200 hover:text-white`;
    };

    const anchorClass = showLight
        ? "transition-colors font-medium text-sm whitespace-nowrap text-slate-600 hover:text-blue-500"
        : "transition-colors font-medium text-sm whitespace-nowrap text-slate-200 hover:text-white";

    const calcLabel = lang === "en" ? "Calculator" : "Calculadora";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Não renderiza nada nas páginas da Hannover
    if (hidden || !dict) return null;

    const navBackground = showLight
        ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
        : "bg-transparent py-5";

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground}`}>
            <div className="container mx-auto px-6 flex items-center relative">

                <Link href={`/${lang}`} className="flex items-center shrink-0 w-[120px] md:w-[140px] lg:w-[160px]">
                    <Image
                        src="/images/incocil.png"
                        alt="INCOCIL® Logo"
                        width={240}
                        height={60}
                        className={`w-full h-auto transition-all duration-500 ${showLight ? "" : "brightness-0 invert"}`}
                        priority
                    />
                </Link>

                <div className="hidden md:flex flex-1 items-center justify-center gap-5 lg:gap-7">
                    <Link href={`/${lang}`} className={linkClass(`/${lang}`)}>{dict.home}</Link>
                    <a href={`/${lang}/#servicos`} className={anchorClass}>{dict.products}</a>
                    <Link href={`/${lang}/empresa`} className={linkClass(`/${lang}/empresa`)}>{dict.company}</Link>
                    <Link href={`/${lang}/blog`} className={linkClass(`/${lang}/blog`)}>{dict.blog}</Link>
                    <Link href={`/${lang}/calculadora`} className={`hidden lg:inline ${linkClass(`/${lang}/calculadora`)}`}>{calcLabel}</Link>
                    <Link href={`/${lang}/contato`} className={linkClass(`/${lang}/contato`)}>{dict.contact}</Link>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-auto md:ml-0">
                    <LanguageSwitcher currentLang={lang} />

                    <div className="hidden md:block">
                        <Link href={`/${lang}/contato`}>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1.5 transition-all active:scale-95 whitespace-nowrap">
                                <Phone size={15} /> {dict.quote}
                            </button>
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={isOpen}
                        className={`md:hidden p-1 rounded-md transition-colors ${showLight
                            ? "text-blue-600 hover:bg-slate-100"
                            : "text-blue-500 bg-white/80 hover:bg-white backdrop-blur-sm"
                            }`}
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            <div
                className={`
                    absolute top-full left-0 w-full bg-white shadow-xl md:hidden
                    border-t border-slate-100 overflow-hidden
                    transition-all duration-300 ease-in-out
                    ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
                `}
            >
                <div className="flex flex-col px-6 py-8 gap-2 font-medium">
                    {[
                        { href: `/${lang}`, label: dict.home },
                        { href: `/${lang}/empresa`, label: dict.company },
                        { href: `/${lang}/blog`, label: dict.blog },
                        { href: `/${lang}/calculadora`, label: calcLabel },
                        { href: `/${lang}/contato`, label: dict.contact },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className={`text-lg py-2 border-b border-slate-50 last:border-0 transition-colors ${isActive(href) ? "text-blue-600 font-bold" : "text-slate-700 hover:text-blue-600"
                                }`}
                        >
                            {label}
                        </Link>
                    ))}
                    <a
                        href={`/${lang}/#servicos`}
                        onClick={() => setIsOpen(false)}
                        className="text-lg py-2 text-slate-700 hover:text-blue-600 border-b border-slate-50"
                    >
                        {dict.products}
                    </a>
                    <div className="pt-4">
                        <Link href={`/${lang}/contato`} onClick={() => setIsOpen(false)}>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                <Phone size={18} /> {dict.quote}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}