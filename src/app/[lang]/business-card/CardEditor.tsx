"use client";

/**
 * CardEditor — formulário ao vivo para o Business Card INCOCIL®
 *
 * Coloque em: src/app/[lang]/business-card/CardEditor.tsx
 *
 * Importa CardVisual.tsx e ExportButton.tsx do mesmo diretório.
 */

import { useState, useRef } from "react";
import { CardFront, CardBack, type Person } from "./CardVisual";
import ExportButton from "./ExportButton";

const TEAM_PRESETS: Array<{ label: string; person: Person }> = [
    {
        label: "Marcus Jung — CEO",
        person: {
            name: "Marcus Roberto Jung",
            role: "CEO",
            whatsapp: "+55 51 98446-8241",
            email: "marcus.jung@incocil.com.br",
            site: "www.incocil.com",
            address: "Av. Ricardo Leônidas Ribas, 310 — Porto Alegre, RS. Brazil",
        },
    },
    {
        label: "Novo colaborador",
        person: {
            name: "",
            role: "",
            whatsapp: "+55 ",
            email: "@incocil.com.br",
            site: "www.incocil.com",
            address: "Av. Ricardo Leônidas Ribas, 310 — Porto Alegre, RS. Brazil",
        },
    },
];

const FIELD_LABELS: { key: keyof Person; label: string; placeholder: string; hint?: string }[] = [
    { key: "name", label: "Nome completo", placeholder: "ex: João da Silva" },
    { key: "role", label: "Cargo", placeholder: "ex: Sales Engineer" },
    { key: "whatsapp", label: "WhatsApp", placeholder: "+55 51 9XXXX-XXXX" },
    { key: "email", label: "E-mail", placeholder: "nome@incocil.com.br" },
    { key: "site", label: "Site", placeholder: "www.incocil.com", hint: "Sem https://" },
    { key: "address", label: "Endereço", placeholder: "Rua, Número — Cidade, UF. Country" },
];

