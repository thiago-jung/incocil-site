import { notFound } from "next/navigation";

/**
 * Rota catch-all: captura qualquer caminho dentro de /[lang]/ que não
 * tenha uma página correspondente (ex: /pt/sagasg, /en/xyz/abc).
 * Chama notFound() para exibir o not-found.tsx customizado do segmento [lang].
 */
export default function CatchAllPage() {
    notFound();
}