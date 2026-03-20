"use client";

declare const window: Window & {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
};

function gtag(...args: unknown[]) {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag(...args);
    }
}

const ADS_ID = "AW-771734941";

const CONVERSIONS = {
    whatsappCalculadora: `${ADS_ID}/o-U0COHs-oscEJ37_u8C`,
    whatsappProduto: `${ADS_ID}/2BHVCOTs-oscEJ37_u8C`,
    formSubmit: `${ADS_ID}/odjKCLuUhoscEJ37_u8C`,
    // Hannover e email — crie no Ads quando quiser, por ora não disparam conversão
    meetingSchedule: null,
    emailClick: null,
};

export const track = {

    /** Clique em qualquer botão de WhatsApp no site */
    whatsappClick(page: string, product?: string) {
        gtag("event", "whatsapp_click", { page, product });

        // Escolhe a conversão certa pela origem
        const conversionId =
            page === "calculadora"
                ? CONVERSIONS.whatsappCalculadora
                : CONVERSIONS.whatsappProduto; // produto, contato, floating-button, etc.

        if (conversionId) {
            gtag("event", "conversion", {
                send_to: conversionId,
                event_category: "lead",
                event_label: page,
            });
        }
    },

    /** Formulário de orçamento enviado (ProductForm) */
    formSubmit(productName: string, page: string = "produto") {
        gtag("event", "generate_lead", { product: productName, page });
        gtag("event", "conversion", {
            send_to: CONVERSIONS.formSubmit,
            event_category: "lead",
            event_label: productName,
        });
    },

    /** Clique em e-mail — sem conversão do Ads por enquanto */
    emailClick(page: string) {
        gtag("event", "email_click", { page });
    },

    /** Agendamento Hannover — sem conversão do Ads por enquanto */
    meetingSchedule(source: string) {
        gtag("event", "meeting_schedule_click", { source });
    },

    /** Scroll depth */
    scrollDepth(percent: 25 | 50 | 75 | 100, page: string) {
        gtag("event", "scroll_depth", { percent_scrolled: percent, page });
    },

    /** Visualização do cartão impresso */
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