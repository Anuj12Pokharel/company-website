"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Star {
    x: number;
    y: number;
    size: number;
    opacity: number;
    twinkleDelay: number;
}

interface Constellation {
    stars: number[];
    opacity: number;
}

export default function StarsConstellation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [stars, setStars] = useState<Star[]>([]);
    const [constellations, setConstellations] = useState<Constellation[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Generate random stars
        const starCount = 150;
        const newStars: Star[] = [];
        
        for (let i = 0; i < starCount; i++) {
            newStars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleDelay: Math.random() * 2,
            });
        }

        setStars(newStars);

        // Create constellation patterns (connect nearby stars)
        const newConstellations: Constellation[] = [];
        const connectionDistance = 200;

        for (let i = 0; i < newStars.length; i++) {
            const connections: number[] = [];
            for (let j = i + 1; j < newStars.length; j++) {
                const dx = newStars[i].x - newStars[j].x;
                const dy = newStars[i].y - newStars[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance && Math.random() > 0.7) {
                    connections.push(j);
                }
            }
            if (connections.length > 0) {
                newConstellations.push({
                    stars: [i, ...connections],
                    opacity: Math.random() * 0.3 + 0.1,
                });
            }
        }

        setConstellations(newConstellations);

        // Handle window resize
        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            const updatedStars = newStars.map(star => ({
                ...star,
                x: (star.x / width) * newWidth,
                y: (star.y / height) * newHeight,
            }));

            setStars(updatedStars);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-20 pointer-events-none overflow-hidden"
        >
            {/* Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full">
                {constellations.map((constellation, idx) => {
                    if (constellation.stars.length < 2) return null;
                    
                    const startStar = stars[constellation.stars[0]];
                    if (!startStar) return null;

                    return (
                        <g key={idx}>
                            {constellation.stars.slice(1).map((starIdx, lineIdx) => {
                                const endStar = stars[starIdx];
                                if (!endStar) return null;

                                return (
                                    <motion.line
                                        key={lineIdx}
                                        x1={startStar.x}
                                        y1={startStar.y}
                                        x2={endStar.x}
                                        y2={endStar.y}
                                        stroke="#00FF88"
                                        strokeWidth="0.5"
                                        opacity={constellation.opacity}
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{
                                            pathLength: 1,
                                            opacity: constellation.opacity,
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: idx * 0.1,
                                            ease: "easeOut",
                                        }}
                                    />
                                );
                            })}
                        </g>
                    );
                })}
            </svg>

            {/* Stars */}
            {stars.map((star, idx) => (
                <motion.div
                    key={idx}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}px`,
                        top: `${star.y}px`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        boxShadow: `0 0 ${star.size * 2}px rgba(0, 255, 136, 0.8)`,
                    }}
                    animate={{
                        opacity: [
                            star.opacity * 0.5,
                            star.opacity,
                            star.opacity * 0.5,
                        ],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: star.twinkleDelay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

