"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductForm from "@/components/ProductForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function ContatoPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-slate-50 pt-32 pb-20">
                <div className="container mx-auto px-6">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Coluna Esquerda: Informações e Mapa */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div>
                                <h1 className="text-4xl font-black text-slate-900 mb-4">Vamos conversar?</h1>
                                <p className="text-lg text-slate-600">
                                    Nossa equipe técnica está pronta para auxiliar no seu projeto ou manutenção.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                    <Phone className="text-blue-600 mb-3" size={24} />
                                    <h4 className="font-bold text-slate-900">Telefone</h4>
                                    <p className="text-sm text-slate-600">(51) 3261-2205</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                    <Mail className="text-blue-600 mb-3" size={24} />
                                    <h4 className="font-bold text-slate-900">E-mail</h4>
                                    <p className="text-sm text-slate-600">incocil@incocil.com.br</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                                <MapPin className="text-blue-600 shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-slate-900">Endereço</h4>
                                    <p className="text-sm text-slate-600">Av. Ricardo Leônidas Ribas, 310 - Porto Alegre/RS</p>
                                </div>
                            </div>

                            {/* Mapa Google Maps */}
                            <div className="w-full h-[300px] rounded-2xl overflow-hidden shadow-inner bg-slate-200 grayscale hover:grayscale-0 transition-all duration-500">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.982361658421!2d-51.1517409!3d-30.1519785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951983050019a775%3A0xc6657999763717c6!2sAv.%20Ricardo%20Le%C3%B4nidas%20Ribas%2C%20310%20-%20Restinga%2C%20Porto%20Alegre%20-%20RS%2C%2091790-005!5e0!3m2!1spt-BR!2sbr!4v1710115200000!5m2!1spt-BR!2sbr"
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
                        >
                            <ProductForm productName="Contato Geral" />
                        </motion.div>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}