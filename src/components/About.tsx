import Image from "next/image";

interface AboutProps {
    dict: any;
}

export default function About({ dict }: AboutProps) {
    // Verificação defensiva
    if (!dict) return null;

    return (
        <section className="py-24 overflow-hidden bg-white">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/10 rounded-full -z-10" />

                    <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                        {dict.title_start} <span className="text-blue-600">{dict.title_accent}</span>
                    </h2>

                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                        {dict.description}
                    </p>

                    <div className="space-y-4">
                        {dict.items?.map((item: string) => (
                            <div key={item} className="flex items-center gap-3 text-slate-800 font-semibold">
                                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative group">
                    <div className="w-full h-[400px] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl relative group">
                        <Image
                            src="/images/banner-home-2.jpg"
                            alt="Incocil Factory"
                            fill
                            priority
                            quality={60}
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                        <p className="text-3xl font-black">{dict.badge_year || "2026"}</p>
                        <p className="text-xs uppercase tracking-widest opacity-80">{dict.badge_text}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}