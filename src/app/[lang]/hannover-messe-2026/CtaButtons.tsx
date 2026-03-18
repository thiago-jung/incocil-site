"use client";
import { track } from "@/lib/analytics";

interface CtaButtonsProps {
    standInfo?: string;
}

export default function CtaButtons({ standInfo = "Hannover Messe 2026" }: CtaButtonsProps) {
    const msg = `Hello! I met INCOCIL at Hannover Messe 2026 (${standInfo}) and would like more information.`;
    // Número do WhatsApp móvel — mesmo usado no restante do site
    const whatsappUrl = `https://wa.me/555184468231?text=${encodeURIComponent(msg)}`;

    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track.whatsappClick("hannover-messe-2026")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-8 py-4 text-base font-bold text-white hover:bg-green-400 transition-colors"
            >
                💬 Contact via WhatsApp
            </a>
            <a
                href="mailto:incocil@incocil.com.br"
                onClick={() => track.emailClick("hannover-messe-2026")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-600 px-8 py-4 text-base font-semibold text-neutral-200 hover:border-neutral-400 hover:text-white transition-colors"
            >
                ✉️ Send an Email
            </a>
        </div>
    );
}