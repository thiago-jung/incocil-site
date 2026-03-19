"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { setWhatsAppContext, clearWhatsAppContext } from "@/lib/whatsapp-context";

interface ProductViewTrackerProps {
    slug: string;
    title: string;
}

/**
 * ProductViewTracker — componente invisível em cada página de produto
 *
 * O que faz:
 *  1. Dispara view_item no GA4 ao carregar
 *  2. Define o contexto do WhatsApp (mensagem pré-preenchida com o produto)
 *  3. Limpa o contexto ao desmontar (ao sair da página de produto)
 */
export default function ProductViewTracker({ slug, title }: ProductViewTrackerProps) {
    useEffect(() => {
        // GA4 tracking
        track.productView(slug, title);

        // Define a mensagem contextual do botão flutuante de WhatsApp
        setWhatsAppContext(title);

        // Limpa ao sair da página
        return () => clearWhatsAppContext();
    }, [slug, title]);

    return null;
}