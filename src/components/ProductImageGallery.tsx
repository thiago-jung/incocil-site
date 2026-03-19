"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";
import { BLUR_DATA_URL } from "@/lib/blur-placeholder";

interface ProductImageGalleryProps {
    images: string[];
    alt: string;
}

/**
 * ProductImageGallery — galeria com lightbox
 *
 * Alterações em relação ao original:
 *  1. Clicar na imagem abre o ImageLightbox em tela cheia
 *  2. Ícone de expand no canto superior direito (hint visual)
 *  3. placeholder="blur" em todas as imagens
 *  4. Cursor pointer com tooltip "Clique para ampliar"
 */
export default function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    if (!images || images.length === 0) return null;

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <>
            <div className="w-full h-[300px] md:h-[400px] relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 mb-8 group bg-white">

                {/* Imagem principal — clicável */}
                <button
                    className="absolute inset-0 w-full h-full cursor-zoom-in"
                    onClick={() => setLightboxOpen(true)}
                    aria-label="Ampliar imagem"
                    title="Clique para ampliar"
                >
                    <Image
                        src={images[currentIndex]}
                        alt={`${alt} — ${currentIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={currentIndex === 0}
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                    />
                </button>

                {/* Ícone expand — hint visual */}
                <button
                    onClick={() => setLightboxOpen(true)}
                    className="absolute top-3 right-3 z-10 p-2 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-lg text-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Ver em tela cheia"
                >
                    <Expand size={16} />
                </button>

                {/* Controles de navegação — só com múltiplas imagens */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                            aria-label="Imagem anterior"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                            aria-label="Próxima imagem"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Indicadores */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                    className={`h-2.5 rounded-full transition-all shadow-sm ${idx === currentIndex ? "bg-blue-600 w-8" : "bg-white/80 hover:bg-white w-2.5"
                                        }`}
                                    aria-label={`Ir para imagem ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Lightbox — renderizado fora do container para evitar clipping */}
            <ImageLightbox
                images={images}
                initialIndex={currentIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                alt={alt}
            />
        </>
    );
}