"use client";
import { useScroll, useSpring, motion } from "framer-motion";

/**
 * ReadingProgress — linha azul fina no topo que avança conforme o scroll
 *
 * Uso: colocar no topo de páginas longas (produto, blog post).
 * Já usa useSpring para suavizar o movimento — sem trancos.
 *
 * Exemplo em page.tsx de produto:
 *   import ReadingProgress from "@/components/ReadingProgress";
 *   // dentro do return, como primeiro filho de <div className="bg-slate-50">:
 *   <ReadingProgress />
 */
export default function ReadingProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 40,
        restDelta: 0.001,
    });

    return (
        <motion.div
            style={{ scaleX, transformOrigin: "0%" }}
            className="fixed top-0 left-0 right-0 h-[3px] bg-blue-600 z-[999] origin-left"
            aria-hidden
        />
    );
}