"use client";

export type ConsentStatus = "accepted" | "rejected" | null;

const COOKIE_KEY = "incocil_cookie_consent";
const COOKIE_VERSION = "1";
const GA_ID = "G-EEQ1CRS307";

export function getConsent(): ConsentStatus {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(COOKIE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed.version !== COOKIE_VERSION) return null;
        return parsed.status as ConsentStatus;
    } catch {
        return null;
    }
}

export function setConsent(status: "accepted" | "rejected") {
    if (typeof window === "undefined") return;
    localStorage.setItem(
        COOKIE_KEY,
        JSON.stringify({ status, version: COOKIE_VERSION, date: new Date().toISOString() })
    );
}

export function revokeConsent() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(COOKIE_KEY);
}

/**
 * Injeta o script do GA4 no DOM apenas quando chamado.
 * Antes disso: zero requests para googletagmanager.com ou google-analytics.com.
 * Usa um flag para garantir que o script só é injetado uma vez.
 */
export function enableAnalytics() {
    if (typeof window === "undefined") return;

    // Evita injectar duas vezes (ex: visita recorrente que já aceitou)
    if ((window as any).__ga_loaded) return;
    (window as any).__ga_loaded = true;

    // 1. Inicializa o dataLayer e a função gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });

    // 2. Injeta o <script src="...gtag/js?id=..."> dinamicamente
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    document.head.appendChild(script);
}

/** Remove o GA4 da sessão actual (não apaga o script já carregado, mas
 *  pode ser usado para sinalizar ao gtag que não deve rastrear) */
export function denyAnalytics() {
    if (typeof window === "undefined") return;
    // Se o GA4 ainda não foi carregado, não há nada a fazer
    if (!(window as any).__ga_loaded) return;
    if (typeof (window as any).gtag === "function") {
        (window as any).gtag("consent", "update", {
            analytics_storage: "denied",
            ad_storage: "denied",
        });
    }
}
