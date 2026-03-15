import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionaries";
import dynamic from "next/dynamic";

// CARREGAMENTO PREGUIÇOSO: Estas seções só serão baixadas quando aparecerem na tela
// Isso remove todo o peso do Framer Motion do carregamento inicial!
const About = dynamic(() => import("@/components/About"));
const Stats = dynamic(() => import("@/components/Stats"));
const BentoFeatures = dynamic(() => import("@/components/BentoFeatures"));
const Services = dynamic(() => import("@/components/Services"));

export default async function Home({
    params
}: {
    params: Promise<{ lang: 'pt' | 'en' | 'es' }>
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="relative">
            <Navbar lang={lang} dict={dict.navbar} />

            {/* O Hero carrega imediatamente (crítico para a nota LCP) */}
            <Hero dict={dict.hero} lang={lang} />

            {/* Daqui para baixo, o JS só carrega durante o scroll */}
            <About dict={dict.about} />
            <Stats dict={dict.stats} lang={lang} />

            <div className="bg-slate-900 py-10">
                <BentoFeatures dict={dict.bento} />
            </div>

            <Services
                dict={dict.services}
                lang={lang}
                title={dict.navbar.products}
                viewDetailsLabel={dict.ui.view_details}
            />

            <Footer dict={dict} lang={lang} />
        </main>
    );
}