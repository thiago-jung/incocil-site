
"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * PageTransition — sem framer-motion
 *
 * O motion.div com initial={{ opacity:0 }} forçava o SSR a gerar
 * todo o conteúdo com estilo inline opacity:0. O Lighthouse não
 * media FCP/LCP até a animação terminar (~600ms perdidos).
 *
 * Agora: servidor gera <div> sem estilos → conteúdo visível desde
 * o primeiro byte. A animação só roda no cliente em navegações
 * subsequentes, usando a Web Animations API nativa (sem dependências).
 */

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const ref = useRef<HTMLDivElement>(null);
    const isFirst = useRef(true);

    useEffect(() => {
        // Não reseta o scroll se a URL tiver um hash (ex: /#servicos)
        const hasHash = typeof window !== "undefined" && !!window.location.hash;
        if (!hasHash) {
            window.scrollTo({ top: 0, behavior: "instant" });
        }

        if (isFirst.current) {
            isFirst.current = false;
            return;
        }

        ref.current?.animate(
            [
                { opacity: 0, transform: "translateY(8px)" },
                { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 220, easing: "cubic-bezier(0.25,0.46,0.45,0.94)", fill: "forwards" }
        );
    }, [pathname]);

    return <div ref={ref}>{children}</div>;
}