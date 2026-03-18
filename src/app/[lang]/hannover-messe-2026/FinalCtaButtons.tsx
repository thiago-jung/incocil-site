"use client";
import { track } from "@/lib/analytics";

interface FinalCtaButtonsProps {
    whatsappUrl: string;
}

export default function FinalCtaButtons({ whatsappUrl }: FinalCtaButtonsProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track.whatsappClick("hannover-final-cta")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-8 py-4 font-bold text-slate-900 hover:bg-green-400 transition-colors"
            >
                WhatsApp
            </a>
            <a
                href="mailto:incocil@incocil.com.br"
                onClick={() => track.emailClick("hannover-final-cta")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 px-8 py-4 font-semibold text-slate-200 hover:border-slate-400 transition-colors"
            >
                incocil@incocil.com.br
            </a>
        </div>
    );
}