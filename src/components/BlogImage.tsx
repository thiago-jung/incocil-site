"use client";
import { useState } from "react";

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

interface BlogImageProps {
    src: string;
    alt?: string;
    className?: string;
}

export function BlogImage({ src, alt, className }: BlogImageProps) {
    const hasExt = /\.(jpg|jpeg|png|webp|gif)$/i.test(src);
    const base = hasExt ? src.replace(/\.(jpg|jpeg|png|webp|gif)$/i, "") : src;
    const firstExt = hasExt ? src.match(/\.(jpg|jpeg|png|webp|gif)$/i)![0] : "";
    const srcs = hasExt
        ? [src, ...EXTENSIONS.filter(e => e.toLowerCase() !== firstExt.toLowerCase()).map(e => base + e)]
        : EXTENSIONS.map(e => base + e);

    const [idx, setIdx] = useState(0);

    return (
        <img
            src={srcs[idx]}
            alt={alt || ""}
            className={className}
            onError={() => {
                if (idx < srcs.length - 1) setIdx(i => i + 1);
            }}
        />
    );
}