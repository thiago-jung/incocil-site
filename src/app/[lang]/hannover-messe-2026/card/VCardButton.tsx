"use client";
import { track } from "@/lib/analytics";

const STAND_INFO = "Hall 17, D52";

/**
 * Gera um arquivo .vcf (vCard 3.0) e aciona o download diretamente no browser.
 * Em iOS/Android o sistema operacional oferece "Adicionar aos Contatos" automaticamente.
 */
export default function VCardButton() {
    function handleDownload() {
        // Rastreia como evento de alta intenção (visitante quer guardar contato)
        track.cardPageView();

        const vcard = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            "N:;INCOCIL® Comercial;;;",
            "FN:INCOCIL® Comercial",
            "ORG:INCOCIL - Cilindros Hidráulicos e Pneumáticos",
            `TITLE:Hannover Messe 2026 — ${STAND_INFO}`,
            "TEL;TYPE=WORK,VOICE:+55 51 3261-2205",
            "TEL;TYPE=CELL,VOICE:+55 51 98446-8231",
            "EMAIL;TYPE=WORK:incocil@incocil.com.br",
            "URL:https://www.incocil.com",
            "ADR;TYPE=WORK:;;Av. Ricardo Leônidas Ribas 310;Porto Alegre;RS;91790-005;Brazil",
            `NOTE:Met at Hannover Messe 2026 — ${STAND_INFO}`,
            "END:VCARD",
        ].join("\r\n");

        const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "INCOCIL-Hannover2026.vcf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    return (
        <button
            onClick={handleDownload}
            style={{
                color: "#16a34a",
                cursor: "pointer",
                background: "none",
                border: "none",
                font: "inherit",
            }}
        >
            📱 Save Contact
        </button>
    );
}