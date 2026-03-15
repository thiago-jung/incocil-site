"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/555184468231" // Link real da Incocil
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fale connosco pelo WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-8 right-8 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors"
        >
            {/* Efeito de Pulse ao redor */}
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25"></span>
            <MessageCircle size={30} fill="currentColor" />
        </motion.a>
    );
}