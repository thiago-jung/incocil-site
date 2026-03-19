/**
 * OG Image dinâmica para a listagem do Blog
 * Rota: /[lang]/blog/opengraph-image
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "INCOCIL® Blog Industrial";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    const content = {
        pt: { title: "Blog Industrial", subtitle: "Insights técnicos sobre hidráulica, pneumática e engenharia de precisão.", badge: "Conteúdo Técnico" },
        en: { title: "Industrial Blog", subtitle: "Technical insights on hydraulics, pneumatics and precision engineering.", badge: "Technical Content" },
        es: { title: "Blog Industrial", subtitle: "Insights técnicos sobre hidráulica, neumática e ingeniería de precisión.", badge: "Contenido Técnico" },
    };

    const c = content[lang as keyof typeof content] ?? content.pt;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "1200px",
                    height: "630px",
                    background: "#0f172a",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "60px 72px",
                    fontFamily: "sans-serif",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(21,128,61,0.25) 0%, transparent 70%)" }} />
                <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                    <div style={{ fontSize: "28px", fontWeight: 900, color: "#ffffff", letterSpacing: "-1px" }}>
                        INCOCIL<span style={{ color: "#16a34a" }}>®</span>
                    </div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#86efac", background: "rgba(21,128,61,0.15)", border: "1px solid rgba(21,128,61,0.4)", padding: "6px 16px", borderRadius: "999px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                        {c.badge}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
                    <div style={{ fontSize: "72px", fontWeight: 900, color: "#ffffff", lineHeight: 1.05, letterSpacing: "-3px" }}>
                        {c.title}
                    </div>
                    <div style={{ fontSize: "24px", color: "#94a3b8", lineHeight: 1.45, maxWidth: "700px", fontWeight: 400 }}>
                        {c.subtitle}
                    </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                    <div style={{ fontSize: "18px", fontWeight: 700, color: "#16a34a" }}>www.incocil.com</div>
                </div>

                <div style={{ position: "absolute", left: 0, top: "80px", bottom: "80px", width: "4px", background: "linear-gradient(to bottom, transparent, #16a34a, transparent)", borderRadius: "2px" }} />
            </div>
        ),
        { ...size }
    );
}