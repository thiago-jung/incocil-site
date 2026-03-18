"use client";
import { track } from "@/lib/analytics";

interface StickyCtaProps {
    standInfo?: string;
}

// Número correto: WhatsApp móvel
const WHATSAPP = "555184468231";

export default function StickyCta({ standInfo = "Hall 17, D52" }: StickyCtaProps) {
    const msg = `Hello! I met INCOCIL at Hannover Messe 2026 (${standInfo}) and would like more information.`;
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

    return (
        /*
         * Visível apenas em mobile (md:hidden).
         * pb-safe garante espaço acima da barra de navegação do iOS/Android.
         * z-[200] fica acima do WhatsApp button flutuante (z-[100]).
         */
        <div className="fixed bottom-0 left-0 right-0 z-[200] md:hidden bg-neutral-950/95 backdrop-blur-md border-t border-neutral-700 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <div className="flex gap-3">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track.whatsappClick("hannover-sticky-cta")}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-3 rounded-full text-sm transition-colors"
                >
                    💬 WhatsApp
                </a>
                <a
                    href="mailto:incocil@incocil.com.br"
                    onClick={() => track.emailClick("hannover-sticky-cta")}
                    className="flex-1 flex items-center justify-center gap-2 border border-neutral-600 text-neutral-200 font-semibold py-3 rounded-full text-sm hover:border-neutral-400 transition-colors"
                >
                    ✉️ E-mail
                </a>
            </div>
        </div>
    );
}