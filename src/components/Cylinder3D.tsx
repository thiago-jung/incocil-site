"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Center, Lightformer } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
    const { scene } = useGLTF("/models/inox3d._laranglb.glb");

    // 1. Reduzimos a escala pela metade (0.5) para garantir que caiba na tela
    return <primitive object={scene} scale={0.5} />;
}

export default function Cylinder3D() {
    return (
        <div className="w-full h-[400px] md:h-[600px] relative z-10 cursor-grab active:cursor-grabbing">
            {/* 2. Câmera: Afastada para Z=15 (zoom out) e fov reduzido para 30 (remove o efeito olho de peixe) */}
            <Canvas camera={{ position: [10, 4, 10], fov: 30 }}>
                <Suspense fallback={null}>

                    {/* 1. ILUMINAÇÃO SIMPLES E DIRETA */}
                    {/* Luz ambiente bem clara para banhar todo o objeto */}
                    <ambientLight intensity={25.5} />

                    {/* Luz principal vindo de cima e da direita (cria o brilho forte) */}
                    <directionalLight position={[10, 10, 5]} intensity={350} castShadow />

                    {/* Luz de preenchimento vindo da esquerda (evita sombras muito escuras) */}
                    <directionalLight position={[-10, 5, -5]} intensity={25} />

                    {/* Ponto de luz frontal para dar aquele "pingo" de reflexo no meio do cilindro */}
                    <pointLight position={[0, 0, 5]} intensity={25} />

                    {/* Luz de preenchimento vindo de BAIXO para CIMA */}
                    {/* X=0 (centro), Y=-10 (bem debaixo), Z=5 (ligeiramente para a frente para bater na face do cilindro) */}
                    <directionalLight position={[0, -10, 5]} intensity={40} />

                    {/* Luz principal vindo exatamente da FRENTE */}
                    {/* X=0 (centro), Y=0 (altura do meio), Z=10 (10 metros à frente do cilindro, a apontar para ele) */}
                    <directionalLight position={[0, 0, 10]} intensity={50} />

                    <Center>
                        <Model />
                    </Center>

                    {/* Sombra de chão */}
                    {/*<ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={15} blur={2.5} far={4} />*/}
                </Suspense>

                {/* 4. Ativei o enableZoom={true} para que você possa usar o scroll do mouse para ajustar o zoom como preferir */}
                <OrbitControls
                    enableZoom={true}
                    maxDistance={500} // Limite de zoom out
                    minDistance={250}  // Limite de zoom in
                    autoRotate
                    autoRotateSpeed={2}
                    makeDefault
                />
            </Canvas>
        </div>
    );
}

useGLTF.preload("/models/inox3d._laranglb.glb");