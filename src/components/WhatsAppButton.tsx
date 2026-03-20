"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";

const BASE_NUMBER = "555184468231";

const DEFAULT_MSG: Record<string, string> = {
    pt: "Olá! Gostaria de mais informações sobre os cilindros hidráulicos da INCOCIL.",
    en: "Hello! I'd like more information about INCOCIL hydraulic cylinders.",
    es: "¡Hola! Me gustaría más información sobre los cilindros hidráulicos de INCOCIL.",
};

const PRODUCT_MSG: Record<string, (name: string) => string> = {
    pt: (name) => `Olá! Tenho interesse no ${name} da INCOCIL. Podem me passar mais informações e um orçamento?`,
    en: (name) => `Hello! I'm interested in the ${name} from INCOCIL. Could you share more information and a quote?`,
    es: (name) => `¡Hola! Estoy interesado en el ${name} de INCOCIL. ¿Pueden enviarme más información y un presupuesto?`,
};

function detectLang(pathname: string | null): "pt" | "en" | "es" {
    if (!pathname) return "pt";
    const seg = pathname.split("/")[1];
    if (seg === "en") return "en";
    if (seg === "es") return "es";
    return "pt";
}

export default function WhatsAppButton() {
    const [productContext, setProductContext] = useState<string>("");
    const pathname = usePathname();
    const lang = detectLang(pathname);

    useEffect(() => {
        const handler = (e: Event) => {
            const { productName } = (e as CustomEvent<{ productName: string }>).detail;
            setProductContext(productName || "");
        };
        window.addEventListener("whatsapp:context", handler);
        return () => window.removeEventListener("whatsapp:context", handler);
    }, []);

    const message = productContext
        ? PRODUCT_MSG[lang](productContext)
        : DEFAULT_MSG[lang];

    const url = `https://wa.me/${BASE_NUMBER}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
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