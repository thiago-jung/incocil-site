"use client";
import { useState, useCallback } from "react";
import {
    MessageCircle,
    ChevronDown,
    AlertTriangle,
    Gauge,
    Droplets,
    Layers,
    Wind,
    ArrowRightLeft,
    RotateCcw,
} from "lucide-react";
import { track } from "@/lib/analytics";

// ─── Types ────────────────────────────────────────────────────────────────────
type Lang = "pt" | "en" | "es";

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
    vazaoAbrir: number;
    vazaoFechar: number;
    paredeMin: number;
}

type UnitForce = "Kgf" | "N" | "kN" | "lbf" | "tf";
type UnitVol = "L" | "cm³" | "gal";
type UnitArea = "cm²" | "mm²" | "in²";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const I18N = {
    pt: {
        badge: "Ferramenta de Cálculo",
        panelStd: "Cilindro Padrão",
        panelCustom: "Cilindro Personalizado",
        bore: "Ø Interno do Tubo",
        rod: "Ø da Haste",
        stroke: "Curso",
        pressure: "Pressão",
        select: "Selecione",
        errRod: "A haste deve ser menor que o tubo",
        errRequired: "Campo obrigatório",
        resultsTitle: "Resultados Comparativos",
        noResults: "Preencha os campos acima para ver os resultados",
        labelForce: "Força",
        labelExtend: "Extensão",
        labelRetract: "Retração",
        labelVolume: "Volume de Óleo",
        labelArea: "Área Efetiva",
        labelFlow: "Vazão (a 100 mm/s)",
        labelWall: "Espessura mín. de parede",
        quoteFor: "Solicitar orçamento para:",
        colStd: "Padrão",
        colCustom: "Personalizado",
        ctaStd: "Padrão",
        ctaCustom: "Personalizado",
        cta: "Solicitar Orçamento via WhatsApp",
        resetLabel: "Limpar",
        disclaimer: "Valores calculados para fins de dimensionamento preliminar.",
        waGreeting: "Olá INCOCIL! Calculei as especificações abaixo e gostaria de um orçamento:\n\n",
        waType: {
            padrao: "CILINDRO PADRÃO",
            personalizado: "CILINDRO PERSONALIZADO",
        },
        waBore: "ø Tubo",
        waRod: "ø Haste",
        waStroke: "Curso",
        waPressure: "Pressão",
        waResults: "Resultados",
        waFExtend: "Força Extensão",
        waFRetract: "Força Retração",
    },
    en: {
        badge: "Calculation Tool",
        panelStd: "Standard Cylinder",
        panelCustom: "Custom Cylinder",
        bore: "Bore Diameter",
        rod: "Rod Diameter",
        stroke: "Stroke",
        pressure: "Pressure",
        select: "Select",
        errRod: "Rod must be smaller than bore",
        errRequired: "Required field",
        resultsTitle: "Comparison Results",
        noResults: "Fill in the fields above to see results",
        labelForce: "Force",
        labelExtend: "Extension",
        labelRetract: "Retraction",
        labelVolume: "Oil Volume",
        labelArea: "Effective Area",
        labelFlow: "Flow Rate (at 100 mm/s)",
        labelWall: "Min. wall thickness",
        quoteFor: "Request quote for:",
        colStd: "Standard",
        colCustom: "Custom",
        ctaStd: "Standard",
        ctaCustom: "Custom",
        cta: "Request Quote via WhatsApp",
        resetLabel: "Reset",
        disclaimer: "Values calculated for preliminary sizing purposes.",
        waGreeting: "Hello INCOCIL! I calculated the specs below and would like a quote:\n\n",
        waType: {
            padrao: "STANDARD CYLINDER",
            personalizado: "CUSTOM CYLINDER",
        },
        waBore: "Bore",
        waRod: "Rod",
        waStroke: "Stroke",
        waPressure: "Pressure",
        waResults: "Results",
        waFExtend: "Extension Force",
        waFRetract: "Retraction Force",
    },
    es: {
        badge: "Herramienta de Cálculo",
        panelStd: "Cilindro Estándar",
        panelCustom: "Cilindro Personalizado",
        bore: "Ø Interior del Tubo",
        rod: "Ø del Vástago",
        stroke: "Carrera",
        pressure: "Presión",
        select: "Seleccione",
        errRod: "El vástago debe ser menor que el tubo",
        errRequired: "Campo requerido",
        resultsTitle: "Resultados Comparativos",
        noResults: "Complete los campos para ver los resultados",
        labelForce: "Fuerza",
        labelExtend: "Extensión",
        labelRetract: "Retracción",
        labelVolume: "Volumen de Aceite",
        labelArea: "Área Efectiva",
        labelFlow: "Caudal (a 100 mm/s)",
        labelWall: "Espesor mín. de pared",
        quoteFor: "Solicitar presupuesto para:",
        colStd: "Estándar",
        colCustom: "Personalizado",
        ctaStd: "Estándar",
        ctaCustom: "Personalizado",
        cta: "Solicitar Presupuesto vía WhatsApp",
        resetLabel: "Limpiar",
        disclaimer: "Valores calculados para dimensionamiento preliminar.",
        waGreeting: "¡Hola INCOCIL! Calculé las especificaciones y me gustaría un presupuesto:\n\n",
        waType: {
            padrao: "CILINDRO ESTÁNDAR",
            personalizado: "CILINDRO PERSONALIZADO",
        },
        waBore: "Ø Tubo",
        waRod: "Ø Vástago",
        waStroke: "Carrera",
        waPressure: "Presión",
        waResults: "Resultados",
        waFExtend: "Fuerza de Extensión",
        waFRetract: "Fuerza de Retracción",
    },
} as const;

