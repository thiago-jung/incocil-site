import { getDictionary } from "@/get-dictionaries";
import Footer from "@/components/Footer";
import BlogClientView from "@/components/BlogClientView";

export default async function BlogPage({
    params
}: {
    params: Promise<{ lang: 'pt' | 'en' | 'es' }>
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            {/* Navbar foi movida para layout.tsx (fora do PageTransition) */}
            <main className="min-h-screen bg-slate-50 pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <BlogClientView dict={dict} lang={lang} />
                </div>
            </main>
            <Footer dict={dict} lang={lang} />
        </>
    );
}