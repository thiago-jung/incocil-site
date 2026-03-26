"use client";

/**
 * Botão de exportação do Business Card
 *
 * Coloque este arquivo em:
 *   app/en/business-card/ExportButton.tsx
 *
 * E importe no page.tsx:
 *   import ExportButton from "./ExportButton";
 *   ...
 *   <ExportButton person={person} />
 */

import { useState } from "react";

type Person = {
    name: string;
    role: string;
    email: string;
    whatsapp: string;
    site: string;
    address: string;
};

type Status = "idle" | "loading-front" | "loading-back" | "loading-both" | "error";

export default function ExportButton({ person }: { person: Person }) {
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    function buildExportUrl(side: "front" | "back" | "both") {
        const qs = new URLSearchParams({
            side,
            name: person.name,
            role: person.role,
            email: person.email,
            whatsapp: person.whatsapp,
            site: person.site,
            address: person.address,
        });
        return `/api/business-card/export?${qs}`;
    }

    async function download(side: "front" | "back" | "both") {
        setStatus(`loading-${side}` as Status);
        setErrorMsg("");
        try {
            const res = await fetch(buildExportUrl(side));
            if (!res.ok) {
                const json = await res.json().catch(() => ({}));
                throw new Error(json.error ?? `HTTP ${res.status}`);
            }

            // Determina nome do arquivo pelo header Content-Disposition
            const disposition = res.headers.get("Content-Disposition") ?? "";
            const filenameMatch = disposition.match(/filename="([^"]+)"/);
            const filename = filenameMatch?.[1] ?? `business-card-${side}.${side === "both" ? "zip" : "pdf"}`;

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            setErrorMsg(err instanceof Error ? err.message : "Erro desconhecido");
        } finally {
            setStatus("idle");
        }
    }

    const isLoading = status !== "idle" && status !== "error";

    return (
        <div className="export-btn-wrapper no-print" style={wrapperStyle}>

            {/* Botão principal — baixa os dois PDFs em ZIP */}
            <button
                onClick={() => download("both")}
                disabled={isLoading}
                style={primaryBtnStyle(status === "loading-both")}
                title="Baixar frente + verso em .zip"
            >
                {status === "loading-both" ? (
                    <><Spinner /> Gerando PDFs…</>
                ) : (
                    <><DownloadIcon /> Exportar cartão (ZIP)</>
                )}
            </button>

            {/* Botões individuais */}
            <div style={{ display: "flex", gap: "6px" }}>
                <button
                    onClick={() => download("front")}
                    disabled={isLoading}
                    style={secondaryBtnStyle(status === "loading-front")}
                    title="Baixar apenas a frente"
                >
                    {status === "loading-front" ? <><Spinner /> Frente…</> : "↓ Frente"}
                </button>

                <button
                    onClick={() => download("back")}
                    disabled={isLoading}
                    style={secondaryBtnStyle(status === "loading-back")}
                    title="Baixar apenas o verso"
                >
                    {status === "loading-back" ? <><Spinner /> Verso…</> : "↓ Verso"}
                </button>
            </div>

            {/* Feedback de erro */}
            {errorMsg && (
                <p style={{ fontSize: "11px", color: "#ef4444", marginTop: "4px", maxWidth: "280px" }}>
                    ⚠ {errorMsg}
                </p>
            )}
        </div>
    );
}

/* ── Ícones inline ── */
function DownloadIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );
}

function Spinner() {
    return (
        <svg
            width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            style={{ animation: "spin 0.75s linear infinite" }}
        >
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}

/* ── Estilos inline (sem dependência de Tailwind) ── */
const wrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    marginTop: "4px",
};

function primaryBtnStyle(active: boolean): React.CSSProperties {
    return {
        display: "flex",
        alignItems: "center",
        gap: "7px",
        padding: "9px 20px",
        background: active ? "#15803d" : "#16a34a",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        cursor: active ? "not-allowed" : "pointer",
        opacity: active ? 0.85 : 1,
        transition: "background 0.15s, opacity 0.15s",
        boxShadow: "0 2px 8px rgba(22,163,74,0.3)",
        minWidth: "200px",
        justifyContent: "center",
    };
}

function secondaryBtnStyle(active: boolean): React.CSSProperties {
    return {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "6px 14px",
        background: "transparent",
        color: active ? "#15803d" : "#374151",
        border: "1px solid",
        borderColor: active ? "#15803d" : "#d1d5db",
        borderRadius: "5px",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: active ? "not-allowed" : "pointer",
        opacity: active ? 0.75 : 1,
        transition: "all 0.15s",
    };
}