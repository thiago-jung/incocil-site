"use client";
import { useState, useCallback } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { sendEmailAction } from "@/actions/sendEmail";
import { track } from "@/lib/analytics";

interface ProductFormProps {
    productName: string;
    dict: any;
    lang?: "pt" | "en" | "es";
}

// Mensagens de erro por idioma
const errorMessages = {
    pt: {
        required: "Campo obrigatório",
        email: "E-mail inválido",
        phone: "Telefone inválido",
        minLength: "Mínimo 10 caracteres",
    },
    en: {
        required: "Required field",
        email: "Invalid email",
        phone: "Invalid phone",
        minLength: "Minimum 10 characters",
    },
    es: {
        required: "Campo obligatorio",
        email: "Email inválido",
        phone: "Teléfono inválido",
        minLength: "Mínimo 10 caracteres",
    },
} as const;

function validate(name: string, value: string, lang: "pt" | "en" | "es"): string {
    const msgs = errorMessages[lang] || errorMessages.pt;
    if (!value.trim()) return msgs.required;
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return msgs.email;
    if (name === "telefone" && value.replace(/\D/g, "").length < 8) return msgs.phone;
    if (name === "mensagem" && value.trim().length < 10) return msgs.minLength;
    return "";
}

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

function Field({
    id, name, type = "text", label, placeholder, required,
    rows, value, error, touched, onChange, onBlur,
}: FieldProps) {
    const hasError = touched && error;
    const isOk = touched && !error && value.trim();

    const baseClass =
        "w-full px-4 py-3 rounded-lg border text-slate-900 outline-none transition-all text-sm focus:ring-2 resize-none";
    const stateClass = hasError
        ? "border-red-400 focus:border-red-400 focus:ring-red-100 bg-red-50"
        : isOk
            ? "border-green-400 focus:border-green-400 focus:ring-green-100 bg-green-50/30"
            : "border-slate-200 focus:border-blue-500 focus:ring-blue-100 bg-white";

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>

            {rows ? (
                <textarea
                    id={id}
                    name={name}
                    rows={rows}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`${baseClass} ${stateClass}`}
                />
            ) : (
                <input
                    id={id}
                    name={name}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`${baseClass} ${stateClass}`}
                />
            )}

            {/* Mensagem de erro inline */}
            <div className={`flex items-center gap-1.5 mt-1.5 transition-all duration-200 ${hasError ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
                <AlertCircle size={13} className="text-red-400 shrink-0" />
                <p className="text-xs text-red-500 font-medium">{error}</p>
            </div>
        </div>
    );
}

export default function ProductForm({ productName, dict, lang = "pt" }: ProductFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    // Valores dos campos
    const [values, setValues] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
    // Erros de validação
    const [errors, setErrors] = useState<Record<string, string>>({});
    // Campos que o usuário já tocou (mostra erro só depois de sair do campo)
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    if (!dict) return null;

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((v) => ({ ...v, [name]: value }));
        // Valida em tempo real SE o campo já foi tocado
        if (touched[name]) {
            setErrors((er) => ({ ...er, [name]: validate(name, value, lang) }));
        }
    }, [touched, lang]);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
        setErrors((er) => ({ ...er, [name]: validate(name, value, lang) }));
    }, [lang]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Valida tudo antes de enviar
        const allFields = ["nome", "email", "telefone", "mensagem"] as const;
        const newErrors: Record<string, string> = {};
        allFields.forEach((f) => { newErrors[f] = validate(f, values[f], lang); });
        setErrors(newErrors);
        setTouched({ nome: true, email: true, telefone: true, mensagem: true });

        if (Object.values(newErrors).some(Boolean)) return;

        setStatus("loading");

        try {
            await sendEmailAction({
                nome: values.nome,
                email: values.email,
                telefone: values.telefone,
                mensagem: values.mensagem,
                produto: productName,
            });
        } catch (err) {
            console.error("Erro ao enviar e-mail:", err);
        }

        const pagePath = typeof window !== "undefined" ? window.location.pathname : "produto";
        track.formSubmit(productName, pagePath);

        const textoMensagem = `${dict.whatsapp_greeting} 👋
${dict.whatsapp_quote_request}

*${dict.whatsapp_interest}:* ${productName}
*${dict.form_name}:* ${values.nome}
*${dict.form_email}:* ${values.email}
*${dict.form_phone}:* ${values.telefone}
*${dict.form_message}:* ${values.mensagem}`;

        window.open(
            `https://wa.me/555184468231?text=${encodeURIComponent(textoMensagem)}`,
            "_blank"
        );
        setStatus("success");
    };

    if (status === "success") {
        return (
            <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                <h3 className="text-xl font-bold text-green-900">{dict.form_success_title}</h3>
                <p className="text-green-700">
                    {dict.form_success_desc}{" "}
                    <span className="font-bold">{productName}</span>.
                </p>
                <button
                    onClick={() => {
                        setStatus("idle");
                        setValues({ nome: "", email: "", telefone: "", mensagem: "" });
                        setTouched({});
                        setErrors({});
                    }}
                    className="mt-6 text-sm text-green-800 underline font-medium hover:text-green-600 transition-colors"
                >
                    {dict.form_another_request}
                </button>
            </div>
        );
    }

    const isGeneralContact = ["Contato Geral", "General Contact", "Contacto General"].includes(productName);

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {dict.send_request || "Solicitar Orçamento"}
            </h3>
            <p className="text-slate-500 mb-6 text-sm">
                {!isGeneralContact ? (
                    <>{dict.whatsapp_interest}:{" "}
                        <span className="font-semibold text-blue-600">{productName}</span>
                    </>
                ) : (
                    dict.form_placeholder_sub || "Preencha os campos abaixo"
                )}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <Field
                    id="nome" name="nome" label={dict.form_name} placeholder="..." required
                    value={values.nome} error={errors.nome} touched={touched.nome}
                    onChange={handleChange} onBlur={handleBlur}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field
                        id="email" name="email" type="email" label={dict.form_email}
                        placeholder="exemplo@empresa.com" required
                        value={values.email} error={errors.email} touched={touched.email}
                        onChange={handleChange} onBlur={handleBlur}
                    />
                    <Field
                        id="telefone" name="telefone" type="tel" label={dict.form_phone}
                        placeholder="(00) 00000-0000" required
                        value={values.telefone} error={errors.telefone} touched={touched.telefone}
                        onChange={handleChange} onBlur={handleBlur}
                    />
                </div>

                <Field
                    id="mensagem" name="mensagem" label={dict.form_message} rows={4}
                    placeholder={dict.form_placeholder} required
                    value={values.mensagem} error={errors.mensagem} touched={touched.mensagem}
                    onChange={handleChange} onBlur={handleBlur}
                />

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-500/20"
                >
                    {status === "loading" ? (
                        <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {dict.preparing_chat || "Carregando..."}
                        </span>
                    ) : (
                        <>{dict.send_request} <Send size={18} /></>
                    )}
                </button>
            </form>
        </div>
    );
}