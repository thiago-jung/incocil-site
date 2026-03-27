/**
 * INCOCIL® Business Card — página principal
 *
 * Route: /en/business-card
 * Também aceita ?name=...&role=...&email=...&whatsapp=...&site=...&address=...
 * para abrir com os dados já preenchidos (útil para links compartilhados).
 */

import type { Metadata } from "next";
import PrintButton from "../hannover-messe-2026/card/PrintButton";
import CardEditor from "./CardEditor";

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

export default async function BusinessCardPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string>>;
}) {
    const params = await searchParams;

    const initial = {
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
                @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700;800;900&display=swap');

                *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

                body {
                    font-family: 'Barlow', sans-serif;
                    background: #f1f5f9;
                    min-height: 100vh;
                }

                @media print {
                    body {
                        background: white;
                        padding: 0;
                    }
                    .no-print { display: none !important; }
                }
            `}</style>

            {/* Topbar */}
            <div className="no-print" style={{
                background: "white",
                borderBottom: "1px solid #e2e8f0",
                padding: "10px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <a href="/en" style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "11px", fontWeight: 700,
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        color: "#64748b", textDecoration: "none",
                        display: "flex", alignItems: "center", gap: "5px",
                    }}>
                        ← Home
                    </a>
                    <span style={{ color: "#e2e8f0" }}>|</span>
                    <span style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "11px", fontWeight: 700,
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        color: "#94a3b8",
                    }}>
                        INCOCIL® · Business Card
                    </span>
                </div>
                <PrintButton />
            </div>

            {/* Main content */}
            <main style={{
                padding: "36px 28px 64px",
                display: "flex",
                justifyContent: "center",
            }}>
                <CardEditor initial={initial} />
            </main>
        </>
    );
}