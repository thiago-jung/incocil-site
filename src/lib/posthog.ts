"use client";
import posthog from "posthog-js";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let initialized = false;

/** Inicializa o PostHog em modo "opt-out" — só começa a capturar após optInPostHog(). */
export function initPostHog() {
    if (initialized || typeof window === "undefined" || !POSTHOG_KEY) return;

    posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: "identified_only",
        opt_out_capturing_by_default: true,
        capture_pageview: true,
        capture_pageleave: true,
        session_recording: {
            maskAllInputs: true,
        },
    });
    initialized = true;
}

export function optInPostHog() {
    if (typeof window === "undefined") return;
    if (!initialized) initPostHog();
    posthog.opt_in_capturing();
}

export function optOutPostHog() {
    if (typeof window === "undefined" || !initialized) return;
    posthog.opt_out_capturing();
}

/** Vincula a sessão anônima atual a uma pessoa identificada (chamar ao capturar um lead). */
export function identifyLead(email: string, props?: Record<string, unknown>) {
    if (typeof window === "undefined" || !initialized) return;
    posthog.identify(email, props);
}

export { posthog };
