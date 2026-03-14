"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { sendEmailAction } from "@/actions/sendEmail";
interface ProductFormProps {
    productName: string;
    dict: any; // Recebe dict.ui do dicionário
}

export default function ProductForm({ productName, dict }: ProductFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    if (!dict) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            nome: formData.get("nome"),
            email: formData.get("email"),
            telefone: formData.get("telefone"),
            mensagem: formData.get("mensagem"),
        };

        // 1. Dispara o e-mail em background SEM o "await".
        // O código não vai esperar o e-mail terminar de enviar para continuar.
        sendEmailAction(data).catch((error) => {
            console.error("Ocorreu um erro no envio de email no background.", error);
        });

        // Monta a mensagem usando as chaves do dicionário para internacionalização
        const textoMensagem = `${dict.whatsapp_greeting} 👋
        ${dict.whatsapp_quote_request}

        *${dict.whatsapp_interest}:* ${productName}
        *${dict.form_name}:* ${data.nome}
        *${dict.form_email}:* ${data.email}
        *${dict.form_phone}:* ${data.telefone}
        *${dict.form_message}:* ${data.mensagem}`;

        const whatsappUrl = `https://wa.me/555184468231?text=${encodeURIComponent(textoMensagem)}`;

        setTimeout(() => {
            window.open(whatsappUrl, "_blank");
            setStatus("success");
        }, 1000);
    };

    if (status === "success") {
        return (
            <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                <h3 className="text-xl font-bold text-green-900">
                    {dict.form_success_title}
                </h3>
                <p className="text-green-700">
                    {dict.form_success_desc} <span className="font-bold">{productName}</span>.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-green-800 underline font-medium hover:text-green-600 transition-colors"
                >
                    {dict.form_another_request}
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {dict.send_request || "Solicitar Orçamento"}
            </h3>
            <p className="text-slate-500 mb-6 text-sm">
                {productName !== "Contato Geral" && productName !== "General Contact" ? (
                    <>Interesse em: <span className="font-semibold text-blue-600">{productName}</span></>
                ) : (
                    dict.form_placeholder_sub || "Preencha os campos abaixo"
                )}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        {dict.form_name}
                    </label>
                    <input
                        required
                        name="nome"
                        type="text"
                        placeholder="..."
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            {dict.form_email}
                        </label>
                        <input
                            required
                            name="email"
                            type="email"
                            placeholder="exemplo@empresa.com"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            {dict.form_phone}
                        </label>
                        <input
                            required
                            name="telefone"
                            type="tel"
                            placeholder="(00) 00000-0000"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        {dict.form_message}
                    </label>
                    <textarea
                        required
                        name="mensagem"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        placeholder={dict.form_placeholder}
                    ></textarea>
                </div>

                <button
                    disabled={status === "loading"}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-500/20"
                >
                    {status === "loading" ? (
                        <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {dict.preparing_chat || "Carregando..."}
                        </span>
                    ) : (
                        <>
                            {dict.send_request} <Send size={18} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}