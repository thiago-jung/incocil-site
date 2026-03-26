/**
 * INCOCIL® Business Card — Template Reutilizável
 *
 * Route: /en/business-card?name=Marcus+Roberto+Jung&role=CEO
 *
 * Print: 85×54mm | Margins: None | Background graphics: ON | Scale: 100%
 */

import type { Metadata } from "next";
import Image from "next/image";
import PrintButton from "../hannover-messe-2026/card/PrintButton";
import { Barlow, Barlow_Condensed } from 'next/font/google';


const barlow = Barlow({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    variable: '--font-barlow',
});

const barlowCondensed = Barlow_Condensed({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-barlow-condensed',
});


export const metadata: Metadata = {
    title: "INCOCIL® | Business Card",
    robots: { index: false },
};

const DEFAULT_PERSON = {
    name: "Marcus Roberto Jung",
    role: "CEO",
    whatsapp: "+55 51 98446-8241",
    email: "marcus.jung@incocil.com.br",
    site: "www.incocil.com",
    address: "Av. Ricardo Leônidas Ribas, 310 — Porto Alegre, RS. Brazil",
};

/* ─── SVG Icons — monolinear, stroke-only, precisão técnica ─────── */

const IconWhatsApp = () => (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Balão externo clássico do WhatsApp */}
        <path
            d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"
            stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        />
        {/* Fone interno escalado, centralizado e com espessura compensada para manter o padrão */}
        <g transform="translate(5.4, 5.4) scale(0.55)">
            <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 11.5 19.79 19.79 0 0 1 .84 3.04 2 2 0 0 1 2.82.84h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.91 8.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
                stroke="#16a34a" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round"
            />
        </g>
    </svg>
);

const IconMail = () => (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="#16a34a" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M22 7 12 13 2 7" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const IconGlobe = () => (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1.6" />
        <path d="M2 12h20" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" />
        <path
            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"
            stroke="#16a34a" strokeWidth="1.6"
        />
    </svg>
);

const IconPin = () => (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        />
        <circle cx="12" cy="9" r="2.5" stroke="#16a34a" strokeWidth="1.6" />
    </svg>
);

/* ─────────────────────────────────────────────────────────────────── */

