"use client";
import { useState, useCallback } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { sendEmailAction } from "@/actions/sendEmail";

const STAND_INFO = "Hall 17, D52";
const WHATSAPP = "555184468231";

// Mensagens de validação (formulário é sempre em inglês — feira internacional)
const ERRORS = {
    required: "Required field",
    email: "Invalid email address",
    minLength: "Please provide more detail (min. 10 characters)",
} as const;

function validate(name: string, value: string): string {
    if (!value.trim()) return ERRORS.required;
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return ERRORS.email;
    if (name === "need" && value.trim().length < 10) return ERRORS.minLength;
    return "";
}

// ── Field helper ───────────────────────────────────────────────
interface FieldProps {
    id: string;
    name: string;
    type?: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    value: string;
    error?: string;
    touched?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function Field({ id, name, type = "text", label, placeholder, required,
    rows, value, error, touched, onChange, onBlur }: FieldProps) {
    const hasError = touched && error;
    const isOk = touched && !error && value.trim();

    const base =
        "w-full bg-neutral-800 border rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none transition-all";
    const state = hasError
        ? "border-red-500 focus:border-red-400 bg-red-950/20"
        : isOk
            ? "border-green-600 focus:border-green-500"
            : "border-neutral-700 focus:border-green-500";

    return (
        <div>
            <label htmlFor={id} className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                {label} {required && <span className="text-red-400">*</span>}
            </label>

            {rows ? (
                <textarea
                    id={id} name={name} rows={rows} required={required}
                    placeholder={placeholder} value={value}
                    onChange={onChange} onBlur={onBlur}
                    className={`${base} ${state} resize-none`}
                />
            ) : (
                <input
                    id={id} name={name} type={type} required={required}
                    placeholder={placeholder} value={value}
                    onChange={onChange} onBlur={onBlur}
                    className={`${base} ${state}`}
                />
            )}

            <div className={`flex items-center gap-1.5 mt-1.5 transition-all duration-200 ${hasError ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
                <AlertCircle size={12} className="text-red-400 shrink-0" />
                <p className="text-xs text-red-400">{error}</p>
            </div>
        </div>
    );
}

// ── Main component ─────────────────────────────────────────────
export default function HannoverLeadForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
    const [values, setValues] = useState({ name: "", company: "", email: "", need: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
        if (touched[name]) {
            setErrors((er) => ({ ...er, [name]: validate(name, value) }));
        }
    }, [touched]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
        setErrors((er) => ({ ...er, [name]: validate(name, value) }));
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Valida todos os campos obrigatórios
        const requiredFields = ["name", "company", "email"] as const;
        const newErrors: Record<string, string> = {};
        requiredFields.forEach((f) => { newErrors[f] = validate(f, values[f]); });
        if (values.need) newErrors.need = validate("need", values.need);

        setErrors(newErrors);
        setTouched({ name: true, company: true, email: true, need: true });

        if (Object.values(newErrors).some(Boolean)) return;

        setStatus("loading");
        track.meetingSchedule("hannover-lead-form");

        try {
            await sendEmailAction({
                nome: `${values.name} (${values.company})`,
                email: values.email,
                telefone: "Not provided on fair form",
                mensagem: values.need || "Meeting scheduling request at the fair.",
                produto: `Meeting Scheduling — Hannover Messe 2026 (${STAND_INFO})`,
            });
        } catch (err) {
            console.error("Email error:", err);
        }

        const msg = `Hello INCOCIL! 👋
I would like to schedule a meeting at Hannover Messe 2026 (${STAND_INFO}).

*Name:* ${values.name}
*Company:* ${values.company}
*Email:* ${values.email}
*Our need:* ${values.need || "Not specified"}`;

        window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
        setStatus("success");
    }

    if (status === "success") {
        return (
            <div className="text-center py-10">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp opened!</h3>
                <p className="text-slate-400 text-sm">
                    We look forward to meeting you at {STAND_INFO}.
                </p>
                <button
                    onClick={() => {
                        setStatus("idle");
                        setValues({ name: "", company: "", email: "", need: "" });
                        setTouched({});
                        setErrors({});
                    }}
                    className="mt-6 text-sm text-slate-500 underline hover:text-slate-300 transition-colors"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid sm:grid-cols-2 gap-4">
                <Field id="name" name="name" label="Full Name" placeholder="John Smith"
                    required value={values.name} error={errors.name} touched={touched.name}
                    onChange={handleChange} onBlur={handleBlur} />
                <Field id="company" name="company" label="Company" placeholder="Acme Corp"
                    required value={values.company} error={errors.company} touched={touched.company}
                    onChange={handleChange} onBlur={handleBlur} />
            </div>

            <Field id="email" name="email" type="email" label="Business Email"
                placeholder="john@acmecorp.com" required
                value={values.email} error={errors.email} touched={touched.email}
                onChange={handleChange} onBlur={handleBlur} />

            <Field id="need" name="need" label="What do you need?" rows={3}
                placeholder="e.g. Custom hydraulic cylinders for agriculture, Ø 100mm, 600mm stroke..."
                value={values.need} error={errors.need} touched={touched.need}
                onChange={handleChange} onBlur={handleBlur} />

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-50 text-white font-bold py-4 rounded-full transition-colors text-base active:scale-95"
            >
                {status === "loading" ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Opening WhatsApp...
                    </>
                ) : (
                    <>Schedule Meeting via WhatsApp <Send size={18} /></>
                )}
            </button>

            <p className="text-xs text-slate-600 text-center">
                Your data is used only to prepare our conversation.
            </p>
        </form>
    );
}