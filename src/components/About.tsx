export default function About() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/10 rounded-full -z-10" />
          <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
            Especialistas no desenvolvimento de <span className="text-blue-600">Cilindros Hidráulicos.</span>
          </h2>
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            Localizada em Porto Alegre, a INCOCIL® atende as demandas mais exigentes dos setores agrícola, rodoviário e industrial.
          </p>
          <div className="space-y-4">
            {['Fabricação Própria', 'Garantia Estendida', 'Manutenção Especializada'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-slate-800 font-semibold">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="relative group">
          {/* Aqui você colocaria a foto da fachada da Incocil */}
          <div className="w-full h-[400px] bg-slate-200 rounded-3xl overflow-hidden shadow-2xl">
            <div className="w-full h-full bg-[url('/images/banner-home-2.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
            <p className="text-3xl font-black">2026</p>
            <p className="text-xs uppercase tracking-widest opacity-80">Excelência Industrial</p>
          </div>
        </div>
      </div>
    </section>
  );
}
