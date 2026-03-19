"use client";
import { useState, useCallback, useEffect } from "react";
import { MessageCircle, ChevronDown, ChevronUp, Info } from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * CylCalculator — Calculadora Mestre / Escravo
 *
 * Fórmulas (Cilindro Dupla Ação):
 *   Ae [cm²]  = π × (D_tubo_cm / 2)²
 *   Af [cm²]  = π × ((D_tubo_cm/2)² − (D_haste_cm/2)²)
 *   Vol [cm³] = Área × Curso_cm  →  litros = /1000
 *   F [kgf]   = Área_cm² × P_bar  (1 bar ≈ 1 kgf/cm²)
 *
 *   Parede Mínima — Lamé / DIN 2413:
 *     Se [N/mm²] = Lim_Esc_kgf_mm2 × 9.80665 / Coef_Seg
 *     p  [N/mm²] = P_bar × 0.1
 *     t  [mm]    = (D/2) × (√((Se+p)/(Se−p)) − 1)
 *
 * UX — por que type="text" em vez de type="number":
 *   O input numérico nativo do browser interfere ao digitar valores como "980":
 *   ao pressionar "9", o campo tenta validar "9" contra min/max e
 *   às vezes rejeita ou reseta o valor antes de terminar de digitar.
 *   Com type="text" + inputMode="decimal", o usuário digita livremente e
 *   o parse acontece só quando necessário — experiência idêntica ao Excel.
 */

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface CylInput {
    tubo: string;
    haste: string;
    curso: string;
    pressao: string;
}

interface CylResult {
    areaAbrir: number;
    areaFechar: number;
    volAbrir: number;
    volFechar: number;
    litAbrir: number;
    litFechar: number;
    fAbrir: number;
    fFechar: number;
    paredeMin: number;
}

// ─── Fórmulas ────────────────────────────────────────────────────────────────

/** Converte string BR ("1.234,56" ou "1234.56") em número */
function parse(s: string): number {
    // Remove pontos de milhar, troca vírgula decimal por ponto
    const clean = s.replace(/\./g, "").replace(",", ".");
    return parseFloat(clean);
}

function calcular(
    tuboMm: number,
    hasteMm: number,
    cursoMm: number,
    pressaoBar: number,
    coefSeg: number,
    limEsc: number
): CylResult {
    const D = tuboMm / 10; // mm → cm
    const d = hasteMm / 10;
    const L = cursoMm / 10;
    const P = pressaoBar;

    const areaAbrir = Math.PI * Math.pow(D / 2, 2);
    const areaFechar = Math.PI * (Math.pow(D / 2, 2) - Math.pow(d / 2, 2));

    const volAbrir = areaAbrir * L;
    const volFechar = areaFechar * L;

    const Se = (limEsc * 9.80665) / coefSeg;
    const p = P * 0.1;
    const paredeMin = Se > p
        ? (tuboMm / 2) * (Math.sqrt((Se + p) / (Se - p)) - 1)
        : NaN;

    return {
        areaAbrir,
        areaFechar,
        volAbrir,
        volFechar,
        litAbrir: volAbrir / 1000,
        litFechar: volFechar / 1000,
        fAbrir: areaAbrir * P,
        fFechar: areaFechar * P,
        paredeMin,
    };
}

// ─── Formatação ──────────────────────────────────────────────────────────────

const fmtN = (v: number, dec = 2) =>
    isNaN(v) || !isFinite(v)
        ? "—"
        : v.toLocaleString("pt-BR", {
            minimumFractionDigits: dec,
            maximumFractionDigits: dec,
        });

const fmtInt = (v: number) =>
    isNaN(v) || !isFinite(v) ? "—" : Math.round(v).toLocaleString("pt-BR");

// ─── Sub-componentes ─────────────────────────────────────────────────────────

interface FieldProps {
    label: string;
    unit: string;
    value: string;
    isMestre?: boolean;
    onChange: (v: string) => void;
}

function Field({ label, unit, value, isMestre, onChange }: FieldProps) {
    return (
        <div>
            <div className="flex items-baseline justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">{label}</label>
                <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{unit}</span>
            </div>
            <input
                type="text"
                inputMode="decimal"
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={e => e.target.select()}
                className={`w-full text-right text-xl font-black tabular-nums border-2 rounded-xl px-4 py-3
                    outline-none transition-all placeholder:text-slate-300
                    ${isMestre
                        ? "border-blue-200 focus:border-blue-500 focus:bg-blue-50 text-blue-900 bg-blue-50/40"
                        : "border-slate-200 focus:border-slate-500 focus:bg-slate-50 text-slate-900 bg-white"
                    }`}
                placeholder="0"
            />
        </div>
    );
}

