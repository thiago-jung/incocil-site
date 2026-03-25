"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const ref = useRef<HTMLDivElement>(null);
    const isFirst = useRef(true);

    useEffect(() => {
        const hasHash = typeof window !== "undefined" && !!window.location.hash;

        if (!hasHash) {
            window.scrollTo({ top: 0, behavior: "instant" });
        } else {
            // Componentes lazy ainda podem não estar no DOM — tenta repetidamente
            const hash = window.location.hash.slice(1);
            const tryScroll = (attempts = 0) => {
                const el = document.getElementById(hash);
                if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                } else if (attempts < 20) {
                    setTimeout(() => tryScroll(attempts + 1), 100);
                }
            };
            tryScroll();
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

    /*
     * O wrapper externo NÃO recebe a animação.
     * Somente o div interno (#page-content) é animado.
     *
     * Por que isso importa:
     * A Web Animations API (elem.animate) cria um stacking context no elemento
     * durante a animação. Um stacking context "prende" elementos
     * position:fixed que sejam filhos — fazendo a Navbar sumir ou
     * se comportar como position:absolute ao scrollar.
     *
     * Com o wrapper externo sem animação, a Navbar (fixed) continua
     * se referenciando ao viewport normalmente, em todas as páginas.
     */
    return (
        <div>
            <div ref={ref}>
                {children}
            </div>
        </div>
    );
}