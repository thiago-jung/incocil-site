import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { getDictionary } from "@/get-dictionaries";
import dynamic from "next/dynamic";
import { SkeletonServices } from "@/components/SkeletonCard";

/*
 * Carregamento lazy com skeleton loaders.
 *
 * Antes: componentes carregavam sem feedback — a página "pulava"
 * ao aparecer o conteúdo, causando CLS (Cumulative Layout Shift).
 *
 * Agora: enquanto o JS carrega, um placeholder animado ocupa o espaço
 * correto — sem pulos, sem piscar em branco.
 */
const About = dynamic(() => import("@/components/About"), {
    loading: () => (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-pulse">
                    <div className="space-y-4">
                        <div className="h-10 bg-slate-200 rounded-xl w-3/4" />
                        <div className="h-5 bg-slate-100 rounded-lg" />
                        <div className="h-5 bg-slate-100 rounded-lg w-5/6" />
                        <div className="h-5 bg-slate-100 rounded-lg w-4/6" />
                    </div>
                    <div className="h-[400px] bg-slate-200 rounded-3xl" />
                </div>
            </div>
        </section>
    ),
});

const Stats = dynamic(() => import("@/components/Stats"), {
    loading: () => <section className="py-20 bg-slate-900 min-h-[200px]" />,
});

const BentoFeatures = dynamic(() => import("@/components/BentoFeatures"), {
    loading: () => (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="h-[600px] bg-slate-100 rounded-3xl animate-pulse" />
            </div>
        </section>
    ),
});

const Services = dynamic(() => import("@/components/Services"), {
    loading: () => <SkeletonServices />,
});

export default async function Home({
    params
}: {
    params: Promise<{ lang: "pt" | "en" | "es" }>
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <main className="relative">
            <Navbar lang={lang} dict={dict.navbar} />
            <Hero dict={dict.hero} lang={lang} />
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