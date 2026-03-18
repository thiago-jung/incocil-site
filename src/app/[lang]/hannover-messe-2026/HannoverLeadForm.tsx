"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { track } from "@/lib/analytics";
import { sendEmailAction } from "@/actions/sendEmail";

const STAND_INFO = "Hall 17, D52";
const WHATSAPP = "555184468231"; // ← número móvel correto

export default function HannoverLeadForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const fd = new FormData(e.currentTarget);
        const name = fd.get("name") as string;
        const co = fd.get("company") as string;
        const mail = fd.get("email") as string;
        const need = fd.get("need") as string;

        // Rastreia como lead de alta qualidade (formulário + intenção de reunião)
        track.meetingSchedule("hannover-lead-form");

        const emailData = {
            nome: `${name} (Empresa: ${co})`, // Concatenamos para não perder a empresa
            email: mail,
            telefone: "Não informado no form da feira",
            mensagem: need || "Solicitação de agendamento de reunião na feira.",
            produto: `Agendamento - Hannover Messe 2026 (${STAND_INFO})`,
        };

        sendEmailAction(emailData).catch((error) => {
            console.error("Erro ao enviar e-mail:", error);
        });

        const msg =
            `Hello INCOCIL! 👋
            I would like to schedule a meeting at Hannover Messe 2026 (${STAND_INFO}).

            *Name:* ${name}
            *Company:* ${co}
            *Email:* ${mail}
            *Our need:* ${need}`;

        const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

        setTimeout(() => {
            window.open(url, "_blank");
            setStatus("success");
        }, 800);
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
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-slate-500 underline hover:text-slate-300 transition-colors"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                        Full Name *
                    </label>
                    <input
                        required
                        name="name"
                        type="text"
                        placeholder="John Smith"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-green-500 transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                        Company *
                    </label>
                    <input
                        required
                        name="company"
                        type="text"
                        placeholder="Acme Corp"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-green-500 transition-colors"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    Business Email *
                </label>
                <input
                    required
                    name="email"
                    type="email"
                    placeholder="john@acmecorp.com"
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-green-500 transition-colors"
                />
            </div>

            <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    What do you need?
                </label>
                <textarea
                    name="need"
                    rows={3}
                    placeholder="e.g. Custom hydraulic cylinders for agriculture, Ø 100mm, 600mm stroke..."
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-green-500 transition-colors resize-none"
                />
            </div>

            <button
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-50 text-white font-bold py-4 rounded-full transition-colors text-base"
            >
                {status === "loading" ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Opening WhatsApp...
                    </>
                ) : (
                    <>
                        Schedule Meeting via WhatsApp <Send size={18} />
                    </>
                )}
            </button>

            <p className="text-xs text-slate-600 text-center">
                Your data is used only to prepare our conversation.
            </p>
        </form>
    );
}