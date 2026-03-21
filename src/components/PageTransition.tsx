// src/components/PageTransition.tsx
"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // ── Por que isFirstRender? ────────────────────────────────────────────────
    //
    // O PageTransition com initial={{ opacity: 0 }} é o maior culpado do LCP.
    // O servidor renderiza a página inteira com opacity:0 no wrapper.
    // O browser pinta o conteúdo, mas invisível — LCP não dispara.
    // Só após hidratar + animação (0.28s) o conteúdo fica visível.
    //
    // Solução: primeira renderização começa em opacity:1 (conteúdo visível
    // imediatamente para o Lighthouse e para o usuário). Navegações
    // subsequentes ainda ganham a animação de entrada.
    //
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Scroll sempre que muda de rota
        window.scrollTo({ top: 0, behavior: "instant" });

        // Após o primeiro mount, as navegações passam a animar
        isFirstRender.current = false;
    }, [pathname]);

    return (
        <motion.div
            key={pathname}
            initial={
                isFirstRender.current
                    ? { opacity: 1, y: 0 }   // 1ª render: visível de imediato → LCP correto
                    : { opacity: 0, y: 8 }   // navegações: fade + slide suave
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {children}
        </motion.div>
    );
}