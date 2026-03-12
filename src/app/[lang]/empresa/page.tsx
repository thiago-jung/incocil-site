// src/app/[lang]/empresa/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionaries";
import EmpresaClientView from "@/components/EmpresaClientView";

export default async function EmpresaPage({
    params
}: {
    params: Promise<{ lang: 'pt' | 'en' | 'es' }>
}) {
    // 1. Resolve os parâmetros e busca o dicionário no Servidor
    const { lang } = await params;
    const dict = await getDictionary(lang as 'pt' | 'en' | 'es');

    // Injetamos o idioma no objeto dict para uso no Client Component se necessário
    const dictWithLang = { ...dict, lang };

    return (
        <>
            <Navbar lang={lang} dict={dict.navbar} />

            {/* O componente cliente lida com as animações do Framer Motion */}
            <EmpresaClientView dict={dictWithLang} />

            <Footer dict={dict} lang={lang} />
        </>
    );
}