interface ResultRowProps {
    label: string;
    mestre: string;
    escravo: string;
    subM?: string;
    subE?: string;
    rowStyle?: string;
    valStyle?: string;
}

function ResultRow({ label, mestre, escravo, subM, subE, rowStyle = "", valStyle = "text-slate-900" }: ResultRowProps) {
    return (
        <tr className={`border-b border-slate-100 last:border-0 ${rowStyle}`}>
            <td className="py-3.5 pl-5 pr-3 text-sm font-semibold text-slate-600 whitespace-nowrap">{label}</td>
            <td className={`py-3.5 px-5 text-right font-bold tabular-nums text-sm ${valStyle}`}>
                {mestre}
                {subM && <div className="text-[11px] font-normal text-slate-400 mt-0.5">{subM}</div>}
            </td>
            <td className={`py-3.5 px-5 text-right font-bold tabular-nums text-sm ${valStyle}`}>
                {escravo}
                {subE && <div className="text-[11px] font-normal text-slate-400 mt-0.5">{subE}</div>}
            </td>
        </tr>
    );
}

// ─── Estado inicial ───────────────────────────────────────────────────────────

const INIT_M: CylInput = { tubo: "100", haste: "60", curso: "500", pressao: "200" };
const INIT_E: CylInput = { tubo: "50", haste: "30", curso: "300", pressao: "200" };

// ─── Componente principal ────────────────────────────────────────────────────

