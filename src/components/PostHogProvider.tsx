"use client";
import { useEffect } from "react";
import { getConsent } from "@/lib/cookieConsent";
import { initPostHog, optInPostHog, optOutPostHog } from "@/lib/posthog";

/** Inicializa o PostHog e aplica o consentimento de cookies já registado (se houver). */
export default function PostHogProvider() {
    useEffect(() => {
        initPostHog();
        const consent = getConsent();
        if (consent === "accepted") optInPostHog();
        else if (consent === "rejected") optOutPostHog();
    }, []);

    return null;
}
