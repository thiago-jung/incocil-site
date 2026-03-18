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

export const metadata: Metadata = {
    title: "INCOCIL® | Business Card — Hannover Messe 2026",
    robots: { index: false },
};

const STAND_INFO = "Hall 17, D52";

// ✅ QR aponta para a página da feira com ?ref=card para rastrear visitantes
// que vieram pelo cartão impresso (segmente no GA4: source = card)
const QR_TARGET_URL = "https://www.incocil.com/en/hannover-messe-2026?ref=card";

export default function BusinessCard() {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=0F172A&bgcolor=FACC15&data=${encodeURIComponent(QR_TARGET_URL)}&qzone=1`;

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
                    <div className="front-logo">
                        <Image
                            src="/images/incocil.png"
                            alt="INCOCIL®"
                            width={110}
                            height={30}
                            style={{ filter: "brightness(0) invert(1)", height: "auto", maxWidth: "38mm" }}
                        />
                    </div>

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
                                    src={qrUrl}
                                    alt="QR Code — Hannover Messe 2026"
                                    width={68}
                                    height={68}
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
                                ✉ <strong>incocil@incocil.com.br</strong>
                            </p>
                            <p className="contact-line">
                                📞 <strong>+55 51 3261-2205</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}