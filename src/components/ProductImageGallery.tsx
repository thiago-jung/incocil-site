"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
interface ProductImageGalleryProps {
    images: string[];
    alt: string;
}

export default function ProductImageGallery({ images, alt }: ProductImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="w-full h-[300px] md:h-[400px] relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 mb-8 group bg-white">
            {/* Imagem Atual */}
            <Image
                src={images[currentIndex]}
                alt={`${alt} - Imagem ${currentIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={currentIndex === 0}
                className="object-cover transition-all duration-500"
            />

            {/* Controles só aparecem se houver mais de 1 imagem */}
            {images.length > 1 && (
                <>
                    {/* Botão Anterior */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Botão Próximo */}
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Indicadores (Bolinhas) */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2.5 rounded-full transition-all shadow-sm ${idx === currentIndex
                                        ? "bg-blue-600 w-8"
                                        : "bg-white/80 hover:bg-white w-2.5"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}