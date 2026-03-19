"use client";
import { useState, useCallback } from "react";
import { MessageCircle, Info, ChevronDown } from "lucide-react";

// --- Analytics Mock ---
const track = { whatsappClick: (a: string, b: string) => console.log(a, b) };

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
    fAbrir: number;
    fFechar: number;
    paredeMin: number;
}

type UnitArea = "cm²" | "mm²" | "pol²";
type UnitVol = "L" | "cm³";
type UnitForce = "Kgf" | "N" | "lbf";

// ─── Listas de Medidas Padrão ────────────────────────────────────────────────
const OPCOES_TUBO = ["25.4", "32", "40", "50", "50.8", "57.15", "63.5", "69.85", "70", "76.2", "80", "82.55", "88.9", "101.6", "114.3", "127", "139.7", "152.4", "165.1", "171.45", "203.2"];
const OPCOES_HASTE = ["25.4", "8 inox", "15.87", "16 inox", "19.05", "20", "22.22", "30.16", "31.75", "35", "38.1", "40", "44.45", "45.8", "47.62", "49.2", "50", "50.8", "55", "57.15", "60", "63.5", "70", "76.2", "88.9", "101.6"];
const OPCOES_CURSO = ["50", "100", "150", "200", "250", "300", "400", "500", "600", "800", "1000"];
const OPCOES_PRESSAO = ["100", "160", "175", "180", "200", "210", "250", "315"];

// ─── Fórmulas e Conversões ───────────────────────────────────────────────────

function parse(s: string): number {
    if (!s) return 0;
    const clean = s.replace(",", ".");
    return parseFloat(clean) || 0; // Garante que não retorne NaN solto na string "inox" se falhar
}

// Pequeno ajuste para ignorar a palavra "inox" no cálculo da Haste
function parseHaste(s: string): number {
    if (!s) return 0;
    const clean = s.replace(" inox", "").replace(",", ".");
    return parseFloat(clean) || 0;
}

function calcular(
    tuboMm: number, hasteMm: number, cursoMm: number, pressaoBar: number,
    coefSeg: number, limEsc: number
): CylResult {
    const D = tuboMm / 10;
    const d = hasteMm / 10;
    const L = cursoMm / 10;
    const P = pressaoBar;

    const areaAbrir = Math.PI * Math.pow(D / 2, 2);
    const areaFechar = Math.PI * (Math.pow(D / 2, 2) - Math.pow(d / 2, 2));

    const volAbrirCm3 = areaAbrir * L;
    const volFecharCm3 = areaFechar * L;

    const Se = (limEsc * 9.80665) / coefSeg;
    const p = P * 0.1;
    const paredeMin = Se > p ? (tuboMm / 2) * (Math.sqrt((Se + p) / (Se - p)) - 1) : NaN;

    return {
        areaAbrir,
        areaFechar,
        volAbrir: volAbrirCm3 / 1000,
        volFechar: volFecharCm3 / 1000,
        fAbrir: areaAbrir * P,
        fFechar: areaFechar * P,
        paredeMin,
    };
}

const convArea = (valCm2: number, unit: UnitArea) => {
    if (unit === "mm²") return valCm2 * 100;
    if (unit === "pol²") return valCm2 / 6.4516;
    return valCm2;
};

const convVol = (valL: number, unit: UnitVol) => {
    if (unit === "cm³") return valL * 1000;
    return valL;
};

const convForce = (valKgf: number, unit: UnitForce) => {
    if (unit === "N") return valKgf * 9.80665;
    if (unit === "lbf") return valKgf * 2.20462;
    return valKgf;
};

// ─── Formatação ──────────────────────────────────────────────────────────────
const fmtN = (v: number, dec = 2) => isNaN(v) || !isFinite(v) ? "—" : v.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec });
const fmtInt = (v: number) => isNaN(v) || !isFinite(v) ? "—" : Math.round(v).toLocaleString("pt-BR");

// ─── Sub-componentes de UI ───────────────────────────────────────────────────

interface FieldProps {
    label: string;
    subLabel?: string;
    unit: string;
    value: string;
    colorTheme: "green" | "slate";
    error?: string; // NOVO PROP PARA ERRO
    onChange: (v: string) => void;
}

