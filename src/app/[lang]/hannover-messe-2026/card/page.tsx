/**
 * INCOCIL® Trade Fair Business Card — Print Page
 *
 * Route: /en/hannover-messe-2026/card
 *
 * Print instructions:
 *   - Open in browser → File → Print
 *   - Paper size: A4 | Orientation: Portrait
 *   - Scale: 100% (do NOT fit to page)
 *   - Margins: None
 *   - Background graphics: ENABLED
 *
 * The card will print at exactly 85mm × 54mm (standard business card size).
 */

import type { Metadata } from "next";
import Image from "next/image";
import PrintButton from "./PrintButton";
import VCardButton from "./VCardButton";
import { MessageCircle } from "lucide-react";
import QRCode from "qrcode";

export const metadata: Metadata = {
    title: "INCOCIL® | Business Card — Hannover Messe 2026",
    robots: { index: false },
};

const STAND_INFO = "Hall 17, D52";

export default async function BusinessCard() {
    const QR_TARGET_URL = "https://www.incocil.com/en/hannover-messe-2026?ref=card";

    const qrDataUrl = await QRCode.toDataURL(QR_TARGET_URL, {
        width: 200,
        margin: 1,
        color: {
            dark: "#0F172A",
            light: "#FACC15",
        },
    });

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&family=Inter:wght@400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #e5e7eb;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          gap: 32px;
          padding: 40px 20px;
          font-family: 'Montserrat', sans-serif;
        }

        .label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #6b7280;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        /* Card base — 85mm × 54mm */
        .card {
          width: 85mm;
          height: 54mm;
          border-radius: 3mm;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25);
          flex-shrink: 0;
        }

        /* ── FRONT ── */
        .card-front {
          background: #0F172A;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 5mm 6mm;
        }

        .card-front::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 28mm; height: 28mm;
          background: #16a34a;
          clip-path: polygon(100% 0, 0 0, 100% 100%);
          opacity: 0.5;
        }
        .card-front::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 14mm; height: 14mm;
          background: #FACC15;
          clip-path: polygon(100% 0, 0 0, 100% 100%);
        }

        .front-logo { position: relative; z-index: 1; }

        .front-bottom {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .front-tagline {
          color: white;
          font-size: 8.5pt;
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .front-tagline span { color: #FACC15; }

        .front-event {
          font-size: 5.5pt;
          color: #94a3b8;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'Inter', sans-serif;
          margin-top: 1.5mm;
        }

        .front-stand {
          background: #16a34a;
          color: white;
          font-family: 'Montserrat', sans-serif;
          font-size: 6pt;
          font-weight: 700;
          padding: 1mm 2.5mm;
          border-radius: 1mm;
          letter-spacing: 0.05em;
          white-space: nowrap;
          align-self: flex-end;
        }

        /* ── BACK ── */
        .card-back {
          background: #0F172A;
          display: flex;
          align-items: stretch;
        }

        .back-accent {
          width: 20mm;
          background: #16a34a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .back-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 5mm 5mm 5mm 4mm;
        }

        .back-qr-row {
          display: flex;
          align-items: center;
          gap: 3mm;
        }

        .qr-wrapper {
          background: #FACC15;
          border-radius: 2mm;
          padding: 1.5mm;
          width: 20mm;
          height: 20mm;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qr-label {
          font-size: 5pt;
          color: #94a3b8;
          font-family: 'Inter', sans-serif;
          line-height: 1.5;
        }
        .qr-label strong {
          display: block;
          color: #e2e8f0;
          font-size: 6pt;
          margin-bottom: 1mm;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
        }

        .back-contacts {
          display: flex;
          flex-direction: column;
          gap: 1.5mm;
        }

        .contact-line {
          font-size: 5.5pt;
          color: #94a3b8;
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
          gap: 1.5mm;
        }
        .contact-line strong { color: #e2e8f0; }

        .back-url {
          font-size: 6.5pt;
          color: #FACC15;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        /* ─── Print ─── */
        @media print {
          body {
            background: white;
            padding: 0;
            justify-content: flex-start;
            padding-top: 10mm;
          }
          .label { display: none; }
          .no-print { display: none; }
          .card {
            box-shadow: none;
            page-break-inside: avoid;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .cards-wrapper { gap: 20mm; }
        }
      `}</style>

            {/* Screen helper */}
            <p className="label no-print">
                Hannover Messe 2026 — Business Card Preview (85 × 54 mm) &nbsp;|&nbsp;
                <a href="/en/hannover-messe-2026" style={{ color: "#16a34a" }}>← Back to fair page</a>
                &nbsp;|&nbsp;
                <PrintButton />
                &nbsp;|&nbsp;
                {/* ✅ NOVO: visitante pode salvar o contato diretamente no celular */}
                <VCardButton />
            </p>

            <div
                className="cards-wrapper"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
            >
                {/* ── FRONT ── */}
                <p className="label">Front</p>
                <div className="card card-front">
                    <div className="front-logo" style={{ alignSelf: "flex-start" }}>
                        <Image
                            src="/images/incocil_en.svg"
                            alt="INCOCIL®"
                            width={600}
                            height={180}
                            style={{
                                filter: "brightness(0) invert(1)",
                                height: "10mm",        // ← altura fixa, igual à incocil.png
                                width: "auto",         // ← largura se ajusta proporcionalmente
                                maxWidth: "45mm",
                                display: "block",
                            }}
                        />
                    </div>

                    {/* ── Hydraulic Cylinder Blueprint Watermark ── */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 370 205"
                        style={{
                            position: "absolute",
                            right: "5mm",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "52mm",
                            height: "32mm",
                            zIndex: 1,
                            pointerEvents: "none",
                            opacity: 0.55,
                        }}
                    >
                        <defs>
                            <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(74,222,128,0.22)" strokeWidth="1" />
                            </pattern>
                            <pattern id="hatch2" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                                <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(74,222,128,0.18)" strokeWidth="0.8" />
                            </pattern>
                        </defs>

                        {/* center axis dash-dot */}
                        <line x1="0" y1="102" x2="370" y2="102" stroke="rgba(74,222,128,0.28)" strokeWidth="0.6" strokeDasharray="8,3,1,3" />

                        {/* outer tube */}
                        <rect x="48" y="70" width="228" height="65" fill="url(#hatch)" rx="2" />
                        <rect x="48" y="68" width="228" height="12" fill="rgba(0,210,80,0.12)" rx="1" />
                        <rect x="48" y="125" width="228" height="12" fill="rgba(0,210,80,0.12)" rx="1" />
                        <rect x="48" y="68" width="228" height="69" rx="2" fill="none" stroke="rgba(74,222,128,0.75)" strokeWidth="1.2" />
                        <rect x="48" y="80" width="228" height="45" fill="rgba(74,222,128,0.04)" />
                        <line x1="48" y1="80" x2="276" y2="80" stroke="rgba(74,222,128,0.35)" strokeWidth="0.6" />
                        <line x1="48" y1="125" x2="276" y2="125" stroke="rgba(74,222,128,0.35)" strokeWidth="0.6" />

                        {/* left end cap */}
                        <rect x="24" y="56" width="28" height="93" fill="url(#hatch)" rx="2" />
                        <rect x="24" y="56" width="28" height="93" rx="2" fill="none" stroke="rgba(74,222,128,0.8)" strokeWidth="1.2" />
                        <line x1="52" y1="60" x2="52" y2="145" stroke="rgba(74,222,128,0.4)" strokeWidth="0.8" />

                        {/* right end cap / rod gland */}
                        <rect x="276" y="62" width="28" height="81" fill="url(#hatch)" rx="2" />
                        <rect x="276" y="62" width="28" height="81" rx="2" fill="none" stroke="rgba(74,222,128,0.8)" strokeWidth="1.2" />
                        <rect x="278" y="86" width="6" height="33" fill="none" stroke="rgba(74,222,128,0.45)" strokeWidth="0.7" strokeDasharray="2,1.5" />
                        <line x1="276" y1="65" x2="276" y2="143" stroke="rgba(74,222,128,0.4)" strokeWidth="0.8" />

                        {/* piston */}
                        <rect x="148" y="80" width="26" height="45" fill="url(#hatch2)" rx="1" />
                        <rect x="148" y="80" width="26" height="45" rx="1" fill="none" stroke="rgba(74,222,128,0.9)" strokeWidth="1.3" />
                        <line x1="148" y1="91" x2="174" y2="91" stroke="rgba(74,222,128,0.5)" strokeWidth="0.8" />
                        <line x1="148" y1="114" x2="174" y2="114" stroke="rgba(74,222,128,0.5)" strokeWidth="0.8" />

                        {/* piston rod */}
                        <rect x="174" y="92" width="134" height="21" fill="rgba(74,222,128,0.08)" rx="1" />
                        <rect x="174" y="92" width="134" height="21" rx="1" fill="none" stroke="rgba(74,222,128,0.85)" strokeWidth="1.1" />
                        <rect x="305" y="94" width="6" height="17" fill="rgba(74,222,128,0.15)" rx="1" />

                        {/* port A */}
                        <circle cx="90" cy="68" r="5" fill="rgba(74,222,128,0.12)" stroke="rgba(74,222,128,0.75)" strokeWidth="0.9" />
                        <circle cx="90" cy="68" r="2" fill="rgba(74,222,128,0.4)" />
                        <line x1="90" y1="63" x2="90" y2="42" stroke="rgba(74,222,128,0.55)" strokeWidth="0.8" />
                        <line x1="81" y1="42" x2="99" y2="42" stroke="rgba(74,222,128,0.55)" strokeWidth="0.8" />
                        <text x="90" y="37" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(74,222,128,0.6)" letterSpacing="0.05em">PORT A</text>

                        {/* port B */}
                        <circle cx="220" cy="137" r="5" fill="rgba(74,222,128,0.12)" stroke="rgba(74,222,128,0.75)" strokeWidth="0.9" />
                        <circle cx="220" cy="137" r="2" fill="rgba(74,222,128,0.4)" />
                        <line x1="220" y1="142" x2="220" y2="163" stroke="rgba(74,222,128,0.55)" strokeWidth="0.8" />
                        <line x1="211" y1="163" x2="229" y2="163" stroke="rgba(74,222,128,0.55)" strokeWidth="0.8" />
                        <text x="220" y="172" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(74,222,128,0.6)" letterSpacing="0.05em">PORT B</text>

                        {/* dimension lines */}
                        <line x1="24" y1="48" x2="308" y2="48" stroke="rgba(74,222,128,0.22)" strokeWidth="0.5" />
                        <line x1="24" y1="44" x2="24" y2="52" stroke="rgba(74,222,128,0.22)" strokeWidth="0.5" />
                        <line x1="308" y1="44" x2="308" y2="52" stroke="rgba(74,222,128,0.22)" strokeWidth="0.5" />
                        <line x1="14" y1="80" x2="14" y2="125" stroke="rgba(74,222,128,0.22)" strokeWidth="0.5" />
                        <line x1="10" y1="80" x2="18" y2="80" stroke="rgba(74,222,128,0.22)" strokeWidth="0.5" />
                        <line x1="10" y1="125" x2="18" y2="125" stroke="rgba(74,222,128,0.22)" strokeWidth="0.5" />
                        <text x="8" y="104" textAnchor="middle" transform="rotate(-90,8,104)" fontFamily="monospace" fontSize="6" fill="rgba(74,222,128,0.45)" letterSpacing="0.04em">ø BORE</text>

                        {/* stroke arrow */}
                        <defs>
                            <marker id="arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                                <path d="M1 1L6 4L1 7" fill="none" stroke="rgba(74,222,128,0.4)" strokeWidth="1.2" strokeLinecap="round" />
                            </marker>
                        </defs>
                        <line x1="52" y1="155" x2="174" y2="155" stroke="rgba(74,222,128,0.3)" strokeWidth="0.6" markerStart="url(#arr)" markerEnd="url(#arr)" />
                        <text x="113" y="166" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="rgba(74,222,128,0.5)" letterSpacing="0.04em">STROKE</text>
                    </svg>

                    <div className="front-bottom">
                        <div>
                            <p className="front-tagline">
                                Built Under <span>Pressure.</span><br />
                                Trusted Worldwide.
                            </p>
                            <p className="front-event">Hannover Messe 2026</p>
                        </div>
                        <span className="front-stand">{STAND_INFO}</span>
                    </div>
                </div>

                {/* ── BACK ── */}
                <p className="label" style={{ marginTop: "12px" }}>Back</p>
                <div className="card card-back">
                    <div className="back-accent">
                        <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "white", fontSize: "6pt", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                            INCOCIL®
                        </span>
                    </div>

                    <div className="back-content">
                        <div className="back-qr-row">
                            <div className="qr-wrapper">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={qrDataUrl}
                                    alt="QR Code — Hannover Messe 2026"
                                    style={{ width: "17mm", height: "17mm", display: "block" }}
                                />
                            </div>
                            <div className="qr-label">
                                <strong>Scan to learn more</strong>
                                Hydraulic &amp; Pneumatic<br />
                                Cylinders — Custom Made<br />
                                Porto Alegre, Brazil
                            </div>
                        </div>

                        <div className="back-contacts">
                            <p className="contact-line">
                                🌐 <strong className="back-url">www.incocil.com</strong>
                            </p>
                            <p className="contact-line">
                                ✉ <strong>incocil@incocil.com</strong>
                            </p>
                            <p className="contact-line">
                                <MessageCircle size={7} /> <strong>+55 51 98446-8231</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}