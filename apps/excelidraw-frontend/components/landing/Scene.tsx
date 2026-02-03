"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingShape({ position, color }: { position: [number, number, number]; color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} position={position}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
            </mesh>
        </Float>
    );
}

export default function Scene() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <Environment preset="city" />
                <ambientLight intensity={0.5} />
                <FloatingShape position={[-3, 2, 0]} color="#8b5cf6" />
                <FloatingShape position={[4, -1, -2]} color="#ec4899" />
                <FloatingShape position={[-2, -3, 2]} color="#3b82f6" />
                <FloatingShape position={[3, 3, -1]} color="#f97316" />
            </Canvas>
        </div>
    );
}
