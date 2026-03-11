"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

interface ProductFormProps {
  productName: string;
}

export default function ProductForm({ productName }: ProductFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Aqui você integraria com Formspree ou similar no futuro
    // Exemplo de payload: { name, email, product: productName, message }
    setTimeout(() => setStatus("success"), 1500);
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
        <h3 className="text-xl font-bold text-green-900">Solicitação Enviada!</h3>
        <p className="text-green-700">Em breve nossa equipe técnica entrará em contato sobre {productName}.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">Solicitar Orçamento</h3>
      <p className="text-slate-500 mb-6 text-sm">
        Interesse em: <span className="font-semibold text-blue-600">{productName}</span>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Oculto para Rastreamento (Bot ou Dashboard) */}
        <input type="hidden" name="product_context" value={productName} />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
          <input required type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail Corporativo</label>
            <input required type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Telefone/WhatsApp</label>
            <input required type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Sua Necessidade</label>
          <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Fale sobre as dimensões ou aplicação do cilindro..."></textarea>
        </div>

        <button 
          disabled={status === "loading"}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {status === "loading" ? "Enviando..." : <>Enviar Solicitação <Send size={18} /></>}
        </button>
      </form>
    </div>
  );
}
