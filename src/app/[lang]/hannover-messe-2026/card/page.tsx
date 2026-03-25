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

                    {/* ── Hydraulic Cylinder Blueprint ── */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-10 0 490 180"
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "70mm",
                            height: "auto",
                            zIndex: 1,
                            pointerEvents: "none",
                            opacity: 0.7,
                        }}
                    >
                        <defs>
                            <pattern id="h1" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(74,222,128,0.22)" strokeWidth="1.2" />
                            </pattern>
                        </defs>
                        <line x1="-10" y1="95" x2="460" y2="95" stroke="rgba(74,222,128,0.25)" strokeWidth="0.7" strokeDasharray="10,4,2,4" />
                        {/* left eye */}
                        <circle cx="38" cy="95" r="28" fill="url(#h1)" stroke="rgba(74,222,128,0.85)" strokeWidth="1.6" />
                        <circle cx="38" cy="95" r="14" fill="#0F172A" stroke="rgba(74,222,128,0.9)" strokeWidth="1.4" />
                        {/*<circle cx="38" cy="95" r="3" fill="rgba(74,222,128,0.5)" />*/}
                        {/* left neck taper */}
                        {/*<path d="M64,95 L80,82 L80,108 Z" fill="url(#h1)" stroke="rgba(74,222,128,0.8)" strokeWidth="1.3" strokeLinejoin="round" />*/}
                        {/* barrel left cap */}
                        <path d="M80,62 Q66,62 66,95 Q66,128 80,128 L80,62 Z" fill="url(#h1)" stroke="rgba(74,222,128,0.85)" strokeWidth="1.4" />
                        {/* barrel body */}
                        <rect x="80" y="62" width="280" height="66" fill="url(#h1)" />
                        <rect x="80" y="62" width="280" height="13" fill="rgba(0,210,80,0.13)" />
                        <rect x="80" y="115" width="280" height="13" fill="rgba(0,210,80,0.13)" />
                        <rect x="80" y="75" width="280" height="40" fill="rgba(74,222,128,0.04)" />
                        <line x1="80" y1="75" x2="360" y2="75" stroke="rgba(74,222,128,0.3)" strokeWidth="0.7" />
                        <line x1="80" y1="115" x2="360" y2="115" stroke="rgba(74,222,128,0.3)" strokeWidth="0.7" />
                        <line x1="80" y1="62" x2="360" y2="62" stroke="rgba(74,222,128,0.85)" strokeWidth="1.5" />
                        <line x1="80" y1="128" x2="360" y2="128" stroke="rgba(74,222,128,0.85)" strokeWidth="1.5" />
                        {/* barrel right cap */}
                        <path d="M360,62 Q380,62 380,95 Q380,128 360,128 L360,62 Z" fill="url(#h1)" stroke="rgba(74,222,128,0.85)" strokeWidth="1.4" />
                        {/* port A — elbow left */}
                        <rect x="88" y="41" width="12" height="20" rx="1" fill="url(#h1)" stroke="rgba(74,222,128,0.85)" strokeWidth="1.3" />
                        <rect x="88" y="40" width="12" height="12" rx="1" fill="url(#h1)" stroke="rgba(74,222,128,0.85)" strokeWidth="1.3" />
                        <rect x="99" y="39" width="8" height="14" rx="1" fill="url(#h1)" stroke="rgba(74,222,128,0.85)" strokeWidth="1.2" />
                        <line x1="168" y1="62" x2="186" y2="62" stroke="rgba(74,222,128,0.85)" strokeWidth="1.5" />
                        <text x="100" y="32" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(74,222,128,0.7)" letterSpacing="0.08em">PORT A</text>
                        {/* port B — elbow right */}
                        <rect x="308" y="41" width="12" height="20" rx="1" fill="url(#h1)" stroke="rgba(74,222,128,0.85)" strokeWidth="1.3" />
                        <rect x="308" y="40" width="12" height="12" rx="1" fill="url(#h1)" stroke="rgba(74,222,128,0.85)" strokeWidth="1.3" />
                        <rect x="301" y="39" width="8" height="14" rx="1" fill="url(#h1)" stroke="rgba(74,222,128,0.85)" strokeWidth="1.2" />
                        <line x1="168" y1="62" x2="186" y2="62" stroke="rgba(74,222,128,0.85)" strokeWidth="1.5" />
                        <text x="310" y="32" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(74,222,128,0.7)" letterSpacing="0.08em">PORT B</text>
                        {/* piston */}
                        <rect x="90" y="75" width="40" height="40" rx="1" fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.9)" strokeWidth="1.4" />
                        <line x1="228" y1="86" x2="248" y2="86" stroke="rgba(74,222,128,0.5)" strokeWidth="0.9" />
                        <line x1="228" y1="104" x2="248" y2="104" stroke="rgba(74,222,128,0.5)" strokeWidth="0.9" />

                        <rect x="80" y="80" width="10" height="30" rx="1" fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.9)" strokeWidth="1.4" />
                        <line x1="228" y1="86" x2="248" y2="86" stroke="rgba(74,222,128,0.5)" strokeWidth="0.9" />
                        <line x1="228" y1="104" x2="248" y2="104" stroke="rgba(74,222,128,0.5)" strokeWidth="0.9" />

                        <rect x="320" y="75" width="40" height="40" rx="1" fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.9)" strokeWidth="1.4" />
                        <line x1="228" y1="86" x2="248" y2="86" stroke="rgba(74,222,128,0.5)" strokeWidth="0.9" />
                        <line x1="228" y1="104" x2="248" y2="104" stroke="rgba(74,222,128,0.5)" strokeWidth="0.9" />
                        {/* rod gland */}
                        <line x1="368" y1="82" x2="368" y2="108" stroke="rgba(74,222,128,0.4)" strokeWidth="0.9" strokeDasharray="3,2" />
                        {/* haste */}
                        <rect x="80" y="86" width="340" height="18" rx="1" fill="rgba(74,222,128,0.07)" stroke="rgba(74,222,128,0.9)" strokeWidth="1.4" />
                        <line x1="380" y1="90" x2="416" y2="90" stroke="rgba(74,222,128,0.2)" strokeWidth="1.2" />
                        {/* right eye — moved closer */}
                        <circle cx="442" cy="95" r="22" fill="url(#h1)" stroke="rgba(74,222,128,0.85)" strokeWidth="1.5" />
                        <circle cx="442" cy="95" r="11" fill="#0F172A" stroke="rgba(74,222,128,0.9)" strokeWidth="1.3" />
                        {/*<circle cx="442" cy="95" r="3" fill="rgba(74,222,128,0.5)" />*/}
                        {/* lines */}
                        <line x1="130" y1="142" x2="320" y2="142" stroke="rgba(74,222,128,0.2)" strokeWidth="0.7" />
                        <line x1="130" y1="136" x2="130" y2="148" stroke="rgba(74,222,128,0.2)" strokeWidth="0.7" />
                        <line x1="320" y1="136" x2="320" y2="148" stroke="rgba(74,222,128,0.2)" strokeWidth="0.7" />
                        <text x="220" y="150" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(74,222,128,0.7)" letterSpacing="0.05em">STROKE</text>
                        <line x1="5" y1="75" x2="5" y2="115" stroke="rgba(74,222,128,0.18)" strokeWidth="0.7" />
                        <line x1="2" y1="75" x2="8" y2="75" stroke="rgba(74,222,128,0.18)" strokeWidth="0.7" />
                        <line x1="2" y1="115" x2="8" y2="115" stroke="rgba(74,222,128,0.18)" strokeWidth="0.7" />
                        <text x="52" y="45" textAnchor="middle" transform="rotate(-90,52,98)" fontFamily="monospace" fontSize="9" fill="rgba(74,222,128,0.7)" letterSpacing="0.05em">ø BORE</text>
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