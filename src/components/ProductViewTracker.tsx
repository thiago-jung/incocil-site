"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

interface ProductViewTrackerProps {
    slug: string;
    title: string;
}

/**
 * Componente invisível montado na página de produto.
 * Dispara view_item uma única vez ao carregar — permite ver no GA4
 * quais produtos são mais visitados e criar audiências de remarketing.
 */
export default function ProductViewTracker({ slug, title }: ProductViewTrackerProps) {
    useEffect(() => {
        track.productView(slug, title);
    }, [slug, title]);

    return null;
}