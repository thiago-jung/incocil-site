"use client";
import dynamic from "next/dynamic";

const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false });
const FeiraPopup = dynamic(() => import("./FeiraPopup"), { ssr: false });
const CookieBanner = dynamic(() => import("./CookieBanner"), { ssr: false });

export default function FloatingElements({ lang }: { lang: string }) {
    return (
        <>
            <CookieBanner lang={lang} />
            <FeiraPopup lang={lang} />
            <WhatsAppButton />
        </>
    );
}
