import { MapPin, Phone, Mail, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Coluna 1: Sobre */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-white text-2xl font-black mb-6">INCOCIL<span className="text-blue-500">®</span></h3>
          <p className="text-sm leading-relaxed">
            Especialista na fabricação e manutenção de cilindros hidráulicos e pneumáticos desde Porto Alegre para todo o Brasil.
          </p>
        </div>

        {/* Coluna 2: Produtos */}
        <div>
          <h4 className="text-white font-bold mb-6">Produtos</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="/produtos/cilindros-hidraulicos" className="hover:text-blue-400">Cilindros Hidráulicos</a></li>
            <li><a href="/produtos/cilindros-pneumaticos" className="hover:text-blue-400">Cilindros Pneumáticos</a></li>
            <li><a href="/servicos/brunimento" className="hover:text-blue-400">Serviços de Brunimento</a></li>
          </ul>
        </div>

        {/* Coluna 3: Contato */}
        <div>
          <h4 className="text-white font-bold mb-6">Contato</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-500 shrink-0" />
              <span>Av. Ricardo Leônidas Ribas, 310<br/>Restinga, Porto Alegre - RS</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-blue-500" />
              <span>(51) 3261-2205</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-blue-500" />
              <span>incocil@incocil.com.br</span>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Social */}
        <div>
          <h4 className="text-white font-bold mb-6">Siga-nos</h4>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
        <p>© 2026 Incocil. Todos os direitos reservados. Desenvolvido com Next.js.</p>
      </div>
    </footer>
  );
}