export default function CylCalculator({ lang = "pt" }: { lang?: "pt" | "en" | "es" }) {
    const [M, setM] = useState<CylInput>(INIT_M);
    const [E, setE] = useState<CylInput>(INIT_E);
    const [coefSeg, setCoefSeg] = useState("3");
    const [limEsc, setLimEsc] = useState("50");
    const [showFormulas, setShowFormulas] = useState(false);

    // Helpers para atualizar campo individual
    const updM = useCallback((key: keyof CylInput) =>
        (v: string) => setM(prev => ({ ...prev, [key]: v })), []);
    const updE = useCallback((key: keyof CylInput) =>
        (v: string) => setE(prev => ({ ...prev, [key]: v })), []);

    // Parse e cálculo derivado (nunca bloqueia o input)
    const coef = parse(coefSeg) || 3;
    const lim = parse(limEsc) || 50;

    const mT = parse(M.tubo), mH = parse(M.haste), mC = parse(M.curso), mP = parse(M.pressao);
    const eT = parse(E.tubo), eH = parse(E.haste), eC = parse(E.curso), eP = parse(E.pressao);

    const rM = (mT > 0 && mH > 0 && mH < mT && mC > 0 && mP > 0)
        ? calcular(mT, mH, mC, mP, coef, lim)
        : null;

    const rE = (eT > 0 && eH > 0 && eH < eT && eC > 0 && eP > 0)
        ? calcular(eT, eH, eC, eP, coef, lim)
        : null;

    const buildMsg = () =>
        `Olá INCOCIL! Calculei as especificações abaixo pela calculadora do site e gostaria de um orçamento:

CILINDRO MESTRE
• ø Tubo: ${M.tubo}mm | ø Haste: ${M.haste}mm | Curso: ${M.curso}mm | Pressão: ${M.pressao} bar
• Área Abrir: ${rM ? fmtN(rM.areaAbrir) : "—"} cm² | Área Fechar: ${rM ? fmtN(rM.areaFechar) : "—"} cm²
• Força Abrir: ${rM ? fmtInt(rM.fAbrir) : "—"} Kgf | Força Fechar: ${rM ? fmtInt(rM.fFechar) : "—"} Kgf
• Volume Abrir: ${rM ? fmtN(rM.litAbrir, 3) : "—"} L | Volume Fechar: ${rM ? fmtN(rM.litFechar, 3) : "—"} L
• Parede Mínima: ${rM ? fmtN(rM.paredeMin) : "—"} mm

CILINDRO ESCRAVO
• ø Tubo: ${E.tubo}mm | ø Haste: ${E.haste}mm | Curso: ${E.curso}mm | Pressão: ${E.pressao} bar
• Área Abrir: ${rE ? fmtN(rE.areaAbrir) : "—"} cm² | Área Fechar: ${rE ? fmtN(rE.areaFechar) : "—"} cm²
• Força Abrir: ${rE ? fmtInt(rE.fAbrir) : "—"} Kgf | Força Fechar: ${rE ? fmtInt(rE.fFechar) : "—"} Kgf
• Volume Abrir: ${rE ? fmtN(rE.litAbrir, 3) : "—"} L | Volume Fechar: ${rE ? fmtN(rE.litFechar, 3) : "—"} L
• Parede Mínima: ${rE ? fmtN(rE.paredeMin) : "—"} mm

Coef. Segurança: ${coefSeg} (DIN 2413) | Limite Escoamento: ${limEsc} kgf/mm²

Podem confirmar disponibilidade e enviar um orçamento?`;

    const handleCTA = () => {
        track.whatsappClick("calculadora", `mestre:${M.tubo}mm escravo:${E.tubo}mm`);
        window.open(`https://wa.me/555184468231?text=${encodeURIComponent(buildMsg())}`, "_blank");
    };

    const dash = "—";

    return (
        <div className="space-y-6 max-w-3xl mx-auto">

            {/* ── PAINÉIS DE INPUT ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* MESTRE */}
                <div className="bg-white rounded-2xl border-2 border-blue-500 overflow-hidden shadow-sm">
                    <div className="bg-blue-600 px-5 py-3 text-center">
                        <span className="text-xs font-black text-white uppercase tracking-widest">MESTRE</span>
                    </div>
                    <div className="p-5 space-y-4">
                        <Field label="ø Tubo" unit="mm" value={M.tubo} isMestre onChange={updM("tubo")} />
                        <Field label="ø Haste" unit="mm" value={M.haste} isMestre onChange={updM("haste")} />
                        <Field label="Curso" unit="mm" value={M.curso} isMestre onChange={updM("curso")} />
                        <Field label="Pressão" unit="bar" value={M.pressao} isMestre onChange={updM("pressao")} />
                    </div>
                </div>

                {/* ESCRAVO */}
                <div className="bg-white rounded-2xl border-2 border-slate-300 overflow-hidden shadow-sm">
                    <div className="bg-slate-600 px-5 py-3 text-center">
                        <span className="text-xs font-black text-white uppercase tracking-widest">ESCRAVO</span>
                    </div>
                    <div className="p-5 space-y-4">
                        <Field label="ø Tubo" unit="mm" value={E.tubo} onChange={updE("tubo")} />
                        <Field label="ø Haste" unit="mm" value={E.haste} onChange={updE("haste")} />
                        <Field label="Curso" unit="mm" value={E.curso} onChange={updE("curso")} />
                        <Field label="Pressão" unit="bar" value={E.pressao} onChange={updE("pressao")} />
                    </div>
                </div>
            </div>

            {/* ── PARÂMETROS COMPARTILHADOS ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    Parâmetros compartilhados
                </p>
                <div className="grid grid-cols-2 gap-4">
                    <Field
                        label="Coef. Segurança" unit="DIN 2413"
                        value={coefSeg} onChange={setCoefSeg}
                    />
                    <Field
                        label="Limite Escoamento" unit="kgf/mm²"
                        value={limEsc} onChange={setLimEsc}
                    />
                </div>
            </div>

            {/* ── RESULTADOS ── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

                {/* Cabeçalho */}
                <div className="grid grid-cols-[1fr_auto_auto] border-b border-slate-200">
                    <div className="px-5 py-3 bg-slate-50">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grandeza</span>
                    </div>
                    <div className="w-36 px-5 py-3 bg-blue-600 text-center border-l border-blue-700">
                        <span className="text-xs font-black text-white uppercase tracking-widest">MESTRE</span>
                    </div>
                    <div className="w-36 px-5 py-3 bg-slate-600 text-center border-l border-slate-700">
                        <span className="text-xs font-black text-white uppercase tracking-widest">ESCRAVO</span>
                    </div>
                </div>

                <table className="w-full">
                    <tbody>
                        <ResultRow
                            label="Área Abrir"
                            mestre={rM ? fmtN(rM.areaAbrir) + " cm²" : dash}
                            escravo={rE ? fmtN(rE.areaAbrir) + " cm²" : dash}
                            rowStyle="bg-emerald-50" valStyle="text-emerald-700 font-bold"
                        />
                        <ResultRow
                            label="Área Fechar"
                            mestre={rM ? fmtN(rM.areaFechar) + " cm²" : dash}
                            escravo={rE ? fmtN(rE.areaFechar) + " cm²" : dash}
                            rowStyle="bg-emerald-50" valStyle="text-emerald-700 font-bold"
                        />
                        <ResultRow
                            label="Volume Abrir"
                            mestre={rM ? fmtN(rM.litAbrir, 3) + " L" : dash}
                            escravo={rE ? fmtN(rE.litAbrir, 3) + " L" : dash}
                            subM={rM ? fmtInt(rM.volAbrir) + " cm³" : undefined}
                            subE={rE ? fmtInt(rE.volAbrir) + " cm³" : undefined}
                            rowStyle="bg-blue-50" valStyle="text-blue-700 font-bold"
                        />
                        <ResultRow
                            label="Volume Fechar"
                            mestre={rM ? fmtN(rM.litFechar, 3) + " L" : dash}
                            escravo={rE ? fmtN(rE.litFechar, 3) + " L" : dash}
                            subM={rM ? fmtInt(rM.volFechar) + " cm³" : undefined}
                            subE={rE ? fmtInt(rE.volFechar) + " cm³" : undefined}
                            rowStyle="bg-blue-50" valStyle="text-blue-700 font-bold"
                        />
                        <ResultRow
                            label="Força Abrir"
                            mestre={rM ? fmtInt(rM.fAbrir) + " Kgf" : dash}
                            escravo={rE ? fmtInt(rE.fAbrir) + " Kgf" : dash}
                            rowStyle="bg-slate-50"
                        />
                        <ResultRow
                            label="Força Fechar"
                            mestre={rM ? fmtInt(rM.fFechar) + " Kgf" : dash}
                            escravo={rE ? fmtInt(rE.fFechar) + " Kgf" : dash}
                            rowStyle="bg-slate-50"
                        />
                        <ResultRow
                            label="Parede Mínima"
                            mestre={rM ? fmtN(rM.paredeMin) + " mm" : dash}
                            escravo={rE ? fmtN(rE.paredeMin) + " mm" : dash}
                        />
                    </tbody>
                </table>

                <div className="flex items-start gap-2 m-4 bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700 leading-relaxed">
                        Força calculada sem fator de segurança adicional à pressão.
                        Parede Mínima pela fórmula de Lamé — vaso de paredes espessas (DIN 2413).
                    </p>
                </div>
            </div>

            {/* ── CTA ── */}
            <button
                onClick={handleCTA}
                className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 active:scale-[0.98] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-500/20 text-base"
            >
                <MessageCircle size={20} />
                Solicitar Orçamento via WhatsApp
            </button>
            <p className="text-center text-xs text-slate-400 -mt-4">
                A mensagem incluirá todos os dados calculados de MESTRE e ESCRAVO
            </p>

            {/* ── Fórmulas ── */}
        {/*    <div className="bg-slate-900 rounded-2xl overflow-hidden">*/}
        {/*        <button*/}
        {/*            onClick={() => setShowFormulas(s => !s)}*/}
        {/*            className="w-full flex items-center justify-between px-5 py-4 text-slate-300 text-sm font-medium hover:text-white transition-colors"*/}
        {/*        >*/}
        {/*            Ver fórmulas utilizadas*/}
        {/*            {showFormulas ? <ChevronUp size={16} /> : <ChevronDown size={16} />}*/}
        {/*        </button>*/}
        {/*        {showFormulas && (*/}
        {/*            <div className="px-5 pb-5 font-mono text-xs text-slate-400 space-y-1.5 border-t border-slate-800 pt-4">*/}
        {/*                <p className="text-slate-300 font-sans font-semibold text-sm mb-3">Cilindro Dupla Ação</p>*/}
        {/*                <p>Ae [cm²]  = π × (D_tubo_cm / 2)²</p>*/}
        {/*                <p>Af [cm²]  = π × ((D_tubo/2)² − (D_haste/2)²)</p>*/}
        {/*                <p>Vol [cm³] = Área × Curso_cm  →  L = Vol / 1000</p>*/}
        {/*                <p>F [kgf]   = Área_cm² × P_bar  (1 bar ≈ 1 kgf/cm²)</p>*/}
        {/*                <div className="border-t border-slate-800 pt-3 mt-3">*/}
        {/*                    <p className="text-slate-300 font-sans mb-2">Parede Mínima — Lamé / DIN 2413</p>*/}
        {/*                    <p>Se = Lim_Esc [kgf/mm²] × 9.80665 / Coef_Seg  [N/mm²]</p>*/}
        {/*                    <p>p  = P_bar × 0.1  [N/mm²]</p>*/}
        {/*                    <p>t  = (D/2) × (√((Se+p)/(Se−p)) − 1)  [mm]</p>*/}
        {/*                </div>*/}
        {/*                {rM && rE && (*/}
        {/*                    <div className="border-t border-slate-800 pt-3 mt-3 text-slate-500 space-y-1">*/}
        {/*                        <p>Mestre  → Ae={fmtN(rM.areaAbrir)} · Af={fmtN(rM.areaFechar)} cm²</p>*/}
        {/*                        <p>Escravo → Ae={fmtN(rE.areaAbrir)} · Af={fmtN(rE.areaFechar)} cm²</p>*/}
        {/*                    </div>*/}
        {/*                )}*/}
        {/*            </div>*/}
        {/*        )}*/}
        {/*    </div>*/}
        </div>
    );
}