// ─── Standard dimension lists ─────────────────────────────────────────────────
const OPTS_TUBO = ["25.4", "32", "40", "50", "50.8", "57.15", "63.5", "69.85", "70", "76.2", "80", "82.55", "88.9", "101.6", "114.3", "127", "139.7", "152.4", "165.1", "171.45", "203.2"];
const OPTS_HASTE = ["8 inox", "15.87", "16 inox", "19.05", "20", "22.22", "25.4", "30.16", "31.75", "35", "38.1", "40", "44.45", "45.8", "47.62", "49.2", "50", "50.8", "55", "57.15", "60", "63.5", "70", "76.2", "88.9", "101.6"];
const OPTS_CURSO = ["50", "100", "150", "200", "250", "300", "400", "500", "600", "800", "1000", "1200", "1500", "2000"];
const OPTS_PRESSAO = ["100", "140", "160", "175", "180", "200", "210", "250", "315", "350"];

// ─── Math ──────────────────────────────────────────────────────────────────────
function parseNum(s: string): number {
    const clean = s.replace(",", ".").replace(/[^\d.]/g, "");
    return parseFloat(clean) || 0;
}

function calcular(tubo: number, haste: number, curso: number, pressao: number): CylResult {
    const D = tubo / 10;  // cm
    const d = haste / 10;
    const L = curso / 10;
    const P = pressao;

    const areaAbrir = Math.PI * Math.pow(D / 2, 2);
    const areaFechar = Math.PI * (Math.pow(D / 2, 2) - Math.pow(d / 2, 2));

    const volAbrir = (areaAbrir * L) / 1000; // L
    const volFechar = (areaFechar * L) / 1000;

    const fAbrir = areaAbrir * P; // Kgf
    const fFechar = areaFechar * P;

    // Flow at 100 mm/s = 10 cm/s
    const vazaoAbrir = (areaAbrir * 10 * 60) / 1000; // L/min
    const vazaoFechar = (areaFechar * 10 * 60) / 1000;

    // Min wall (Lamé, CS=3, σ_y=50 kgf/mm²)
    const Se = (50 * 9.80665) / 3;
    const p = P * 0.1;
    const paredeMin = Se > p ? (tubo / 2) * (Math.sqrt((Se + p) / (Se - p)) - 1) : NaN;

    return { areaAbrir, areaFechar, volAbrir, volFechar, fAbrir, fFechar, vazaoAbrir, vazaoFechar, paredeMin };
}

// ─── Unit converters ──────────────────────────────────────────────────────────
const toArea = (v: number, u: UnitArea): number => u === "mm²" ? v * 100 : u === "in²" ? v / 6.4516 : v;
const toVol = (v: number, u: UnitVol): number => u === "cm³" ? v * 1000 : u === "gal" ? v * 0.264172 : v;
const toForce = (v: number, u: UnitForce): number => u === "N" ? v * 9.80665 : u === "kN" ? (v * 9.80665) / 1000 : u === "lbf" ? v * 2.20462 : u === "tf" ? v / 1000 : v;

