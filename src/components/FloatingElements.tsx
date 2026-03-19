"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false });
const FeiraPopup = dynamic(() => import("./FeiraPopup"), { ssr: false });
const CookieBanner = dynamic(() => import("./CookieBanner"), { ssr: false });
const BackToTop = dynamic(() => import("./BackToTop"), { ssr: false });

export default function FloatingElements({ lang }: { lang: string }) {
    const pathname = usePathname();

    // Na página da Hannover, o StickyCta já cobre o WhatsApp no mobile.
    // Escondemos o botão flutuante no mobile para evitar sobreposição.
    const isHannover = pathname?.includes("hannover-messe");

    return (
        <>
            <CookieBanner lang={lang} />
            <FeiraPopup lang={lang} />

            {/*
             * Hannover mobile: hidden md:block (StickyCta toma o lugar)
             * Resto do site: sempre visível
             */}
            <div className={isHannover ? "hidden md:block" : "block"}>
                <WhatsAppButton />
            </div>
            <BackToTop />
        </>
    );
}