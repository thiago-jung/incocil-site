/**
 * loading.tsx — [lang]/blog/loading.tsx
 */
export default function BlogLoading() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20" aria-busy="true" aria-label="Carregando blog...">
            <div className="container mx-auto px-6">
                {/* Header skeleton */}
                <div className="mb-16 animate-pulse">
                    <div className="h-12 bg-slate-200 rounded-xl w-64 mb-4" />
                    <div className="h-5 bg-slate-100 rounded-lg w-96" />
                </div>

                {/* Cards grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100">
                            <div className="h-56 bg-slate-200" />
                            <div className="p-8 space-y-3">
                                <div className="h-3 bg-slate-100 rounded w-20" />
                                <div className="h-6 bg-slate-200 rounded-lg" />
                                <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
                                <div className="space-y-2 pt-1">
                                    <div className="h-3.5 bg-slate-100 rounded" />
                                    <div className="h-3.5 bg-slate-100 rounded w-5/6" />
                                </div>
                                <div className="h-4 bg-slate-200 rounded w-28 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}