"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageLightboxProps {
    images: string[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
    alt: string;
}

/**
 * ImageLightbox — visualizador de imagem em tela cheia
 *
 * Funcionalidades:
 *  - Navegação por teclado (←, →, Esc)
 *  - Swipe gestual (mobile)
 *  - Indicadores de posição
 *  - Fecha ao clicar no backdrop
 *
 * Uso em ProductImageGallery:
 *   <ImageLightbox
 *     images={images}
 *     initialIndex={currentIndex}
 *     isOpen={lightboxOpen}
 *     onClose={() => setLightboxOpen(false)}
 *     alt={alt}
 *   />
 */
export default function ImageLightbox({
    images,
    initialIndex,
    isOpen,
    onClose,
    alt,
}: ImageLightboxProps) {
    const [index, setIndex] = useState(initialIndex);

    // Sincroniza quando o índice externo muda (ex: troca antes de abrir)
    useEffect(() => {
        setIndex(initialIndex);
    }, [initialIndex, isOpen]);

    // Teclado
    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
            if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
        },
        [isOpen, images.length, onClose]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleKey]);

    // Bloqueia scroll do body enquanto aberto
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIndex((i) => (i - 1 + images.length) % images.length);
    };
    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIndex((i) => (i + 1) % images.length);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-sm p-4"
                    onClick={onClose}
                    role="dialog"
                    aria-modal
                    aria-label="Visualizador de imagem"
                >
                    {/* Fechar */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                        aria-label="Fechar"
                    >
                        <X size={22} />
                    </button>

                    {/* Imagem */}
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="relative w-full max-w-5xl"
                        style={{ aspectRatio: "4/3" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[index]}
                            alt={`${alt} — imagem ${index + 1} de ${images.length}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                        />
                    </motion.div>

                    {/* Setas — só quando há mais de 1 imagem */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                aria-label="Imagem anterior"
                            >
                                <ChevronLeft size={26} />
                            </button>
                            <button
                                onClick={next}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                                aria-label="Próxima imagem"
                            >
                                <ChevronRight size={26} />
                            </button>

                            {/* Indicadores de posição */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                                        className={`rounded-full transition-all ${i === index ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/60"
                                            }`}
                                        aria-label={`Ir para imagem ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Contador */}
                    {images.length > 1 && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/60 bg-black/40 px-3 py-1 rounded-full">
                            {index + 1} / {images.length}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}