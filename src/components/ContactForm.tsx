"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import ProductForm from "@/components/ProductForm";

interface ContactViewProps {
    dict: any;
    lang: string;
}

export default function ContactForm({ dict, lang }: ContactViewProps) {
    const { company, ui, contact_page } = dict;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Coluna Esquerda: Informações e Mapa */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
            >
                <div>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">
                        {contact_page?.title || "Vamos conversar?"}
                    </h1>
                    <p className="text-lg text-slate-600">
                        {contact_page?.description || "Nossa equipe técnica está pronta para auxiliar."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <Phone className="text-blue-600 mb-3" size={24} />
                        <h4 className="font-bold text-slate-900">{lang === 'pt' ? 'Telefone' : 'Phone'}</h4>
                        <p className="text-sm text-slate-600">{company.phone}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                        <Mail className="text-blue-600 mb-3" size={24} />
                        <h4 className="font-bold text-slate-900">E-mail</h4>
                        <p className="text-sm text-slate-600">{company.email}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                    <MapPin className="text-blue-600 shrink-0" size={24} />
                    <div>
                        <h4 className="font-bold text-slate-900">{lang === 'pt' ? 'Endereço' : 'Address'}</h4>
                        <p className="text-sm text-slate-600">{company.address} - {company.location}</p>
                    </div>
                </div>

                {/* Mapa Google Maps */}
                <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-inner bg-slate-200 grayscale hover:grayscale-0 transition-all duration-500">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.941680197779!2d-51.1396883!3d-30.1531238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9519808a28795555%3A0x6794680877995555!2sAv.%20Ricardo%20Le%C3%B4nidas%20Ribas%2C%20310%20-%20Restinga%2C%20Porto%20Alegre%20-%20RS!5e0!3m2!1spt-BR!2sbr!4v1710000000000"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </motion.div>

            {/* Coluna Direita: Formulário */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* O ProductForm já é um Client Component, passamos o dict.ui para ele */}
                <ProductForm
                    productName={lang === 'pt' ? "Contato Geral" : "General Contact"}
                    dict={ui}
                />
            </motion.div>

        </div>
    );
}