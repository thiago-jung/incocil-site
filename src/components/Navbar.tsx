"use client";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link"; // Já estava aqui, agora vamos usar

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
                <Link href="/" className="flex items-center gap-2">
                    <img
                        src={isScrolled ? "/images/incocil.png" : "/images/incocil.png"}
                        alt="Incocil Logo"
                        className="h-10 w-auto"
                    />
                </Link>

                {/* Desktop Menu - Substituímos <a> por <Link> */}
                <div className={`hidden md:flex gap-8 font-medium ${isScrolled ? "text-slate-600" : "text-slate-200"}`}>
                    <Link href="/" className="hover:text-blue-500 transition-colors">Início</Link>

                    {/* Se você quiser que "Produtos" role para a seção na mesma página: */}
                    <a href="#servicos" className="hover:text-blue-500 transition-colors">Produtos</a>

                    <Link href="/empresa" className="hover:text-blue-500 transition-colors">A Empresa</Link>
                    <Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link>
                    <Link href="/contato" className="hover:text-blue-500 transition-colors">Contato</Link>
                </div>

                {/* CTA Button - Envolvendo o botão com um link para a página de contato */}
                <div className="hidden md:block">
                    <Link href="/contato">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all active:scale-95">
                            <Phone size={18} /> Orçamento
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden text-blue-600 cursor-pointer">
                    <Menu />
                </div>

                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-blue-600">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* E o menu mobile em si (que aparece quando isOpen é true) */}
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-xl py-6 flex flex-col items-center gap-6 md:hidden">
                        <Link href="/" onClick={() => setIsOpen(false)}>Início</Link>
                        <Link href="/empresa" onClick={() => setIsOpen(false)}>A Empresa</Link>
                        <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link href="/contato" onClick={() => setIsOpen(false)}>Contato</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}