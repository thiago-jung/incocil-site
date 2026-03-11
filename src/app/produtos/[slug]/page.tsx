import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductForm from "@/components/ProductForm";

// Note o 'async' e a tipagem do params como Promise
export default async function PaginaProduto({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    // Aguarda os parâmetros da URL chegarem
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    // O /-/g garante que TODOS os hífens virem espaços
    const nome = decodeURIComponent(slug).replace(/-/g, ' ').toUpperCase();

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="space-y-6">
                        <span className="inline-block py-1 px-3 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest">
                            Equipamento Industrial
                        </span>
                        <h1 className="text-5xl font-black text-slate-900 leading-tight">
                            {nome}
                        </h1>
                        <div className="h-1.5 w-20 bg-blue-600 rounded-full" />

                        <div className="prose prose-slate text-slate-600">
                            <p className="text-xl leading-relaxed">
                                Desenvolvido com tecnologia de ponta para suportar altas pressões e ambientes severos.
                            </p>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {[
                                    ['Material', 'Aço Certificado'],
                                    ['Norma', 'ISO 9001'],
                                    ['Pressão', 'Até 350 Bar'],
                                    ['Garantia', '12 Meses']
                                ].map(([label, value]) => (
                                    <div key={label} className="border-l-4 border-blue-600 pl-4 py-2 bg-white shadow-sm rounded-r-lg">
                                        <p className="text-xs text-slate-400 uppercase font-bold">{label}</p>
                                        <p className="text-slate-900 font-bold">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-32">
                        <ProductForm productName={nome} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}