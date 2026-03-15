"use client";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";

export default function Navbar({ lang, dict }: { lang: string, dict: any }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    if (!dict) {
        console.warn("Navbar: 'dict' is undefined. Check if you passed it as a prop.");
        return null;
    }

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Se o menu mobile estiver aberto, forçamos o fundo branco para não ficar transparente
    const navBackground = isScrolled || isOpen
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
                        // Quando a página rola (isScrolled), o logo diminui. Quando está no topo, fica maior.
                        className={`w-auto transition-all duration-500 ${isScrolled ? "h-10 md:h-12" : "h-14 md:h-15"}`}
                        priority
                    />
                </Link>

                {/* Desktop Menu */}
                <div className={`hidden md:flex gap-6 lg:gap-8 font-medium whitespace-nowrap ${isScrolled ? "text-slate-600" : "text-slate-200"}`}>
                    <Link href={`/${lang}`} className="hover:text-blue-500 transition-colors">{dict.home}</Link>
                    <Link href={`/${lang}/#servicos`} className="hover:text-blue-500 transition-colors">{dict.products}</Link>
                    <Link href={`/${lang}/empresa`} className="hover:text-blue-500 transition-colors">{dict.company}</Link>
                    <Link href={`/${lang}/blog`} className="hover:text-blue-500 transition-colors">{dict.blog}</Link>
                    <Link href={`/${lang}/contato`} className="hover:text-blue-500 transition-colors">{dict.contact}</Link>
                </div>

                {/* Controles da Direita (Desktop & Mobile) */}
                <div className="flex items-center gap-6">
                    {/* Seletor de Idioma */}
                    <LanguageSwitcher currentLang={lang} />

                    {/* CTA Button - Desktop */}
                    <div className="hidden md:block">
                        <Link href={`/${lang}/contato`}>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all active:scale-95">
                                <Phone size={18} /> {dict.quote}
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                        className={`md:hidden p-1 rounded-md transition-colors ${isScrolled || isOpen ? "text-blue-600 hover:bg-slate-100" : "text-blue-500 bg-white/80 hover:bg-white backdrop-blur-sm"
                            }`}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown Animado */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden overflow-hidden border-t border-slate-100"
                    >
                        <div className="flex flex-col px-6 py-8 gap-6 text-slate-700 font-medium">
                            <Link href={`/${lang}`} onClick={() => setIsOpen(false)} className="hover:text-blue-600 text-lg">{dict.home}</Link>
                            <Link href={`/${lang}/#servicos`} onClick={() => setIsOpen(false)} className="hover:text-blue-600 text-lg">{dict.products}</Link>
                            <Link href={`/${lang}/empresa`} onClick={() => setIsOpen(false)} className="hover:text-blue-600 text-lg">{dict.company}</Link>
                            <Link href={`/${lang}/blog`} onClick={() => setIsOpen(false)} className="hover:text-blue-600 text-lg">{dict.blog}</Link>
                            <Link href={`/${lang}/contato`} onClick={() => setIsOpen(false)} className="hover:text-blue-600 text-lg">{dict.contact}</Link>

                            <hr className="border-slate-100 my-2" />

                            {/* CTA no Mobile */}
                            <Link href={`/${lang}/contato`} onClick={() => setIsOpen(false)}>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                    <Phone size={18} /> {dict.quote}
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}