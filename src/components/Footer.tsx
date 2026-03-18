import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";
import Link from "next/link";
import { RevokeConsentButton } from "@/components/CookieBanner";

interface FooterProps {
    dict: any;
    lang: string;
}

export default function Footer({ dict, lang }: FooterProps) {

    if (!dict) {
        console.error("Footer: Prop 'dict' is missing in one of your pages.");
        return null;
    }

    const { company, navbar, footer, services } = dict;

    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Coluna 1: Sobre */}
                <div className="col-span-1 md:col-span-1">
                    <h3 className="text-white text-2xl font-black mb-6">INCOCIL<span className="text-blue-500">®</span></h3>
                    <p className="text-sm leading-relaxed">
                        {footer?.about || company.full_name}
                    </p>
                </div>

                {/* Coluna 2: Atalhos */}
                <div>
                    <h4 className="text-white font-bold mb-6">{navbar.products}</h4>
                    <ul className="space-y-4 text-sm">
                        {services.slice(0, 3).map((service: any) => (
                            <li key={service.slug}>
                                <Link href={`/${lang}/produtos/${service.slug}`} className="hover:text-blue-400 transition-colors">
                                    {service.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Coluna 3: Contato */}
                <div>
                    <h4 className="text-white font-bold mb-6">{navbar.contact}</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-3">
                            <MapPin size={18} className="text-blue-500 shrink-0" />
                            <span>{company.address}<br />{company.location}</span>
                        </li>
                        <li className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-blue-500" />
                                <span>{company.phone_fixo}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MessageCircle size={18} className="text-green-500" />
                                <span>{company.phone_whats}</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-3 mt-2">
                            <Mail size={18} className="text-blue-500" />
                            <span>{company.email}</span>
                        </li>
                    </ul>
                </div>

                {/* Coluna 4: Social */}
                <div>
                    <h4 className="text-white font-bold mb-6">{footer?.follow_us || "Siga-nos"}</h4>
                    <div className="flex gap-4">
                        <a
                            href={company.instagram}
                            aria-label="Instagram"
                            title="Siga-nos no Instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href={company.linkedin}
                            aria-label="LinkedIn"
                            title="Siga-nos no LinkedIn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href={company.youtube}
                            aria-label="Youtube"
                            title="Inscreva-se no Youtube"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Rodapé inferior: copyright + revogação */}
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
                <p>© 2026 Incocil. {footer?.rights || "Todos os direitos reservados."}</p>
                {/* Botão de revogação de consentimento (LGPD/GDPR) */}
                <RevokeConsentButton lang={lang} />
            </div>
        </footer>
    );
}
