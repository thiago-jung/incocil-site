"use client";

/**
 * CardVisual — renderização pura do cartão INCOCIL®
 * Coloque em: src/app/[lang]/business-card/CardVisual.tsx
 */

import Image from "next/image";

export type Person = {
    name: string;
    role: string;
    email: string;
    whatsapp: string;
    site: string;
    address: string;
};

/* ─── SVG Icons ─────────────────────────────────────────────────────── */

const IconWhatsApp = () => (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <g transform="translate(5.4, 5.4) scale(0.55)">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 11.5 19.79 19.79 0 0 1 .84 3.04 2 2 0 0 1 2.82.84h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 8.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#16a34a" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round" />
        </g>
    </svg>
);

const IconMail = () => (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="#16a34a" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M22 7 12 13 2 7" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const IconGlobe = () => (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.6" />
        <path d="M2 12h20" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" stroke="#16a34a" strokeWidth="1.6" />
    </svg>
);

const IconPin = () => (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" stroke="#16a34a" strokeWidth="1.6" />
    </svg>
);

/* ─── CardFront ─────────────────────────────────────────────────────── */

export function CardFront({ person, scale = 1 }: { person: Person; scale?: number }) {
    const s = (mm: number) => `${mm * scale}mm`;

    return (
        <div
            className="card-front"
            style={{
                width: s(85), height: s(54),
                overflow: "hidden",
                borderRadius: s(0.5),
                background: "#f7f9f7",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: `${s(5.5)} ${s(6)} ${s(5.2)} ${s(7)}`,
                position: "relative",
                flexShrink: 0,
                boxShadow: "0 1px 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.05), 0 6px 14px rgba(0,0,0,0.07), 0 18px 36px rgba(0,0,0,0.09)",
            }}
        >
            {/* Linha lateral verde — height bem maior que o card, overflow:hidden corta */}
            <div style={{
                position: "absolute", left: s(-3), top: 0,
                width: s(1.4),
                height: "100%",
                background: "linear-gradient(180deg, #4ade80 0%, #16a34a 35%, #15803d 70%, #14532d 100%)",
                zIndex: 2,
            }} />

            {/* Listras TL */}
            <svg style={{ position: "absolute", top: s(-6), left: s(-6), width: s(28), height: s(28), zIndex: 1, pointerEvents: "none" }}
                viewBox="0 0 110 110" fill="none">
                <polygon points="-2,0 0,-2 22,-2 -2,22" fill="#0f172a" opacity="0.7" />
                <polygon points="-2,24 24,-2 40,-2 -2,40" fill="#14532d" opacity="0.9" />
                <polygon points="-2,42 42,-2 58,-2 -2,58" fill="#16a34a" opacity="0.75" />
                <polygon points="-2,60 60,-2 65,-2 -2,65" fill="#0f172a" opacity="0.55" />
                <polygon points="-2,68 68,-2 80,-2 -2,80" fill="#15803d" opacity="0.45" />
                <polygon points="-2,83 83,-2 90,-2 -2,90" fill="#4ade80" opacity="0.20" />
            </svg>

            {/* Listras BR */}
            <svg style={{ position: "absolute", bottom: s(-6), right: s(-6), width: s(24), height: s(24), zIndex: 1, pointerEvents: "none" }}
                viewBox="0 0 95 95" fill="none">
                <polygon points="97,73 73,97 97,97" fill="#0f172a" opacity="0.7" />
                <polygon points="97,55 55,97 72,97 97,72" fill="#14532d" opacity="0.9" />
                <polygon points="97,37 37,97 53,97 97,53" fill="#16a34a" opacity="0.75" />
                <polygon points="97,32 32,97 37,97 97,37" fill="#0f172a" opacity="0.55" />
                <polygon points="97,18 18,97 30,97 97,30" fill="#15803d" opacity="0.45" />
                <polygon points="97,8  8,97  16,97 97,16" fill="#4ade80" opacity="0.20" />
            </svg>

            {/* Cilindro hidráulico */}
            <svg style={{ position: "absolute", left: s(8), top: "50%", transform: "translateY(-50%)", width: s(42), opacity: 0.25, zIndex: 1, pointerEvents: "none", mixBlendMode: "multiply" }}
                viewBox="-10 0 490 180">
                <defs>
                    <pattern id="h1cv" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="5" stroke="#166534" strokeWidth="1.2" />
                    </pattern>
                </defs>
                <line x1="-10" y1="95" x2="460" y2="95" stroke="#166534" strokeWidth="0.7" strokeDasharray="10,4,2,4" />
                <circle cx="38" cy="95" r="28" fill="url(#h1cv)" stroke="#166534" strokeWidth="1.6" />
                <circle cx="38" cy="95" r="14" fill="#f1f5f0" stroke="#166534" strokeWidth="1.4" />
                <path d="M80,62 Q66,62 66,95 Q66,128 80,128 L80,62 Z" fill="url(#h1cv)" stroke="#166534" strokeWidth="1.4" />
                <rect x="80" y="62" width="280" height="66" fill="url(#h1cv)" stroke="#166534" strokeWidth="1.5" />
                <path d="M360,62 Q380,62 380,95 Q380,128 360,128 L360,62 Z" fill="url(#h1cv)" stroke="#166534" strokeWidth="1.4" />
                <rect x="88" y="41" width="12" height="21" rx="1" fill="url(#h1cv)" stroke="#166534" strokeWidth="1.3" />
                <rect x="308" y="41" width="12" height="21" rx="1" fill="url(#h1cv)" stroke="#166534" strokeWidth="1.3" />
                <rect x="80" y="62" width="38" height="66" rx="1" fill="url(#h1cv)" stroke="#166534" strokeWidth="1.8" />
                <line x1="155" y1="82" x2="173" y2="82" stroke="#166534" strokeWidth="1.2" strokeDasharray="2,2" />
                <line x1="155" y1="108" x2="173" y2="108" stroke="#166534" strokeWidth="1.2" strokeDasharray="2,2" />
                <rect x="335" y="62" width="24" height="66" rx="1" fill="url(#h1cv)" stroke="#166534" strokeWidth="1.8" />
                <line x1="350" y1="88" x2="364" y2="88" stroke="#166534" strokeWidth="1.2" strokeDasharray="2,2" />
                <line x1="350" y1="100" x2="364" y2="100" stroke="#166534" strokeWidth="1.2" strokeDasharray="2,2" />
                <rect x="80" y="86" width="340" height="18" rx="1" fill="url(#h1cv)" stroke="#166534" strokeWidth="1.4" />
                <circle cx="442" cy="95" r="22" fill="url(#h1cv)" stroke="#166534" strokeWidth="1.5" />
                <circle cx="442" cy="95" r="11" fill="#f1f5f0" stroke="#166534" strokeWidth="1.3" />
            </svg>

            {/* Logo */}
            <div style={{ position: "relative", zIndex: 3 }}>
                <Image
                    src="/images/incocil_verde.svg"
                    alt="INCOCIL®"
                    width={600} height={200}
                    style={{ height: s(12), width: "auto", maxWidth: s(48), display: "block" }}
                />
            </div>

            {/* Nome + Cargo */}
            <div style={{ position: "relative", zIndex: 3 }}>
                <div style={{ width: s(7), height: "0.35mm", background: "linear-gradient(90deg, #16a34a 0%, rgba(22,163,74,0) 100%)", marginBottom: s(2) }} />
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: `${10.5 * scale}pt`, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                    {person.name}
                </p>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: `${5.8 * scale}pt`, fontWeight: 700, color: "#16a34a", letterSpacing: "0.22em", textTransform: "uppercase", marginTop: s(1.2) }}>
                    {person.role}
                </p>
            </div>
        </div>
    );
}

