"use client";

/**
 * Analytics central — todos os eventos do site passam por aqui.
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
// Google Ads > Ferramentas > Medição > Conversões
// ─────────────────────────────────────────────
const ADS_ID = "AW-771734941";

const CONVERSIONS = {
    whatsapp: `${ADS_ID}/XXXXXXXXXX`, // "WhatsApp Click"
    formSubmit: `${ADS_ID}/odjKCLuUhoscEJ37_u8C`, // "Formulário Enviado"
    emailClick: `${ADS_ID}/XXXXXXXXXX`, // "E-mail Click"
    meetingSchedule: `${ADS_ID}/XXXXXXXXXX`, // "Agendamento Feira" ← NOVO
};

export const track = {

    /** Clique em qualquer botão de WhatsApp no site */
    whatsappClick(page: string, product?: string) {
        gtag("event", "whatsapp_click", { page, product });
        gtag("event", "conversion", {
            send_to: CONVERSIONS.whatsapp,
            event_category: "engagement",
            event_label: page,
        });
    },

    /** Formulário de orçamento enviado */
    formSubmit(productName: string, page: string = "produto") {
        gtag("event", "generate_lead", { product: productName, page });
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

    /**
     * NOVO — Agendamento de reunião (Hannover Messe ou outras feiras)
     * Crie uma conversão separada no Google Ads para este evento —
     * ela tem valor mais alto do que um clique simples de WhatsApp.
     */
    meetingSchedule(source: string) {
        gtag("event", "meeting_schedule_click", { source });
        gtag("event", "conversion", {
            send_to: CONVERSIONS.meetingSchedule,
            event_category: "lead",
            event_label: source,
        });
    },

    /**
     * NOVO — Scroll depth (25 / 50 / 75 / 100 %)
     * Configure no GA4: marque scroll como evento chave em páginas de produto.
     */
    scrollDepth(percent: 25 | 50 | 75 | 100, page: string) {
        gtag("event", "scroll_depth", { percent_scrolled: percent, page });
    },

    /**
     * NOVO — Visualização do cartão de visita impresso
     * Disparado quando alguém acessa /hannover-messe-2026/card
     */
    cardPageView() {
        gtag("event", "business_card_view", { source: "hannover-print" });
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
