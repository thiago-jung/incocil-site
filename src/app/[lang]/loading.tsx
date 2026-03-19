import { SkeletonHero, SkeletonServices } from "@/components/SkeletonCard";

/**
 * loading.tsx — [lang]/loading.tsx
 *
 * O Next.js App Router exibe este componente automaticamente enquanto
 * a página principal carrega. É o Suspense boundary nativo do framework.
 *
 * Antes: tela branca durante a hidratação.
 * Agora: skeleton animado que ocupa exatamente o espaço da página real
 *        → zero CLS (Cumulative Layout Shift), experiência premium.
 */
export default function HomeLoading() {
    return (
        <div aria-busy="true" aria-label="Carregando...">
            <SkeletonHero />
            <SkeletonServices />
        </div>
    );
}