/* ─── CardBack ──────────────────────────────────────────────────────── */

export function CardBack({ person, scale = 1 }: { person: Person; scale?: number }) {
    const s = (mm: number) => `${mm * scale}mm`;

    return (
        <div
            className="card-back"
            style={{
                width: s(85), height: s(54),
                overflow: "hidden",
                borderRadius: s(0.5),
                background: "#ffffff",
                display: "flex",
                alignItems: "stretch",
                position: "relative",
                flexShrink: 0,
                boxShadow: "0 1px 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.05), 0 6px 14px rgba(0,0,0,0.07), 0 18px 36px rgba(0,0,0,0.09)",
            }}
        >
            {/* Listras TR */}
            <svg style={{ position: "absolute", top: s(-6), right: s(-6), width: s(24), height: s(24), zIndex: 1, pointerEvents: "none" }}
                viewBox="0 0 80 80" fill="none">
                <line x1="85" y1="10" x2="10" y2="85" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="square" opacity="0.14" />
                <line x1="85" y1="26" x2="26" y2="85" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="square" opacity="0.09" />
                <line x1="85" y1="42" x2="42" y2="85" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="square" opacity="0.05" />
            </svg>

            {/*
             * Coluna verde — mesma técnica do CSS original:
             * height muito maior que o card (150mm vs 54mm do card),
             * alinhada ao centro pelo flexbox, cortada pelo overflow:hidden do pai.
             * Sangra nas 3 bordas externas com margens negativas.
             */}
            <div style={{
                width: s(14.5),
                height: s(150),
                marginLeft: s(-3),
                marginTop: s(-3),
                marginBottom: s(-3),
                paddingLeft: s(3),
                paddingTop: s(10),
                paddingBottom: s(10),
                alignSelf: "center",
                background: "linear-gradient(160deg, #22c55e 0%, #15803d 30%, #0f4d25 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
                position: "relative",
                zIndex: 2,
                overflow: "hidden",
            }}>
                {/* Padrão diagonal */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)", pointerEvents: "none" }} />
                {/* Reflexo borda direita */}
                <div style={{ position: "absolute", right: 0, top: 0, width: "0.4mm", height: "100%", background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.10) 70%, transparent 100%)" }} />

                <div style={{ width: s(4), height: "0.3mm", background: "rgba(255,255,255,0.4)", position: "relative", zIndex: 1 }} />
                <span style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: `${4.8 * scale}pt`,
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.88)",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    position: "relative",
                    zIndex: 1,
                }}>
                    INCOCIL®
                </span>
                <div style={{ width: s(4), height: "0.3mm", background: "rgba(255,255,255,0.4)", position: "relative", zIndex: 1 }} />
            </div>

            {/* Dados de contato */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: s(2), padding: `${s(4)} ${s(4.5)} ${s(4)} ${s(3.8)}`, position: "relative", zIndex: 2 }}>

                <div style={{ display: "flex", alignItems: "center", gap: s(2.4) }}>
                    <div style={{ width: s(3.8), height: s(3.8), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconWhatsApp /></div>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: `${6.2 * scale}pt`, fontWeight: 700, color: "#0f172a", letterSpacing: "0.01em", lineHeight: 1.2 }}>{person.whatsapp}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: s(2.4) }}>
                    <div style={{ width: s(3.8), height: s(3.8), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconMail /></div>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: `${5.4 * scale}pt`, fontWeight: 400, color: "#475569", lineHeight: 1.2 }}>{person.email}</span>
                </div>

                <div style={{ width: "100%", height: "0.15mm", background: "linear-gradient(90deg, #e2e8f0 0%, rgba(226,232,240,0) 100%)", margin: `${s(0.4)} 0` }} />

                <div style={{ display: "flex", alignItems: "center", gap: s(2.4) }}>
                    <div style={{ width: s(3.8), height: s(3.8), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconGlobe /></div>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: `${7.2 * scale}pt`, fontWeight: 700, color: "#16a34a", letterSpacing: "0.04em", lineHeight: 1.2 }}>{person.site}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: s(2.4) }}>
                    <div style={{ width: s(3.8), height: s(3.8), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><IconPin /></div>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: `${4.6 * scale}pt`, fontWeight: 400, color: "#94a3b8", lineHeight: 1.35 }}>{person.address}</span>
                </div>

            </div>
        </div>
    );
}