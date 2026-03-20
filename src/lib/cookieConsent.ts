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
 *
 * IMPORTANTE: gtag() deve usar o objeto `arguments` nativo — não rest params (...args).
 * O script gtag/js do Google processa o dataLayer esperando IArguments.
 * Um array normal ([...args]) faz o GA4 ignorar silenciosamente todos os comandos.
 */
export function enableAnalytics() {
    if (typeof window === "undefined") return;

    // Agora só faz o update — o script já está na página
    (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
    });
}

export function denyAnalytics() {
    if (typeof window === "undefined") return;
    if (typeof (window as any).gtag !== "function") return;

    (window as any).gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
    });
}
