"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";

const BASE_NUMBER = "555184468231";
const DEFAULT_MSG = "Olá! Gostaria de mais informações sobre os cilindros hidráulicos da INCOCIL.";

/**
 * WhatsAppButton — botão flutuante com mensagem contextual
 *
 * Funciona em conjunto com setWhatsAppContext() chamado em ProductViewTracker.
 * Quando o usuário está numa página de produto, a mensagem pré-preenchida
 * já menciona o produto específico — o vendedor sabe de imediato o interesse.
 *
 * Escuta o evento customizado "whatsapp:context" disparado por:
 *   src/lib/whatsapp-context.ts → setWhatsAppContext(productName)
 */
export default function WhatsAppButton() {
    const [productContext, setProductContext] = useState<string>("");

    useEffect(() => {
        const handler = (e: Event) => {
            const { productName } = (e as CustomEvent<{ productName: string }>).detail;
            setProductContext(productName || "");
        };
        window.addEventListener("whatsapp:context", handler);
        return () => window.removeEventListener("whatsapp:context", handler);
    }, []);

    const message = productContext
        ? `Olá! Tenho interesse no ${productContext} da INCOCIL. Podem me passar mais informações e um orçamento?`
        : DEFAULT_MSG;

    const url = `https://wa.me/${BASE_NUMBER}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fale connosco pelo WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => track.whatsappClick("floating-button", productContext || undefined)}
            className="fixed bottom-8 right-8 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors"
        >
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
            <MessageCircle size={30} fill="currentColor" />
        </motion.a>
    );
}