// ─── Formatting ────────────────────────────────────────────────────────────────
function fmtNum(v: number, dec: number, lang: Lang): string {
    if (!isFinite(v) || isNaN(v)) return "—";
    const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US";
    return v.toLocaleString(locale, { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
function fmtInt(v: number, lang: Lang): string {
    if (!isFinite(v) || isNaN(v)) return "—";
    const locale = lang === "pt" ? "pt-BR" : lang === "es" ? "es-ES" : "en-US";
    return Math.round(v).toLocaleString(locale);
}

// ─── Initial values ────────────────────────────────────────────────────────────
const INIT_P: CylInput = { tubo: "50.8", haste: "25.4", curso: "200", pressao: "180" };
const INIT_E: CylInput = { tubo: "50", haste: "30", curso: "300", pressao: "200" };

// ─── Reusable Select Field ─────────────────────────────────────────────────────
interface SelectFieldProps {
    label: string;
    unit: string;
    value: string;
    options: string[];
    placeholder: string;
    error?: string;
    colorClass: string;
    onChange: (v: string) => void;
}

function SelectField({ label, unit, value, options, placeholder, error, colorClass, onChange }: SelectFieldProps) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{unit}</span>
            </div>
            <div className="relative">
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className={`
            w-full appearance-none bg-white border-2 rounded-xl px-4 py-3 pr-10
            font-bold text-lg text-slate-900 outline-none transition-all cursor-pointer
            ${error ? "border-red-300 bg-red-50/30" : `border-slate-200 hover:border-slate-300 ${colorClass}`}
          `}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            {error && (
                <p className="flex items-center gap-1.5 text-xs font-semibold text-red-500">
                    <AlertTriangle size={12} strokeWidth={2.5} /> {error}
                </p>
            )}
        </div>
    );
}

// ─── Text Field ────────────────────────────────────────────────────────────────
interface TextFieldProps {
    label: string;
    unit: string;
    value: string;
    error?: string;
    colorClass: string;
    onChange: (v: string) => void;
}

function TextField({ label, unit, value, error, colorClass, onChange }: TextFieldProps) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{unit}</span>
            </div>
            <input
                type="text"
                inputMode="decimal"
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={e => e.target.select()}
                placeholder="0"
                className={`
          w-full bg-white border-2 rounded-xl px-4 py-3
          font-bold text-lg text-slate-900 outline-none transition-all
          ${error ? "border-red-300 bg-red-50/30" : `border-slate-200 hover:border-slate-300 ${colorClass}`}
        `}
            />
            {error && (
                <p className="flex items-center gap-1.5 text-xs font-semibold text-red-500">
                    <AlertTriangle size={12} strokeWidth={2.5} /> {error}
                </p>
            )}
        </div>
    );
}

// ─── Metric Result Card ────────────────────────────────────────────────────────
interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    extendLabel: string;
    retractLabel: string;
    stdLabel: string; // <-- Adicionado
    cusLabel: string; // <-- Adicionado
    stdExtend: string;
    stdRetract: string;
    cusExtend: string;
    cusRetract: string;
    unitSelector: React.ReactNode;
    hasStd: boolean;
    hasCus: boolean;
    accentColor: string;
}

