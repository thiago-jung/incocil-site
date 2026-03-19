/**
 * loading.tsx — [lang]/produtos/[slug]/loading.tsx
 *
 * Exibido enquanto a página de produto carrega.
 * Replica a estrutura de 2 colunas da página real.
 */
export default function ProductLoading() {
    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-20" aria-busy="true" aria-label="Carregando produto...">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-pulse">

                    {/* Coluna esquerda */}
                    <div className="space-y-6">
                        <div className="h-6 bg-slate-200 rounded-lg w-40" />
                        <div className="h-12 bg-slate-200 rounded-xl w-3/4" />
                        <div className="h-[400px] bg-slate-200 rounded-3xl" />
                        <div className="space-y-2">
                            <div className="h-5 bg-slate-100 rounded-lg" />
                            <div className="h-5 bg-slate-100 rounded-lg w-5/6" />
                            <div className="h-5 bg-slate-100 rounded-lg w-4/6" />
                        </div>
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 bg-slate-200 rounded-full shrink-0" />
                                    <div className="h-4 bg-slate-100 rounded-lg flex-1" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Coluna direita — formulário */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-8 h-fit space-y-4">
                        <div className="h-8 bg-slate-200 rounded-xl w-2/3" />
                        <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
                        <div className="space-y-4 pt-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i}>
                                    <div className="h-3 bg-slate-100 rounded w-24 mb-2" />
                                    <div className="h-11 bg-slate-100 rounded-lg" />
                                </div>
                            ))}
                            <div className="h-14 bg-slate-200 rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}