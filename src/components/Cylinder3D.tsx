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

function SceneContent() {
    return (
        <>
            <Environment preset="studio" />
            <directionalLight position={[5, 8, 5]} intensity={3} castShadow />
            <directionalLight position={[-4, 2, 3]} intensity={0.8} />
            <directionalLight position={[-3, 5, -8]} intensity={1.2} />
            <ambientLight intensity={0.2} />
            <Center>
                <Model />
            </Center>
            <OrbitControls
                enableZoom={true}
                maxDistance={500}
                minDistance={250}
                autoRotate
                autoRotateSpeed={2}
                makeDefault
            />
        </>
    );
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
        <div ...>
            <Canvas
                camera={{ position: [10, 4, 10], fov: 30 }}
                gl={{
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                    antialias: true,
                }}
                onCreated={({ gl }) => {
                    gl.domElement.addEventListener('webglcontextlost', (e) => {
                        e.preventDefault();
                        console.warn('WebGL context lost — 3D desativado');
                    });
                }}
            >
                <Suspense fallback={null}>
                    <SceneContent />
                </Suspense>
            </Canvas>
            {/* hint */}
        </div>
    );

}

useGLTF.preload("/models/inox3d._laranglb.glb");