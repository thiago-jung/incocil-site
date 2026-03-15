"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows, Center } from "@react-three/drei";
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
            <Canvas camera={{ position: [0, 2, 15], fov: 30 }}>
                {/* Aumentamos um pouco a luz ambiente para compensar a troca de ambiente */}
                <ambientLight intensity={0.9} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={0.5} intensity={0.5} castShadow />

                <Suspense fallback={null}>
                    <Center>
                        <Model />
                    </Center>

                    {/* 3. Trocamos "city" por "studio". Fim dos prédios! Teremos um fundo fotográfico limpo. */}
                    <Environment preset="studio" />

                    <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={15} blur={2.5} far={4} />
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