"use client";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link"; // Já estava aqui, agora vamos usar
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

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
            }`}>
            <div className="container mx-auto px-6 flex justify-between items-center">

                {/* Logo - Agora clicável para voltar ao topo/home */}
                <Link href={`/${lang}`} className="flex items-center gap-2">
                    <Image
                        src="/images/incocil.png"
                        alt="Incocil Logo"
                        width={160}  // Defina a largura real da imagem
                        height={40}  // Defina a altura real
                        className="h-10 w-auto"
                        priority     // Adicione priority pois o logo está no "above the fold"
                    />
                </Link>

                {/* Desktop Menu - Substituímos <a> por <Link> */}
                <div className={`hidden md:flex gap-8 font-medium ${isScrolled ? "text-slate-600" : "text-slate-200"}`}>
                    <Link href={`/${lang}`}>{dict.home}</Link>
                    <Link href={`/${lang}/#servicos`}>{dict.products}</Link>
                    <Link href={`/${lang}/empresa`}>{dict.company}</Link>
                    <Link href={`/${lang}/blog`} className="hover:text-blue-500 transition-colors">{dict.blog}</Link>
                    <Link href={`/${lang}/contato`}>{dict.contact}</Link>

                    {/*<Link href="/" className="hover:text-blue-500 transition-colors">Início</Link>*/}

                    {/*<Link href="/#servicos" className="hover:text-blue-500 transition-colors">Produtos</Link>*/}

                    {/*<Link href="/empresa" className="hover:text-blue-500 transition-colors">A Empresa</Link>*/}
                    {/*<Link href="/contato" className="hover:text-blue-500 transition-colors">Contato</Link>*/}
                </div>

                {/* CTA Button - Desktop */}
                <div className="hidden md:block">
                    {/* Adicionamos o ${lang} no link e o {dict.quote} no texto */}
                    <Link href={`/${lang}/contato`}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all active:scale-95">
                            <Phone size={18} /> {dict.quote}
                        </button>
                    </Link>
                </div>


                {/* Seletor de Idioma simples */}
                <LanguageSwitcher currentLang={lang} />

                {/* Mobile Toggle */}
                <div className="md:hidden text-blue-600 cursor-pointer">
                    <Menu />
                </div>

                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-blue-600">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* E o menu mobile em si (que aparece quando isOpen é true) */}
                {isOpen && (
                    <div className="...">
                        <Link href={`/${lang}`} onClick={() => setIsOpen(false)}>{dict.home}</Link>
                        <Link href={`/${lang}/#servicos`} onClick={() => setIsOpen(false)}>{dict.products}</Link>
                        <Link href={`/${lang}/empresa`} onClick={() => setIsOpen(false)}>{dict.company}</Link>
                        <Link href={`/${lang}/blog`} onClick={() => setIsOpen(false)}>{dict.blog}</Link>
                        <Link href={`/${lang}/contato`} onClick={() => setIsOpen(false)}>{dict.contact}</Link>
                    </div>
                )}
            </div>

        </nav>
    );
}