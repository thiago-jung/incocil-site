"use client";

/**
 * Analytics central — todos os eventos do site passam por aqui.
 * Facilita rastrear + configurar conversões no Google Ads depois.
 *
 * Como usar:
 *   import { track } from "@/lib/analytics";
 *   track.whatsappClick("hannover-messe-2026");
 */

declare const window: Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
};

function gtag(...args: unknown[]) {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag(...args);
    }
}

// ─────────────────────────────────────────────
// IDs de conversão do Google Ads
// Preencha após criar as conversões no painel:
// Google Ads > Ferramentas > Medição > Conversões
// ─────────────────────────────────────────────
const ADS_ID = "AW-XXXXXXXXX"; // ← substitua pelo seu ID de conta

const CONVERSIONS = {
    whatsapp: `${ADS_ID}/XXXXXXXXXX`,     // Conversão: "WhatsApp Click"
    formSubmit: `${ADS_ID}/XXXXXXXXXX`,   // Conversão: "Formulário Enviado"
    emailClick: `${ADS_ID}/XXXXXXXXXX`,   // Conversão: "E-mail Click"
};

// ─────────────────────────────────────────────
// Eventos tipados
// ─────────────────────────────────────────────
export const track = {

    /** Clique em qualquer botão do WhatsApp no site */
    whatsappClick(page: string, product?: string) {
        gtag("event", "whatsapp_click", { page, product });
        // Dispara conversão do Google Ads
        gtag("event", "conversion", {
            send_to: CONVERSIONS.whatsapp,
            event_category: "engagement",
            event_label: page,
        });
    },

    /** Formulário de orçamento enviado (antes de abrir o WhatsApp) */
    formSubmit(productName: string, page: string = "produto") {
        gtag("event", "generate_lead", {
            product: productName,
            page,
        });
        gtag("event", "conversion", {
            send_to: CONVERSIONS.formSubmit,
            event_category: "lead",
            event_label: productName,
        });
    },

    /** Clique em e-mail */
    emailClick(page: string) {
        gtag("event", "email_click", { page });
        gtag("event", "conversion", {
            send_to: CONVERSIONS.emailClick,
            event_category: "engagement",
            event_label: page,
        });
    },

    /** Reprodução de vídeo no blog */
    videoPlay(videoId: string, title: string) {
        gtag("event", "video_start", {
            video_title: title,
            video_url: `https://youtube.com/watch?v=${videoId}`,
        });
    },

    /** Visualização de página de produto */
    productView(slug: string, title: string) {
        gtag("event", "view_item", {
            items: [{ item_id: slug, item_name: title, item_category: "cilindros" }],
        });
    },

    /** Troca de idioma */
    languageSwitch(from: string, to: string) {
        gtag("event", "language_switch", { from, to });
    },
};