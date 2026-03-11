"use client";
import { motion } from "framer-motion";

const CLIENTS = [
  "Gerdau", "Randon", "Kepler Weber", "Stara", "John Deere", "Massey Ferguson", "Tupy"
];

export default function Clients() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">
          Empresas que confiam na nossa precisão
        </p>
      </div>
      
      <div className="flex relative items-center">
        {/* Animação Infinita */}
        <motion.div 
          className="flex gap-20 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {/* Duplicamos a lista para o loop ser imperceptível */}
          {[...CLIENTS, ...CLIENTS].map((client, index) => (
            <span 
              key={index} 
              className="text-2xl md:text-3xl font-black text-slate-300 hover:text-blue-500 transition-colors cursor-default"
            >
              {client}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
