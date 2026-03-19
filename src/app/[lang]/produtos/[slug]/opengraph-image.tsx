/**
 * OG Image dinâmica para páginas de produto
 *
 * Rota: /[lang]/produtos/[slug]/opengraph-image
 * Gera uma imagem 1200×630 com:
 *  - Fundo escuro industrial
 *  - Logo INCOCIL
 *  - Nome do produto em destaque
 *  - Badge do idioma
 *  - Tagline da empresa
 *
 * Next.js injeta automaticamente a meta og:image com a URL desta rota.
 * Não é necessário declarar openGraph.images no generateMetadata do slug.
 */

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "INCOCIL® Produto";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function getDictAndProduct(lang: string, slug: string) {
    // Edge runtime: importamos os JSONs diretamente
    const [ptMod, enMod, esMod] = await Promise.all([
        import("@/dictionaries/pt.json"),
        import("@/dictionaries/en.json"),
        import("@/dictionaries/es.json"),
    ]);

    const dictMap: Record<string, any> = {
        pt: ptMod.default,
        en: enMod.default,
        es: esMod.default,
    };

    const dict = dictMap[lang] ?? dictMap.pt;
    const product = dict.services?.find((s: any) => s.slug === slug);
    return { product, dict };
}

export default async function OGImage({
    params,
}: {
    params: Promise<{ lang: string; slug: string }>;
}) {
    const { lang, slug } = await params;
    const { product } = await getDictAndProduct(lang, slug);

    const title = product?.title ?? "INCOCIL® Cilindros Hidráulicos";
    const description = product?.description ?? "Especialistas em cilindros hidráulicos sob medida.";

    const tagline =
        lang === "en" ? "Built Under Pressure. Trusted Worldwide."
            : lang === "es" ? "Ingeniería de Precisión. Confianza Global."
                : "Engenharia de Precisão. Confiança Global.";

    const badgeLabel =
        lang === "en" ? "Hydraulic & Pneumatic Cylinders"
            : lang === "es" ? "Cilindros Hidráulicos y Neumáticos"
                : "Cilindros Hidráulicos e Pneumáticos";

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
                {/* Background accent glow */}
                <div
                    style={{
                        position: "absolute",
                        top: "-100px",
                        right: "-100px",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(21,128,61,0.25) 0%, transparent 70%)",
                    }}
                />
                {/* Grid lines */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Top row: logo + badge */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                            style={{
                                fontSize: "28px",
                                fontWeight: 900,
                                color: "#ffffff",
                                letterSpacing: "-1px",
                            }}
                        >
                            INCOCIL<span style={{ color: "#16a34a" }}>®</span>
                        </div>
                    </div>
                    <div
                        style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#86efac",
                            background: "rgba(21,128,61,0.15)",
                            border: "1px solid rgba(21,128,61,0.4)",
                            padding: "6px 16px",
                            borderRadius: "999px",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                        }}
                    >
                        {badgeLabel}
                    </div>
                </div>

                {/* Center: product title + description */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative" }}>
                    <div
                        style={{
                            fontSize: title.length > 40 ? "48px" : "60px",
                            fontWeight: 900,
                            color: "#ffffff",
                            lineHeight: 1.1,
                            letterSpacing: "-2px",
                            maxWidth: "820px",
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            fontSize: "22px",
                            color: "#94a3b8",
                            lineHeight: 1.45,
                            maxWidth: "720px",
                            fontWeight: 400,
                        }}
                    >
                        {description}
                    </div>
                </div>

                {/* Bottom row: URL + tagline */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
                    <div
                        style={{
                            fontSize: "18px",
                            fontWeight: 700,
                            color: "#16a34a",
                            letterSpacing: "0.02em",
                        }}
                    >
                        www.incocil.com
                    </div>
                    <div
                        style={{
                            fontSize: "16px",
                            color: "#64748b",
                            fontWeight: 600,
                            letterSpacing: "0.02em",
                        }}
                    >
                        {tagline}
                    </div>
                </div>

                {/* Left accent bar */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        top: "80px",
                        bottom: "80px",
                        width: "4px",
                        background: "linear-gradient(to bottom, transparent, #16a34a, transparent)",
                        borderRadius: "2px",
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}