"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";

export default function WhatsAppButton() {
    return (
        <motion.a
            href="https://wa.me/555184468231"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fale connosco pelo WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => track.whatsappClick("floating-button")}
            className="fixed bottom-8 right-8 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-green-600 transition-colors"
        >
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
            <MessageCircle size={30} fill="currentColor" />
        </motion.a>
    );
}