/**
 * Skeleton loaders — substitutos visuais durante o carregamento lazy
 */

export function SkeletonCard() {
    return (
        <div className="bg-white rounded-3xl border border-slate-100 p-6 animate-pulse">
            <div className="w-12 h-12 bg-slate-200 rounded-xl mb-6" />
            <div className="h-5 bg-slate-200 rounded-lg mb-3 w-3/4" />
            <div className="space-y-2 mb-6">
                <div className="h-3.5 bg-slate-100 rounded-lg" />
                <div className="h-3.5 bg-slate-100 rounded-lg w-5/6" />
                <div className="h-3.5 bg-slate-100 rounded-lg w-4/6" />
            </div>
            <div className="h-4 bg-slate-200 rounded-lg w-1/3" />
        </div>
    );
}

export function SkeletonServices() {
    return (
        <section className="py-24 bg-slate-50" id="servicos">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="h-10 bg-slate-200 rounded-xl animate-pulse w-64 mx-auto mb-4" />
                    <div className="h-1.5 w-20 bg-slate-200 rounded-full mx-auto animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export function SkeletonHero() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center">
            <div className="container mx-auto px-6">
                <div className="h-6 bg-slate-700 rounded-full animate-pulse w-48 mb-6" />
                <div className="h-16 bg-slate-700 rounded-xl animate-pulse w-3/4 mb-4" />
                <div className="h-16 bg-slate-700 rounded-xl animate-pulse w-2/3 mb-8" />
                <div className="h-5 bg-slate-800 rounded-lg animate-pulse w-full max-w-lg mb-2" />
                <div className="h-5 bg-slate-800 rounded-lg animate-pulse w-4/5 max-w-lg mb-10" />
                <div className="flex gap-4">
                    {/* era bg-blue-800 — não remapeado no globals.css → azul real #1e40af */}
                    <div className="h-14 w-44 bg-slate-700 rounded-xl animate-pulse" />
                    <div className="h-14 w-44 bg-slate-800 rounded-xl animate-pulse" />
                </div>
            </div>
        </div>
    );
}