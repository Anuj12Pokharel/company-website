"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Logo({ className = "" }: { className?: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`relative inline-flex items-center gap-3 ${className}`}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            {/* Animated Glow Effect */}
            <motion.div
                className="absolute inset-0 rounded-lg blur-xl opacity-40"
                animate={{
                    background: [
                        "radial-gradient(circle, rgba(0,255,136,0.4) 0%, transparent 70%)",
                        "radial-gradient(circle, rgba(0,217,255,0.4) 0%, transparent 70%)",
                        "radial-gradient(circle, rgba(0,255,136,0.4) 0%, transparent 70%)",
                    ],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Brain-like Logo Icon */}
            <motion.div
                className="relative z-10"
                animate={{
                    rotateY: isHovered ? [0, 15, -15, 0] : 0,
                }}
                transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut",
                }}
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_0_20px_rgba(0,255,136,0.8)]"
                >
                    {/* Brain-like shape - Left hemisphere */}
                    <motion.path
                        d="M12 20 C12 16, 14 12, 18 10 C18 8, 20 6, 22 8 C24 6, 26 8, 26 10 C30 12, 32 16, 32 20 C32 24, 30 28, 28 30 C28 32, 26 34, 24 34 C22 34, 20 32, 20 30 C18 28, 16 24, 16 20 C16 18, 14 18, 12 20 Z"
                        stroke="#00FF88"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />
                    
                    {/* Brain-like shape - Right hemisphere */}
                    <motion.path
                        d="M24 20 C24 16, 26 12, 30 10 C30 8, 32 6, 34 8 C36 6, 38 8, 38 10 C40 12, 42 16, 42 20 C42 24, 40 28, 38 30 C38 32, 36 34, 34 34 C32 34, 30 32, 30 30 C28 28, 26 24, 26 20 C26 18, 24 18, 24 20 Z"
                        stroke="#00FF88"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: 0.3,
                        }}
                    />

                    {/* Neural network nodes */}
                    {[
                        { x: 18, y: 16 },
                        { x: 22, y: 14 },
                        { x: 26, y: 16 },
                        { x: 30, y: 14 },
                        { x: 34, y: 16 },
                        { x: 20, y: 22 },
                        { x: 24, y: 24 },
                        { x: 28, y: 22 },
                        { x: 32, y: 24 },
                        { x: 22, y: 28 },
                        { x: 26, y: 30 },
                        { x: 30, y: 28 },
                    ].map((node, i) => (
                        <motion.circle
                            key={`node-${i}`}
                            cx={node.x}
                            cy={node.y}
                            r="1.5"
                            fill="#00FF88"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.1,
                            }}
                        />
                    ))}

                    {/* Neural connections - animated pulses */}
                    {[
                        { x1: 18, y1: 16, x2: 22, y2: 14 },
                        { x1: 22, y1: 14, x2: 26, y2: 16 },
                        { x1: 26, y1: 16, x2: 30, y2: 14 },
                        { x1: 30, y1: 14, x2: 34, y2: 16 },
                        { x1: 20, y1: 22, x2: 24, y2: 24 },
                        { x1: 24, y1: 24, x2: 28, y2: 22 },
                        { x1: 28, y1: 22, x2: 32, y2: 24 },
                        { x1: 22, y1: 28, x2: 26, y2: 30 },
                        { x1: 26, y1: 30, x2: 30, y2: 28 },
                        { x1: 18, y1: 16, x2: 20, y2: 22 },
                        { x1: 26, y1: 16, x2: 24, y2: 24 },
                        { x1: 34, y1: 16, x2: 32, y2: 24 },
                    ].map((line, i) => (
                        <motion.line
                            key={`line-${i}`}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="#00FF88"
                            strokeWidth="0.8"
                            animate={{
                                opacity: [0.2, 0.8, 0.2],
                                strokeWidth: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.15,
                            }}
                        />
                    ))}

                    {/* Center brain connection */}
                    <motion.path
                        d="M22 20 Q24 18 26 20"
                        stroke="#00FF88"
                        strokeWidth="1.5"
                        fill="none"
                        animate={{
                            pathLength: [0, 1, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </svg>
            </motion.div>

            {/* Text with Green/White Gradient and Animation */}
            <motion.div
                className="relative z-10 flex flex-col"
                animate={{
                    x: isHovered ? [0, 2, 0] : 0,
                }}
                transition={{
                    duration: 0.5,
                    repeat: isHovered ? Infinity : 0,
                }}
            >
                <motion.span
                    className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-[#00FF88] to-white bg-[length:200%_auto]"
                    animate={{
                        backgroundPosition: ["0% center", "200% center"],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        backgroundImage: "linear-gradient(90deg, #FFFFFF 0%, #00FF88 50%, #FFFFFF 100%)",
                    }}
                >
                    CODEX
                </motion.span>
                <motion.span
                    className="text-sm font-bold tracking-[0.2em] text-[#00FF88] uppercase"
                    animate={{
                        opacity: [0.8, 1, 0.8],
                        textShadow: [
                            "0 0 10px rgba(0, 255, 136, 0.5)",
                            "0 0 20px rgba(0, 255, 136, 0.8), 0 0 30px rgba(0, 255, 136, 0.4)",
                            "0 0 10px rgba(0, 255, 136, 0.5)",
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    NEURAL
                </motion.span>
            </motion.div>

            {/* Particle Effects - Green */}
            {isHovered && (
                <>
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#00FF88] rounded-full"
                            initial={{
                                x: 24,
                                y: 24,
                                opacity: 1,
                            }}
                            animate={{
                                x: 24 + Math.cos((i * Math.PI) / 4) * 50,
                                y: 24 + Math.sin((i * Math.PI) / 4) * 50,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                delay: i * 0.1,
                            }}
                        />
                    ))}
                </>
            )}
        </motion.div>
    );
}
