"use client";

export type ConsentStatus = "accepted" | "rejected" | null;

const COOKIE_KEY = "incocil_cookie_consent";
const COOKIE_VERSION = "1"; // Incremente se mudar as categorias de cookies

export function getConsent(): ConsentStatus {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(COOKIE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        // Invalida versão antiga
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

/** Ativa o GA4 dinamicamente após consentimento */
export function enableAnalytics(gtagId: string) {
    if (typeof window === "undefined") return;
    // Atualiza o consent mode do GA4
    if (typeof (window as any).gtag === "function") {
        (window as any).gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "granted",
        });
    }
}

/** Sinaliza ao GA4 que o usuário negou cookies */
export function denyAnalytics() {
    if (typeof window === "undefined") return;
    if (typeof (window as any).gtag === "function") {
        (window as any).gtag("consent", "update", {
            analytics_storage: "denied",
            ad_storage: "denied",
        });
    }
}