// Campo de Texto Livre (Usado no Personalizado)
function Field({ label, subLabel, unit, value, colorTheme, error, onChange }: FieldProps) {
    return (
        <div className="mb-4 last:mb-0">
            <div className="flex items-center gap-1.5 mb-1.5 pl-1">
                <label className="text-sm font-bold text-slate-800">{label}</label>
                {subLabel && <span className="text-sm font-bold text-slate-800">{subLabel}</span>}
            </div>
            <div className="relative">
                <input
                    type="text"
                    inputMode="decimal"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onFocus={e => e.target.select()}
                    className={`w-full text-right text-xl font-black tabular-nums border-2 rounded-xl pl-4 pr-12 py-3
                    outline-none transition-all placeholder:text-slate-300
                    ${error ? "border-red-400 focus:border-red-500 text-red-900 bg-red-50/50" :
                            colorTheme === "green"
                                ? "border-green-600/30 focus:border-green-700 text-green-900 bg-white"
                                : "border-slate-300 focus:border-slate-600 text-slate-900 bg-white"
                        }`}
                    placeholder="0"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="text-xs font-bold text-slate-300 bg-slate-50 px-1.5 py-0.5 rounded uppercase">{unit}</span>
                </div>
            </div>
            {/* MENSAGEM DE ERRO */}
            {error && <p className="text-xs text-red-500 font-bold mt-1.5 pl-1">{error}</p>}
        </div>
    );
}

interface SelectFieldProps extends FieldProps {
    options: string[];
}

