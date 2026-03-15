"use client";
import dynamic from "next/dynamic";

// Como este arquivo tem "use client", o Next.js permite o ssr: false aqui!
const WhatsAppButton = dynamic(() => import("./WhatsAppButton"), { ssr: false });
const FeiraPopup = dynamic(() => import("./FeiraPopup"), { ssr: false });

export default function FloatingElements({ lang }: { lang: string }) {
    return (
        <>
            <FeiraPopup lang={lang} />
            <WhatsAppButton />
        </>
    );
}