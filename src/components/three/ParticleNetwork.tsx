"use client";

import { useRef, useState, ComponentProps, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useEngagement } from "@/context/EngagementContext";

// Check WebGL support for Chrome and other browsers
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

function Particles(props: ComponentProps<typeof Points>) {
    const ref = useRef<THREE.Points>(null);

    // Generate random points on a sphere - memoized to prevent regeneration
    const [sphere] = useState<Float32Array>(() => {
        const temp = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1.5 + Math.random() * 0.5; // Radius variation

            temp[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            temp[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            temp[i * 3 + 2] = r * Math.cos(phi);
        }
        return temp;
    });

    const { intensity } = useEngagement();

    useFrame((state, delta) => {
        if (ref.current) {
            // Speed up rotation based on intensity
            const speed = 1 + intensity * 5;
            ref.current.rotation.x -= (delta / 10) * speed;
            ref.current.rotation.y -= (delta / 15) * speed;

            // Pulse size on high intensity
            if (intensity > 0.5) {
                const scale = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
                ref.current.scale.setScalar(scale);
            } else {
                ref.current.scale.setScalar(1);
            }
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00FF88"
                    opacity={0.3 + intensity * 0.5} // Brighter on high engagement
                    size={0.002 + intensity * 0.002} // Larger particles
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export default function ParticleNetwork() {
    const { qualityMode } = useEngagement();
    const [webglSupported, setWebglSupported] = useState(false);
    
    useEffect(() => {
        setWebglSupported(checkWebGLSupport());
    }, []);

    if (!webglSupported) {
        return null; // Graceful fallback - no WebGL, no particles
    }

    const dpr: [number, number] = qualityMode === "high" ? [1, 2] : [1, 1];

    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 1] }}
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
                    console.warn("ParticleNetwork WebGL error:", error);
                }}
            >
                <Particles />
            </Canvas>
        </div>
    );
}