export default function CardEditor({ initial }: { initial: Person }) {
    const [person, setPerson] = useState<Person>(initial);
    const [flipped, setFlipped] = useState(false);
    const [copied, setCopied] = useState(false);
    const inputRefs = useRef<Partial<Record<keyof Person, HTMLInputElement | HTMLTextAreaElement | null>>>({});

    function update(key: keyof Person, value: string) {
        setPerson(prev => ({ ...prev, [key]: value }));
    }

    function applyPreset(p: Person) {
        setPerson(p);
    }

    function copyLink() {
        const qs = new URLSearchParams(person as Record<string, string>).toString();
        const url = `${window.location.origin}/en/business-card?${qs}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <>
            {/* Font import */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700;800;900&display=swap');

                .card-editor-root * { box-sizing: border-box; }

                .card-editor-root input,
                .card-editor-root textarea {
                    font-family: 'Barlow', sans-serif;
                    transition: border-color 0.15s, box-shadow 0.15s;
                }
                .card-editor-root input:focus,
                .card-editor-root textarea:focus {
                    outline: none;
                    border-color: #16a34a !important;
                    box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.15);
                }

                .editor-field-row:hover .editor-field-label {
                    color: #16a34a;
                }

                .flip-btn {
                    transition: background 0.15s, color 0.15s, border-color 0.15s;
                }
                .flip-btn:hover {
                    background: #f0fdf4 !important;
                    border-color: #16a34a !important;
                    color: #16a34a !important;
                }

                .preset-chip {
                    transition: all 0.15s;
                }
                .preset-chip:hover {
                    background: #f0fdf4 !important;
                    border-color: #16a34a !important;
                    color: #15803d !important;
                }

                .copy-link-btn {
                    transition: all 0.15s;
                }
                .copy-link-btn:hover {
                    background: #f8fafc !important;
                    border-color: #94a3b8 !important;
                }

                @media (max-width: 900px) {
                    .editor-layout { flex-direction: column !important; }
                    .editor-panel { max-height: none !important; }
                    .preview-panel { position: static !important; }
                }

                @media print {
                    .card-editor-root { display: none; }
                }
            `}</style>

            <div className="card-editor-root" style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "980px",
                gap: "0",
            }}>

                {/* ── Header ─────────────────────────────────────── */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                    gap: "10px",
                }}>
                    <div>
                        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "3px" }}>
                            INCOCIL® · Business Card Generator
                        </p>
                        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1 }}>
                            Criar Cartão
                        </h1>
                    </div>

                    {/* Presets */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginRight: "2px" }}>
                            Presets:
                        </span>
                        {TEAM_PRESETS.map((preset) => (
                            <button
                                key={preset.label}
                                className="preset-chip"
                                onClick={() => applyPreset(preset.person)}
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "0.06em",
                                    padding: "5px 12px",
                                    background: "white",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "20px",
                                    color: "#374151",
                                    cursor: "pointer",
                                }}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Layout principal ───────────────────────────── */}
                <div className="editor-layout" style={{ display: "flex", gap: "28px", alignItems: "flex-start" }}>

                    {/* ── Formulário ────────────────────────────── */}
                    <div className="editor-panel" style={{
                        flex: "0 0 320px",
                        background: "white",
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
                    }}>
                        {/* Panel header */}
                        <div style={{
                            padding: "14px 20px",
                            borderBottom: "1px solid #f1f5f9",
                            background: "#fafafa",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                        }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#16a34a" }} />
                            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#64748b" }}>
                                Dados do colaborador
                            </span>
                        </div>

                        {/* Fields */}
                        <div style={{ padding: "8px 0" }}>
                            {FIELD_LABELS.map(({ key, label, placeholder, hint }) => (
                                <div
                                    key={key}
                                    className="editor-field-row"
                                    style={{
                                        padding: "10px 20px",
                                        borderBottom: "1px solid #f8fafc",
                                    }}
                                >
                                    <label style={{
                                        display: "block",
                                        fontFamily: "'Barlow Condensed', sans-serif",
                                        fontSize: "9px",
                                        fontWeight: 700,
                                        letterSpacing: "0.25em",
                                        textTransform: "uppercase",
                                        color: "#94a3b8",
                                        marginBottom: "5px",
                                        transition: "color 0.15s",
                                    }} className="editor-field-label">
                                        {label}
                                        {hint && <span style={{ fontWeight: 400, marginLeft: "6px", opacity: 0.7 }}>· {hint}</span>}
                                    </label>
                                    {key === "address" ? (
                                        <textarea
                                            ref={el => { inputRefs.current[key] = el; }}
                                            value={person[key]}
                                            onChange={e => update(key, e.target.value)}
                                            placeholder={placeholder}
                                            rows={2}
                                            style={{
                                                width: "100%",
                                                fontSize: "13px",
                                                color: "#1e293b",
                                                background: "#f8fafc",
                                                border: "1px solid #e2e8f0",
                                                borderRadius: "6px",
                                                padding: "7px 10px",
                                                resize: "vertical",
                                                lineHeight: 1.4,
                                            }}
                                        />
                                    ) : (
                                        <input
                                            ref={el => { inputRefs.current[key] = el; }}
                                            type="text"
                                            value={person[key]}
                                            onChange={e => update(key, e.target.value)}
                                            placeholder={placeholder}
                                            style={{
                                                width: "100%",
                                                fontSize: "13px",
                                                color: "#1e293b",
                                                background: "#f8fafc",
                                                border: "1px solid #e2e8f0",
                                                borderRadius: "6px",
                                                padding: "7px 10px",
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Copy link */}
                        <div style={{ padding: "14px 20px", borderTop: "1px solid #f1f5f9" }}>
                            <button
                                className="copy-link-btn"
                                onClick={copyLink}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    background: "white",
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "6px",
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "11px",
                                    fontWeight: 700,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    color: copied ? "#16a34a" : "#64748b",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "6px",
                                    transition: "all 0.15s",
                                }}
                            >
                                {copied ? (
                                    <><CheckIcon /> Link copiado!</>
                                ) : (
                                    <><LinkIcon /> Copiar link do cartão</>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ── Preview ───────────────────────────────── */}
                    <div className="preview-panel" style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "20px",
                        position: "sticky",
                        top: "24px",
                    }}>

                        {/* Toggle frente/verso */}
                        <div style={{ display: "flex", gap: "6px" }}>
                            <button
                                className="flip-btn"
                                onClick={() => setFlipped(false)}
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "11px", fontWeight: 700,
                                    letterSpacing: "0.15em", textTransform: "uppercase",
                                    padding: "6px 16px",
                                    background: !flipped ? "#0f172a" : "white",
                                    color: !flipped ? "white" : "#64748b",
                                    border: "1px solid",
                                    borderColor: !flipped ? "#0f172a" : "#e2e8f0",
                                    borderRadius: "20px",
                                    cursor: "pointer",
                                }}
                            >
                                Frente
                            </button>
                            <button
                                className="flip-btn"
                                onClick={() => setFlipped(true)}
                                style={{
                                    fontFamily: "'Barlow Condensed', sans-serif",
                                    fontSize: "11px", fontWeight: 700,
                                    letterSpacing: "0.15em", textTransform: "uppercase",
                                    padding: "6px 16px",
                                    background: flipped ? "#0f172a" : "white",
                                    color: flipped ? "white" : "#64748b",
                                    border: "1px solid",
                                    borderColor: flipped ? "#0f172a" : "#e2e8f0",
                                    borderRadius: "20px",
                                    cursor: "pointer",
                                }}
                            >
                                Verso
                            </button>
                        </div>

                        {/* Card preview — escala 1.6× para melhor leitura na tela */}
                        <div style={{
                            padding: "32px",
                            background: "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(22,163,74,0.06) 0%, transparent 70%), #c8d0d8",
                            backgroundImage: [
                                "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(22,163,74,0.06) 0%, transparent 70%)",
                                "repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(0,0,0,0.025) 23px, rgba(0,0,0,0.025) 24px)",
                                "repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(0,0,0,0.025) 23px, rgba(0,0,0,0.025) 24px)",
                            ].join(", "),
                            backgroundColor: "#c8d0d8",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <div style={{ transform: "scale(1.6)", transformOrigin: "center center" }}>
                                {flipped
                                    ? <CardBack person={person} />
                                    : <CardFront person={person} />
                                }
                            </div>
                            {/* Spacer para compensar o scale */}
                            <div style={{ display: "none" }} aria-hidden />
                        </div>

                        {/* Dimensões */}
                        <p style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "10px", fontWeight: 700,
                            letterSpacing: "0.2em", textTransform: "uppercase",
                            color: "#94a3b8",
                        }}>
                            85 × 54 mm · escala de visualização 160%
                        </p>

                        {/* Export buttons */}
                        <ExportButton person={person} />
                    </div>

                </div>
            </div>
        </>
    );
}

/* ── Ícones ── */
function LinkIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}