export default async function BusinessCard({
    searchParams,
}: {
    searchParams: Promise<Record<string, string>>;
}) {
    const params = await searchParams;

    const person = {
        name: params.name ?? DEFAULT_PERSON.name,
        role: params.role ?? DEFAULT_PERSON.role,
        whatsapp: params.whatsapp ?? DEFAULT_PERSON.whatsapp,
        email: params.email ?? DEFAULT_PERSON.email,
        site: params.site ?? DEFAULT_PERSON.site,
        address: params.address ?? DEFAULT_PERSON.address,
    };

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Barlow+Condensed:wght@300;400;500;600;700;800;900&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: var(--font-barlow), sans-serif;
          /* Preview background — não entra no print */
          background: #c8d0d8;
          background-image:
            radial-gradient(ellipse 80% 50% at 20% 30%, rgba(22,163,74,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 60% 60% at 80% 70%, rgba(15,23,42,0.05) 0%, transparent 70%),
            repeating-linear-gradient(0deg,   transparent, transparent 23px, rgba(0,0,0,0.025) 23px, rgba(0,0,0,0.025) 24px),
            repeating-linear-gradient(90deg,  transparent, transparent 23px, rgba(0,0,0,0.025) 23px, rgba(0,0,0,0.025) 24px);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          padding: 48px 20px;
        }

        .hint {
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        /* ════════════════════════════════
           Card — base
        ════════════════════════════════ */
        .card {
          width: 85mm;
          height: 54mm;
          overflow: hidden;
          border-radius: 0.5mm;
          /*
           * Soft shadow — multicamada para profundidade realista.
           * Nenhuma camada individual domina; juntas criam um lifting suave.
           */
          box-shadow:
            0 1px 1px  rgba(0,0,0,0.03),
            0 2px 4px  rgba(0,0,0,0.05),
            0 6px 14px rgba(0,0,0,0.07),
            0 18px 36px rgba(0,0,0,0.09),
            0 36px 56px rgba(0,0,0,0.05);
          flex-shrink: 0;
          position: relative;
        }

        /* ════════════════════════════════
           FRENTE
        ════════════════════════════════ */
        .card-front {
          /*
           * #f7f9f7 — off-white com leve tom natural,
           * distinguível do branco puro sem parecer colorido.
           */
          background: #f7f9f7;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 5.5mm 6mm 5.2mm 7mm;
        }

        /* Linha lateral verde — assinatura da marca */
        .front-accent-line {
          position: absolute;
          left: -3mm;                 /* sangria borda esquerda */
          top: -3mm;                  /* sangria borda topo */
          width: 1.4mm;
          height: calc(100% + 6mm);  /* cobre topo + baixo */
          background: linear-gradient(180deg,
            #4ade80 0%,
            #16a34a 35%,
            #15803d 70%,
            #14532d 100%
          );
          z-index: 2;
          align-self: center;
        }

        .front-logo {
          position: relative;
          z-index: 3;
        }

        .front-bottom {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
        }

        /* Separador gradiente — desvanece para a direita */
        .front-rule {
          width: 7mm;
          height: 0.35mm;
          background: linear-gradient(90deg, #16a34a 0%, rgba(22,163,74,0) 100%);
          margin-bottom: 2mm;
        }

        .front-name {
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: 10.5pt;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.025em;   /* Tracking apertado = tipografia display sofisticada */
          line-height: 1.1;
        }

        .front-role {
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: 5.8pt;
          font-weight: 700;
          color: #16a34a;
          letter-spacing: 0.22em;     /* Reduzido vs original: mais elegante, menos mecânico */
          text-transform: uppercase;
          margin-top: 1.2mm;
        }

        /* ── Listras diagonais — canto superior esquerdo ── */
        .stripe-tl {
          position: absolute;
          top: -6mm;     /* era -3mm */
          left: -6mm;    /* era -3mm */
          width: 28mm;   /* era 22mm */
          height: 28mm;  /* era 22mm */
          z-index: 1;
          pointer-events: none;
        }

        /* ── Listras diagonais — canto inferior direito ── */
        .stripe-br {
          position: absolute;
          bottom: -6mm;  /* era -3mm */
          right: -6mm;   /* era -3mm */
          width: 24mm;   /* era 18mm */
          height: 24mm;  /* era 18mm */
          z-index: 1;
          pointer-events: none;
        }

        /* ── Cilindro hidráulico — blueprint técnico ── */
        .cylinder-bg {
          position: absolute;
          left: 8mm;
          top: 50%;
          transform: translateY(-50%);
          width: 42mm;
          height: auto;
          opacity: 0.25;              /* Mais sutil: não compete com o conteúdo */
          z-index: 1;
          pointer-events: none;
          mix-blend-mode: multiply;   /* Integra melhor com o fundo off-white */
        }

        /* ════════════════════════════════
           VERSO
        ════════════════════════════════ */
        .card-back {
          background: #ffffff;
          display: flex;
          align-items: stretch;
        }

        /* Coluna lateral verde */
        .back-col {
          width: 14.5mm;
          height: 150mm;
          /* Sangria: -3mm nas 3 bordas que tocam a extremidade do card */
          margin-left: -3mm;
          margin-top: -3mm;
          margin-bottom: -3mm;
          /* Compensa internamente para o conteúdo não vazar com a margem */
          padding-left: 3mm;
          padding-top:    calc(4.5mm + 3mm);
          padding-bottom: calc(4.5mm + 3mm);
          background: linear-gradient(160deg, #22c55e 0%, #15803d 30%, #0f4d25 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
          overflow: hidden;
          align-self: center;
        }

        /* Reflexo sutil na borda direita da coluna */
        .back-col::after {
          content: '';
          position: absolute;
          right: 0; top: 0;
          width: 0.4mm; height: 100%;
          background: linear-gradient(180deg,
            transparent 0%,
            rgba(255,255,255,0.18) 40%,
            rgba(255,255,255,0.10) 70%,
            transparent 100%
          );
        }

        /* Padrão diagonal sutil na coluna — engineering feel */
        .back-col::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.06) 3px,
            rgba(0,0,0,0.06) 4px
          );
          pointer-events: none;
        }

        .back-col-ornament {
          width: 4mm; height: 0.3mm;
          background: rgba(255,255,255,0.4);
        }

        .back-col-name {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: 4.8pt;
          font-weight: 800;
          color: rgba(255,255,255,0.88);
          letter-spacing: 0.32em;
          text-transform: uppercase;
          position: relative;
          z-index: 1;
        }

        /* Área de conteúdo do verso */
        .back-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2mm;
          padding: 4mm 4.5mm 4mm 3.8mm;
          position: relative;
          z-index: 2;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 2.4mm;
        }

        /* Ícone sem fundo — limpo, profissional */
        .contact-icon {
          width: 3.8mm; height: 3.8mm;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-text {
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: 5.4pt;
          font-weight: 400;
          color: #475569;
          line-height: 1.2;
        }

        /* Telefone: destaque máximo */
        .contact-text.highlight {
          font-size: 6.2pt;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: 0.01em;
        }

        /* Site: Barlow Condensed — element identitário */
        .contact-text.site {
          font-family: var(--font-barlow-condensed), sans-serif;
          font-size: 7.2pt;
          font-weight: 700;
          color: #16a34a;
          letter-spacing: 0.04em;
        }

        /* Endereço: texto auxiliar, hierarquia mínima */
        .contact-text.small {
          font-size: 4.6pt;
          font-weight: 400;
          color: #94a3b8;
          line-height: 1.35;
        }

        /* Divisor sutil entre grupos de contato */
        .back-divider {
          width: 100%;
          height: 0.15mm;
          background: linear-gradient(90deg, #e2e8f0 0%, rgba(226,232,240,0) 100%);
          margin: 0.4mm 0;
        }

        /* Listras diagonais — canto superior direito do verso */
        .back-stripe-tr {
          position: absolute;
          top: -6mm;    /* era -2mm */
          right: -6mm;  /* era -2mm */
          width: 24mm;  /* era 18mm */
          height: 24mm; /* era 18mm */
          z-index: 1;
          pointer-events: none;
        }

        /* ════════════════════════════════
           PRINT — preservado integralmente
        ════════════════════════════════ */
        @media print {
          body {
            background: white;
            padding: 0;
            justify-content: flex-start;
            padding-top: 10mm;
          }
          .hint, .no-print { display: none; }
          .card {
            box-shadow: none;
            page-break-inside: avoid;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

            <p className="hint no-print">
                Business Card Preview (85 × 54 mm) &nbsp;|&nbsp;
                <a href="/en" style={{ color: "#16a34a" }}>← Home</a>
                &nbsp;|&nbsp;
                <PrintButton />
                &nbsp;|&nbsp;
                <span style={{ color: "#94a3b8" }}>
                    ?name=Nome&role=Cargo&email=...&whatsapp=...
                </span>
            </p>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>

                {/* ══════════════════════════════════
                    FRENTE
                ══════════════════════════════════ */}
                <p className="hint">Frente</p>
                <div className="card card-front">

                    <div className="front-accent-line" />

                    {/* Listras diagonais — canto superior esquerdo */}
                    <svg className="stripe-tl" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Da mais externa para a mais interna — opacidades graduais */}
                        <polygon points="-2,0 0,-2 22,-2 -2,22" fill="#0f172a" opacity="0.7" />
                        <polygon points="-2,24 24,-2 40,-2 -2,40" fill="#14532d" opacity="0.9" />
                        <polygon points="-2,42 42,-2 58,-2 -2,58" fill="#16a34a" opacity="0.75" />
                        <polygon points="-2,60 60,-2 65,-2 -2,65" fill="#0f172a" opacity="0.55" />
                        <polygon points="-2,68 68,-2 80,-2 -2,80" fill="#15803d" opacity="0.45" />
                        <polygon points="-2,83 83,-2 90,-2 -2,90" fill="#4ade80" opacity="0.20" />
                    </svg>

                    {/* Listras diagonais — canto inferior direito */}
                    <svg className="stripe-br" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="97,73 73,97 97,97" fill="#0f172a" opacity="0.7" />
                        <polygon points="97,55 55,97 72,97 97,72" fill="#14532d" opacity="0.9" />
                        <polygon points="97,37 37,97 53,97 97,53" fill="#16a34a" opacity="0.75" />
                        <polygon points="97,32 32,97 37,97 97,37" fill="#0f172a" opacity="0.55" />
                        <polygon points="97,18 18,97 30,97 97,30" fill="#15803d" opacity="0.45" />
                        <polygon points="97,8  8,97  16,97 97,16" fill="#4ade80" opacity="0.20" />
                    </svg>

                    {/* ── Cilindro hidráulico blueprint — INTOCÁVEL ── */}
                    <svg className="cylinder-bg" viewBox="-10 0 490 180" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="h1" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                <line x1="0" y1="0" x2="0" y2="5" stroke="#166534" strokeWidth="1.2" />
                            </pattern>
                        </defs>
                        <line x1="-10" y1="95" x2="460" y2="95" stroke="#166534" strokeWidth="0.7" strokeDasharray="10,4,2,4" />
                        <circle cx="38" cy="95" r="28" fill="url(#h1)" stroke="#166534" strokeWidth="1.6" />
                        <circle cx="38" cy="95" r="14" fill="#f1f5f0" stroke="#166534" strokeWidth="1.4" />
                        <path d="M80,62 Q66,62 66,95 Q66,128 80,128 L80,62 Z" fill="url(#h1)" stroke="#166534" strokeWidth="1.4" />
                        <rect x="80" y="62" width="280" height="66" fill="url(#h1)" stroke="#166534" strokeWidth="1.5" />
                        <path d="M360,62 Q380,62 380,95 Q380,128 360,128 L360,62 Z" fill="url(#h1)" stroke="#166534" strokeWidth="1.4" />
                        <rect x="88" y="41" width="12" height="21" rx="1" fill="url(#h1)" stroke="#166534" strokeWidth="1.3" />
                        <rect x="308" y="41" width="12" height="21" rx="1" fill="url(#h1)" stroke="#166534" strokeWidth="1.3" />
                        {/* Êmbolo */}
                        <rect x="80" y="62" width="38" height="66" rx="1" fill="url(#h1)" stroke="#166534" strokeWidth="1.8" />
                        <line x1="155" y1="82" x2="173" y2="82" stroke="#166534" strokeWidth="1.2" strokeDasharray="2,2" />
                        <line x1="155" y1="108" x2="173" y2="108" stroke="#166534" strokeWidth="1.2" strokeDasharray="2,2" />
                        {/* Luva guia */}
                        <rect x="335" y="62" width="24" height="66" rx="1" fill="url(#h1)" stroke="#166534" strokeWidth="1.8" />
                        <line x1="350" y1="88" x2="364" y2="88" stroke="#166534" strokeWidth="1.2" strokeDasharray="2,2" />
                        <line x1="350" y1="100" x2="364" y2="100" stroke="#166534" strokeWidth="1.2" strokeDasharray="2,2" />
                        {/* Haste */}
                        <rect x="80" y="86" width="340" height="18" rx="1" fill="url(#h1)" stroke="#166534" strokeWidth="1.4" />
                        <circle cx="442" cy="95" r="22" fill="url(#h1)" stroke="#166534" strokeWidth="1.5" />
                        <circle cx="442" cy="95" r="11" fill="#f1f5f0" stroke="#166534" strokeWidth="1.3" />
                    </svg>

                    <div className="front-logo">
                        <Image
                            src="/images/incocil_verde.svg"
                            alt="INCOCIL®"
                            width={600}
                            height={200}
                            style={{
                                height: "12mm",
                                width: "auto",
                                maxWidth: "48mm",
                                display: "block",
                            }}
                        />
                    </div>

                    <div className="front-bottom">
                        <div className="front-rule" />
                        <p className="front-name">{person.name}</p>
                        <p className="front-role">{person.role}</p>
                    </div>

                </div>

                {/* ══════════════════════════════════
                    VERSO
                ══════════════════════════════════ */}
                <p className="hint" style={{ marginTop: "10px" }}>Verso</p>
                <div className="card card-back">

                    {/* Listras diagonais — canto superior direito do verso */}
                    <svg className="back-stripe-tr" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="85" y1="10" x2="10" y2="85" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="square" opacity="0.14" />
                        <line x1="85" y1="26" x2="26" y2="85" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="square" opacity="0.09" />
                        <line x1="85" y1="42" x2="42" y2="85" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="square" opacity="0.05" />
                    </svg>

                    {/* Coluna verde lateral */}
                    <div className="back-col">
                        <div className="back-col-ornament" />
                        <span className="back-col-name">INCOCIL®</span>
                        <div className="back-col-ornament" />
                    </div>

                    {/* Dados de contato */}
                    <div className="back-content">

                        <div className="contact-row">
                            <div className="contact-icon"><IconWhatsApp /></div>
                            <span className="contact-text highlight">{person.whatsapp}</span>
                        </div>

                        <div className="contact-row">
                            <div className="contact-icon"><IconMail /></div>
                            <span className="contact-text">{person.email}</span>
                        </div>

                        <div className="back-divider" />

                        <div className="contact-row">
                            <div className="contact-icon"><IconGlobe /></div>
                            <span className="contact-text site">{person.site}</span>
                        </div>

                        <div className="contact-row">
                            <div className="contact-icon"><IconPin /></div>
                            <span className="contact-text small">{person.address}</span>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}


// Para gerar outro colaborador, basta acessar:
// /en/business-card?name=João+Silva&role=Sales+Engineer&email=joao@incocil.com.br&whatsapp=+55+51+99999-0000