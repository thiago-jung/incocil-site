import { getDictionary } from "@/get-dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogClientView from "@/components/BlogClientView";

export default async function BlogPage({
    params
}: {
    params: Promise<{ lang: 'pt' | 'en' }>
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);

    return (
        <>
            <Navbar lang={lang} dict={dict.navbar} />
            <main className="min-h-screen bg-slate-50 pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <BlogClientView dict={dict} lang={lang} />
                </div>
            </main>
            <Footer dict={dict} lang={lang} />
        </>
    );
}