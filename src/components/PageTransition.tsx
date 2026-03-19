"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * PageTransition — Envolver {children} no layout.tsx
 *
 * Ao trocar de rota, o conteúdo faz fade-in com ligeiro deslocamento
 * vertical — efeito idêntico ao do Nubank e grandes apps brasileiros.
 *
 * Não usa AnimatePresence (animações de saída não funcionam no App Router)
 * A key={pathname} re-monta o motion.div a cada navegação, disparando
 * o initial → animate novamente.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
}