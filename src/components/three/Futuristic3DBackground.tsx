"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { useEngagement } from "@/context/EngagementContext";

function FloatingGeometry() {
    const geometries = useRef<Mesh[]>([]);
    const { intensity } = useEngagement();

    useFrame((state) => {
        geometries.current.forEach((geo, i) => {
            if (geo) {
                const time = state.clock.elapsedTime;
                const speed = 0.5 + intensity * 0.5;
                geo.rotation.x = time * (0.3 + i * 0.1) * speed;
                geo.rotation.y = time * (0.4 + i * 0.1) * speed;
                geo.position.y = Math.sin(time * (0.5 + i * 0.2)) * 0.3;
                geo.position.x = Math.cos(time * (0.3 + i * 0.15)) * 0.5;
            }
        });
    });

    return (
        <>
            {[...Array(6)].map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                const radius = 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const colors = ["#00FF88", "#00D9FF", "#A855F7", "#FF0080"];
                const color = colors[i % colors.length];

                return (
                    <mesh
                        key={i}
                        ref={(el) => {
                            if (el) geometries.current[i] = el;
                        }}
                        position={[x, 0, z]}
                        scale={0.3 + intensity * 0.2}
                    >
                        {i % 3 === 0 ? (
                            <boxGeometry args={[0.5, 0.5, 0.5]} />
                        ) : i % 3 === 1 ? (
                            <octahedronGeometry args={[0.4, 0]} />
                        ) : (
                            <tetrahedronGeometry args={[0.4, 0]} />
                        )}
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={0.5 + intensity * 0.5}
                            transparent
                            opacity={0.3 + intensity * 0.3}
                            wireframe={i % 2 === 0}
                        />
                    </mesh>
                );
            })}
        </>
    );
}

function NeuralNodes() {
    const nodesRef = useRef<Group>(null);

    useFrame(() => {
        if (nodesRef.current) {
            nodesRef.current.rotation.y += 0.001;
        }
    });

    const points = [
        [0, 0, 0],
        [1, 1, 0],
        [-1, 1, 0],
        [1, -1, 0],
        [-1, -1, 0],
        [0, 1.5, 0],
        [0, -1.5, 0],
    ];

    return (
        <group ref={nodesRef}>
            {points.map((point, i) => (
                <mesh key={`node-${i}`} position={[point[0], point[1], point[2]]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshStandardMaterial
                        color="#00FF88"
                        emissive="#00FF88"
                        emissiveIntensity={1}
                    />
                </mesh>
            ))}
        </group>
    );
}

// Check WebGL support
function checkWebGLSupport(): boolean {
    if (typeof window === "undefined") return false;
    
    try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        return !!gl;
    } catch (e) {
        return false;
    }
}

export default function Futuristic3DBackground() {
    const { qualityMode } = useEngagement();
    
    // Check WebGL support before rendering
    if (typeof window !== "undefined" && !checkWebGLSupport()) {
        return null;
    }
    
        const dpr: [number, number] = qualityMode === "high" ? [1, 2] : [1, 1];

        if (qualityMode === "low") {
            return null;
        }

        return (
            <div className="fixed inset-0 -z-10 pointer-events-none">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 75 }}
                    dpr={dpr}
                    gl={{ 
                        antialias: false, 
                        powerPreference: "high-performance", 
                        alpha: true,
                        preserveDrawingBuffer: false,
                        failIfMajorPerformanceCaveat: false
                    }}
                    onCreated={({ gl }) => {
                        // Chrome-specific optimizations
                        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                        gl.shadowMap.enabled = false;
                    }}
                    onError={(error) => {
                        console.warn("Futuristic3DBackground WebGL error:", error);
                    }}
                >
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={0.5} color="#00FF88" />
                    <pointLight position={[-10, -10, 10]} intensity={0.5} color="#00D9FF" />
                    <FloatingGeometry />
                    <NeuralNodes />
                </Canvas>
            </div>
        );
}
