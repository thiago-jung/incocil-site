import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionaries";
import { Metadata } from "next";

const BASE_URL = "https://www.incocil.com";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: "pt" | "en" | "es" }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const titles = {
        pt: "Política de Privacidade | INCOCIL",
        en: "Privacy Policy | INCOCIL",
        es: "Política de Privacidad | INCOCIL",
    };
    return {
        title: titles[lang],
        robots: { index: false },
        alternates: {
            canonical: `${BASE_URL}/${lang}/privacidade`,
            languages: {
                "pt-BR": `${BASE_URL}/pt/privacidade`,
                "en-US": `${BASE_URL}/en/privacidade`,
                "es-ES": `${BASE_URL}/es/privacidade`,
            },
        },
    };
}

const content = {
    pt: {
        title: "Política de Privacidade",
        updated: "Última atualização: março de 2026",
        sections: [
            {
                heading: "1. Quem somos",
                body: `A INCOCIL — Indústria e Comércio de Cilindros Ltda., inscrita no CNPJ sob nº 87.429.822/0001-80, com sede na Av. Ricardo Leônidas Ribas, 310 — Restinga, Porto Alegre/RS — CEP 91790-005 ("INCOCIL", "nós"), é responsável pelo tratamento dos dados pessoais coletados neste site (www.incocil.com).`,
            },
            {
                heading: "2. Dados que coletamos",
                body: `Coletamos apenas os dados que você nos fornece voluntariamente ao preencher formulários de contato ou orçamento: nome completo, e-mail corporativo, telefone/WhatsApp e a descrição da sua necessidade. Também coletamos dados de navegação de forma anônima (páginas visitadas, tempo de sessão) por meio do Google Analytics 4, somente após o seu consentimento explícito.`,
            },
            {
                heading: "3. Como usamos seus dados",
                body: `Seus dados são utilizados exclusivamente para: (a) responder à sua solicitação de orçamento ou contato; (b) facilitar a comunicação comercial via WhatsApp ou e-mail; (c) melhorar a experiência de navegação no site (dados anônimos de analytics). Não vendemos, alugamos nem compartilhamos seus dados com terceiros para fins de marketing.`,
            },
            {
                heading: "4. Base legal (LGPD)",
                body: `O tratamento dos seus dados pessoais é realizado com base no legítimo interesse (atendimento à sua solicitação) e, no caso dos dados de analytics, com base no consentimento expresso que você concede ou nega no banner de cookies. Você pode revogar o consentimento a qualquer momento clicando em "Revogar consentimento" no rodapé do site.`,
            },
            {
                heading: "5. Cookies e rastreamento",
                body: `Utilizamos cookies essenciais (necessários para o funcionamento do site) e cookies de analytics (Google Analytics 4 — GA4). Os cookies de analytics só são ativados após seu consentimento. Nenhum dado identificável é enviado ao Google sem sua autorização. Você pode gerenciar suas preferências a qualquer momento pelo banner de cookies.`,
            },
            {
                heading: "6. Retenção dos dados",
                body: `Os dados de formulário são retidos pelo tempo necessário para concluir o atendimento comercial ou pelo prazo mínimo exigido por lei. Dados de analytics são retidos por 14 meses no Google Analytics, conforme configuração padrão.`,
            },
            {
                heading: "7. Seus direitos",
                body: `Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e do GDPR (para residentes da União Europeia), você tem direito a: acessar, corrigir ou excluir seus dados; revogar o consentimento; solicitar a portabilidade dos dados; opor-se ao tratamento. Para exercer qualquer desses direitos, entre em contato pelo e-mail incocil@incocil.com.br.`,
            },
            {
                heading: "8. Segurança",
                body: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda ou divulgação. O site utiliza HTTPS com certificado SSL válido e cabeçalhos de segurança (HSTS, CSP, X-Frame-Options).`,
            },
            {
                heading: "9. Links externos",
                body: `Este site pode conter links para plataformas de terceiros (YouTube, WhatsApp, LinkedIn, Instagram). A INCOCIL não é responsável pelas práticas de privacidade dessas plataformas. Recomendamos a leitura das respectivas políticas de privacidade.`,
            },
            {
                heading: "10. Contato",
                body: `Dúvidas sobre esta política? Entre em contato:\n\nINOCCIL — Indústria e Comércio de Cilindros Ltda.\nAv. Ricardo Leônidas Ribas, 310 — Restinga, Porto Alegre/RS\nCEP 91790-005 — Brasil\nE-mail: incocil@incocil.com.br\nTel: +55 51 3261-2205`,
            },
        ],
    },
    en: {
        title: "Privacy Policy",
        updated: "Last updated: March 2026",
        sections: [
            {
                heading: "1. Who we are",
                body: `INCOCIL — Indústria e Comércio de Cilindros Ltda., registered under CNPJ 87.429.822/0001-80, headquartered at Av. Ricardo Leônidas Ribas, 310 — Restinga, Porto Alegre/RS — ZIP 91790-005, Brazil ("INCOCIL", "we"), is the controller of personal data collected through this website (www.incocil.com).`,
            },
            {
                heading: "2. Data we collect",
                body: `We only collect data you voluntarily provide when filling out contact or quote forms: full name, corporate email, phone/WhatsApp number, and a description of your needs. We also collect anonymous browsing data (pages visited, session duration) via Google Analytics 4, only after your explicit consent.`,
            },
            {
                heading: "3. How we use your data",
                body: `Your data is used exclusively to: (a) respond to your quote or contact request; (b) facilitate commercial communication via WhatsApp or email; (c) improve the website browsing experience (anonymous analytics data). We do not sell, rent, or share your data with third parties for marketing purposes.`,
            },
            {
                heading: "4. Legal basis (GDPR / LGPD)",
                body: `Processing of your personal data is carried out on the basis of legitimate interest (fulfilling your request) and, for analytics data, on the basis of explicit consent granted or denied via the cookie banner. You may withdraw consent at any time by clicking "Revoke consent" in the website footer.`,
            },
            {
                heading: "5. Cookies and tracking",
                body: `We use essential cookies (required for the website to function) and analytics cookies (Google Analytics 4 — GA4). Analytics cookies are only activated after your consent. No identifiable data is sent to Google without your authorization. You can manage your preferences at any time via the cookie banner.`,
            },
            {
                heading: "6. Data retention",
                body: `Form data is retained for the time necessary to complete the commercial process or for the minimum period required by law. Analytics data is retained for 14 months in Google Analytics, per default configuration.`,
            },
            {
                heading: "7. Your rights",
                body: `Under the GDPR (EU residents) and Brazil's LGPD (Law 13.709/2018), you have the right to: access, correct or delete your data; withdraw consent; request data portability; object to processing. To exercise any of these rights, contact us at incocil@incocil.com.br.`,
            },
            {
                heading: "8. Security",
                body: `We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or disclosure. The website uses HTTPS with a valid SSL certificate and security headers (HSTS, CSP, X-Frame-Options).`,
            },
            {
                heading: "9. External links",
                body: `This website may contain links to third-party platforms (YouTube, WhatsApp, LinkedIn, Instagram). INCOCIL is not responsible for the privacy practices of those platforms. We recommend reading their respective privacy policies.`,
            },
            {
                heading: "10. Contact",
                body: `Questions about this policy? Get in touch:\n\nINOCCIL — Indústria e Comércio de Cilindros Ltda.\nAv. Ricardo Leônidas Ribas, 310 — Restinga, Porto Alegre/RS\nZIP 91790-005 — Brazil\nEmail: incocil@incocil.com.br\nPhone: +55 51 3261-2205`,
            },
        ],
    },
    es: {
        title: "Política de Privacidad",
        updated: "Última actualización: marzo de 2026",
        sections: [
            {
                heading: "1. Quiénes somos",
                body: `INCOCIL — Indústria e Comércio de Cilindros Ltda., registrada bajo el CNPJ 87.429.822/0001-80, con sede en Av. Ricardo Leônidas Ribas, 310 — Restinga, Porto Alegre/RS — CP 91790-005, Brasil ("INCOCIL", "nosotros"), es responsable del tratamiento de los datos personales recopilados en este sitio web (www.incocil.com).`,
            },
            {
                heading: "2. Datos que recopilamos",
                body: `Solo recopilamos los datos que usted nos proporciona voluntariamente al completar formularios de contacto o presupuesto: nombre completo, correo corporativo, teléfono/WhatsApp y descripción de su necesidad. También recopilamos datos de navegación de forma anónima (páginas visitadas, duración de sesión) mediante Google Analytics 4, solo con su consentimiento explícito.`,
            },
            {
                heading: "3. Cómo usamos sus datos",
                body: `Sus datos se utilizan exclusivamente para: (a) responder a su solicitud de presupuesto o contacto; (b) facilitar la comunicación comercial vía WhatsApp o correo electrónico; (c) mejorar la experiencia de navegación (datos anónimos de analytics). No vendemos, alquilamos ni compartimos sus datos con terceros con fines de marketing.`,
            },
            {
                heading: "4. Base legal (GDPR / LGPD)",
                body: `El tratamiento de sus datos personales se realiza sobre la base del interés legítimo (atender su solicitud) y, para los datos de analytics, sobre la base del consentimiento expreso otorgado o denegado en el banner de cookies. Puede revocar el consentimiento en cualquier momento haciendo clic en "Revocar consentimiento" en el pie de página del sitio.`,
            },
            {
                heading: "5. Cookies y seguimiento",
                body: `Utilizamos cookies esenciales (necesarias para el funcionamiento del sitio) y cookies de analytics (Google Analytics 4 — GA4). Las cookies de analytics solo se activan después de su consentimiento. Ningún dato identificable se envía a Google sin su autorización. Puede gestionar sus preferencias en cualquier momento a través del banner de cookies.`,
            },
            {
                heading: "6. Retención de datos",
                body: `Los datos de formulario se retienen durante el tiempo necesario para completar el proceso comercial o por el plazo mínimo exigido por ley. Los datos de analytics se retienen durante 14 meses en Google Analytics, según la configuración predeterminada.`,
            },
            {
                heading: "7. Sus derechos",
                body: `De acuerdo con el GDPR (residentes de la UE) y la LGPD de Brasil (Ley 13.709/2018), usted tiene derecho a: acceder, corregir o eliminar sus datos; retirar el consentimiento; solicitar la portabilidad de datos; oponerse al tratamiento. Para ejercer cualquiera de estos derechos, contáctenos en incocil@incocil.com.br.`,
            },
            {
                heading: "8. Seguridad",
                body: `Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos contra el acceso no autorizado, pérdida o divulgación. El sitio utiliza HTTPS con certificado SSL válido y encabezados de seguridad (HSTS, CSP, X-Frame-Options).`,
            },
            {
                heading: "9. Enlaces externos",
                body: `Este sitio puede contener enlaces a plataformas de terceros (YouTube, WhatsApp, LinkedIn, Instagram). INCOCIL no es responsable de las prácticas de privacidad de esas plataformas. Recomendamos leer sus respectivas políticas de privacidad.`,
            },
            {
                heading: "10. Contacto",
                body: `¿Preguntas sobre esta política? Contáctenos:\n\nINOCCIL — Indústria e Comércio de Cilindros Ltda.\nAv. Ricardo Leônidas Ribas, 310 — Restinga, Porto Alegre/RS\nCP 91790-005 — Brasil\nCorreo: incocil@incocil.com.br\nTeléfono: +55 51 3261-2205`,
            },
        ],
    },
} as const;

export default async function PrivacidadePage({
    params,
}: {
    params: Promise<{ lang: "pt" | "en" | "es" }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const copy = content[lang] ?? content.pt;

    return (
        <>
            <Navbar lang={lang} dict={dict.navbar} />
            <main className="min-h-screen bg-slate-50 pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-3xl">

                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                        {copy.title}
                    </h1>
                    <p className="text-slate-400 text-sm mb-12">{copy.updated}</p>

                    <div className="space-y-10">
                        {copy.sections.map((section) => (
                            <div key={section.heading}>
                                <h2 className="text-lg font-bold text-slate-900 mb-3">
                                    {section.heading}
                                </h2>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">
                                    {section.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-8 border-t border-slate-200 text-xs text-slate-400">
                        {lang === "pt" && "Esta política pode ser atualizada periodicamente. A data de última atualização será sempre indicada no topo desta página."}
                        {lang === "en" && "This policy may be updated periodically. The last updated date will always be indicated at the top of this page."}
                        {lang === "es" && "Esta política puede actualizarse periódicamente. La fecha de última actualización siempre se indicará en la parte superior de esta página."}
                    </div>
                </div>
            </main>
            <Footer dict={dict} lang={lang} />
        </>
    );
}