function MetricCard({
    icon, label, extendLabel, retractLabel,
    stdLabel, cusLabel, // <-- Adicionado
    stdExtend, stdRetract, cusExtend, cusRetract,
    unitSelector, hasStd, hasCus, accentColor,
}: MetricCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-50">
                <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg ${accentColor} flex items-center justify-center`}>
                        {icon}
                    </div>
                    <span className="text-sm font-bold text-slate-700">{label}</span>
                </div>
                {unitSelector}
            </div>

            {/* Values grid */}
            <div className="px-5 py-4">
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                    <span></span>
                    <span className="text-center">{extendLabel}</span>
                    <span className="text-center">{retractLabel}</span>
                </div>
                {/* Standard row */}
                <div className="grid grid-cols-3 gap-2 items-center py-2 border-t border-slate-50">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-500 leading-tight" title={stdLabel}>{stdLabel}</span>
                    </div>
                    <div className="text-center font-black text-slate-900 text-sm tabular-nums">
                        {hasStd ? stdExtend : <span className="text-slate-300">—</span>}
                    </div>
                    <div className="text-center font-black text-slate-900 text-sm tabular-nums">
                        {hasStd ? stdRetract : <span className="text-slate-300">—</span>}
                    </div>
                </div>
                {/* Custom row */}
                <div className="grid grid-cols-3 gap-2 items-center py-2 border-t border-slate-50">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-500 leading-tight" title={cusLabel}>{cusLabel}</span>
                    </div>
                    <div className="text-center font-black text-slate-900 text-sm tabular-nums">
                        {hasCus ? cusExtend : <span className="text-slate-300">—</span>}
                    </div>
                    <div className="text-center font-black text-slate-900 text-sm tabular-nums">
                        {hasCus ? cusRetract : <span className="text-slate-300">—</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Unit Selector ─────────────────────────────────────────────────────────────
interface UnitSelectorProps<T extends string> {
    value: T;
    options: { v: T; label: string }[];
    onChange: (v: T) => void;
}
function UnitSelector<T extends string>({ value, options, onChange }: UnitSelectorProps<T>) {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value as T)}
            className="text-xs font-bold text-slate-600 bg-slate-100 border-0 rounded-lg px-2 py-1 cursor-pointer outline-none hover:bg-slate-200 transition-colors"
        >
            {options.map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
        </select>
    );
}

// ─── Main Component ────────────────────────────────────────────────────────────
interface CylCalculatorProps {
    lang?: Lang;
}

export default function CylCalculator({ lang = "pt" }: CylCalculatorProps) {
    const t = I18N[lang] ?? I18N.pt;

    // Inputs
    const [P, setP] = useState<CylInput>(INIT_P);
    const [E, setE] = useState<CylInput>(INIT_E);

    // Units
    const [uForce, setUForce] = useState<UnitForce>("Kgf");
    const [uVol, setUVol] = useState<UnitVol>("L");
    const [uArea, setUArea] = useState<UnitArea>("cm²");

    // Quote selection
    const [quoteType, setQuoteType] = useState<"padrao" | "personalizado">("padrao");

    const updP = useCallback((k: keyof CylInput) => (v: string) => setP(p => ({ ...p, [k]: v })), []);
    const updE = useCallback((k: keyof CylInput) => (v: string) => setE(e => ({ ...e, [k]: v })), []);

    const pT = parseNum(P.tubo), pH = parseNum(P.haste), pC = parseNum(P.curso), pP_val = parseNum(P.pressao);
    const eT = parseNum(E.tubo), eH = parseNum(E.haste), eC = parseNum(E.curso), eP_val = parseNum(E.pressao);

    const errP = pT > 0 && pH > 0 && pH >= pT ? t.errRod : undefined;
    const errE = eT > 0 && eH > 0 && eH >= eT ? t.errRod : undefined;

    const rP = !errP && pT > 0 && pH > 0 && pC > 0 && pP_val > 0 ? calcular(pT, pH, pC, pP_val) : null;
    const rE = !errE && eT > 0 && eH > 0 && eC > 0 && eP_val > 0 ? calcular(eT, eH, eC, eP_val) : null;

    const hasAny = rP || rE;

    // Build WhatsApp message
    function buildMsg() {
        const isStd = quoteType === "padrao";
        const inp = isStd ? P : E;
        const res = isStd ? rP : rE;
        const typeLabel = isStd ? t.waType.padrao : t.waType.personalizado;

        return `${t.waGreeting}*${typeLabel}*\n• ${t.waBore}: ${inp.tubo} mm\n• ${t.waRod}: ${inp.haste} mm\n• ${t.waStroke}: ${inp.curso} mm\n• ${t.waPressure}: ${inp.pressao} bar\n\n*${t.waResults}:*\n• ${t.waFExtend}: ${res ? fmtInt(res.fAbrir, lang) : "—"} Kgf\n• ${t.waFRetract}: ${res ? fmtInt(res.fFechar, lang) : "—"} Kgf`;
    }

    function handleCTA() {
        const d = quoteType === "padrao" ? P : E;
        track.whatsappClick("calculadora", `${quoteType}:${d.tubo}mm`);
        window.open(`https://wa.me/555184468231?text=${encodeURIComponent(buildMsg())}`, "_blank");
    }

    function handleReset() {
        setP(INIT_P);
        setE(INIT_E);
    }

    // ─── Metric card helpers ─────────────────────────────────────────────────────
    const forceUnits: { v: UnitForce; label: string }[] = [
        { v: "Kgf", label: "Kgf" }, { v: "N", label: "N" },
        { v: "kN", label: "kN" }, { v: "lbf", label: "lbf" }, { v: "tf", label: "tf" },
    ];
    const volUnits: { v: UnitVol; label: string }[] = [
        { v: "L", label: "L" }, { v: "cm³", label: "cm³" }, { v: "gal", label: "gal" },
    ];
    const areaUnits: { v: UnitArea; label: string }[] = [
        { v: "cm²", label: "cm²" }, { v: "mm²", label: "mm²" }, { v: "in²", label: "in²" },
    ];

    const forceDecimals = uForce === "kN" ? 2 : uForce === "N" ? 0 : 0;
    const volDecimals = uVol === "cm³" ? 0 : 3;
    const areaDecimals = uArea === "mm²" ? 0 : 2;

    return (
        <div className="max-w-5xl mx-auto space-y-6 font-sans">

            {/* ── INPUT PANELS ─────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Standard — dropdowns */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-4 bg-emerald-700">
                        <div className="w-2 h-2 rounded-full bg-emerald-300" />
                        <span className="text-sm font-black text-white uppercase tracking-widest">{t.panelStd}</span>
                    </div>
                    <div className="p-5 space-y-4">
                        <SelectField
                            label={t.bore} unit="mm" value={P.tubo} options={OPTS_TUBO}
                            placeholder={t.select} colorClass="focus:border-emerald-500"
                            onChange={updP("tubo")}
                        />
                        <SelectField
                            label={t.rod} unit="mm" value={P.haste} options={OPTS_HASTE}
                            placeholder={t.select} colorClass="focus:border-emerald-500"
                            error={errP} onChange={updP("haste")}
                        />
                        <SelectField
                            label={t.stroke} unit="mm" value={P.curso} options={OPTS_CURSO}
                            placeholder={t.select} colorClass="focus:border-emerald-500"
                            onChange={updP("curso")}
                        />
                        <SelectField
                            label={t.pressure} unit="bar" value={P.pressao} options={OPTS_PRESSAO}
                            placeholder={t.select} colorClass="focus:border-emerald-500"
                            onChange={updP("pressao")}
                        />
                    </div>
                </div>

                {/* Custom — text inputs */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-4 bg-slate-700">
                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                        <span className="text-sm font-black text-white uppercase tracking-widest">{t.panelCustom}</span>
                    </div>
                    <div className="p-5 space-y-4">
                        <TextField
                            label={t.bore} unit="mm" value={E.tubo}
                            colorClass="focus:border-slate-500" onChange={updE("tubo")}
                        />
                        <TextField
                            label={t.rod} unit="mm" value={E.haste}
                            colorClass="focus:border-slate-500" error={errE} onChange={updE("haste")}
                        />
                        <TextField
                            label={t.stroke} unit="mm" value={E.curso}
                            colorClass="focus:border-slate-500" onChange={updE("curso")}
                        />
                        <TextField
                            label={t.pressure} unit="bar" value={E.pressao}
                            colorClass="focus:border-slate-500" onChange={updE("pressao")}
                        />
                    </div>
                </div>
            </div>

            {/* ── RESULTS ──────────────────────────────────────────────────────────── */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                {/* Results header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white">
                    <div className="flex items-center gap-2.5">
                        <ArrowRightLeft size={17} className="text-slate-500" />
                        <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">{t.resultsTitle}</span>
                    </div>
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <RotateCcw size={13} /> {t.resetLabel}
                    </button>
                </div>

                {!hasAny ? (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                        <Gauge size={36} className="mb-3 opacity-30" />
                        <p className="text-sm font-medium">{t.noResults}</p>
                    </div>
                ) : (
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                        {/* Force */}
                        <MetricCard
                            icon={<Gauge size={15} className="text-emerald-600" />}
                            accentColor="bg-emerald-50"
                            label={t.labelForce}
                            extendLabel={t.labelExtend}
                            retractLabel={t.labelRetract}
                            stdLabel={t.colStd} // <-- Adicionado
                            cusLabel={t.colCustom} // <-- Adicionado
                            hasStd={!!rP} hasCus={!!rE}
                            stdExtend={rP ? fmtNum(toForce(rP.fAbrir, uForce), forceDecimals, lang) + ` ${uForce}` : "—"}
                            stdRetract={rP ? fmtNum(toForce(rP.fFechar, uForce), forceDecimals, lang) + ` ${uForce}` : "—"}
                            cusExtend={rE ? fmtNum(toForce(rE.fAbrir, uForce), forceDecimals, lang) + ` ${uForce}` : "—"}
                            cusRetract={rE ? fmtNum(toForce(rE.fFechar, uForce), forceDecimals, lang) + ` ${uForce}` : "—"}
                            unitSelector={<UnitSelector value={uForce} options={forceUnits} onChange={setUForce} />}
                        />

                        {/* Volume */}
                        <MetricCard
                            icon={<Droplets size={15} className="text-blue-500" />}
                            accentColor="bg-blue-50"
                            label={t.labelVolume}
                            extendLabel={t.labelExtend}
                            retractLabel={t.labelRetract}
                            stdLabel={t.colStd} // <-- Adicionado
                            cusLabel={t.colCustom} // <-- Adicionado
                            hasStd={!!rP} hasCus={!!rE}
                            stdExtend={rP ? fmtNum(toVol(rP.volAbrir, uVol), volDecimals, lang) + ` ${uVol}` : "—"}
                            stdRetract={rP ? fmtNum(toVol(rP.volFechar, uVol), volDecimals, lang) + ` ${uVol}` : "—"}
                            cusExtend={rE ? fmtNum(toVol(rE.volAbrir, uVol), volDecimals, lang) + ` ${uVol}` : "—"}
                            cusRetract={rE ? fmtNum(toVol(rE.volFechar, uVol), volDecimals, lang) + ` ${uVol}` : "—"}
                            unitSelector={<UnitSelector value={uVol} options={volUnits} onChange={setUVol} />}
                        />

                        {/* Area */}
                        <MetricCard
                            icon={<Layers size={15} className="text-violet-500" />}
                            accentColor="bg-violet-50"
                            label={t.labelArea}
                            extendLabel={t.labelExtend}
                            retractLabel={t.labelRetract}
                            stdLabel={t.colStd} // <-- Adicionado
                            cusLabel={t.colCustom} // <-- Adicionado
                            hasStd={!!rP} hasCus={!!rE}
                            stdExtend={rP ? fmtNum(toArea(rP.areaAbrir, uArea), areaDecimals, lang) + ` ${uArea}` : "—"}
                            stdRetract={rP ? fmtNum(toArea(rP.areaFechar, uArea), areaDecimals, lang) + ` ${uArea}` : "—"}
                            cusExtend={rE ? fmtNum(toArea(rE.areaAbrir, uArea), areaDecimals, lang) + ` ${uArea}` : "—"}
                            cusRetract={rE ? fmtNum(toArea(rE.areaFechar, uArea), areaDecimals, lang) + ` ${uArea}` : "—"}
                            unitSelector={<UnitSelector value={uArea} options={areaUnits} onChange={setUArea} />}
                        />

                        {/* Flow Rate */}
                        <MetricCard
                            icon={<Wind size={15} className="text-amber-500" />}
                            accentColor="bg-amber-50"
                            label={t.labelFlow}
                            extendLabel={t.labelExtend}
                            retractLabel={t.labelRetract}
                            stdLabel={t.colStd} // <-- Adicionado
                            cusLabel={t.colCustom} // <-- Adicionado
                            hasStd={!!rP} hasCus={!!rE}
                            stdExtend={rP ? fmtNum(rP.vazaoAbrir, 1, lang) + " L/min" : "—"}
                            stdRetract={rP ? fmtNum(rP.vazaoFechar, 1, lang) + " L/min" : "—"}
                            cusExtend={rE ? fmtNum(rE.vazaoAbrir, 1, lang) + " L/min" : "—"}
                            cusRetract={rE ? fmtNum(rE.vazaoFechar, 1, lang) + " L/min" : "—"}
                            unitSelector={<span className="text-xs text-slate-400 font-semibold">L/min</span>}
                        />
                    </div>
                )}
            </div>

            {/* ── CTA SECTION ──────────────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
                {/* Quote type selector */}
                <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{t.quoteFor}</p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setQuoteType("padrao")}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${quoteType === "padrao"
                                ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                                : "border-slate-200 text-slate-500 hover:border-slate-300"
                                }`}
                        >
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            {t.ctaStd}
                        </button>
                        <button
                            onClick={() => setQuoteType("personalizado")}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${quoteType === "personalizado"
                                ? "border-slate-600 bg-slate-50 text-slate-800"
                                : "border-slate-200 text-slate-500 hover:border-slate-300"
                                }`}
                        >
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                            {t.ctaCustom}
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleCTA}
                    className="w-full flex items-center justify-center gap-3 bg-emerald-700 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-700/20 text-base"
                >
                    <MessageCircle size={20} />
                    {t.cta}
                </button>

                <p className="text-center text-xs text-slate-400">{t.disclaimer}</p>
            </div>
        </div>
    );
}