// Campo de Seleção Fechada (Usado no Padrão)
function SelectField({ label, subLabel, unit, value, options, colorTheme, error, onChange }: SelectFieldProps) {
    return (
        <div className="mb-4 last:mb-0">
            <div className="flex items-center gap-1.5 mb-1.5 pl-1">
                <label className="text-sm font-bold text-slate-800">{label}</label>
                {subLabel && <span className="text-sm font-bold text-slate-800">{subLabel}</span>}
            </div>
            <div className="relative">
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className={`w-full text-right text-xl font-black tabular-nums border-2 rounded-xl pl-4 pr-[70px] py-3 appearance-none cursor-pointer
                    outline-none transition-all
                    ${error ? "border-red-400 focus:border-red-500 text-red-900 bg-red-50/50" :
                            colorTheme === "green"
                                ? "border-green-600/30 focus:border-green-700 text-green-900 bg-green-50/30"
                                : "border-slate-300 focus:border-slate-600 text-slate-900 bg-slate-50/30"
                        }`}
                >
                    <option value="" disabled>Selecione</option>
                    {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-400 bg-white/80 px-1.5 py-0.5 rounded uppercase">{unit}</span>
                    <ChevronDown size={18} className={error ? "text-red-400" : colorTheme === "green" ? "text-green-600" : "text-slate-400"} />
                </div>
            </div>
            {/* MENSAGEM DE ERRO */}
            {error && <p className="text-xs text-red-500 font-bold mt-1.5 pl-1">{error}</p>}
        </div>
    );
}

// ─── Estado Inicial ───────────────────────────────────────────────────────────
const INIT_P: CylInput = { tubo: "50.8", haste: "25.4", curso: "200", pressao: "180" };
const INIT_E: CylInput = { tubo: "50", haste: "30", curso: "300", pressao: "200" };

// ─── Componente Principal ────────────────────────────────────────────────────
export default function CylCalculator() {
    const [P, setP] = useState<CylInput>(INIT_P);
    const [E, setE] = useState<CylInput>(INIT_E);

    // Novo estado para controlar qual orçamento será enviado via WhatsApp
    const [orcamentoSelecionado, setOrcamentoSelecionado] = useState<"padrao" | "personalizado">("padrao");

    const coefSeg = 3;
    const limEsc = 50;

    const [uArea, setUArea] = useState<UnitArea>("cm²");
    const [uVol, setUVol] = useState<UnitVol>("L");
    const [uForce, setUForce] = useState<UnitForce>("Kgf");

    const updP = useCallback((key: keyof CylInput) => (v: string) => setP(prev => ({ ...prev, [key]: v })), []);
    const updE = useCallback((key: keyof CylInput) => (v: string) => setE(prev => ({ ...prev, [key]: v })), []);

    // Extração dos valores numéricos (com função especial para Haste, para ignorar o "inox")
    const pT = parse(P.tubo), pH = parseHaste(P.haste), pC = parse(P.curso), pP = parse(P.pressao);
    const eT = parse(E.tubo), eH = parseHaste(E.haste), eC = parse(E.curso), eP = parse(E.pressao);

    // Verificação de erro (Haste maior ou igual ao Tubo)
    const errP = (pT > 0 && pH > 0 && pH >= pT) ? "A haste deve ser menor que o tubo." : undefined;
    const errE = (eT > 0 && eH > 0 && eH >= eT) ? "A haste deve ser menor que o tubo." : undefined;

    // Cálculo condicionado a ausência de erro
    const rP = (!errP && pT > 0 && pH > 0 && pC > 0 && pP > 0) ? calcular(pT, pH, pC, pP, coefSeg, limEsc) : null;
    const rE = (!errE && eT > 0 && eH > 0 && eC > 0 && eP > 0) ? calcular(eT, eH, eC, eP, coefSeg, limEsc) : null;

    // Construtor da Mensagem dinâmica dependendo da Flag selecionada
    const buildMsg = () => {
        if (orcamentoSelecionado === "padrao") {
            return `Olá INCOCIL! Calculei as especificações abaixo e gostaria de um orçamento:

*CILINDRO PADRÃO*
• ø Tubo: ${P.tubo} mm
• ø Haste: ${P.haste} mm
• Curso: ${P.curso} mm
• Pressão: ${P.pressao} bar

*Resultados:*
• Força Abrir: ${rP ? fmtInt(rP.fAbrir) : "—"} Kgf
• Força Fechar: ${rP ? fmtInt(rP.fFechar) : "—"} Kgf`;
        } else {
            return `Olá INCOCIL! Calculei as especificações abaixo e gostaria de um orçamento:

*CILINDRO PERSONALIZADO*
• ø Tubo: ${E.tubo} mm
• ø Haste: ${E.haste} mm
• Curso: ${E.curso} mm
• Pressão: ${E.pressao} bar

*Resultados:*
• Força Abrir: ${rE ? fmtInt(rE.fAbrir) : "—"} Kgf
• Força Fechar: ${rE ? fmtInt(rE.fFechar) : "—"} Kgf`;
        }
    };

    const handleCTA = () => {
        const d = orcamentoSelecionado === "padrao" ? P : E;
        track.whatsappClick("calculadora", `${orcamentoSelecionado}:${d.tubo}mm`);
        window.open(`https://wa.me/555184468231?text=${encodeURIComponent(buildMsg())}`, "_blank");
    };

    const dash = "—";

    return (
        <div className="space-y-6 max-w-4xl mx-auto font-sans p-4">

            {/* ── PAINÉIS DE INPUT ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* PADRÃO */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-[#117b4c] px-5 py-4 text-center">
                        <span className="text-sm font-black text-white uppercase tracking-wider">CILINDRO (PADRÃO)</span>
                    </div>
                    <div className="p-6">
                        <SelectField label="ø Interno do Tubo" unit="mm" value={P.tubo} options={OPCOES_TUBO} colorTheme="green" onChange={updP("tubo")} />
                        <SelectField label="ø Haste" unit="mm" value={P.haste} options={OPCOES_HASTE} colorTheme="green" error={errP} onChange={updP("haste")} />
                        <SelectField label="Curso" unit="mm" value={P.curso} options={OPCOES_CURSO} colorTheme="green" onChange={updP("curso")} />
                        <SelectField label="Pressão" unit="bar" value={P.pressao} options={OPCOES_PRESSAO} colorTheme="green" onChange={updP("pressao")} />
                    </div>
                </div>

                {/* PERSONALIZADO */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-[#475569] px-5 py-4 text-center">
                        <span className="text-sm font-black text-white uppercase tracking-wider">CILINDRO (PERSONALIZADO)</span>
                    </div>
                    <div className="p-6">
                        <Field label="ø Interno do Tubo" unit="mm" value={E.tubo} colorTheme="slate" onChange={updE("tubo")} />
                        <Field label="ø Haste" unit="mm" value={E.haste} colorTheme="slate" error={errE} onChange={updE("haste")} />
                        <Field label="Curso" unit="mm" value={E.curso} colorTheme="slate" onChange={updE("curso")} />
                        <Field label="Pressão" unit="bar" value={E.pressao} colorTheme="slate" onChange={updE("pressao")} />
                    </div>
                </div>
            </div>

            {/* ── RESULTADOS ── */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-[1fr_auto_auto] border-b border-slate-200">
                    <div className="px-5 py-3 bg-slate-50 flex items-center">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Comparativo</span>
                    </div>
                    <div className="w-40 px-5 py-3 bg-[#117b4c] text-center">
                        <span className="text-xs font-black text-white uppercase tracking-widest">PADRÃO</span>
                    </div>
                    <div className="w-40 px-5 py-3 bg-[#475569] text-center">
                        <span className="text-xs font-black text-white uppercase tracking-widest">PERSONALIZADO</span>
                    </div>
                </div>

                <table className="w-full">
                    <tbody>

                        {/* FORÇA */}
                        <tr className="border-b border-slate-100 bg-slate-50">
                            <td className="py-4 pl-5 pr-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-700">Força (Abrir / Fechar)</span>
                                    <select value={uForce} onChange={e => setUForce(e.target.value as UnitForce)} className="text-xs font-bold bg-white border border-slate-200 rounded px-2 py-1 text-slate-700 cursor-pointer outline-none">
                                        <option value="Kgf">Kgf</option>
                                        <option value="N">Newtons (N)</option>
                                        <option value="lbf">lbf</option>
                                    </select>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-right font-bold tabular-nums text-slate-900 text-sm">
                                {rP ? `${fmtInt(convForce(rP.fAbrir, uForce))} / ${fmtInt(convForce(rP.fFechar, uForce))}` : dash}
                            </td>
                            <td className="py-4 px-5 text-right font-bold tabular-nums text-slate-900 text-sm">
                                {rE ? `${fmtInt(convForce(rE.fAbrir, uForce))} / ${fmtInt(convForce(rE.fFechar, uForce))}` : dash}
                            </td>
                        </tr>

                        {/* VOLUME */}
                        <tr className="border-b border-slate-100 bg-blue-50/50">
                            <td className="py-4 pl-5 pr-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-700">Volume (Abrir / Fechar)</span>
                                    <select value={uVol} onChange={e => setUVol(e.target.value as UnitVol)} className="text-xs font-bold bg-white border border-slate-200 rounded px-2 py-1 text-blue-700 cursor-pointer outline-none">
                                        <option value="L">Litros (L)</option>
                                        <option value="cm³">cm³</option>
                                    </select>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-right font-bold tabular-nums text-blue-700 text-sm">
                                {rP ? `${fmtN(convVol(rP.volAbrir, uVol))} / ${fmtN(convVol(rP.volFechar, uVol))}` : dash}
                            </td>
                            <td className="py-4 px-5 text-right font-bold tabular-nums text-blue-700 text-sm">
                                {rE ? `${fmtN(convVol(rE.volAbrir, uVol))} / ${fmtN(convVol(rE.volFechar, uVol))}` : dash}
                            </td>
                        </tr>


                        {/* ÁREA */}
                        <tr className="border-b border-slate-100 bg-emerald-50/50">
                            <td className="py-4 pl-5 pr-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-slate-700">Área (Abrir / Fechar)</span>
                                    <select value={uArea} onChange={e => setUArea(e.target.value as UnitArea)} className="text-xs font-bold bg-white border border-slate-200 rounded px-2 py-1 text-emerald-700 cursor-pointer outline-none">
                                        <option value="cm²">cm²</option>
                                        <option value="mm²">mm²</option>
                                        <option value="pol²">pol²</option>
                                    </select>
                                </div>
                            </td>
                            <td className="py-4 px-5 text-right font-bold tabular-nums text-emerald-700 text-sm">
                                {rP ? `${fmtN(convArea(rP.areaAbrir, uArea))} / ${fmtN(convArea(rP.areaFechar, uArea))}` : dash}
                            </td>
                            <td className="py-4 px-5 text-right font-bold tabular-nums text-emerald-700 text-sm">
                                {rE ? `${fmtN(convArea(rE.areaAbrir, uArea))} / ${fmtN(convArea(rE.areaFechar, uArea))}` : dash}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* ── SELETOR DE ORÇAMENTO E CTA ── */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-5">
                <div>
                    <p className="text-sm font-bold text-slate-800 text-center mb-3">Qual configuração deseja solicitar no orçamento?</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
                        <label className="flex items-center justify-center gap-2 cursor-pointer bg-white border border-slate-200 px-4 py-2.5 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                            <input
                                type="radio"
                                name="orcamento"
                                value="padrao"
                                checked={orcamentoSelecionado === "padrao"}
                                onChange={() => setOrcamentoSelecionado("padrao")}
                                className="w-4 h-4 text-green-600 focus:ring-green-500 cursor-pointer"
                            />
                            <span className="text-sm font-bold text-slate-700">Cilindro Padrão</span>
                        </label>
                        <label className="flex items-center justify-center gap-2 cursor-pointer bg-white border border-slate-200 px-4 py-2.5 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                            <input
                                type="radio"
                                name="orcamento"
                                value="personalizado"
                                checked={orcamentoSelecionado === "personalizado"}
                                onChange={() => setOrcamentoSelecionado("personalizado")}
                                className="w-4 h-4 text-slate-600 focus:ring-slate-500 cursor-pointer"
                            />
                            <span className="text-sm font-bold text-slate-700">Cilindro Personalizado</span>
                        </label>
                    </div>
                </div>

                <button
                    onClick={handleCTA}
                    className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 active:scale-[0.99] text-white font-bold py-4 rounded-xl transition-all shadow-md text-base"
                >
                    <MessageCircle size={20} />
                    Solicitar Orçamento via WhatsApp
                </button>
            </div>
        </div>
    );
}