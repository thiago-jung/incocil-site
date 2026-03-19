"use client";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

export default function Navbar({ lang, dict }: { lang: string; dict: any }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname(); // ← DEVE vir antes de qualquer return

    if (!dict) {
        console.warn("Navbar: 'dict' is undefined. Check if you passed it as a prop.");
        return null;
    }

    // Determina se um link está activo
    const isActive = (href: string): boolean => {
        // Anchor links (ex: /#servicos) nunca ficam activos como "produtos"
        if (href.includes("#")) return false;
        // Rota exacta para a home
        if (href === `/${lang}`) return pathname === `/${lang}`;
        // Prefixo para rotas filhas (empresa, blog, contato)
        return pathname.startsWith(href);
    };

    // Estilo do link conforme estado de scroll e active
    const linkClass = (href: string) => {
        const active = isActive(href);
        const base = "transition-colors font-medium relative";

        if (active) {
            return `${base} ${isScrolled ? "text-blue-600 font-bold" : "text-white font-bold"} after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:rounded-full`;
        }
        return `${base} ${isScrolled ? "text-slate-600 hover:text-blue-500" : "text-slate-200 hover:text-white"}`;
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fecha o menu mobile ao navegar
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const navBackground =
        isScrolled || isOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5";

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${navBackground}`}>
            <div className="container mx-auto px-6 flex justify-between items-center relative">

                {/* Logo */}
                <Link href={`/${lang}`} className="flex items-center gap-2">
                    <Image
                        src="/images/incocil.png"
                        alt="INCOCIL® Logo"
                        width={240}
                        height={60}
                        className={`w-auto transition-all duration-500 ${isScrolled ? "h-10 md:h-12" : "h-14 md:h-16"}`}
                        priority
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 lg:gap-8 whitespace-nowrap">
                    <Link href={`/${lang}`} className={linkClass(`/${lang}`)}>
                        {dict.home}
                    </Link>
                    {/* Produtos aponta para o anchor — nunca ficará "activo" mas está OK */}
                    <a
                        href={`/${lang}/#servicos`}
                        className={`transition-colors font-medium ${isScrolled ? "text-slate-600 hover:text-blue-500" : "text-slate-200 hover:text-white"}`}
                    >
                        {dict.products}
                    </a>
                    <Link href={`/${lang}/empresa`} className={linkClass(`/${lang}/empresa`)}>
                        {dict.company}
                    </Link>
                    <Link href={`/${lang}/blog`} className={linkClass(`/${lang}/blog`)}>
                        {dict.blog}
                    </Link>
                    <Link href={`/${lang}/contato`} className={linkClass(`/${lang}/contato`)}>
                        {dict.contact}
                    </Link>
                </div>

                {/* Direita: idioma + CTA */}
                <div className="flex items-center gap-6">
                    <LanguageSwitcher currentLang={lang} />

                    <div className="hidden md:block">
                        <Link href={`/${lang}/contato`}>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all active:scale-95">
                                <Phone size={18} /> {dict.quote}
                            </button>
                        </Link>
                    </div>

                    {/* Hambúrguer mobile */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                        className={`md:hidden p-1 rounded-md transition-colors ${isScrolled || isOpen
                                ? "text-blue-600 hover:bg-slate-100"
                                : "text-blue-500 bg-white/80 hover:bg-white backdrop-blur-sm"
                            }`}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Menu mobile animado */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden overflow-hidden border-t border-slate-100"
                    >
                        <div className="flex flex-col px-6 py-8 gap-2 font-medium">
                            {[
                                { href: `/${lang}`, label: dict.home },
                                { href: `/${lang}/empresa`, label: dict.company },
                                { href: `/${lang}/blog`, label: dict.blog },
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
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}