"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Environment } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import * as THREE from "three";

const hints: Record<string, string> = {
    pt: "Arraste para girar",
    en: "Drag to rotate",
    es: "Arrastra para girar",
};

function Model() {
    const { scene } = useGLTF("/models/inox3d._laranglb.glb");
    return <primitive object={scene} scale={0.5} />;
}

interface Cylinder3DProps {
    lang?: string;
}

export default function Cylinder3D({ lang = "pt" }: Cylinder3DProps) {
    const [showHint, setShowHint] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    function handleInteraction() {
        if (!hasInteracted) {
            setHasInteracted(true);
            setShowHint(false);
        }
    }

    return (
        <div
            className="w-full h-[400px] md:h-[600px] relative z-10 cursor-grab active:cursor-grabbing"
            onMouseDown={handleInteraction}
            onTouchStart={handleInteraction}
        >
            <Canvas
                camera={{ position: [10, 4, 10], fov: 30 }}
                gl={{
                    // Tone mapping essencial para materiais PBR com intensidades físicas
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    antialias: true,
                }}
            >
                <Suspense fallback={null}>

                    {/*
                     * Environment — o mais importante para inox/metais.
                     * Simula reflexos do entorno no material metálico PBR do GLB.
                     * "studio" dá aquele brilho limpo de produto em fundo escuro.
                     * Alternativas a testar: "warehouse", "city", "dawn"
                     */}
                    <Environment preset="studio" />

                    {/*
                     * Iluminação 3-pontos clássica com intensidades físicas (0-10):
                     *
                     * KEY LIGHT — luz principal, vem de cima/direita/frente
                     * Cria o brilho dominante e define a forma do cilindro
                     */}
                    <directionalLight
                        position={[5, 8, 5]}
                        intensity={3}
                        castShadow
                    />

                    {/*
                     * FILL LIGHT — preenchimento suave do lado oposto
                     * Evita que a sombra fique preta demais, mantém detalhes visíveis
                     */}
                    <directionalLight
                        position={[-4, 2, 3]}
                        intensity={0.8}
                    />

                    {/*
                     * RIM LIGHT — contraluz de separação
                     * Destaca a silhueta do cilindro contra o fundo escuro do hero
                     */}
                    <directionalLight
                        position={[-3, 5, -8]}
                        intensity={1.2}
                    />

                    {/*
                     * Ambient mínimo — só para não ter preto absoluto nas sombras
                     * Com Environment ativo, este valor pode ser bem baixo
                     */}
                    <ambientLight intensity={0.2} />

                    <Center>
                        <Model />
                    </Center>
                </Suspense>

                <OrbitControls
                    enableZoom={true}
                    maxDistance={500}
                    minDistance={250}
                    autoRotate
                    autoRotateSpeed={2}
                    makeDefault
                />
            </Canvas>

            <div
                className={`
                    pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2
                    flex items-center gap-2.5
                    bg-white/10 backdrop-blur-md border border-white/20
                    px-4 py-2.5 rounded-full
                    transition-all duration-700
                    ${showHint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                `}
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white animate-[spin_3s_linear_infinite]"
                    style={{ animationDirection: "reverse" }}
                >
                    <path d="M12 2a10 10 0 1 0 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M22 2l-4 8 4-2 2 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-white text-xs font-medium tracking-wide select-none">
                    {hints[lang] ?? hints.en}
                </span>
            </div>
        </div>
    );
}

useGLTF.preload("/models/inox3d._laranglb.glb");