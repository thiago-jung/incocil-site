"use client";
import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FeiraPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Verifica se a feira já passou (ex: 30 de Novembro de 2026)
        // Altere esta data para a data em que o pop-up deve parar de aparecer
        const dataFimFeira = new Date('2026-04-28T23:59:59');
        const hoje = new Date();

        // Verifica também se o usuário já fechou o popup nesta sessão
        const jaFechou = sessionStorage.getItem('popupFeiraFechado');

        if (hoje <= dataFimFeira && !jaFechou) {
            // Um pequeno delay para abrir após carregar a página
            const timer = setTimeout(() => setIsOpen(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('popupFeiraFechado', 'true');
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
                    <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-3 text-blue-600 font-bold mb-2 uppercase text-xs tracking-widest">
                        <Calendar size={16} /> Próximo Evento
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">Visite a INCOCIL® na Feira</h3>
                    <p className="text-slate-600 text-sm mb-4">
                        Estaremos presentes na Hannover Messe 2026. Venha conhecer nossas soluções tecnológicas em cilindros hidráulicos.
                    </p>
                    <div className="bg-slate-100 rounded-lg p-3 text-sm font-medium text-slate-800 text-center">
                        Estande 42 - Pavilhão Principal
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}