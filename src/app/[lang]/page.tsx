import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import BentoFeatures from "@/components/BentoFeatures";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionaries";

export default async function Home({
    params
}: {
        params: Promise<{ lang: 'pt' | 'en' | 'es' }>
}) {
    // 1. Capturamos o idioma e buscamos o dicionário
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="relative">
            {/* 2. Passamos as partes específicas do dicionário para cada componente */}
            <Navbar lang={lang} dict={dict.navbar} />

            <Hero dict={dict.hero} lang={lang} />

            {/* Dica: Se o componente About/Stats ainda não recebe props,
                você precisará ajustá-los também para usar o dict */}
            <About dict={dict.about} />

            <Stats dict={dict.stats} lang={lang} />

            <div className="bg-slate-900 py-10">
                <BentoFeatures dict={dict.bento} />
            </div>

            {/* Passamos a lista de serviços traduzida */}
            <Services
                dict={dict.services}
                lang={lang}
                title={dict.navbar.products}
                viewDetailsLabel={dict.ui.view_details} // Se você adicionou essa chave no JSON
            />

            {/* O Footer recebe o dicionário completo e o idioma */}
            <Footer dict={dict} lang={lang} />
        </main>
    );
}